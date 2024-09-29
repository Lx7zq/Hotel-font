import api from "./api";

const ROOM_API = import.meta.env.VITE_ROOM_API;


const getAllRooms = async () => {
  return await api.get(ROOM_API);
};

const getRoomById = async (id) => {
  return await api.get(`${ROOM_API}/${id}`);
};

const insertRoom = async (room) => {
  return await api.post(ROOM_API, room);
};

const editRoom = async (id, room) => {
  return await api.put(`${ROOM_API}/${id}`, room);
};

const deleteRoom = async (id) => {
  return await api.delete(`${ROOM_API}/${id}`);
};

const RoomService = {
  getAllRooms,
  getRoomById,
  insertRoom,
  editRoom,
  deleteRoom
};

export default RoomService;
