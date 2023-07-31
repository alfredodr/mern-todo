import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { AiOutlineClear } from "react-icons/ai";

const TodoFilter = ({ selectedStatus, setSelectedStatus, setAllTodos }) => {
  const { data: session } = useSession();
  const [todoMessage, settodoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelection = (selectedStatus) => {
    setSelectedStatus(selectedStatus);
  };

  const getTextClass = (isItemSelected) => {
    return `cursor-pointer ${
      isItemSelected ? "text-blue-400" : "text-slate-950"
    } text-lg`;
  };

  const handleClearAll = async () => {
    //delete all tasks for the user logged in
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/deleteAll`,
      options
    );

    const data = await res.json();

    if (res.ok && data) {
      setAllTodos([]);

      setErrorMessage("");
    } else if (!res.ok) {
      const message = data.message;

      setErrorMessage(message); // set the new error message

      settodoMessage("");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center mx-5 md:mx-10 py-5 space-y-5 md:space-y-0 md:space-x-20">
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
        <div className="flex flex-row space-x-5 md:space-x-28">
          <span
            onClick={() => handleSelection("all")}
            className={getTextClass(selectedStatus === "all")}
          >
            All
          </span>
          <span
            onClick={() => handleSelection("pending")}
            className={getTextClass(selectedStatus === "pending")}
          >
            Pending
          </span>
          <span
            onClick={() => handleSelection("ongoing")}
            className={getTextClass(selectedStatus === "ongoing")}
          >
            Ongoing
          </span>
          <span
            onClick={() => handleSelection("completed")}
            className={getTextClass(selectedStatus === "completed")}
          >
            Completed
          </span>
        </div>

        <div className="w-full ">
          <button
            type="submit"
            onClick={handleClearAll}
            className="flex flex-row justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500 w-full  border border-blue-500 text-gray-50 text-lg py-2 px-4 rounded-md transition-colors"
          >
            <AiOutlineClear color="#ffffff" size={18} className="mr-2" />
            <span>Clear All</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoFilter;
