import PocketBase from 'pocketbase';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const PocketbaseContext = createContext({});

export const PocketProvider = ({ children }: { children: React.ReactNode }) => {
  const pb = useMemo(() => new PocketBase('http://127.0.0.1:8090'), []);

  const [token, setToken] = useState(pb.authStore.token);
  const [user, setUser] = useState(pb.authStore.model);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token);
      setUser(model);
    });
  }, [pb.authStore]);

  const register = useCallback(async (email: string, password: string) => {
    return await pb.collection('users').create({ email, password, passwordConfirm: password });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    return await pb.collection('users').authWithPassword(email, password);
  }, []);

  const logout = useCallback(async () => {
    return await pb.authStore.clear();
  }, []);

  // Refresh tokens

  return (
    <PocketbaseContext.Provider value={{ register, login, logout, user, token, pb }}>
      {children}
    </PocketbaseContext.Provider>
  );
};

export const usePocketbase = () => useContext(PocketbaseContext);
