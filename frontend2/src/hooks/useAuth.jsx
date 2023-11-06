import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

import React from "react";
import useFlashMessage from "./useFlashMessage";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();

  //   useEffect(() => {
  //     const token = LocalStorage.getItem("token");

  //     if (token) {
  //       api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;
  //     }

  //     setAuthenticated(true);
  //   });

  const register = async (user) => {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";

    try {
      const data = await api
        .post("/teacher/register", user)
        .then((response) => {
          return response.data;
        });

      console.log(data);
    } catch (error) {
      msgText = error.response.data.errors[0];
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  };

  return { register };
};

export default useAuth;
