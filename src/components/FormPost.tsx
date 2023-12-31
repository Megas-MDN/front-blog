import { useEffect, useState } from 'react';
import { useUsersStore } from '../store/usersStore';
import { usePostsStore } from '../store/postsStore';
import { IPost } from '../App';

const initPost: IPost = {
  title: '',
  content: '',
  user_id: '',
};
function FormPost() {
  const { getUsers, users } = useUsersStore((state) => ({
    users: state.users,
    getUsers: state.getUsers,
  }));
  const { createPost } = usePostsStore((state) => ({
    createPost: state.createPost,
  }));
  const [form, setForm] = useState({
    ...initPost,
  });

  useEffect(() => {
    getUsers();
  }, []);

  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.title || !form.content || !form.user_id) {
      return setForm({
        ...initPost,
        title: 'All fields are required',
      });
    }
    createPost(form);
    setForm({ ...initPost });
  };
  return (
    <div className='flex flex-col p-2 bb gap-1 items-center max-w-[300px] mx-auto'>
      <h1 className='text-xl'>Create Post</h1>
      <hr />
      <form onSubmit={handleSumit} className='flex flex-col gap-2 w-full p-1'>
        <label className='flex justify-between w-full'>
          Title
          <input
            type='text'
            name='title'
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </label>
        <label className='flex justify-between w-full'>
          Content
          <input
            type='text'
            name='content'
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </label>
        <label className='flex justify-between w-full'>
          Author
          <select
            className=' w-[66%]'
            name='author'
            value={form.user_id}
            onChange={(e) => setForm({ ...form, user_id: e.target.value })}
          >
            <option value=''>Select</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        <button type='submit' className='border border-zinc-600'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormPost;
