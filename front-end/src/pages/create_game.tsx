import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";
import Header from "../components/header";
//import { socket } from "../service/socket.tsx";
import { io } from "socket.io-client";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth_context";

const Create_game = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quizId = queryParams.get("quizId");

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  const [displayMessage, setDisplayMessage] =
    useState<string>("text-orange-200");
  const [username, setUsername] = useState<string>("");
  const [players, setPlayers] = useState<Array>();
  const [room, setRoom] = useState<number>();
  const [usernameMsg, setUsernameMsg] = useState("text-white");

  useEffect(() => {}, [user]);

  useEffect(() => {
    if (user) {
      setUsername(user.email);
    }

    createRoom();

    if (socket) {
      socket.on("confirm-create-room", (roomNum, name) => {
        console.log("received");
        setRoom(roomNum);
        setPlayers([name]);
      });

      socket.on("join-confirmation", (objects) => {
        const playersArray = [];
        objects.forEach((player) => {
          playersArray.push(player.name);
        });
        setPlayers(playersArray);
      });
    }
  }, [socket, username]);

  const createRoom = () => {
    console.log("create room");
    if (username === "") {
      setUsernameMsg("");
      return;
    }
    const getRoomNumb = () => {
      return Math.floor(Math.random() * (999999 - 100000) + 100000);
    };

    const newRoom = getRoomNumb();

    socket.emit("create-room", newRoom, username);
  };

  const startGame = () => {
    if (players === undefined || players.length < 2) {
      setDisplayMessage("color-orange-200");
      return;
    }
    navigate("/quiz_live", {
      state: { quizId: quizId, room: room, username: username, user: "host" },
    });
  };
  return (
    <>
      <Header></Header>
      <div className="grid sm:grid-cols-2 ">
        <div className="bg-orange-200 pb-8 m">
          <div className="h-10"></div>
          <div className="flex flex-col pl-20 gap-y-16 ">
            <div className="flex gap-10 items-center invisible">
              <div>
                <p>Username</p>
                <div>
                  <input
                    type="text"
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                    value={username}
                    className="border-2 border-black rounded p-1 pl-3"
                  />
                </div>
                <p className={usernameMsg}>Please type a username</p>
              </div>
              <button
                className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-1.5 px-6 rounded"
                onClick={() => createRoom()}
              >
                Add username
              </button>
            </div>
            <div>
              <button
                onClick={() => startGame()}
                className="w-[50%] text-2xl bg-fuchsia-800 hover:bg-fuchsia-600 text-white font-bold py-2 px-6 rounded"
              >
                Start Game
              </button>
              <p className={displayMessage}>Must have at least two players</p>
            </div>
            <div className="text-2xl flex gap-6 items-center">
              Room number: <p className="text-4xl">{room}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center bg-sky-200 h-[86vh]">
          <div className="h-10 bg-sky-200 w-full"></div>
          <p className="text-2xl mb-4">Players</p>
          <div className="flex flex-wrap w-[80%] gap-10">
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

export default Create_game;
