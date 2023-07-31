import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import { editTodoSchema } from "@/utils/schemas";

const EditTodoForm = ({ todo, toggleEditTodo, setAllTodos }) => {
  const { data: session } = useSession();
  const [todoMessage, settodoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let options;
  let res;
  let data;
  let message;

  const formik = useFormik({
    initialValues: { ...todo },
    enableReinitialize: true,
    validationSchema: editTodoSchema,
    onSubmit: async (values, actions) => {
      //update task
      options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.jwt}`,
        },
        body: JSON.stringify({
          task: values.task,
          status: values.status,
        }),
      };

      res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${todo._id}`,
        options
      );

      data = await res.json();

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

        setErrorMessage("");

        toggleEditTodo();
      } else if (!res.ok) {
        message = data.message;

        setErrorMessage(message); // set the new error message

        settodoMessage("");
      }
    },
  });
  return (
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
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center items-center md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 p-5"
      >
        <div className="w-full md:w-3/4">
          <input
            type="text"
            id="task"
            name="task"
            value={formik.values.task}
            className={`w-full border rounded-md p-2 bg-slate-50 focus:outline-none ${
              formik.errors.task && formik.touched.task
                ? "border-red-700"
                : null
            }`}
            required
            {...formik.getFieldProps("task")}
          />
          {formik.errors.task && formik.touched.task ? (
            <span className="text-red-700 text-sm">{formik.errors.task}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full md:w-48">
          <select
            id="status"
            name="status"
            required
            className="w-full bg-gradient-to-r border border-blue-500 text-blue-500 text-lg py-2 px-4 rounded-md"
            {...formik.getFieldProps("status")}
          >
            <option value="">Status</option>
            <option value="pending" label="pending">
              Pending
            </option>
            <option value="ongoing" label="ongoing">
              Ongoing
            </option>
            <option value="completed" label="completed">
              Completed
            </option>
          </select>
        </div>
        <div className="w-full md:w-48">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full bg-gradient-to-r from-blue-500 to-indigo-500 border hover:bg-white border-blue-500 text-gray-50 text-lg py-2 px-4 rounded-md ${
              formik.isSubmitting ? "opacity-50" : null
            }`}
          >
            Update
          </button>
        </div>
        <div className="w-full md:w-48">
          <button
            type="button"
            onClick={() => toggleEditTodo()}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 border hover:bg-white border-blue-500 text-gray-50 text-lg py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default EditTodoForm;
