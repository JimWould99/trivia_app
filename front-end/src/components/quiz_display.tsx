import React from "react";
import { useEffect, useState } from "react";
import Quiz_Question from "../pages/quiz_question";
import { Link } from "react-router-dom";

interface Quiz {
  category: null | string;
  createdAt: string;
  id: string;
  img_url: null | string;
  name: string;
  userId: string;
}

interface QuizDisplayProps {
  quiz: Quiz;
}

const Quiz_display: React.FC<QuizDisplayProps> = ({ quiz }) => {
  return (
    <>
      <div className="drop-shadow-xl bg-white flex flex-col h-full rounded-md">
        <div className="h-1/2 overflow-hidden rounded-md">
          <img
            className="object-cover h-full"
            src="images/question.jpg"
            alt="Shoes"
          />
        </div>
        <div className="h-1/2 flex flex-col justify-around px-3">
          <p className="text-lg">{quiz.name}</p>
          <div className="flex flex-col gap-1">
            <p className="">Example Quiz</p>
            <div className="flex gap-2 w-full justify-between">
              <button
                className="w-1/2 p-1 bg-cyan-800 hover:bg-cyan-700 rounded-lg shadow-xl font-bold text-white"
                style={{
                  boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Link to={`/quiz/?quizId=${quiz.id}`}>
                  <p>Play Solo</p>
                </Link>
              </button>
              <button
                className="w-1/2 p-1 bg-fuchsia-800 hover:bg-fuchsia-700 rounded-lg shadow-xl font-bold text-white"
                style={{
                  boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Link to={`/create_game/?quizId=${quiz.id}`}>
                  <p>Host Live</p>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz_display;
