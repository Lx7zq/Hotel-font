import React, { useState } from "react";
import RoomService from "../services/room.service"; // นำเข้า RoomService
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    roomNumber: "",
    roomType: "Single",
    roomStatus: "Available",
    pricePerNight: "",
    roomSize: "",
    additionalDetails: "",
    ImageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RoomService.insertRoom(roomData);
      Swal.fire("Success!", "Room has been added.", "success").then(() => {
        navigate("/rooms"); // นำทางกลับไปยังหน้ารายการห้อง
      });
    } catch (error) {
      Swal.fire("Error!", "Error adding room: " + error.message, "error");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Add New Room</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Room Number:</label>
          <input
            type="text"
            name="roomNumber"
            value={roomData.roomNumber}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Room Type:</label>
          <select
            name="roomType"
            value={roomData.roomType}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Penthouse">Penthouse</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Price per Night:</label>
          <input
            type="number"
            name="pricePerNight"
            value={roomData.pricePerNight}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Room Size (sq ft):</label>
          <input
            type="number"
            name="roomSize"
            value={roomData.roomSize}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Image URL:</label>
          <input
            type="text"
            name="ImageUrl"
            value={roomData.ImageUrl}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        {/* แสดงรูปภาพที่เพิ่ม */}
        {roomData.ImageUrl && (
          <div className="mb-4">
            <label className="block mb-1">Image Preview:</label>
            <img
              src={roomData.ImageUrl}
              alt="Room Preview"
              className="w-32 h-auto rounded-md" // ปรับขนาดที่นี่
            />
          </div>
        )}
        <div>
          <label className="block mb-1">Additional Details:</label>
          <textarea
            name="additionalDetails"
            value={roomData.additionalDetails}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="4"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
