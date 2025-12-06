import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchPostById } from './postsSlice';

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: post, status, error } = useSelector((state) => state.posts);
  const placeholder =
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60';

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  if (status === 'loading' || !post) {
    return <p>Loading post...</p>;
  }

  if (status === 'failed') {
    return <div className="alert alert-danger">{error || 'Unable to load post'}</div>;
  }

  return (
    <div className="card shadow-sm post-card">
      <div className="ratio ratio-16x9 overflow-hidden">
        <img
          src={post.imageUrl || placeholder}
          alt={post.title}
          className="w-100 h-100 object-fit-cover"
        />
      </div>
      <div className="card-body">
        <div className="detail-banner">
          <h3 className="card-title mb-1">{post.title}</h3>
          <p className="text-muted small mb-0">
            By {post.author || 'Anonymous'} · {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
        <p className="card-text" style={{ whiteSpace: 'pre-line' }}>
          {post.content}
        </p>
        {post.tags?.length > 0 && (
          <p className="small">
            Tags:{' '}
            {post.tags.map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </p>
        )}
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-secondary" to={`/posts/${post._id}/edit`}>
            Edit
          </Link>
          <Link className="btn btn-outline-primary" to="/">
            Back to list
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

