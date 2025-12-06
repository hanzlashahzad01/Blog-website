import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from './PostForm';
import { fetchPostById, updatePost } from './postsSlice';

const PostEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selected, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  const handleUpdate = async (data) => {
    const result = await dispatch(updatePost({ id, data }));
    if (updatePost.fulfilled.match(result)) {
      navigate(`/posts/${id}`);
    }
  };

  if (status === 'loading' || !selected) {
    return <p>Loading post...</p>;
  }

  if (status === 'failed') {
    return <div className="alert alert-danger">{error || 'Unable to load post'}</div>;
  }

  return (
    <div className="row">
      <div className="col-lg-8 offset-lg-2">
        <PostForm initialData={selected} onSubmit={handleUpdate} submitLabel="Update Post" />
      </div>
    </div>
  );
};

export default PostEdit;

