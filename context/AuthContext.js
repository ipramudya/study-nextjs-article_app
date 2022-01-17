import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { NEXT_URL } from "@/config/urls";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // force run whenever app has cookie
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const resetError = () => {
    setError(null);
  };

  //    Register user
  const register = async (user) => {
    try {
      //  fetch next.js local api
      const { data, status } = await axios.post(`${NEXT_URL}/api/register`, user);
      //  response handler
      if (status === 200) {
        setUser(data.user);
        router.push("/");
      } else {
        setError(data.message);
        setError(null);
        return;
      }
    } catch (error) {
      const { data } = error.response;
      setError(data.message);
    }
  };

  //    Login user
  const login = async ({ email: identifier, password }) => {
    try {
      //  fetch next.js local api
      const { data, status } = await axios.post(`${NEXT_URL}/api/login`, {
        identifier,
        password,
      });
      //  response handler
      if (status === 200) {
        setUser(data.user);
        router.push("/");
      } else {
        setError(data.message);
        setError(null);
        return;
      }
    } catch (error) {
      const { data } = error.response;
      setError(data.message);
    }
  };

  //    Logout user
  const logout = async () => {
    const { statusText } = await axios.post(`${NEXT_URL}/api/logout`);
    if (statusText === "OK") {
      setUser(null);
      router.push("/");
    }
  };

  //    Check if user is logged in
  const checkUserLoggedIn = async () => {
    try {
      const { data, statusText } = await axios.get(`${NEXT_URL}/api/user`);
      if (statusText === "OK") {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout, checkUserLoggedIn, resetError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
