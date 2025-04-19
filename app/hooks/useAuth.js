"use client";

import { useEffect, useState } from 'react';

const useAuth = () => {
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser  = async () => {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser (userData);
      }
      setLoading(false);
    };

    fetchUser ();
  }, []);

  return { user, loading };
};

export default useAuth;