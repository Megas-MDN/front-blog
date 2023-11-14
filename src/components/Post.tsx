import { IPost } from '../App';
import './Post.css';
export const Post = ({ post }: { post: IPost }) => {
  return (
    <div className='post-container'>
      <h1 className='title text-xl'>{post.title}</h1>
      <p className='content'>{post.content}</p>
      <hr />
      <div className='ids'>
        <small className=' text-center'>{`UserId: ${post.user_id}`}</small>
        <small className=' text-center'>{`PostId: ${post.id}`}</small>
      </div>
    </div>
  );
};
