import useSingupStore from '@/store/useSignupStore';
import { shallow } from 'zustand/shallow';

export const useSignup = () => {
  return useSingupStore((storeObj) => ({ ...storeObj }), shallow);
};
