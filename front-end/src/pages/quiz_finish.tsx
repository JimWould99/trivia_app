import Header from "../components/header";
import { Link } from "react-router-dom";
const Quiz_finish = ({ correctQuestions, questions, quizId, setEnd }) => {
  return (
    <>
      <Header></Header>
      <p className="text-4xl font-bold flex justify-center m-8">
        Thanks for playing!
      </p>
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-2xl">Results:</p>
        <p>{correctQuestions} correct</p>
        <p>{questions.length - correctQuestions} incorrect</p>
        <div className="flex gap-2 mt-3">
          <Link to="/">
            <button className="text-md text-white font-bold bg-fuchsia-800 rounded p-2.5 hover:bg-white hover:text-black">
              Home Page
            </button>
          </Link>
          <Link to={`/quiz/?quizId=${quizId}`}>
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="text-md text-white font-bold bg-fuchsia-800 rounded p-2.5 hover:bg-white hover:text-black"
            >
              Play again
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Quiz_finish;
