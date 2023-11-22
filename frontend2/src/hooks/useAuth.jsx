import { useEffect, useState } from "react";
import api from "../utils/api";
import {
  Navigate,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import React from "react";
import useFlashMessage from "./useFlashMessage";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  const register = async (user) => {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";

    try {
      const data = await api
        .post("/teacher/register", user)
        .then((response) => {
          return response.data;
        });

      await authUser(data);
    } catch (error) {
      msgText = error.response.data.errors[0];
      msgType = "error";
    }

    console.log(user.token);
    setFlashMessage(msgText, msgType);
  };

  const login = async (user) => {
    let msgText = "Login realizado com sucesso!";
    let msgType = "success";

    try {
      const data = await api.post("/teacher/login", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      msgText = error.response.data.errors[0];
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  };

  const authUser = async (data) => {
    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));
  };

  const logout = () => {
    let msgText = "Logout realizado com sucesso!";
    let msgType = "success";

    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.authorization = undefined;

    setFlashMessage(msgText, msgType);
  };

  return { authenticated, register, logout, login };
};

export default useAuth;
