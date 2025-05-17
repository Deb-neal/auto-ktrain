import React, { useState } from "react";
import axios from "axios";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    departureStation: "",
    arrivalStation: "",
    departureDate: "",
    departureTime: "",
    passengers: 1,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("http://localhost:8000/reserve", {
        dep: formData.departureStation,
        arr: formData.arrivalStation,
        date: formData.departureDate.replace(/-/g, ""), // YYYYMMDD
        time: formData.departureTime.replace(/:/g, "") + "00", // HHMMSS
        passengers: formData.passengers,
      });
      alert("Reservation complete!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(`Reservation failed: ${error.response.data.message}`);
      } else {
        alert("Reservation failed. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Train Ticket Reservation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="departureStation"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Departure Station
            </label>
            <input
              type="text"
              id="departureStation"
              name="departureStation"
              value={formData.departureStation}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="arrivalStation"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Arrival Station
            </label>
            <input
              type="text"
              id="arrivalStation"
              name="arrivalStation"
              value={formData.arrivalStation}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="departureDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Departure Date
            </label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="departureTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Departure Time
            </label>
            <input
              type="time"
              id="departureTime"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="passengers"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of Passengers
            </label>
            <input
              type="number"
              id="passengers"
              name="passengers"
              min="1"
              value={formData.passengers}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition duration-300 disabled:opacity-70"
          >
            {isLoading ? "Processing..." : "Reserve Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
