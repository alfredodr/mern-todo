import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { FcTodoList } from "react-icons/fc";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineManageAccounts } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";
import { MdAppRegistration } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { RiTodoLine } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import useToggleState from "@/hooks/useToggleState";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useToggleState(false);

  const [isProfileMenuActive, setIsProfileMenuActive] = useToggleState(false);

  const router = useRouter();
  const { route } = router;
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: "/login" });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuActive(!isMobileMenuActive);
  };

  return (
    <header className="w-full z-10 p-4 bg-white">
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
            {session?.user?.image !== null ? (
              <>
                <div className="flex flex-row items-center justify-center relative">
                  <span className="text-slate-700 text-base mr-2">
                    {" "}
                    {session?.user?.name}
                  </span>
                  <div className="relative w-9 h-9 overflow-hidden ">
                    <Image
                      src={session?.user?.image}
                      alt="Profile Image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <IoMdArrowDropdown
                    color="90CAF9"
                    className={`w-6 h-9 hover:bg-slate-300 ${
                      isProfileMenuActive ? "bg-slate-300" : "null"
                    }`}
                    onClick={toggleProfileMenu}
                  />
                  {/* Profile Menu */}
                  {session ? (
                    <nav
                      className={`${
                        isProfileMenuActive === true ? null : "hidden"
                      } absolute  ${
                        session?.user?.role == "admin" ? "mt-56" : "mt-48"
                      } w-52 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-40`}
                    >
                      <Link
                        href={"/profile"}
                        className="flex items-center px-4 py-2 text-base text-gray-700 hover:bg-gray-200"
                      >
                        <CgProfile color="#334155" size={20} className="mr-2" />
                        <span className="text-slate-700 text-base">
                          Profile
                        </span>
                      </Link>
                      <Link
                        href={"/todos"}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                      >
                        <RiTodoLine
                          color="#90CAF9"
                          size={20}
                          className="mr-2"
                        />
                        <span className="text-slate-700 text-base">Todos</span>
                      </Link>
                      {session?.user?.role == "admin" ? (
                        <Link
                          href={"/admin"}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        >
                          <MdOutlineManageAccounts
                            color="90CAF9"
                            className="mr-2"
                            size={20}
                          />
                          <span className="text-slate-700 text-base">
                            Admin
                          </span>
                        </Link>
                      ) : null}
                      <span
                        href={"/todos"}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                        onClick={handleSignOut}
                      >
                        <LuLogOut color="#334155" size={20} className="mr-2" />
                        <span className="text-slate-700 text-base">Logout</span>
                      </span>
                    </nav>
                  ) : (
                    <nav
                      className={`${
                        isProfileMenuActive === true ? null : "hidden"
                      } z-40 mt-4`}
                    >
                      <ul className="flex flex-col font-semibold">
                        <li className="py-3">
                          <Link
                            href={"/login"}
                            className="ml-2 flex flex-row items-center justify-center text-slate-700 text-lg px-2 py-1 rounded"
                          >
                            <span>Login</span>
                            <LuLogIn
                              color="#334155"
                              size={18}
                              className="ml-2"
                            />
                          </Link>
                        </li>
                        <li className="py-3">
                          <Link
                            href={"/register"}
                            className="ml-2 flex flex-row items-center justify-center text-slate-700 text-lg px-2 py-1 rounded"
                          >
                            <span>Register </span>
                            <MdAppRegistration
                              color="#334155"
                              size={18}
                              className="ml-2"
                            />
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              </>
            ) : null}
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
                } flex flex-row items-center justify-center text-slate-700 text-lg px-2 py-1 rounded hover:bg-slate-300  outline-none`}
              >
                <span>Login</span>
                <LuLogIn color="#334155" size={18} className="ml-2" />
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
                } flex flex-row items-center justify-center text-slate-700 text-lg px-2 py-1 rounded hover:bg-slate-300  outline-none`}
              >
                <span>Register </span>
                <MdAppRegistration color="#334155" size={18} className="ml-2" />
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
          {isMobileMenuActive === true ? (
            <RxCross1 color="90CAF9" size={28} />
          ) : (
            <RxHamburgerMenu color="90CAF9" size={28} />
          )}
        </button>
      </nav>
      {/* Mobile Menu */}
      {session ? (
        <nav
          className={`${
            isMobileMenuActive === true ? null : "hidden"
          } z-40 mt-4`}
        >
          <button
            type="button"
            onClick={handleSignOut}
            className="flex flex-row items-center justify-center text-slate-700 text-lg px-2 py-1 w-full rounded hover:bg-slate-300  outline-none"
          >
            <span>Logout</span>
            <LuLogOut color="#334155" size={18} className="ml-2" />
          </button>
        </nav>
      ) : (
        <nav
          className={`${
            isMobileMenuActive === true ? null : "hidden"
          } z-40 mt-4`}
        >
          <ul id="menu" className="flex flex-col font-semibold">
            <li className="py-3">
              <Link
                href={"/login"}
                className="ml-2 flex flex-row items-center justify-center text-slate-700 text-lg px-2 py-1 rounded"
              >
                <span>Login</span>
                <LuLogIn color="#334155" size={18} className="ml-2" />
              </Link>
            </li>
            <li className="py-3">
              <Link
                href={"/register"}
                className="ml-2 flex flex-row items-center justify-center text-slate-700 text-lg px-2 py-1 rounded"
              >
                <span>Register </span>
                <MdAppRegistration color="#334155" size={18} className="ml-2" />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
