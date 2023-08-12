import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { resetPasswordSchema } from "@/utils/schemas";

const ResetPassword = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const token = router?.query?.token;
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token,
          password: values.password,
        }),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/reset`,
        options
      );
      const data = await res.json();

      // If no error and we have user data, return it
      if (res?.ok && data) {
        setMessage(data?.msg);
        formik.resetForm();
      } else if (!res?.ok) {
        setMessage(res?.error);
      }
      return message;
    },
  });

  const verifyRegisterdUser = async () => {};

  verifyRegisterdUser();

  return (
    <section className="flex flex-col justify-evenly bg-gray-100">
      <div className="container m-auto p-5 w-10/12 md:w-10/12 lg:w-1/4 bg-slate-50 rounded-md drop-shadow-md">
        <h1 className="text-gray-700 text-3xl text-center font-bold my-5">
          Reset Password
        </h1>
        {formik?.errors?.general ? (
          <span className="text-red-700 text-sm">{formik.errors.general}</span>
        ) : (
          <></>
        )}
        {message !== "" ? (
          <span className="text-green-600 text-sm">{message}</span>
        ) : (
          <></>
        )}
        <form className="my-5" onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 font-semibold mb-2 text-sm"
            >
              Enter Neww Password (8 to 20 characters long)
            </label>
            <div className="relative">
              <input
                type={`${show.password ? "text" : "password"}`}
                id="password"
                name="password"
                className={`border rounded-md p-2 w-full bg-slate-50 focus:outline-none ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-700"
                    : null
                }`}
                required
                {...formik.getFieldProps("password")}
              />
              <span
                className={`icon text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2 ${
                  show.password ? "text-blue-800" : "text-gray-400"
                } hover:text-blue-800 cursor-pointer`}
                onClick={() => setShow({ ...show, password: !show.password })}
              >
                {show.password ? "Hide" : "Show"}
              </span>
            </div>

            {formik.errors.password && formik.touched.password ? (
              <span className="text-red-700 text-sm">
                {formik.errors.password}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-600 font-semibold mb-2 text-sm"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={`${show.confirmPassword ? "text" : "password"}`}
                id="confirmPassword"
                name="confirmPassword"
                className={`border rounded-md p-2 w-full bg-slate-50 focus:outline-none ${
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                    ? "border-red-700"
                    : null
                }`}
                {...formik.getFieldProps("confirmPassword")}
              />
              <span
                className={`icon text-gray-400  absolute top-1/2 right-3 transform -translate-y-1/2 ${
                  show.confirmPassword ? "text-blue-800" : "text-gray-400"
                } hover:text-blue-800 cursor-pointer`}
                onClick={() =>
                  setShow({ ...show, confirmPassword: !show.confirmPassword })
                }
              >
                {show.confirmPassword ? "Hide" : "Show"}
              </span>
            </div>

            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <span className="text-red-700 text-sm">
                {formik.errors.confirmPassword}
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
      </div>
    </section>
  );
};

export default ResetPassword;
