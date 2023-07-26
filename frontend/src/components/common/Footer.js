import React from "react";

const Footer = () => {
  return (
    <footer className="z-10 p-4 bg-white">
      <div className="container flex flex-col justify-between items-center mx-auto h-16 md:flex-row lg:flex-row">
        <span className="text-slate-700">
          Copyright © 2023 Todo Tasker | Credits
        </span>
        <span className="text-slate-700">Powered by Todo Tasker </span>
      </div>
    </footer>
  );
};

export default Footer;
