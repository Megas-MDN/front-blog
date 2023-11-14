import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import service, { IErrorFetch } from '../services/fetchService';
import { IPost } from '../App';
export interface IInitPOstStore {
  posts: IPost[];
}
const initState: IInitPOstStore = {
  posts: [],
};

export interface IPostsStore extends IInitPOstStore {
  setPosts: (posts: IPost[]) => void;
  getPosts: () => Promise<void>;
  createPost: (post: IPost) => Promise<void>;
}

export const usePostsStore = create<IPostsStore>(
  // persist<IPostsStore>(
  (set) => ({
    ...initState,
    setPosts: (posts: IPost[]) => set({ posts }),
    getPosts: async () => {
      const posts: IPost[] | IErrorFetch = await service.getApi({
        url: '/posts/all',
      });
      if (Array.isArray(posts)) {
        return set({ posts });
      }
    },
    createPost: async (post: IPost) => {
      const newPost: IPost | IErrorFetch = await service.postApi({
        url: '/posts/create',
        data: post,
        auth: null,
      });
      if (newPost) {
        // return set((state) => ({
        //   posts: [...state.posts, post],
        // }));
      }
    },
  })
  // ),
  // {
  //   name: 'posts-store',
  // }
);
