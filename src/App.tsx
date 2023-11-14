import { useEffect } from 'react';
import './App.css';
import { usePostsStore } from './store/postsStore';
import { Post } from './components/Post';
import { useSocket } from './hooks/useSocket';
import FormPost from './components/FormPost';

export interface IPost {
  content: string;
  id?: string;
  title: string;
  user_id: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

function App() {
  const { getPosts, posts } = usePostsStore((state) => ({
    posts: state.posts,
    getPosts: state.getPosts,
  }));
  const { data, goFech } = useSocket();
  const fetchPost = async () => {
    await getPosts();
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    console.log(goFech, data, '<--- goFech');
    if (goFech.goFetch && goFech.fetch === 'fetchPost') {
      fetchPost();
    }
  }, [goFech, data]);

  return (
    <div>
      <h1 className='text-3xl font-bold underline text-center p-3'>
        Vite + React
      </h1>
      <FormPost />
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default App;
