import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="z-10 p-4 bg-white h-16 container flex flex-col justify-between items-center mx-auto md:flex-row lg:flex-row">
      <span className="text-slate-700">
        Copyright © 2023{" "}
        <Link
          href="https://alfredojdominguez.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline cursor-pointer"
        >
          Alfredo Dominguez
        </Link>{" "}
        | Credits
      </span>
      <span className="text-slate-700">
        Powered by{" "}
        <Link
          href="https://alfredojdominguez.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline cursor-pointer"
        >
          Alfredo Dominguez
        </Link>{" "}
      </span>
    </footer>
  );
};

export default Footer;
