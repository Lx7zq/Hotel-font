import React from "react";

const RegisterButton = () => {
  return (
    <a
      href="/register"
      className="inline-block bg-darkBlue text-gold py-2 px-4 rounded-md shadow-sm hover:bg-darkerBlue focus:outline-none focus:ring-2 focus:ring-darkBlue focus:ring-opacity-30 transition-colors duration-200"
    >
      Register
    </a>
  );
};

export default RegisterButton;
