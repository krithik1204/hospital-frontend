import { useEffect } from "react";

export const ViewAppointments = () => {

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("JWT TOKEN:", token);
     console.log("Role:", localStorage.getItem("role"));
  }, []);

  return (
    <div>
      <h1>View Appointments</h1>
    </div>
  );
};