const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all posts - only for logged in user's posts
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET single post - only if it belongs to the user
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, userId: req.userId });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// CREATE post - requires authentication
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, author, tags, imageUrl } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const post = new Post({
      title,
      content,
      author: author || req.user.username || 'Anonymous',
      userId: req.userId,
      tags: Array.isArray(tags) ? tags : [],
      imageUrl,
    });
    const saved = await post.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// UPDATE post - only if it belongs to the user
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, author, tags, imageUrl } = req.body;
    const updated = await Post.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, content, author, tags, imageUrl },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// DELETE post - only if it belongs to the user
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Post.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deleted) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;

