import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { fetchCourses } from '../redux/coursesSlice';

export const useCourses = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(state => state.courses);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  return {
    courses: data,
    status,
    error,
    retry: () => dispatch(fetchCourses()),
  };
};

// --- hooks/useRedux.ts ---