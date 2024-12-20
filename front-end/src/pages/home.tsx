import { useContext, useEffect, useState } from "react";
import Quiz_display from "../components/quiz_display";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Quiz_display_second from "../components/quiz_display_second";
import { AuthContext } from "../context/auth_context";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState<Array>();
  const [userQuizzes, setUserQuizzes] = useState<Array>();
  const [APIquizzes, setAPIquizzes] = useState<Array>();

  const [quizzes_played, setQuizzesPlayed] = useState<number>();
  const [quizzes_won, setQuizzesWon] = useState<number>();
  const [questions_answered, setQuestionsAnswered] = useState<number>();
  const [questions_correct, setQuestionsCorrect] = useState<number>();

  const API_questions = [
    {
      category: null,
      createdAt: "2024-12-09T11:27:08.582Z",
      id: "general",
      img_url: null,
      name: "General knowledge Two",
      userId: "2ec46baa-c8ff-40de-8c06-8a3299f595a2",
    },
    {
      category: null,
      createdAt: "2024-12-09T11:27:08.582Z",
      id: "animals",
      img_url: null,
      name: "Animals Two",
      userId: "2ec46baa-c8ff-40de-8c06-8a3299f595a2",
    },
    {
      category: null,
      createdAt: "2024-12-09T11:27:08.582Z",
      id: "geography",
      img_url: null,
      name: "Geography",
      userId: "2ec46baa-c8ff-40de-8c06-8a3299f595a2",
    },
  ];

  useEffect(() => {
    const setStats = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/trivia_user/show_stats`,
        options
      );
      const json = await response.json();
      if (response.ok) {
        setQuizzesPlayed(json.no_quiz_completed);
        setQuizzesWon(json.no_quiz_won);
        setQuestionsAnswered(json.questions_completed);
        setQuestionsCorrect(json.questions_correct);
      }
    };
    if (user) {
      setStats();
    }
  }, [user]);

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

    fetchQuizzes();
    if (user) {
      fetchUserQuizzes();
    }
  }, [user]);

  return (
    <>
      <Header></Header>
      <div className="grid grid-cols-[minmax(70px,_1fr)_14fr]  ">
        <Sidebar></Sidebar>
        <div className="grid grid-cols-[1fr_2fr]">
          <div className="flex flex-col p-4 pt-6 gap-6">
            <div className="bg-slate-200 p-5 flex flex-col  rounded-md drop-shadow-xl">
              <p className="text-xl font-bold mb-2">{user && user.email}</p>
              <div className="flex flex-col gap-1">
                <p>Quizzes played: {quizzes_played}</p>
                <p>Quizzes won: {quizzes_won}</p>
                <p>Questions answered: {questions_answered}</p>
                <p>Questions correct: {questions_correct}</p>
              </div>
            </div>
            <div className="bg-slate-200 p-5 flex flex-col rounded-md drop-shadow-xl">
              <p className="text-xl font-bold">My recent quizzes</p>
              {userQuizzes && userQuizzes.length === 0 && (
                <p className="mt-5">No quizzes yet</p>
              )}
              <div className="p-5 pl-0 bg-slate-200 grid grid-cols-1 gap-6">
                {userQuizzes &&
                  userQuizzes.map((quiz, index) => {
                    return (
                      <>
                        {index < 3 && (
                          <div>
                            <Quiz_display_second
                              quiz={quiz}
                              key={quiz.id}
                            ></Quiz_display_second>
                          </div>
                        )}
                      </>
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
              {API_questions &&
                API_questions.map((quiz) => {
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
