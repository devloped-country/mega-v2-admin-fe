import axios from 'axios';
import { create } from 'zustand';

const initialState = {
  users: [],
  loading: false,
  error: '',
};

const useUsersStore = create((set) => ({
  users: initialState.users,
  loading: initialState.loading,
  error: initialState.error,

  fetchUsers: async () => {
    set((state) => ({ ...state, loading: true }));
    try {
      const res = await axios('https://jsonplaceholder.typicode.com/users');
      const users = await res.json();
      set((state) => ({ ...state, error: '', users }));
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    } finally {
      set((state) => ({
        ...state,
        loading: false,
      }));
    }
  },
}));

export default useUsersStore;
