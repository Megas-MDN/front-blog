import { useEffect } from 'react';
import './App.css';
import { usePostsStore } from './store/postsStore';
import { Post } from './components/Post';
import { useSocket } from './hooks/useSocket';
import FormPost from './components/FormPost';
import { useFetchStore } from './store/fetchStore';

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
  const { fetchs, push, shift, setIsFetching, isFetching } = useFetchStore(
    (state) => ({
      ...state,
    })
  );
  useSocket({ fetchPush: push });
  const fetchPost = async () => {
    await getPosts();
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const goFetchs = async (fetchEvent: string) => {
    try {
      switch (fetchEvent) {
        case 'fetchPost':
          await fetchPost();
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    if (!isFetching && fetchs.length > 0) {
      setIsFetching(true);
      const key = fetchs[0];
      shift();
      goFetchs(key);
    }
  }, [fetchs, isFetching]);

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
