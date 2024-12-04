import { createContext, useEffect, useState, ReactNode, Children } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState<any>("");

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_REACT_APP_URL);

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
