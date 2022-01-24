import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/urls";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // force run whenever app has cookie
  useEffect(() => checkUserLoggedIn(), [user]);

  const resetError = () => {
    setError(null);
  };

  /**  Login user  **/
  const login = async ({ email: identifier, password }) => {
    /* Fetch next local API */
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    /* Extract json data */
    const nextData = await res.json();

    // Everything goes OK
    if (res.ok) {
      setUser(nextData.user);
      router.push("/");
    }
    // Handle next.js error response
    else {
      setError(nextData.message);
      setError(null);
    }
  };

  /**  Logout user  **/
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  /**  Register user  **/
  const register = async (user) => {
    console.log(user.email);

    /* Fetch next local API */
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    /* Extract json data */
    const nextData = await res.json();

    // Everything goes OK
    if (res.ok) {
      setUser(nextData.user);
      router.push("/account/dashboard");
    }
    // Handle next.js error response
    else {
      setError(nextData.message);
      setError(null);
      return;
    }
  };

  /**  Check if user is logged in  **/
  const checkUserLoggedIn = async () => {
    /* Fetch next local API */
    const res = await fetch(`${NEXT_URL}/api/user`);

    /* Extract json data */
    const nextData = await res.json();

    // Everything goes OK
    if (res.ok) {
      setUser(nextData);
    }
    // Handle next.js error response
    else {
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
