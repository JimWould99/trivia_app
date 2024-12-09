import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";
//import { socket } from "../service/socket.tsx";
import { io } from "socket.io-client";
import Header from "../components/header";
import { AuthContext } from "../context/auth_context";

const Enter_room = () => {
  const { user } = useContext(AuthContext);
  const { socket, setSocket } = useContext(SocketContext);
  const [room, setRoom] = useState<number>();
  const [roomDisplay, setRoomDisplay] = useState<string>("");

  const navigate = useNavigate();

  const [players, setPlayers] = useState<Array>();
  const [username, setUsername] = useState<string>("");

  const [roomMessage, setRoomMessage] = useState<string>("text-white");

  const [userMessage, setUserMessage] = useState<string>("text-white");

  useEffect(() => {
    if (user) {
      setUsername(user.email);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("join-confirmation-joiner", (sentValue) => {
        console.log(`sent value: ${sentValue}`);
        setRoomMessage("text-white");
        setUserMessage("text-white");
        setRoomDisplay(sentValue);
      });

      socket.on("join-confirmation", (objects) => {
        console.log("join room", room);
        const playersArray = [];
        objects.forEach((player) => {
          playersArray.push(player.name);
        });
        setPlayers(playersArray);
      });

      socket.on("room-not-found", (room) => {
        setRoomMessage("");
      });

      socket.on("join_game", (question) => {
        console.log("room enter page", room);
        navigate("/quiz_live", {
          state: { question, username, room, user: "client" },
        });
      });
    }
  }, [socket, room, username]);

  const enterRoom = () => {
    if (username === "") {
      setUserMessage("text-black");
      return;
    }
    socket.emit("join-room", room, username);
  };

  return (
    <>
      <Header></Header>
      <div className="grid grid-cols-2 ">
        <div className="flex flex-col pl-20 gap-y-10">
          <div>
            <div className="h-10"></div>
            <p>Room number</p>
            <input
              type="number"
              className="border-2 border-black rounded p-1 pl-3"
              value={room}
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <p className={roomMessage}>Room not found</p>
          </div>
          <div>
            <p>Username:</p>
            <input
              type="text"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
              className="border-2 border-black rounded p-1 pl-3"
            />
            <p className={userMessage}>Please type a username</p>
          </div>
          <button
            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-1.5 px-6 rounded w-[50%]"
            onClick={() => enterRoom()}
          >
            Join game
          </button>
          {roomDisplay && <p className="text-3xl">Joined room {roomDisplay}</p>}
        </div>
        <div className="flex flex-col items-center bg-slate-200 h-[86vh]">
          <div className="h-10 bg-slate-200 w-full"></div>
          <p className="text-2xl mb-4">Players</p>
          <div className="grid grid-cols-3 w-[50%] ">
            {players &&
              players.map((player) => {
                if (player === username) {
                  return <p className="text-lg">Me</p>;
                } else {
                  return <p className="text-lg">{player}</p>;
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Enter_room;
