import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // เพิ่ม Link
import RoomService from "../services/room.service";
import BookingService from "../services/booking.service";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthContext(); // ดึงข้อมูลผู้ใช้จาก context

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

  const handleBooking = async (checkInDate, checkOutDate, guestCount) => {
    try {
      const bookingData = {
        checkInDate,
        checkOutDate,
        guestCount,
        roomId: room.id,
      };
      await BookingService.createBooking(bookingData);
      Swal.fire("Success!", "Booking has been created.", "success").then(() => {
        navigate("/"); // นำทางกลับไปหน้าหลักเมื่อจองสำเร็จ
      });
    } catch (error) {
      Swal.fire("Error!", "Error creating booking: " + error.message, "error");
    }
  };

  const showBookingPopup = () => {
    if (room.roomStatus !== "Available") {
      Swal.fire(
        "Unavailable!",
        "This room is not available for booking.",
        "error"
      );
      return;
    }

    Swal.fire({
      title: "Book Room",
      html: ` 
        <label for="checkIn">Check-In Date:</label>
        <input type="date" id="checkIn" class="swal2-input" />
        <label for="checkOut">Check-Out Date:</label>
        <input type="date" id="checkOut" class="swal2-input" />
        <label for="guestCount">Guest Count:</label>
        <input type="number" id="guestCount" class="swal2-input" min="1" value="1" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const checkInDate = document.querySelector("#checkIn").value;
        const checkOutDate = document.querySelector("#checkOut").value;
        const guestCount = document.querySelector("#guestCount").value;

        if (!checkInDate || !checkOutDate || !guestCount) {
          Swal.showValidationMessage("Please fill in all fields");
          return false;
        }

        return { checkInDate, checkOutDate, guestCount };
      },
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const { checkInDate, checkOutDate, guestCount } = result.value;
        handleBooking(checkInDate, checkOutDate, guestCount);
      }
    });
  };

  // ฟังก์ชันสำหรับลบห้อง
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await RoomService.deleteRoom(id); // เรียกใช้บริการลบห้อง
        Swal.fire("Deleted!", "Your room has been deleted.", "success").then(
          () => {
            navigate("/"); // นำทางกลับไปหน้าหลักหลังจากลบสำเร็จ
          }
        );
      } catch (error) {
        Swal.fire("Error!", "Error deleting room: " + error.message, "error");
      }
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!room)
    return <p className="text-center text-lg">Loading room details...</p>;

  return (
    <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">{room.roomNumber}</h1>
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <img
          src={room.ImageUrl}
          alt={room.roomNumber}
          className="w-full lg:w-1/2 h-auto object-cover rounded-lg shadow-md"
        />
        <div className="w-full lg:w-1/2">
          <p className="text-xl font-semibold mb-2">
            Room Type: {room.roomType}
          </p>
          <p className="text-lg mb-2">
            Status:{" "}
            <span
              className={`font-medium ${
                room.roomStatus === "Available"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {room.roomStatus}
            </span>
          </p>
          <p className="text-lg mb-2">
            Price per Night:{" "}
            <span className="font-medium">
              ${room.pricePerNight.toFixed(2)}
            </span>
          </p>
          <p className="text-lg mb-2">
            Size: <span className="font-medium">{room.roomSize} sq ft</span>
          </p>
          {room.additionalDetails && (
            <p className="text-lg mb-2">
              Details:{" "}
              <span className="font-medium">{room.additionalDetails}</span>
            </p>
          )}
          <button onClick={showBookingPopup} className="btn btn-primary mt-4">
            Book Now
          </button>

          {/* แสดงปุ่มลบและแก้ไขถ้าผู้ใช้เป็น Admin หรือ Moderator */}
          {(user?.roles?.includes("ROLE_ADMIN") ||
            user?.roles?.includes("ROLE_MODERATOR")) && (
            <div className="flex space-x-4 mt-4">
              {user?.roles?.includes("ROLE_ADMIN") && (
                <>
                  <Link to={`/edit-room/${id}`} className="btn btn-warning">
                    Edit
                  </Link>
                  <button className="btn btn-error" onClick={handleDelete}>
                    Delete
                  </button>
                </>
              )}
              {user?.roles?.includes("ROLE_MODERATOR") && (
                <Link to={`/edit-room/${id}`} className="btn btn-warning">
                  Edit
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
