import React from "react";
import TodoCard from "./TodoCard";

const TodoContainer = () => {
  return (
    <div>
      <div>
        <button>Add Todo</button>
        <button>Filter</button>
      </div>
      <div className="bg-red-500 w-full h-full rounded-xl p-5 space-y-3">
        <TodoCard></TodoCard>
        <TodoCard></TodoCard>
        <TodoCard></TodoCard>
        {/* <div className="bg-white p-5 flex justify-center items-center text-2xl font-semibold">
          <p>There is no Task Pending</p>
        </div> */}
      </div>
    </div>
  );
};

export default TodoContainer;
