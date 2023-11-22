import React, { useEffect, useState } from "react";
import useFlashMessage from "../../hooks/useFlashMessage";
import Message from "./Message";
import styles from "./Message.module.css";
import bus from "../../utils/bus";

const NoAuth = () => {
  let message = "Acesso negado.";

  //   const { setFlashMessage } = useFlashMessage();

  //   setType("error");

  //   setFlashMessage(message, type);

  return <div className={`${styles.message} ${styles.error}`}>{message}</div>;
};

export default NoAuth;
