import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';
import { createPost } from './postsSlice';

const PostCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    const result = await dispatch(createPost(data));
    if (createPost.fulfilled.match(result)) {
      navigate(`/posts/${result.payload._id}`);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-8 offset-lg-2">
        <PostForm onSubmit={handleCreate} submitLabel="Create Post" />
      </div>
    </div>
  );
};

export default PostCreate;

