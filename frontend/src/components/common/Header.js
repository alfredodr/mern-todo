import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [isActive, setActive] = useState();
  const router = useRouter();
  const { route } = router;
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: "/login" });
    //need to sign out from the server too
  };

  const toggleMobileMenu = () => {
    setActive(!isActive);
  };
  return (
    <header className="z-10 p-4 bg-black">
      {/* Desktop Menu*/}
      <nav className="container mx-auto flex items-center justify-between px-5">
        <div>
          <Link href={"/"}>
            <span className="text-white">MERN Auth</span>
          </Link>
        </div>
        {/* Show Sign out if user is logged in, otherwise show Login and Register */}
        {session ? (
          <div className="invisible sm:visible flex flex-row items-center space-x-5">
            <span className="text-white ">
              You are logged in as: {session?.user?.name}
            </span>
            <Link href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                className="fill-white"
              >
                <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
              </svg>
            </Link>
            {session?.user?.image !== null ? (
              <Link href={"/profile"}>
                <div className="relative w-9 h-9 rounded-full overflow-hidden ">
                  <Image
                    src={session?.user?.image}
                    alt="Profile Image"
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
            ) : null}
            {session?.user?.role == "admin" ? (
              <Link href={"/admin"}>
                <svg
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                  width="36"
                  height="36"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <rect x="0" fill="none" width="20" height="20"></rect>{" "}
                    <g>
                      {" "}
                      <path d="M18 12h-2.18c-.17.7-.44 1.35-.81 1.93l1.54 1.54-2.1 2.1-1.54-1.54c-.58.36-1.23.63-1.91.79V19H8v-2.18c-.68-.16-1.33-.43-1.91-.79l-1.54 1.54-2.12-2.12 1.54-1.54c-.36-.58-.63-1.23-.79-1.91H1V9.03h2.17c.16-.7.44-1.35.8-1.94L2.43 5.55l2.1-2.1 1.54 1.54c.58-.37 1.24-.64 1.93-.81V2h3v2.18c.68.16 1.33.43 1.91.79l1.54-1.54 2.12 2.12-1.54 1.54c.36.59.64 1.24.8 1.94H18V12zm-8.5 1.5c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </Link>
            ) : null}
            <button
              type="button"
              onClick={handleSignOut}
              className="flex flex-row items-center justify-center border border-slate-400 text-slate-400 text-lg px-2 py-1 rounded hover:border-slate-200 hover:text-slate-200 focus-within:bg-slate-800 outline-none"
            >
              <Image
                src="/sign-in.svg"
                alt="sign in"
                className="dark:invert"
                width={15}
                height={10}
                priority
              />
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden space-x-7 md:flex">
            <Link href={"/login"} className="ml-2">
              <div
                className={`${
                  route === "/login" ||
                  route === "/register" ||
                  route === "/verify"
                    ? "hidden"
                    : ""
                } flex flex-row items-center justify-center border border-slate-400 text-slate-400 text-lg px-2 py-1 rounded hover:border-slate-200 hover:text-slate-200 focus-within:bg-slate-800 outline-none`}
              >
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
            <Link href={"/register"} className="ml-2">
              <div
                className={`${
                  route === "/login" ||
                  route === "/register" ||
                  route === "/verify"
                    ? "hidden"
                    : ""
                } flex flex-row items-center justify-center border border-slate-400 text-slate-400 text-lg px-2 py-1 rounded hover:border-slate-200 hover:text-slate-200 focus-within:bg-slate-800 outline-none`}
              >
                <Image
                  src="/sign-out.svg"
                  alt="sign out"
                  className="dark:invert"
                  width={15}
                  height={10}
                  priority
                />
                Register
              </div>
            </Link>
          </div>
        )}
        {/* Hamburger Icon */}
        <button
          id="menu-btn"
          aria-label="menu button"
          className={`${route === "/verify" ? "hidden" : ""} 
          flex items-center justify-center cursor-pointer hamburger relative w-8 h-8 md:hidden focus:outline-none rounded`}
          onClick={toggleMobileMenu}
        >
          {isActive === true ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M19 5L4.99998 19M5.00001 5L19 19"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          ) : (
            <svg
              viewBox="0 0 25.00 25.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M2 12.32H22"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M2 18.32H22"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M2 6.32001H22"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          )}
        </button>
      </nav>
      {/* Mobile Menu */}
      {session ? (
        <nav className={`${isActive === true ? null : "hidden"} z-40 mt-4`}>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex flex-row items-center justify-center border border-slate-400 text-slate-400 text-lg px-2 py-1 w-full rounded hover:border-slate-200 hover:text-slate-200 focus-within:bg-slate-800 outline-none"
          >
            <Image
              src="/sign-in.svg"
              alt="sign in"
              className="dark:invert"
              width={15}
              height={10}
              priority
            />
            Logout
          </button>
        </nav>
      ) : (
        <nav className={`${isActive === true ? null : "hidden"} z-40 mt-4`}>
          <ul id="menu" className="flex flex-col font-semibold">
            <li className="py-3">
              <Link href={"/login"} className="ml-2">
                <div className="flex flex-row items-center justify-center border border-slate-400 text-slate-400 text-lg px-2 py-1 rounded hover:border-slate-200 hover:text-slate-200 focus-within:bg-slate-800 outline-none">
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
            </li>
            <li className="py-3">
              <Link href={"/register"} className="ml-2">
                <div className="flex flex-row items-center justify-center border border-slate-400 text-slate-400 text-lg px-2 py-1 rounded hover:border-slate-200 hover:text-slate-200 focus-within:bg-slate-800 outline-none">
                  <Image
                    src="/sign-out.svg"
                    alt="sign out"
                    className="dark:invert"
                    width={15}
                    height={10}
                    priority
                  />
                  Register
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
