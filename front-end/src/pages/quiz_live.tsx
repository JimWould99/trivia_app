import { useState, useEffect } from "react";
//import { socket } from "../service/socket.tsx";
import { io } from "socket.io-client";
const Quiz_live = () => {
  const [socket, setSocket] = useState<any>();
  const [message, setMessage] = useState<string>("");

  const [displayMessage, setDisplayMessage] = useState<string>("");

  const [connectionId, setConnectionId] = useState<string>("");

  const [players, setPlayers] = useState<Array>();

  const [room, setRoom] = useState<number>();

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_REACT_APP_URL);

    setSocket(newSocket);

    newSocket.on("connect", (message) => {
      setConnectionId(newSocket.id);
    });

    const getRoomNumb = () => {
      return Math.floor(Math.random() * (999999 - 100000) + 100000);
    };

    const newRoom = getRoomNumb();

    setRoom(newRoom);

    newSocket.emit("create-room", newRoom);

    // recieve message from server
    newSocket.on("confirm-create-room", (sentValue) => {
      console.log("received");
      setDisplayMessage(sentValue);
    });

    newSocket.on("join-confirmation", (ids) => {
      console.log("join confirm");
      console.log(`ids: ${ids}`);
      setPlayers(ids);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <>
      <p>test of sockets</p>
      <p>Connection to socket: {connectionId}</p>
      <p>Room number: {room}</p>
      <p>{displayMessage}</p>

      <p>
        Players:
        {players &&
          players.map((player) => {
            return <p>{player}</p>;
          })}
      </p>
    </>
  );
};

export default Quiz_live;
