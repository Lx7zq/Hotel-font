// src/Pages/Room.jsx
import React, { useEffect, useState } from "react";
import RoomService from "../services/room.service";
import RoomList from "../Component/roomlist";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await RoomService.getAllRooms();
        console.log("Fetched rooms:", response.data); // ตรวจสอบข้อมูลที่ได้รับ
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return <RoomList rooms={rooms} />;
};

export default RoomsPage;
