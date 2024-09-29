import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RoomService from "../services/room.service";
import Swal from "sweetalert2";

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    roomNumber: "",
    roomType: "",
    roomStatus: "",
    pricePerNight: 0,
    roomSize: 0,
    additionalDetails: "",
    ImageUrl: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const response = await RoomService.getRoomById(id);
        setRoom(response.data);
      } catch (error) {
        setError("Error fetching room details.");
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => ({ ...prevRoom, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RoomService.editRoom(id, room);
      Swal.fire("Success!", "Room details have been updated.", "success").then(
        () => {
          navigate(`/room/${id}`); // นำทางกลับไปที่หน้ารายละเอียดห้อง
        }
      );
    } catch (error) {
      Swal.fire("Error!", "Error updating room: " + error.message, "error");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Edit Room
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-gray-700">Room Number</label>
          <input
            type="text"
            name="roomNumber"
            value={room.roomNumber}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Room Type</label>
          <input
            type="text"
            name="roomType"
            value={room.roomType}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Room Status</label>
          <select
            name="roomStatus"
            value={room.roomStatus}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price per Night</label>
          <input
            type="number"
            name="pricePerNight"
            value={room.pricePerNight}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Room Size (sq ft)</label>
          <input
            type="number"
            name="roomSize"
            value={room.roomSize}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Additional Details</label>
          <textarea
            name="additionalDetails"
            value={room.additionalDetails}
            onChange={handleChange}
            className="textarea border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="ImageUrl"
            value={room.ImageUrl}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Update Room
        </button>
      </form>
    </div>
  );
};

export default EditRoom;
