import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import { adminSchema } from "@/utils/schemas";
import Link from "next/link";
import Paginate from "@/components/common/Paginate";
import { AiOutlinePlus } from "react-icons/ai";

const Admin = ({
  users,
  pages,
  keyword,
  pageNumber,
  startRange,
  endRange,
  count,
}) => {
  const [allUsers, setAllUsers] = useState(users || []);

  const { data: session, update } = useSession();

  useEffect(() => {
    setAllUsers(users || []);
  }, [users]);

  function UserForm({ user }) {
    const [updateUser, setUpdateUser] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    let options;
    let res;
    let data;
    let message;

    const formik = useFormik({
      initialValues: { ...user },
      enableReinitialize: true,
      validationSchema: adminSchema,
      onSubmit: async (values, actions) => {
        const action = values.actions; // get the "actions" field from the form values

        switch (action) {
          case "update":
            //update profile
            options = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.jwt}`,
              },
              body: JSON.stringify({
                _id: values._id,
                name: values.name,
                email: values.email,
                role: values.role,
              }),
            };

            res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`,
              options
            );

            data = await res.json();

            if (res.ok && data) {
              // setUpdateUser("User Updated Successfully");
              setErrorMessage(""); // clear out any previous error messages

              //if user updated is the user logged in, update the session
              if (session?.user?.email === data?.updatedUser?.email) {
                // triggering a session update, updated the value server-side.
                // All `useSession().data` references will be updated.
                update(data);
              }

              //Get All Users
              const options = {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${session?.jwt}`,
                },
              };
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/all`,
                options
              );
              const newUsers = await res.json();

              const { users } = newUsers;

              setAllUsers(users);
            } else if (!res.ok) {
              message = data.message;

              setErrorMessage(message);
              setUpdateUser("");
            }
            break;
          case "delete":
            //delete profile
            options = {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.jwt}`,
              },
            };

            res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user._id}`,
              options
            );

            data = await res.json();

            if (res.ok && data) {
              setAllUsers(allUsers.filter((usr) => usr._id !== values._id));

              setErrorMessage("");
            } else if (!res.ok) {
              message = data.message;

              setErrorMessage(message); // set the new error message

              setUpdateUser("");
            }
            break;
          default:
            // handle other actions or no action
            break;
        }
      },
    });

    return (
      <React.Fragment>
        <li className="list-none ">
          {errorMessage ? (
            <span className="text-red-700 text-sm">{errorMessage}</span>
          ) : (
            <></>
          )}
          {/* {updateUser !== "" ? (
            <span className="text-green-600 text-sm">{updateUser}</span>
          ) : (
            <></>
          )} */}
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 p-5 "
          >
            <div className="w-full md:w-auto">
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
                className={`w-full border rounded-md p-2 bg-slate-50 focus:outline-none ${
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
            <div className="w-full md:w-auto">
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
                className={`w-full border rounded-md p-2 bg-slate-50 focus:outline-none ${
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
            <div className="w-full md:w-auto">
              <label
                htmlFor="role"
                className="block text-gray-600 font-semibold mb-2 text-sm"
              >
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                className={`w-full border rounded-md p-2 bg-slate-50 focus:outline-none ${
                  formik.errors.role && formik.touched.role
                    ? "border-red-700"
                    : null
                }`}
                required
                {...formik.getFieldProps("role")}
              />
              {formik.errors.email && formik.touched.email ? (
                <span className="text-red-700 text-sm">
                  {formik.errors.role}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div>
              <label
                htmlFor="actions"
                className="block text-gray-600 font-semibold mb-2 text-sm"
              >
                Actions
              </label>
              <select
                id="actions"
                name="actions"
                required
                className="w-full bg-gradient-to-r border border-blue-500 text-blue-500 text-lg py-2 px-4 rounded-md"
                {...formik.getFieldProps("actions")}
              >
                <option value="">Actions</option>
                <option value="update" label="update">
                  Update
                </option>
                <option value="delete" label="delete">
                  Delete
                </option>
              </select>
            </div>
            <div className="w-full md:w-48">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`w-full mt-0 md:mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 border hover:bg-white border-blue-500 text-gray-50 text-lg py-2 px-4 rounded-md ${
                  formik.isSubmitting ? "opacity-50" : null
                }`}
              >
                Submit
              </button>
            </div>
          </form>
        </li>
      </React.Fragment>
    );
  }

  return (
    <>
      <section className="flex justify-center items-center">
        <div className="bg-white rounded-md drop-shadow-md mt-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 mb-5 border-b">
            <h1 className="text-slate-700 text-3xl font-bold mb-2 md:mb-0">
              All Users
            </h1>
            <Link href={"/register"}>
              <div className="flex flex-row items-center  text-slate-700 text-lg px-2 py-1 rounded hover:bg-slate-300  outline-none">
                <span>Add User</span>
                <AiOutlinePlus color="#334155" size={18} className="ml-2" />
              </div>
            </Link>
          </div>
          <ul className="flex flex-col list-disc ml-5">
            {allUsers?.map((user, index) => (
              <UserForm user={user} key={index} />
            ))}
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
export default Admin;
