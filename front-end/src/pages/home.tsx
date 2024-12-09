import { useContext, useEffect, useState } from "react";
import Quiz_display from "../components/quiz_display";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Quiz_display_second from "../components/quiz_display_second";
import { AuthContext } from "../context/auth_context";

const Home = () => {
  const { user } = useContext(AuthContext);
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
      <Header></Header>
      <div className="grid grid-cols-[minmax(70px,_1fr)_14fr]  ">
        <Sidebar></Sidebar>
        <div className="grid grid-cols-[1fr_2fr]">
          <div className="flex flex-col p-4 pt-6 gap-6">
            <div className="bg-slate-200 p-5 flex flex-col  rounded-md drop-shadow-xl">
              <p className="text-xl mb-2">{user && user.email}</p>
              <div className="flex flex-col gap-1">
                <p>Quizzes played: (number)</p>
                <p>Quizzes won: (number) and (percent)</p>
                <p>Questions answered: (number)</p>
                <p>Questions correct: (number) and (percent)</p>
              </div>
            </div>
            <div className="bg-slate-200 p-5 flex flex-col rounded-md drop-shadow-xl">
              <p>My quizzes</p>
              <div className="p-5 pl-0 bg-slate-200 grid grid-cols-1 gap-6">
                {quizzes &&
                  quizzes.map((quiz) => {
                    return (
                      <div>
                        <Quiz_display_second
                          quiz={quiz}
                          key={quiz.id}
                        ></Quiz_display_second>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 p-6">
            <div className="p-5 bg-slate-200 grid grid-cols-2 gap-6 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2  rounded-md drop-shadow-xl">
              {quizzes &&
                quizzes.map((quiz) => {
                  return (
                    <div>
                      <Quiz_display quiz={quiz} key={quiz.id}></Quiz_display>
                    </div>
                  );
                })}
            </div>
            <div className="p-5 bg-slate-200 grid grid-cols-2 gap-6 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2  rounded-md drop-shadow-xl">
              {quizzes &&
                quizzes.map((quiz) => {
                  return (
                    <Quiz_display quiz={quiz} key={quiz.id}></Quiz_display>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
