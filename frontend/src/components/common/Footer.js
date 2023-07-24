import React from "react";

const Footer = () => {
  return (
    <footer className="z-10 p-4 bg-black">
      <div className="container flex flex-col justify-between items-center mx-auto h-16 md:flex-row lg:flex-row">
        <span className="text-white">Copyright © 2023 Mern Auth | Credits</span>
        <span className="text-white">Powered by Mern Auth </span>
      </div>
    </footer>
  );
};

export default Footer;
