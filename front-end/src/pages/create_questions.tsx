import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth_context";
import { Link } from "react-router-dom";
import Header from "../components/header";

const Create_questions = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quizId = queryParams.get("quizId");
  const quizName = queryParams.get("name");

  const [question, setQuestion] = useState<string>("");
  const [answerOne, setAnswerOne] = useState<string>("");
  const [answerTwo, setAnswerTwo] = useState<string>("");
  const [answerThree, setAnswerThree] = useState<string>("");
  const [answerFour, setAnswerFour] = useState<string>("");

  const [correctAnswer, setCorrectAnswer] = useState<number>(1);

  const [emptyStyle, setEmptyStyle] = useState<string>("text-white");

  const addQuestion = async () => {
    if (
      question === "" ||
      answerOne === "" ||
      answerTwo === "" ||
      answerThree === "" ||
      answerFour === ""
    ) {
      setEmptyStyle("text-red-600");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizId,
        question,
        answerOne,
        answerTwo,
        answerThree,
        answerFour,
        correctAnswer,
      }),
    };

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/trivia_user/add_question`,
      options
    );

    const json = await response.json();

    if (response.ok) {
      console.log("new question", json);
      setQuestion("");
      setAnswerOne("");
      setAnswerTwo("");
      setAnswerThree("");
      setAnswerFour("");
      setCorrectAnswer(1);
    }
  };

  return (
    <>
      <Header></Header>
      <p>Add questions to {quizName}</p>
      <p className={emptyStyle}>Please fill in all inputs</p>
      <div>
        <p>Question</p>
        <input
          type="text"
          className="border-2 border-black"
          value={question}
          onChange={(event) => {
            setQuestion(event.target.value);
          }}
        />
      </div>
      <div>
        <div>
          <p>Answer One</p>
          <input
            type="text"
            className="border-2 border-black"
            value={answerOne}
            onChange={(event) => {
              setAnswerOne(event.target.value);
            }}
          />
        </div>
        <div>
          <p>Answer Two</p>
          <input
            type="text"
            className="border-2 border-black"
            value={answerTwo}
            onChange={(event) => {
              setAnswerTwo(event.target.value);
            }}
          />
        </div>
        <div>
          <p>Answer Three</p>
          <input
            type="text"
            className="border-2 border-black"
            value={answerThree}
            onChange={(event) => {
              setAnswerThree(event.target.value);
            }}
          />
        </div>
        <div>
          <p>Answer Four</p>
          <input
            type="text"
            className="border-2 border-black"
            value={answerFour}
            onChange={(event) => {
              setAnswerFour(event.target.value);
            }}
          />
        </div>
        <div>
          <p>Correct Answer</p>
          <select
            value={correctAnswer}
            onChange={(event) => {
              setCorrectAnswer(Number(event.target.value));
            }}
          >
            <option value="1">Answer One</option>
            <option value="2">Answer Two</option>
            <option value="3">Answer Three</option>
            <option value="4">Answer Four</option>
          </select>
        </div>
      </div>
      <button
        className="text-lg text-white font-bold bg-fuchsia-800 rounded p-2.5 hover:bg-fuchsia-300 hover:text-black"
        style={{
          boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
        }}
        onClick={() => {
          addQuestion();
        }}
      >
        Add question
      </button>

      <button
        className="text-lg text-white font-bold bg-fuchsia-800 rounded p-2.5 hover:bg-fuchsia-300 hover:text-black"
        style={{
          boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Link to={`/create_game/?quizId=${quizId}`}>
          <p>Host Live</p>
        </Link>
      </button>
    </>
  );
};

export default Create_questions;
