import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useFormik } from "formik";
import { requestResetValidate } from "@/utils/requestResetValidate";

const RequestPasswordReset = () => {
  const { data: session, update: sessionUpdate } = useSession();
  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: requestResetValidate,
    onSubmit: async (values, actions) => {
      console.log(values);
      //update profile
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
        }),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/request`,
        options
      );

      const data = await res.json();

      if (res.ok && data) {
        // triggering a session update, updated the value server-side.
        // All `useSession().data` references will be updated.
        // sessionUpdate(data);
        setMessage(data.msg);
        formik.resetForm();
      } else if (!res.ok) {
        const message = data.message;
        actions.setFieldError("general", message);
      }
    },
  });
  return (
    <>
      <section className="flex h-screen bg-gray-100">
        <div className="container m-auto p-5 w-10/12 md:w-10/12 lg:w-1/4 bg-slate-50 rounded-md drop-shadow-md">
          <h1 className="text-gray-700 text-3xl font-bold">Forgot password?</h1>
          <p className="text-gray-500 text-base my-2">
            Reset password in two quick steps
          </p>
          {formik?.errors?.general ? (
            <span className="text-red-700 text-sm">
              {formik.errors.general}
            </span>
          ) : (
            <></>
          )}
          {message !== "" ? (
            <span className="text-green-600 text-sm">{message}</span>
          ) : (
            <></>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4 relative">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email:
              </label>

              <input
                type="email"
                id="email"
                name="email"
                className="border rounded-md p-2 w-full bg-slate-50 focus:outline-none"
                placeholder="Enter your email"
                required
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email ? (
                <span className="text-red-700 text-sm">
                  {formik.errors.email}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col gap-5 mt-5">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 border hover:bg-white border-blue-500 text-gray-50 text-lg py-2 px-4 rounded-md"
              >
                Reset
              </button>
            </div>
          </form>
          <div className="text-center mt-5">
            <Link href={"/login"} className="text-gray-400">
              Back
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
export default RequestPasswordReset;
