import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Quiz_display from "../components/quiz_display";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth_context";

const My_quizzes = () => {
  const { user } = useContext(AuthContext);

  const [userQuizzes, setUserQuizzes] = useState<Array>();

  useEffect(() => {
    const fetchUserQuizzes = async () => {
      console.log("started,", user);
      let userId = user.id;

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      };

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/trivia_user/show_user_quizzes`,
        options
      );

      const json = await response.json();
      console.log("user quizzes", json.quizzes);

      if (response.ok) {
        setUserQuizzes(json.quizzes);
      }
    };
    if (user) {
      fetchUserQuizzes();
    }
  }, [user]);

  return (
    <>
      <Header></Header>
      <div className="h-full grid grid-cols-[minmax(70px,_1fr)_14fr]  ">
        <Sidebar></Sidebar>
        <div className="p-5 bg-slate-200 grid grid-cols-2 gap-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2  rounded-md drop-shadow-xl">
          {userQuizzes &&
            userQuizzes.map((quiz) => {
              return (
                <div>
                  <Quiz_display quiz={quiz} key={quiz.id}></Quiz_display>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default My_quizzes;
