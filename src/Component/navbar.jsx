import React from "react";
import UserProfile from "./UserProfile";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import Logo from "../assets/LuxStay.png"; // เส้นทางของโลโก้
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom"; // นำเข้า Link

const Navbar = () => {
  const authContext = useAuthContext();
  const { user, logout } = authContext || {}; // ตรวจสอบว่ามี authContext ก่อนการ destructure

  return (
    <div className="navbar bg-gray-900 text-white shadow-md">
      <div className="flex-1 flex items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={Logo} // ใช้โลโก้ที่นำเข้า
            alt="LuxStay Logo"
            className="w-20 h-20" // ปรับขนาดโลโก้ให้ใหญ่ขึ้น
          />
          <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
            LuxStay
          </span>
        </Link>
      </div>
      <div className="flex-none">
        {/* Add and Booking Buttons - แสดงเฉพาะผู้ใช้ที่มีบทบาท Admin หรือ Moderator */}
        {(user?.roles?.includes("ROLE_ADMIN") ||
          user?.roles?.includes("ROLE_MODERATOR")) && (
          <div className="flex space-x-4">
            <Link
              to="/add"
              className="btn bg-yellow-500 text-gray-900 hover:bg-yellow-400"
            >
              Add
            </Link>
            <Link
              to="/bookings"
              className="btn bg-yellow-500 text-gray-900 hover:bg-yellow-400"
            >
              Booking
            </Link>
          </div>
        )}
      </div>
      <div className="navbar-end flex items-center space-x-4">
        {user ? (
          <>
            <div className="flex items-center space-x-3">
              <span className="text-white font-semibold text-lg">
                Welcome,{" "}
                <span className="text-yellow-400 font-bold">
                  {user.username}
                </span>
              </span>
              <div className="flex items-center space-x-2">
                {user.roles.map((role, index) => (
                  <div key={index} className="badge badge-accent text-xs">
                    {role}
                  </div>
                ))}
              </div>
            </div>
            <UserProfile />
          </>
        ) : (
          <div className="space-x-4">
            <RegisterButton />
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
