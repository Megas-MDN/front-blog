import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import service, { IErrorFetch } from '../services/fetchService';
import { IUser } from '../App';
export interface IInitUsersStore {
  users: IUser[];
}
const initState: IInitUsersStore = {
  users: [],
};

export interface IUsersStore extends IInitUsersStore {
  setUsers: (posts: IUser[]) => void;
  getUsers: () => Promise<void>;
}

export const useUsersStore = create<IUsersStore>(
  // persist<IUsersStore>(
  (set) => ({
    ...initState,
    setUsers: (users: IUser[]) => set({ users }),
    getUsers: async () => {
      const users: IUser[] | IErrorFetch = await service.getApi({
        url: '/users/all',
      });
      if (Array.isArray(users)) {
        return set({ users });
      }
    },
  })
  // ),
  // {
  //   name: 'user-store',
  // }
);
