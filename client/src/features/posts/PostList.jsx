import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchPosts } from './postsSlice';

const PostList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.posts);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchPosts());
    }
  }, [dispatch, isAuthenticated]);

  const handleDelete = (id) => {
    if (window.confirm('Delete this post?')) {
      dispatch(deletePost(id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="alert alert-info">
            Please login to view your posts.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="hero">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
          <div>
            <h2 className="mb-1">My Posts</h2>
          </div>
        </div>
      </div>
      {status === 'loading' && <p>Loading posts...</p>}
      {status === 'failed' && (
        <div className="alert alert-danger">
          {error === 'Authentication required' 
            ? 'Please login to view your posts.' 
            : error || 'Error loading posts'}
        </div>
      )}

      {items.length === 0 && status === 'succeeded' && (
        <div className="col-12">
          <div className="alert alert-info">
            <p className="mb-0">No posts yet. <Link to="/posts/new">Create your first post!</Link></p>
          </div>
        </div>
      )}

      {items.map((post) => (
        <div className="col-md-6 mb-3" key={post._id}>
          <div className="card h-100 post-card fade-in">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title mb-1">{post.title}</h5>
              <p className="card-text muted small mb-2">
                By {post.author || 'Anonymous'} · {new Date(post.createdAt).toLocaleDateString()}
              </p>
              {post.tags?.length > 0 && (
                <div className="mb-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span className="chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="card-text flex-grow-1 muted">
                {post.content.length > 140 ? `${post.content.slice(0, 140)}...` : post.content}
              </p>
              <div className="d-flex gap-2 mt-2">
                <Link className="btn btn-soft btn-sm" to={`/posts/${post._id}`}>
                  View
                </Link>
                <Link className="btn btn-outline-secondary btn-sm" to={`/posts/${post._id}/edit`}>
                  Edit
                </Link>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(post._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;

