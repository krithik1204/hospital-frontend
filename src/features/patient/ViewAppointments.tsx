import { type FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllAppointments, getPatientAppointments } from "../../features/auth/authApi";
import { useApiCall } from "../../hooks/useApiCall";
import "./css/ViewAppointments.css";

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: string;
}

export const ViewAppointments: FC = () => {
  const { data: appointments, loading, rejected, error, success, execute } = useApiCall<Appointment[]>();
const token = localStorage.getItem("token");

  const roles = useSelector((state: any) => state.auth.roles);
  const userId = useSelector((state: any) => state.auth.userId);

  const isAdmin = roles.includes("ROLE_ADMIN");
  const isPatient = roles.includes("ROLE_PATIENT");

  useEffect(() => {
    const fetchAppointments = async () => {
      let result;
      if (isAdmin && token) {
      result=  await execute(() => getAllAppointments(token).then((res) => res.data));
      } else if (isPatient && userId && token) {
        result = await execute(() => getPatientAppointments(userId, token).then((res) => res.data));
      }
       console.log("Appointments response:", result);
    };

    if ((isAdmin && token) || (isPatient && userId && token)) {
      fetchAppointments();
    }
  }, []);

  return (
    <div className="view-appointments-main">
      <div className="view-appointments-content">
        <h1 className="view-appointments-title">
          {isAdmin ? "All Appointments" : "My Appointments"}
        </h1>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading appointments...</p>
          </div>
        )}

        {rejected && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 font-medium">Error loading appointments</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {success && appointments && appointments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No appointments found.</p>
          </div>
        )}

        {success && appointments && appointments.length > 0 && (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white p-4 rounded-lg shadow-md border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Patient: {appointment.patientName}</p>
                    <p>Doctor: {appointment.doctorName}</p>
                  </div>
                  <div>
                    <p>Date: {appointment.date}</p>
                    <p>Time: {appointment.time}</p>
                    <p>Status: <span className={`font-medium ${
                      appointment.status === 'Confirmed' ? 'text-green-600' :
                      appointment.status === 'Pending' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>{appointment.status}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};