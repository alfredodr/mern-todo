import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { LuLogIn } from "react-icons/lu";

const UpdateEmail = () => {
  const router = useRouter();
  const token = router?.query?.token;
  const [message, setMessage] = useState("");

  const emailUpdate = async () => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/email`,
      options
    );
    const data = await res.json();

    // If no error and we have user data, return it
    if (res?.ok && data) {
      setMessage("User Updated Successfully! Please Log back in");
    } else if (!res?.ok) {
      setMessage(res?.error);
    }
    return message;
  };

  emailUpdate();

  return (
    <secion className="flex flex-col justify-evenly h-screen bg-gray-100">
      <div className="container m-auto p-5 w-10/12 md:w-10/12 lg:w-1/4 bg-slate-50">
        {message ? (
          <h1 className="text-green-800 font-bold text-center">{message}</h1>
        ) : null}
        <Link href={"/login"} className="ml-2">
          <div className="flex flex-row items-center justify-center bg-black border border-slate-400 text-slate-400 text-lg px-2 py-1 rounded hover:border-slate-200 hover:text-slate-200 focus-within:bg-slate-800 outline-none">
            <span>Login</span>
            <LuLogIn color="#ffffff" size={18} className="ml-2" />
          </div>
        </Link>
      </div>
    </secion>
  );
};

export default UpdateEmail;
