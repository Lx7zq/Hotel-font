import React from "react";
import { Link } from "react-router-dom"; // นำเข้า Link

const RoomCard = ({
  id,
  ImageUrl,
  roomNumber,
  roomType,
  roomStatus,
  pricePerNight,
  roomSize,
  additionalDetails,
}) => {
  return (
    <div className="card bg-gray-100 shadow-md h-auto mx-4 mb-4 hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden">
      <figure>
        <img
          src={ImageUrl}
          alt={roomNumber}
          className="w-full h-64 object-cover rounded-t-lg" // ปรับขนาดรูปภาพให้เต็มการ์ด
        />
      </figure>
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          {roomNumber}
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-sm mb-2">
          <p className="text-sm text-gray-600">Type: {roomType}</p>
          <p className="text-sm text-gray-600">Status: {roomStatus}</p>
          <p className="text-lg font-bold text-gray-800">
            Price: ${pricePerNight.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">Room Size: {roomSize} sq ft</p>
          {additionalDetails && (
            <p className="text-sm text-gray-600">
              Details: {additionalDetails}
            </p>
          )}
        </div>
        <Link
          to={`/room/${id}`}
          className="btn bg-blue-600 text-white hover:bg-blue-700 rounded-md py-2 px-4 transition duration-300"
        >
          MORE INFO AND BOOK NOW
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
