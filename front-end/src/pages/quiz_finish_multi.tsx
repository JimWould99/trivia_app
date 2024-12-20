import { Link, useLocation } from "react-router-dom";
import Header from "../components/header";
import { AuthContext } from "../context/auth_context";
import { useContext } from "react";

const Quiz_finish_online = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { ranking, quizId, questionsCorrect, no_questions, username } =
    location.state;
  console.log("ranking", ranking);
  const sortedUsers = [];
  for (let user in ranking) {
    sortedUsers.push([user, ranking[user]]);
  }
  sortedUsers.sort((a, b) => b[1] - a[1]);

  console.log("user details", questionsCorrect, no_questions);

  const updateUserStats = async () => {
    if (!user) {
      return;
    }
    let quizWon;
    let no_answered;
    let no_correct;
    if (sortedUsers[0] === username) {
      quizWon = 1;
    } else {
      quizWon = 0;
    }
    no_answered = no_questions;
    no_correct = questionsCorrect;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quizWon, no_answered, no_correct }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/trivia_user/update_user`,
      options
    );
    const json = await response.json();

    if (response.ok) {
      console.log("updated", json);
    }
  };
  updateUserStats();
  return (
    <>
      <Header></Header>
      <div className="flex flex-col gap-4 items-center mt-12">
        <p className="text-4xl font-bold">Leaderboard</p>
        <div className="flex flex-col gap-4">
          {sortedUsers.map((user, index) => {
            return (
              <div>
                <p className="font-bold text-3xl inline">{index + 1}.</p>{" "}
                <span className="inline font-bold text-3xl">{user[0]} </span>
                <span className="inline text-2xl">
                  {Math.floor(user[1])} points
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Link to="/">
            <button className="text-md text-white font-bold bg-fuchsia-800 rounded p-2.5 hover:bg-white hover:text-black">
              Home Page
            </button>
          </Link>
          <Link to={`/create_game/?quizId=${quizId}`}>
            <button className="text-md text-white font-bold bg-fuchsia-800 rounded p-2.5 hover:bg-white hover:text-black">
              Play again
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Quiz_finish_online;
