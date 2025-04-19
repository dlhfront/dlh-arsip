import { useEffect, useState } from 'react';

const useCurrentUser  = () => {
  const [currentUser , setCurrentUser ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser  = async () => {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setCurrentUser (userData);
      } else {
        setCurrentUser (null);
      }
      setLoading(false);
    };

    fetchCurrentUser ();
  }, []);

  return { currentUser , loading };
};

export default useCurrentUser ;