import { useState, useEffect } from "react";
//import { socket } from "../service/socket.tsx";
import { io } from "socket.io-client";

const Enter_room = () => {
  const [socket, setSocket] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [roomDisplay, setRoomDisplay] = useState<string>("");

  const [players, setPlayers] = useState<Array>();

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_REACT_APP_URL);

    setSocket(newSocket);

    newSocket.on("connect", (message) => {
      console.log("connected", newSocket.id);
    });
    // newSocket.emit("join-room", newRoom);

    // recieve message from server
    newSocket.on("join-confirmation-joiner", (sentValue) => {
      console.log(`sent value: ${sentValue}`);
      setRoomDisplay(sentValue);
    });

    newSocket.on("join-confirmation", (ids) => {
      console.log(`ids: ${ids}`);
      setPlayers(ids);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const enterRoom = () => {
    socket.emit("join-room", room);
  };

  return (
    <>
      <p>Enter room</p>
      <p>Joined room {roomDisplay}</p>
      {players &&
        players.map((player) => {
          return <p>{player}</p>;
        })}
      <input
        type="number"
        className="border-2 border-black"
        value={room}
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={() => enterRoom()}>Submit room</button>
    </>
  );
};

export default Enter_room;
