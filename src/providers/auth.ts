import { AuthProvider } from "@refinedev/core";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, { username, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        return {
          success: true,
          redirectTo: "/",
        };
      }
      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem("token");
    return {
      success: true,
      redirectTo: "/landing",
    };
  },
  check: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      redirectTo: "/landing",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`${apiUrl}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        return null;
      }
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
