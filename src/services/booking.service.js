import api from "./api";

const BOOKING_API = import.meta.env.VITE_BOOKING_API;

const getAllBookings = async () => {
    return await api.get(BOOKING_API);
};

const getBookingById = async (id) => {
    return await api.get(`${BOOKING_API}/${id}`);
};

const createBooking = async (booking) => {
    return await api.post(BOOKING_API, booking);
};

const updateBooking = async (id, booking) => {
    return await api.put(`${BOOKING_API}/${id}`, booking);
};

const deleteBooking = async (id) => {
    return await api.delete(`${BOOKING_API}/${id}`);
};

const BookingService = {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
};

export default BookingService;
