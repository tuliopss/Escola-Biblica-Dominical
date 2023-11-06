import bus from "../../utils/bus";
import styles from "./Message.module.css";
import { useState, useEffect } from "react";

const Message = () => {
  const [visibilty, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    bus.on("flash", ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setVisibility(false);
      }, 3000);
    });
  }, []);
  return (
    visibilty && (
      <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
  );
};

export default Message;
