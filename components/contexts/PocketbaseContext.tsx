import PocketBase, { RecordModel, RecordAuthResponse, AuthModel } from 'pocketbase';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type PocketbaseContextType = {
  register?: (email: string, password: string) => Promise<RecordModel>;
  login?: (email: string, password: string) => Promise<RecordAuthResponse<RecordModel>>;
  logout?: () => Promise<void>;
  user?: AuthModel;
  token?: string;
  pb?: PocketBase;
};
export const PocketbaseContext = createContext<PocketbaseContextType>({});

export const PocketProvider = ({ children }: { children: React.ReactNode }) => {
  const pb = useMemo(() => new PocketBase('http://192.168.1.168:8090'), []);

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
