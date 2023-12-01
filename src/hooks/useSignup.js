import useSingupStore from '@/store/useSignupStore';
import { shallow } from 'zustand/shallow';

export const useSignup = () => {
  const { companyName, changeCompanyName } = useSingupStore(
    (state) => ({
      companyName: state.companyName,
      changeCompanyName: state.changeCompanyName,
    }),
    shallow
  );

  return { companyName, changeCompanyName };
};
