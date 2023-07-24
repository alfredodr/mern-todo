import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const VerifyRegisteredUser = () => {
  const router = useRouter();
  const token = router?.query?.token;
  const [message, setMessage] = useState("");

  const verifyRegisterdUser = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/verify?token=${token}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();

    // If no error and we have user data, return it
    if (res?.ok && data) {
      setMessage(data?.message);
    } else if (!res?.ok) {
      setMessage(res?.error);
    }
    return message;
  };

  verifyRegisterdUser();

  return (
    <secion className="flex flex-col justify-evenly h-screen bg-gray-100">
      <div className="container m-auto p-5 w-10/12 md:w-10/12 lg:w-1/4 bg-slate-50">
        <h1 className="text-green-800 font-bold text-center">{message}</h1>

        <Link href={"/login"} className="ml-2">
          <div className="flex flex-row items-center justify-center bg-black border border-slate-400 text-slate-400 text-lg px-2 py-1 rounded hover:border-slate-200 hover:text-slate-200 focus-within:bg-slate-800 outline-none">
            <Image
              src="/sign-in.svg"
              alt="sign in"
              className="dark:invert"
              width={15}
              height={10}
              priority
            />
            Login
          </div>
        </Link>
      </div>
    </secion>
  );
};

export default VerifyRegisteredUser;
