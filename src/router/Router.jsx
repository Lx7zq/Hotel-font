import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import RoomPage from "../Pages/Room"; // Page for single room details
import RoomList from "../Component/roomlist"; // Component for room listing
import MainLayout from "../Component/mainlayout";
import RoomDetail from "../Component/roomdetail";
import EditRoom from "../Pages/Edit";
import AddRoom from "../Pages/Add"; // นำเข้า AddRoom
import Booking from "../Pages/Book";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/rooms",
        element: <RoomList />, // Route for listing all rooms
      },
      {
        path: "/room/:id",
        element: <RoomDetail />, // Use RoomDetail to view a single room's details
      },
      {
        path: "/edit-room/:id", // เพิ่มเส้นทางสำหรับ Edit Room
        element: <EditRoom />, // ใช้ EditRoom สำหรับการแก้ไขห้อง
      },
      {
        path: "/add", // เพิ่มเส้นทางสำหรับหน้า Add
        element: <AddRoom />, // ใช้ AddRoom สำหรับการเพิ่มห้อง
      },
      {
        path: "/bookings", // เส้นทางสำหรับการดูการจอง
        element: <Booking />,
      },
    ],
  },
]);

export default router;
