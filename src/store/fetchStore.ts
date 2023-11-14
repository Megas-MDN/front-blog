import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

export interface IInitFetchStore {
  fetchs: string[];
  isFetching: boolean;
}
const initState: IInitFetchStore = {
  fetchs: [],
  isFetching: false,
};

export interface IFetchStore extends IInitFetchStore {
  push: (fetch: string) => void;
  shift: () => void;
  setIsFetching: (isFetching: boolean) => void;
}

export const useFetchStore = create<IFetchStore>(
  // persist<IUsersStore>(
  (set) => ({
    ...initState,
    push: (fetch: string) => {
      set((state) => ({
        fetchs: [...state.fetchs, fetch],
      }));
    },
    shift: () => {
      set((state) => ({
        fetchs: state.fetchs.slice(1),
      }));
    },
    setIsFetching: (isFetching: boolean) => {
      set({ isFetching });
    },
  })
  // ),
  // {
  //   name: 'user-store',
  // }
);
