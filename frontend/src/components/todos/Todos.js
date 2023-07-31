import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Paginate from "@/components/common/Paginate";
import AddTodo from "./AddTodo";
import TodoFilter from "./TodoFilter";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import useToggleState from "../../hooks/useToggleState";
import EditTodoForm from "./EditTodoForm";

const Todos = ({
  todos,
  pages,
  keyword,
  pageNumber,
  startRange,
  endRange,
  count,
}) => {
  const [allTodos, setAllTodos] = useState(todos || []);
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    setAllTodos(todos || []);
  }, [todos]);

  const { data: session, update } = useSession();

  function TodoForm({ todo }) {
    const [todoMessage, settodoMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isEditing, setToggle] = useToggleState(false);

    let options;
    let res;
    let data;
    let message;

    const handleDelete = async () => {
      //delete task
      options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.jwt}`,
        },
      };

      res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${todo._id}`,
        options
      );

      data = await res.json();

      if (res.ok && data) {
        setAllTodos(allTodos.filter((tdo) => tdo._id !== todo._id));

        setErrorMessage("");
      } else if (!res.ok) {
        message = data.message;

        setErrorMessage(message); // set the new error message

        settodoMessage("");
      }
    };

    return (
      <React.Fragment>
        <li className="list-none border border-l-transparent border-r-transparent">
          {isEditing === true ? (
            <EditTodoForm
              todo={todo}
              toggleEditTodo={setToggle}
              setAllTodos={setAllTodos}
            />
          ) : (
            <>
              {errorMessage ? (
                <span className="text-red-700 text-sm">{errorMessage}</span>
              ) : (
                <></>
              )}
              {todoMessage !== "" ? (
                <span className="text-green-600 text-sm">{todoMessage}</span>
              ) : (
                <></>
              )}
              <div className="flex flex-col items-center md:flex-row space-x-0 md:space-x-5 p-5">
                <span
                  className={`${
                    todo.status === "completed" ? "line-through" : null
                  } w-3/4 text-center md:text-left ml-0 md:ml-5`}
                >
                  {todo.task}
                </span>
                <div className="flex rounded z-10">
                  <button
                    type="button"
                    onClick={setToggle}
                    className="flex items-center cursor-pointer px-4 py-1 hover:bg-slate-300 rounded"
                  >
                    <AiOutlineEdit className="m-2" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center cursor-pointer px-4 py-1 hover:bg-slate-300 rounded"
                  >
                    <AiOutlineDelete className="m-2" />
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </li>
      </React.Fragment>
    );
  }

  return (
    <>
      <section className="flex justify-center items-center my-10">
        <div className="bg-white h-max rounded-md drop-shadow-md ">
          {/* <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-[#90CAF9] p-5 mb-5">
            <h1 className="text-slate-700 text-3xl font-bold mb-2 md:mb-0">
              All Todos
            </h1>
            <Link href={"/register"}>
              <div className="flex flex-row items-center border border-slate-700 text-slate-700 text-lg px-2 py-1 rounded  focus-within:bg-slate-800 outline-none">
                <AiOutlinePlus color="#334155" size={18} className="mr-2" />
                <span>Add Todo</span>
              </div>
            </Link>
          </div> */}
          <AddTodo setAllTodos={setAllTodos} />

          {allTodos.length > 0 ? (
            <TodoFilter
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              setAllTodos={setAllTodos}
            />
          ) : null}

          <ul>
            {selectedStatus === "all"
              ? allTodos?.map((todo, index) => (
                  <TodoForm todo={todo} key={index} />
                ))
              : allTodos
                  ?.filter((todo) => todo.status === selectedStatus)
                  .map((todo, index) => <TodoForm todo={todo} key={index} />)}
          </ul>
          <Paginate
            page={pageNumber}
            pages={pages}
            keyword={keyword ? keyword : ""}
          />
        </div>
      </section>
    </>
  );
};

export default Todos;
