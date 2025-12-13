import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { users, type User } from "../data/user-mock.data";

type authStatus = "checking" | "auth" | "not-auth";

interface UserContextProps {
  // state
  authStatus: authStatus;
  user: User | null;
  isAuth: boolean;
  // action
  login: (userId: number) => boolean;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<authStatus>("checking");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      console.log(`User not found ${userId}`);
      setUser(null);
      setAuthStatus("not-auth");
      return false;
    }

    setUser(user);
    setAuthStatus("auth");
    localStorage.setItem("userId", userId.toString());
    return true;
  };

  const handleLogout = () => {
    setAuthStatus("not-auth");
    setUser(null);
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      handleLogin(+storedUserId);
      return;
    }
    handleLogout();
  }, []);

  return (
    <UserContext
      value={{
        authStatus: authStatus,
        isAuth: authStatus === "auth",
        user: user,

        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext>
  );
};
