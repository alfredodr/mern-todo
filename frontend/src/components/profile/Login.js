import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { loginSchema } from "@/utils/schemas";
import { useRouter } from "next/router";

const Login = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      const status = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/todos",
      });

      if (status.ok) router.push(status.url);

      if (!status.ok) {
        actions.setFieldError(
          "general",
          "Invalid email or password, please try again"
        );
      }
    },
  });

  const handleGoogleSignIn = async () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };

  const handleGithubSignIn = async () => {
    signIn("github", {
      callbackUrl: "/todos",
    });
  };

  return (
    <>
      <section className="flex flex-col justify-evenly h-screen bg-gray-100 px-4">
        <div className="container m-auto p-5 max-w-md bg-slate-50 rounded-md drop-shadow-md">
          <h1 className="text-gray-700 text-3xl text-center font-bold my-5">
            Login
          </h1>
          {formik?.errors?.general ? (
            <span className="text-red-700 text-sm">
              {formik.errors.general}
            </span>
          ) : (
            <></>
          )}
          <form className="my-5" onSubmit={formik.handleSubmit}>
            <div className="mb-4 relative">
              <label
                htmlFor="email"
                className="block text-gray-600 font-semibold mb-2 text-sm"
              >
                Email:
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
                Password:
              </label>
              <div className="relative">
                <input
                  type={`${show ? "text" : "password"}`}
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
                    show ? "text-blue-800" : "text-gray-400"
                  } hover:text-blue-800 cursor-pointer`}
                  onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"}
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
            <Link
              href={"/request_password_reset"}
              className="text-blue-700 hover:underline"
            >
              Forgot password?
            </Link>
            <div className="flex flex-col gap-5 mt-5">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 border hover:bg-white border-blue-500 text-gray-50 text-lg py-2 px-4 rounded-md"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex flex-col gap-5 mt-5">
            <span className="flex flex-row items-center">
              <hr className="text-gray-500 w-1/2" />
              <p className="text-gray-500 mx-5">or</p>
              <hr className="text-gray-500 w-1/2" />
            </span>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="border text-lg py-2 px-4 rounded-md flex flex-row items-center justify-center"
            >
              Login with Google
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 48 48"
                className="ml-2"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              onClick={handleGithubSignIn}
              className="border text-lg py-2 px-4 rounded-md flex flex-row items-center justify-center"
            >
              Login with Github
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 30 30"
                className="ml-2"
              >
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
              </svg>
            </button>
          </div>
          <p className="text-center text-gray-400">
            don&apos;t have an account yet?{" "}
            <Link href={"/register"} className="text-blue-700">
              Register
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};
export default Login;
