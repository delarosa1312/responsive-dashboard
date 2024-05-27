// ** React Imports
import { createContext, useEffect, useState, FC, ReactNode, useRef } from "react";

// ** Next Import
import { useRouter } from "next/router";

interface AuthContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// ** Defaults
const defaultProvider: AuthContextProps = {
  loading: true,
  setLoading: () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultProvider);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      if (typeof window !== "undefined" && router.pathname !== "/dashboard") {
        await router.replace(`/dashboard`);
      }
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = {
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
