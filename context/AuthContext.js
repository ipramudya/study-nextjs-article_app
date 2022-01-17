import { createContext, useState, useContext } from "react";
import { NEXT_URL } from "@/config/urls";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [user, setUser] = useState({ x: "" });
  const [error, setError] = useState(null);

  //    Register user
  const register = async (user) => {
    console.log(user);
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
    console.log("logout");
  };

  //    Check if user is logged in
  const checkUserLoggedIn = async () => {
    console.log("check");
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout, checkUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
