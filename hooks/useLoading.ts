import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const useLoading = (...slices: (keyof RootState)[]) => {
  return useSelector((state: RootState) => 
    slices.some(slice => state[slice]?.loading || false)
  );
};