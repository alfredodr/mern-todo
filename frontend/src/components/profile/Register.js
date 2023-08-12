import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { userSchema } from "@/utils/schemas";
import { useRouter } from "next/router";

const Register = () => {
  const [show, setShow] = useState({ password: false, confirmPassword: false });
  const [message, setMessage] = useState("");
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values, actions) => {
      //register user
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
        options
      );

      const data = await res.json();

      if (res.ok && data) {
        setMessage(data.msg);
        formik.resetForm();
      } else if (!res.ok) {
        const message = data.message;
        actions.setFieldError("registrationError", message);
      }
    },
  });

  return (
    <>
      <section className="bg-gray-100">
        <div className="container m-auto p-5 w-10/12 md:w-10/12 lg:w-1/4 bg-slate-50 rounded-md drop-shadow-md">
          <h1 className="text-gray-700 text-3xl text-center font-bold">
            Register
          </h1>
          {formik?.errors?.registrationError ? (
            <span className="text-red-700 text-sm">
              {formik.errors.registrationError}
            </span>
          ) : (
            <></>
          )}
          {message !== "" ? (
            <span className="text-green-600 text-sm">{message}</span>
          ) : (
            <></>
          )}
          <form
            className="my-5"
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <div className="mb-4 ">
              <label
                htmlFor="name"
                className="block text-gray-600 font-semibold mb-2 text-sm"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`border rounded-md p-2 w-full bg-slate-50 focus:outline-none ${
                  formik.errors.name && formik.touched.name
                    ? "border-red-700"
                    : null
                }`}
                required
                {...formik.getFieldProps("name")}
              />
              {formik.errors.name && formik.touched.name ? (
                <span className="text-red-700 text-sm">
                  {formik.errors.name}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-4 ">
              <label
                htmlFor="email"
                className="block text-gray-600 font-semibold mb-2 text-sm"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                className={`border rounded-md p-2 w-full bg-slate-50 focus:outline-none ${
                  formik.errors.email && formik.touched.email
                    ? "border-red-700"
                    : null
                }`}
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
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 font-semibold mb-2 text-sm"
              >
                Password (8 to 20 characters long)
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
                  className={`icon text-gray-400 absolute top-[49%] right-3 transform -translate-y-[49%] ${
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
                Confirm Password
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
                  className={`icon text-gray-400 absolute top-[63%] right-3 transform -translate-y-[63%] ${
                    show.confirmPassword ? "text-blue-800" : "text-gray-400"
                  } hover:text-blue-800 cursor-pointer`}
                  onClick={() =>
                    setShow({ ...show, confirmPassword: !show.confirmPassword })
                  }
                >
                  {show.confirmPassword ? "Hide" : "Show"}
                </span>
              </div>

              {formik.errors.confirmPassword &&
              formik.touched.confirmPassword ? (
                <span className="text-red-700 text-sm">
                  {formik.errors.confirmPassword}
                </span>
              ) : (
                <></>
              )}
            </div>
            <p className="text-gray-400 text-sm">
              By clicking Register, you agree to the Todo Tasker{" "}
              <Link
                href={"/user-agreement"}
                className="text-blue-700 hover:underline"
              >
                User Agreement
              </Link>
              ,{" "}
              <Link
                href={"/privacy-policy"}
                className="text-blue-700 hover:underline"
              >
                Privacy Policy
              </Link>
              ,{" "}
              <Link
                href={"/terms-of-service"}
                className="text-blue-700 hover:underline"
              >
                Terms of Service
              </Link>
              , and{" "}
              <Link
                href={"/cookie-policy"}
                className="text-blue-700 hover:underline"
              >
                Cookie Policy
              </Link>
            </p>
            <div className="flex flex-col gap-5 mt-5">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`bg-gradient-to-r from-blue-500 to-indigo-500 border hover:bg-white border-blue-500 text-gray-50 text-lg py-2 px-4 rounded-md ${
                  formik.isSubmitting ? "opacity-50" : null
                }`}
              >
                Register
              </button>
            </div>
          </form>
          <p className="text-center text-gray-400">
            Already on Todo Tasker?{" "}
            <Link href={"/login"} className="text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};
export default Register;
