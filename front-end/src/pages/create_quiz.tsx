import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { AuthContext } from "../context/auth_context";

const Create_quiz_page = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [quizName, setQuizName] = useState<string>("");

  const [emptyMsg, setEmptyMsg] = useState<string>("text-fuchsia-800");

  const createQuiz = async () => {
    if (!user) {
      return;
    }
    if (quizName === "") {
      setEmptyMsg("text-white");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: quizName }),
    };

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/trivia_user/add_quiz`,
      options
    );

    const json = await response.json();

    if (response.ok) {
      console.log("json", json.new_quiz.name);
      navigate(
        `/create_questions?quizId=${json.new_quiz.id}&name=${json.new_quiz.name}`
      );
    }
  };

  return (
    <>
      <Header></Header>
      <div className="bg-orange-200 h-[90vh] flex justify-center items-center">
        <div className="flex flex-col gap-12 bg-fuchsia-800 py-10 px-6 rounded-md">
          <p className="text-2xl mb-2 text-white">Quiz Name</p>
          <div>
            <input
              type="text"
              value={quizName}
              onChange={(event) => {
                setQuizName(event.target.value);
              }}
              className="text-lg rounded-md border border-black h-10 pl-4"
            />
            <p className={emptyMsg}>Please type a name</p>
          </div>
          <button
            className="text-2xl text-white font-bold bg-blue-800 rounded p-1.5 hover:bg-blue-300 hover:text-black"
            style={{
              boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
            }}
            onClick={() => createQuiz()}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default Create_quiz_page;
