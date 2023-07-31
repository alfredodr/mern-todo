import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import { addTodoSchema } from "@/utils/schemas";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTextLeft } from "react-icons/bs";

const AddTodo = ({ setAllTodos }) => {
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState("");

  const formikAddTodo = useFormik({
    initialValues: {
      newTask: "",
    },
    validationSchema: addTodoSchema,
    onSubmit: async (values, actions) => {
      //add todo
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.jwt}`,
        },
        body: JSON.stringify({
          task: values.newTask,
        }),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/create`,
        options
      );

      const data = await res.json();

      if (res.ok && data) {
        //Get All Users
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.jwt}`,
          },
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/all`,
          options
        );
        const newTodos = await res.json();

        const { todos } = newTodos;

        setAllTodos(todos);

        setErrorMessage(""); // clear out any previous error messages
        formikAddTodo.resetForm();
      } else if (!res.ok) {
        const message = data.message;
        setErrorMessage(message);
      }
    },
  });

  return (
    <div className="p-5 md:p-10">
      {errorMessage ? (
        <span className="text-red-700 text-sm md:text-base">
          {errorMessage}
        </span>
      ) : null}
      <div>
        {formikAddTodo.errors.newTask && formikAddTodo.touched.newTask ? (
          <span className="text-red-700 text-sm md:text-base">
            {formikAddTodo.errors.newTask}
          </span>
        ) : null}
      </div>
      <form
        className="flex flex-col space-y-5 md:space-y-0 md:flex-row items-start md:items-center md:space-x-5"
        onSubmit={formikAddTodo.handleSubmit}
      >
        <div className="relative w-full md:w-11/12">
          <BsTextLeft
            size={20}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-700"
          />
          <input
            type="text"
            id="newTask"
            placeholder="Add a new task"
            className={`border rounded-md pl-10 py-2 bg-slate-50 w-full focus:outline-none ${
              formikAddTodo.errors.newTask && formikAddTodo.touched.newTask
                ? "border-red-700"
                : "border-gray-300"
            }`}
            required
            {...formikAddTodo.getFieldProps("newTask")}
          />
        </div>
        <div className="w-full md:w-48">
          <button
            type="submit"
            disabled={formikAddTodo.isSubmitting}
            className={`flex flex-row justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500 w-full borde border-blue-500 text-gray-50 text-lg py-2 px-4 rounded-md transition-colors ${
              formikAddTodo.isSubmitting ? "opacity-50" : null
            }`}
          >
            <AiOutlinePlus color="#ffffff" size={18} className="mr-2" />
            <span>Add Task</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
