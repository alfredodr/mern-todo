import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { FcTodoList } from "react-icons/fc";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineManageAccounts } from "react-icons/md";

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
    <header className="w-full fixed z-10 p-4 bg-white">
      {/* Desktop Menu*/}
      <nav className="container mx-auto flex items-center justify-between px-5">
        <div>
          <Link href={"/"} className="flex flex-row items-center">
            <FcTodoList size={38} />
            <span className="ml-2">Todo Tasker</span>
          </Link>
        </div>
        {/* Show Sign out if user is logged in, otherwise show Login and Register */}
        {session ? (
          <div className="invisible sm:visible flex flex-row items-center space-x-5">
            <span>You are logged in as: {session?.user?.name}</span>
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
                <MdOutlineManageAccounts color="90CAF9" size={36} />
              </Link>
            ) : null}
            <button
              type="button"
              onClick={handleSignOut}
              className="flex flex-row items-center justify-center text-slate-400 text-lg px-2 py-1 rounded hover:bg-slate-100 focus-within:bg-slate-800 outline-none"
            >
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
            <RxCross1 color="90CAF9" size={28} />
          ) : (
            <RxHamburgerMenu color="90CAF9" size={28} />
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
              <Link
                href={"/login"}
                className="ml-2 flex flex-row items-center justify-center border border-slate-400 text-slate-700 text-lg px-2 py-1 rounded"
              >
                Login
              </Link>
            </li>
            <li className="py-3">
              <Link
                href={"/register"}
                className="ml-2 flex flex-row items-center justify-center border border-slate-400 text-slate-700 text-lg px-2 py-1 rounded"
              >
                Register
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
