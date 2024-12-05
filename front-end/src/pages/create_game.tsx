import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/socket";
//import { socket } from "../service/socket.tsx";
import { io } from "socket.io-client";
import { Link, useLocation } from "react-router-dom";
const Create_game = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quizId = queryParams.get("quizId");

  const { socket } = useContext(SocketContext);

  const [displayMessage, setDisplayMessage] = useState<string>("");

  const [connectionId, setConnectionId] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [players, setPlayers] = useState<Array>();

  const [room, setRoom] = useState<number>();

  useEffect(() => {
    /*socket.on("connect", (message) => {
      setConnectionId(newSocket.id);
    });*/

    // recieve message from server
    if (socket) {
      socket.on("confirm-create-room", (sentValue) => {
        console.log("received");
        setDisplayMessage(sentValue);
      });

      socket.on("join-confirmation", (objects) => {
        const playersArray = [];
        objects.forEach((player) => {
          playersArray.push(player.name);
        });
        setPlayers(playersArray);
      });
    }

    /*return () => {
      newSocket.disconnect();
    };*/
  }, [socket]);

  const createRoom = () => {
    const getRoomNumb = () => {
      return Math.floor(Math.random() * (999999 - 100000) + 100000);
    };

    const newRoom = getRoomNumb();

    setRoom(newRoom);

    socket.emit("create-room", newRoom, username);
  };

  return (
    <>
      <p>test of sockets</p>
      <p>Connection to socket: {connectionId}</p>
      <p>Room number: {room}</p>
      <p>{displayMessage}</p>
      <div className="flex gap-3">
        <p>Username</p>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
          className="border-2 border-black"
        />
        <button className="border-2 border-black" onClick={() => createRoom()}>
          Add username
        </button>
      </div>
      <p>
        Players:
        {players &&
          players.map((player) => {
            if (player === username) {
              return <p>Me</p>;
            } else {
              return <p>{player}</p>;
            }
          })}
      </p>
      <Link
        to="/quiz_live"
        state={{ quizId: quizId, room: room, username: username, user: "host" }}
      >
        <button className="border-2 border-black">Start Game</button>
      </Link>
    </>
  );
};

export default Create_game;
