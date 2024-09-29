import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard"; // ตรวจสอบให้แน่ใจว่าชื่อไฟล์ตรง
import RoomService from "../services/room.service";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await RoomService.getAllRooms();
        console.log("Fetched rooms:", response.data);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="pt-20">
      {rooms.length === 0 ? (
        <p className="text-center text-xl">No rooms available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              ImageUrl={room.ImageUrl}
              roomNumber={room.roomNumber}
              roomType={room.roomType}
              roomStatus={room.roomStatus}
              pricePerNight={room.pricePerNight}
              roomSize={room.roomSize}
              additionalDetails={room.additionalDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
