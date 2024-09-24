import { useEffect } from 'react';

export default () => {
  useEffect(() => {
    window.location.href = 'https://boolti.in';
  }, []);
  return null;
};
