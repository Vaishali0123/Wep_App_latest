"use client";
import Cookies from "js-cookie";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../utils/helpers";

interface AuthContextType {
  data: UserData | null;
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

// Provide a default value for the context
const defaultAuthContext: AuthContextType = {
  data: null,
  auth: false,
  setAuth: () => {},
  setData: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export interface UserData {
  dp: string;
  fullname: string;
  username: string;
  id: string;
  isverified: boolean;
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  const sendTokenAndVerify = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        return;
      }

      setLoading(true);
      const res = await axios.get(`${API}/verifytoken`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setAuth(true);
        setData(res.data.data);
      } else {
        // deleteToken();
      }
    } catch (error: unknown) {
      console.log(error);
      // if (error?.response?.data?.error === "Token expired") {
      //   toast.error(error.response.data.message);
      // }
      toast.error("Token expired. Please login again.");
      setLoading(false);
      //   deleteToken();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sendTokenAndVerify();
  }, []);

  const contextValue = useMemo(
    () => ({
      data,
      auth,
      setAuth,
      setData,
    }),
    [data, auth]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? (
        <div className="w-full h-screen flex font-semibold justify-center items-center">
          Loading....
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
