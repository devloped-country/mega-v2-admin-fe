import useSocketStore from '@/store/useSocketStore.js';
import { shallow } from 'zustand/shallow';

export const useNewSocket = () => {
  return useSocketStore((storeObj) => ({ ...storeObj }), shallow);
};
