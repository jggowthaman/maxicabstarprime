import api from "../api/axios";

export const getBookings = async () => {
  const response = await api.get("/bookings");
  return response.data.bookings;
};

export const updateBookingStatus = async (id, status) => {
  const response = await api.patch(`/bookings/${id}/status`, { status });
  return response.data;
};