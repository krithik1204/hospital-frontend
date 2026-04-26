
import React from "react";
import "./css/BookAppointment.css";

export const BookAppointment: React.FC = () => {
  return (
    <div className="book-appointment-main">
      <div className="book-appointment-content">
        <h1 className="book-appointment-title">Book Appointment</h1>
        <p className="text-gray-600">Schedule your appointment with our healthcare professionals.</p>
        {/* Add appointment booking form here */}
      </div>
    </div>
  );
};