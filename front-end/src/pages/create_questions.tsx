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

  const [addedQuestions, setAddedQuestions] = useState<Array>([]);

  const [correctAnswer, setCorrectAnswer] = useState<number>(1);

  const [emptyStyle, setEmptyStyle] = useState<string>("text-orange-100");

  const addQuestion = async () => {
    if (
      question === "" ||
      answerOne === "" ||
      answerTwo === "" ||
      answerThree === "" ||
      answerFour === ""
    ) {
      setEmptyStyle("text-black");
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
      setAddedQuestions([...addedQuestions, question]);
      setQuestion("");
      setAnswerOne("");
      setAnswerTwo("");
      setAnswerThree("");
      setAnswerFour("");
      setEmptyStyle("text-orange-100");
      setCorrectAnswer(1);
    }
  };

  return (
    <>
      <Header></Header>
      <div className="grid grid-cols-[2fr_1fr] h-[90vh]">
        <div className="bg-orange-100 flex flex-col items-center pt-8 px-6 w-full gap-4">
          <p className="text-lg">
            Add questions to <span className="text-2xl">{quizName}</span>
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p>Question</p>
              <input
                type="text"
                className="rounded-md border border-black h-10 pl-4"
                value={question}
                onChange={(event) => {
                  setQuestion(event.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-x-20 gap-y-6">
              <div className="flex flex-col gap-1">
                <p>Answer One</p>
                <input
                  type="text"
                  className="rounded-md border border-black h-10 pl-4"
                  value={answerOne}
                  onChange={(event) => {
                    setAnswerOne(event.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Answer Two</p>
                <input
                  type="text"
                  className="rounded-md border border-black h-10 pl-4"
                  value={answerTwo}
                  onChange={(event) => {
                    setAnswerTwo(event.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Answer Three</p>
                <input
                  type="text"
                  className="rounded-md border border-black h-10 pl-4"
                  value={answerThree}
                  onChange={(event) => {
                    setAnswerThree(event.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Answer Four</p>
                <input
                  type="text"
                  className="rounded-md border border-black h-10 pl-4"
                  value={answerFour}
                  onChange={(event) => {
                    setAnswerFour(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <p>Correct Answer: </p>
            <select
              value={correctAnswer}
              onChange={(event) => {
                setCorrectAnswer(Number(event.target.value));
              }}
              className="border border-black h-10 rounded-md"
            >
              <option value="1">Answer One</option>
              <option value="2">Answer Two</option>
              <option value="3">Answer Three</option>
              <option value="4">Answer Four</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
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
            <p className={emptyStyle}>Please fill in all inputs</p>
          </div>
        </div>
        <div className="flex flex-col items-start pt-8 px-6 gap-6 bg-blue-100">
          <div className="flex flex-col gap-2">
            <p className="text-lg">Added Questions</p>
            <div className="grid grid-cols-[1fr] gap-2">
              {addedQuestions.map((question, index) => {
                return (
                  <p>
                    Question {index + 1}: {"  "}
                    {question}
                  </p>
                );
              })}
            </div>
          </div>
          {addedQuestions.length > 0 && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default Create_questions;
