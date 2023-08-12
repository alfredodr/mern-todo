import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import { updateProfileSchema } from "@/utils/schemas";
import { updatePasswordSchema } from "@/utils/schemas";
import Image from "next/image";

const Profile = () => {
  const { data: session, update } = useSession();
  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const formikUpdateProfile = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: session?.user?.name ? session?.user?.name : "",
      email: session?.user?.email ? session?.user?.email : "",
      role: session?.user?.role ? session?.user?.role : "",
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values, actions) => {
      //update profile
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.jwt}`,
        },
        body: JSON.stringify({
          _id: session?.user?._id,
          name: values.name,
          email: values.email,
          role: values.role,
        }),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`,
        options
      );

      const data = await res.json();

      if (res.ok && data) {
        if (data?.msg) {
          setProfileMessage(data?.msg);
        } else {
          // triggering a session update, updated the value server-side.
          // All `useSession().data` references will be updated.
          update(data);
        }
      } else if (!res.ok) {
        const message = data.message;
        actions.setFieldError("updateProfileError", message);
      }
    },
  });

  const formikUpdatePassword = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (values, actions) => {
      // update password
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.jwt}`,
        },
        body: JSON.stringify({
          _id: session?.user?._id,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          provider: session?.user?.provider ? session?.user?.provider : "",
        }),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/password`,
        options
      );

      const data = await res.json();

      if (res.ok && data) {
        // triggering a session update, updated the value server-side.
        // All `useSession().data` references will be updated.
        // update(data); //no need to update the session because the user would need to logout and login again to use the new password
        formikUpdatePassword.resetForm();
        setPasswordMessage("Password Updated Successfully");
      } else if (!res.ok) {
        const message = data.message;
        actions.setFieldError("updatePasswordError", message);
      }
    },
  });

  return (
    <>
      <section className="flex flex-col justify-center items-center gap-11 md:gap-0 px-5 bg-gray-100 md:flex-row">
        <div className="container mx-5 p-5 h-2/3 max-w-md bg-slate-50 rounded-md drop-shadow-md">
          <div className="flex flex-col items-center">
            <h1 className="text-gray-700 text-3xl text-center font-bold my-5">
              Profile
            </h1>
            {session?.user?.image ? (
              <div className="relative w-20 h-20 rounded-full overflow-hidden ">
                <Image
                  src={session?.user?.image}
                  alt="Profile Image"
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
          {formikUpdateProfile?.errors?.updateProfileError ? (
            <span className="text-red-700 text-sm">
              {formikUpdateProfile.errors.updateProfileError}
            </span>
          ) : (
            <></>
          )}
          {profileMessage !== "" ? (
            <span className="text-green-600 text-sm">{profileMessage}</span>
          ) : (
            <></>
          )}
          <form className="my-5" onSubmit={formikUpdateProfile.handleSubmit}>
            <div className="mb-4 relative">
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
                  formikUpdateProfile.errors.name &&
                  formikUpdateProfile.touched.name
                    ? "border-red-700"
                    : null
                }`}
                required
                {...formikUpdateProfile.getFieldProps("name")}
              />
              {formikUpdateProfile.errors.name &&
              formikUpdateProfile.touched.name ? (
                <span className="text-red-700 text-sm">
                  {formikUpdateProfile.errors.name}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-4 relative">
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
                  formikUpdateProfile.errors.email &&
                  formikUpdateProfile.touched.email
                    ? "border-red-700"
                    : null
                }`}
                required
                {...formikUpdateProfile.getFieldProps("email")}
              />
              {formikUpdateProfile.errors.email &&
              formikUpdateProfile.touched.email ? (
                <span className="text-red-700 text-sm">
                  {formikUpdateProfile.errors.email}
                </span>
              ) : (
                <></>
              )}
            </div>
            {session?.user?.role == "admin" ? (
              <div className="mb-4 relative">
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
                  className={`border rounded-md p-2 w-full bg-slate-50 focus:outline-none ${
                    formikUpdateProfile.errors.role &&
                    formikUpdateProfile.touched.role
                      ? "border-red-700"
                      : null
                  }`}
                  required
                  {...formikUpdateProfile.getFieldProps("role")}
                />
                {formikUpdateProfile.errors.role &&
                formikUpdateProfile.touched.role ? (
                  <span className="text-red-700 text-sm">
                    {formikUpdateProfile.errors.role}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            ) : null}
            <div className="flex flex-col gap-5 mt-5">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 border hover:bg-white border-blue-500 text-gray-50 text-lg py-2 px-4 rounded-md"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
        {session?.user?.provider === "credentials" ? (
          <div className="container mx-5 p-5 h-2/3 max-w-md bg-slate-50 rounded-md drop-shadow-md">
            <h2 className="text-gray-700 text-3xl text-center font-bold mt-5">
              Password
            </h2>
            {formikUpdatePassword?.errors?.updatePasswordError ? (
              <span className="text-red-700 text-sm">
                {formikUpdatePassword.errors.updatePasswordError}
              </span>
            ) : (
              <></>
            )}
            {passwordMessage !== "" ? (
              <span className="text-green-600 text-sm">{passwordMessage}</span>
            ) : (
              <></>
            )}
            <form className="my-5" onSubmit={formikUpdatePassword.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="currentPassword"
                  className="block text-gray-600 font-semibold mb-2 text-sm"
                >
                  Type your current password
                </label>
                <div className="relative">
                  <input
                    type={`${show.currentPassword ? "text" : "password"}`}
                    id="currentPassword"
                    name="currentPassword"
                    className={`border rounded-md p-2 w-full bg-slate-50 focus:outline-none ${
                      formikUpdatePassword.errors.currentPassword &&
                      formikUpdatePassword.touched.currentPassword
                        ? "border-red-700"
                        : null
                    }`}
                    required
                    {...formikUpdatePassword.getFieldProps("currentPassword")}
                  />
                  <span
                    className={`icon text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2 ${
                      show.currentPassword ? "text-blue-800" : "text-gray-400"
                    } hover:text-blue-800 cursor-pointer`}
                    onClick={() =>
                      setShow({
                        ...show,
                        currentPassword: !show.currentPassword,
                      })
                    }
                  >
                    {show ? "Hide" : "Show"}
                  </span>
                </div>

                {formikUpdatePassword.errors.currentPassword &&
                formikUpdatePassword.touched.currentPassword ? (
                  <span className="text-red-700 text-sm">
                    {formikUpdatePassword.errors.currentPassword}
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-gray-600 font-semibold mb-2 text-sm"
                >
                  Type your new password (8 to 20 characters long)
                </label>
                <div className="relative">
                  <input
                    type={`${show.newPassword ? "text" : "password"}`}
                    id="newPassword"
                    name="newPassword"
                    className={`border rounded-md p-2 w-full bg-slate-50 focus:outline-none ${
                      formikUpdatePassword.errors.newPassword &&
                      formikUpdatePassword.touched.newPassword
                        ? "border-red-700"
                        : null
                    }`}
                    required
                    {...formikUpdatePassword.getFieldProps("newPassword")}
                  />
                  <span
                    className={`icon text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2 ${
                      show ? "text-blue-800" : "text-gray-400"
                    } hover:text-blue-800 cursor-pointer`}
                    onClick={() =>
                      setShow({ ...show, newPassword: !show.newPassword })
                    }
                  >
                    {show ? "Hide" : "Show"}
                  </span>
                </div>

                {formikUpdatePassword.errors.newPassword &&
                formikUpdatePassword.touched.newPassword ? (
                  <span className="text-red-700 text-sm">
                    {formikUpdatePassword.errors.newPassword}
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmNewPassword"
                  className="block text-gray-600 font-semibold mb-2 text-sm"
                >
                  Confirm your new password
                </label>
                <div className="relative">
                  <input
                    type={`${show.confirmNewPassword ? "text" : "password"}`}
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    className={`border rounded-md p-2 w-full bg-slate-50 focus:outline-none ${
                      formikUpdatePassword.errors.confirmNewPassword &&
                      formikUpdatePassword.touched.confirmNewPassword
                        ? "border-red-700"
                        : null
                    }`}
                    required
                    {...formikUpdatePassword.getFieldProps(
                      "confirmNewPassword"
                    )}
                  />
                  <span
                    className={`icon text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2 ${
                      show ? "text-blue-800" : "text-gray-400"
                    } hover:text-blue-800 cursor-pointer`}
                    onClick={() =>
                      setShow({
                        ...show,
                        confirmNewPassword: !show.confirmNewPassword,
                      })
                    }
                  >
                    {show ? "Hide" : "Show"}
                  </span>
                </div>

                {formikUpdatePassword.errors.confirmNewPassword &&
                formikUpdatePassword.touched.confirmNewPassword ? (
                  <span className="text-red-700 text-sm">
                    {formikUpdatePassword.errors.confirmNewPassword}
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
                  Update Password
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default Profile;
