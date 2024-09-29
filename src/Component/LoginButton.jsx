import React from "react";

const LoginButton = () => {
  return (
    <a
      href="/login"
      className="inline-block bg-darkBlue text-gold py-2 px-4 rounded-md shadow-sm hover:bg-darkerBlue focus:outline-none focus:ring-2 focus:ring-darkBlue focus:ring-opacity-30 transition-colors duration-200"
    >
      Login
    </a>
  );
};

export default LoginButton;
