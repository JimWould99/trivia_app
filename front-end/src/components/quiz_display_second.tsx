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

const Quiz_display_second: React.FC<QuizDisplayProps> = ({ quiz }) => {
  return (
    <>
      <div className="shadow-4xl bg-white grid grid-cols-[1fr_2fr] h-[100px] drop-shadow-xl rounded-md">
        <img
          className="object-cover overflow-hidden"
          src="images/question.jpg"
          alt="Shoes"
        />
        <div className=" flex flex-col justify-around px-4 pb-2">
          <p className="text-lg">{quiz.name}</p>
          <div className="flex flex-col gap-1">
            <p className="">Example Quiz</p>
            <button
              className="w-full p-1 bg-cyan-800 hover:bg-cyan-700 rounded-lg shadow-xl font-bold text-white"
              style={{
                boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Link to={`/quiz/?quizId=${quiz.id}`}>
                <p>Play Now</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz_display_second;
