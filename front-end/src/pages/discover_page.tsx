import { useContext, useEffect, useState } from "react";
import Quiz_display from "../components/quiz_display";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
const Discover_page = () => {
  const questions = [
    {
      category: null,
      createdAt: "2024-12-09T11:27:08.582Z",
      id: "general",
      img_url: null,
      name: "General knowledge two",
      userId: "2ec46baa-c8ff-40de-8c06-8a3299f595a2",
    },
    {
      category: null,
      createdAt: "2024-12-09T11:27:08.582Z",
      id: "animals",
      img_url: null,
      name: "Animals",
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
    {
      category: null,
      createdAt: "2024-12-09T11:27:08.582Z",
      id: "politics",
      img_url: null,
      name: "Politics",
      userId: "2ec46baa-c8ff-40de-8c06-8a3299f595a2",
    },
    {
      category: null,
      createdAt: "2024-12-09T11:27:08.582Z",
      id: "history",
      img_url: null,
      name: "History",
      userId: "2ec46baa-c8ff-40de-8c06-8a3299f595a2",
    },
  ];

  return (
    <>
      <Header></Header>
      <div className="grid grid-cols-[minmax(70px,_1fr)_14fr]  ">
        <Sidebar></Sidebar>
        <div className="h-1/2 p-5 bg-slate-200 grid grid-cols-2 gap-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2  rounded-md drop-shadow-xl">
          {questions.map((quiz) => {
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
export default Discover_page;
