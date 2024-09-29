import React, { useEffect, useState } from "react";
import BookingService from "../services/booking.service"; // นำเข้าบริการการจอง

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await BookingService.getAllBookings(); // ฟังก์ชันที่ดึงข้อมูลการจอง
        setBookings(response.data); // เก็บข้อมูลการจองใน state
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Booking List</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border">Booking ID</th>
            <th className="py-2 px-4 border">Room Number</th>
            <th className="py-2 px-4 border">Check-In Date</th>
            <th className="py-2 px-4 border">Check-Out Date</th>
            <th className="py-2 px-4 border">Guest Count</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id} className="text-center">
                <td className="py-2 px-4 border">{booking.id}</td>
                <td className="py-2 px-4 border">{booking.roomNumber}</td>
                <td className="py-2 px-4 border">{booking.checkInDate}</td>
                <td className="py-2 px-4 border">{booking.checkOutDate}</td>
                <td className="py-2 px-4 border">{booking.guestCount}</td>
                <td className="py-2 px-4 border">{booking.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
