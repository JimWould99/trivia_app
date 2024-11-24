import { useEffect, useState } from "react";
import Quiz_display from "../context/quiz_display";

const Home = () => {
  const [quizzes, setQuizzes] = useState<Array>();
  useEffect(() => {
    const fetchQuizzes = async () => {
      const options = {
        method: "GET",
      };
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/show_quizzes`,
        options
      );
      const json = await response.json();
      console.log(json.quizzes);
      if (response.ok) {
        setQuizzes(json.quizzes);
      }
    };
    fetchQuizzes();
  }, []);
  return (
    <>
      <div className="p-5 bg-slate-200 grid grid-cols-2 gap-6 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3">
        {quizzes &&
          quizzes.map((quiz) => {
            return <Quiz_display quiz={quiz} key={quiz.id}></Quiz_display>;
          })}
      </div>
    </>
  );
};

export default Home;
