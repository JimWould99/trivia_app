import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { AuthContext } from "../context/auth_context";

const Create_quiz_page = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [quizName, setQuizName] = useState<string>("");

  const [emptyMsg, setEmptyMsg] = useState<string>("text-white");

  const createQuiz = async () => {
    if (!user) {
      return;
    }
    if (quizName === "") {
      setEmptyMsg("");
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
      <div>
        <div>
          <p>Quiz Name</p>
          <input
            type="text"
            value={quizName}
            onChange={(event) => {
              setQuizName(event.target.value);
            }}
            className="border-2 border-black"
          />
          <p className={emptyMsg}>Please type a name</p>
          <button onClick={() => createQuiz()}>Create</button>
        </div>
      </div>
    </>
  );
};

export default Create_quiz_page;
