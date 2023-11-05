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
    try {
      const data = api.post("/teacher/register", user).then((response) => {
        return response.data;
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { register };
};

export default useAuth;
