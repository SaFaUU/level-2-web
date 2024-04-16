import TodoCard from "./TodoCard";
import AddTodoModal from "./AddTodoModal";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";
import { useState } from "react";

const TodoContainer = () => {
  // From Local State
  // const { todos } = useAppSelector((state) => state.todos);

  const [priority, setPriority] = useState("");
  // From Server
  const { data: todos, isLoading, isError } = useGetTodosQuery(priority);
  console.log(todos);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal></AddTodoModal>
        <TodoFilter priority={priority} setPriority={setPriority}></TodoFilter>
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl  p-[5px]">
        <div className="bg-white  p-5 w-full h-full  rounded-lg space-y-3">
          {todos?.data?.map((todo) => (
            <TodoCard key={todo.id} {...todo}></TodoCard>
          ))}
        </div>
        {/* <div className="bg-white p-5 flex justify-center items-center text-2xl font-semibold">
          <p>There is no Task Pending</p>
        </div> */}
      </div>
    </div>
  );
};

export default TodoContainer;
