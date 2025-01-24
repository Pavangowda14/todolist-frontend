import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/todo/api/user/verify-token`
        );
        setUser(response.data.user)
      } catch (error) {
        console.log(error);
      }finally {
        setLoading(false);// Verification complete
      }
    };
    verifyUser();
  }, []);

  const handleLogin = async (values) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/todo/api/user/login`,
        values
      );
      if (res.data) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSingup = async (values) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/todo/api/user/register`,
        values
      );
      if (res.data) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, handleLogin,loading, handleSingup }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
