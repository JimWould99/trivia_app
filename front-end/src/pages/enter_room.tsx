import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";
//import { socket } from "../service/socket.tsx";
import { io } from "socket.io-client";

const Enter_room = () => {
  const { socket, setSocket } = useContext(SocketContext);
  const [room, setRoom] = useState<number>();
  const [roomDisplay, setRoomDisplay] = useState<string>("");

  const navigate = useNavigate();
  const [connectionId, setConnectionId] = useState<string>("");

  //const [roomObject, setRoomObject] = useState<Array>();
  const [players, setPlayers] = useState<Array>();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_REACT_APP_URL);

    setSocket(newSocket);

    newSocket.on("connect", (message) => {
      setConnectionId(newSocket.id);
    });
    // newSocket.emit("join-room", newRoom);

    // recieve message from server
    newSocket.on("join-confirmation-joiner", (sentValue) => {
      console.log(`sent value: ${sentValue}`);
      setRoomDisplay(sentValue);
    });

    newSocket.on("join-confirmation", (objects) => {
      const playersArray = [];
      objects.forEach((player) => {
        playersArray.push(player.name);
      });
      setPlayers(playersArray);
    });

    newSocket.on("question", (question) => {
      console.log("received question");
      navigate("quiz_client", { state: { question } });
    });

    /*return () => {
      newSocket.disconnect();
    };*/
  }, []);

  const enterRoom = () => {
    socket.emit("join-room", room, username);
  };

  return (
    <>
      <p>Enter room</p>
      <p>Joined room: {roomDisplay}</p>
      {players &&
        players.map((player) => {
          if (player === username) {
            return <p>Me</p>;
          } else {
            return <p>{player}</p>;
          }
        })}
      <div>
        <p>Room number</p>
        <input
          type="number"
          className="border-2 border-black"
          value={room}
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
      </div>
      <div>
        <p>Username:</p>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
          className="border-2 border-black"
        />
      </div>
      <button onClick={() => enterRoom()}>Join game</button>
    </>
  );
};

export default Enter_room;
