const { createContext, useState, useContext } = require("react");

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
    console.log(identifier, password);
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
