// app/hooks/useCurrentUser.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
        const userData = await response.json();
        setCurrentUser(userData);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return { currentUser, loading };
};

export default useCurrentUser;