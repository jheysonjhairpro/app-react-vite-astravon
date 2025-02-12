import { Attendance } from "../types/Attendance";
import { Participant } from "../types/Participant";
import { ApiResponse } from "../types/Response/Response";

//---------------------------------------------------------------- ATTENDANCE EVENT
export const asistenciaEvent = async (eventData: {
  dni: string;
  eventId: number;
  band: boolean;
  isLate: boolean;
}): Promise<ApiResponse<Participant>> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/Attendance/TakeAttendance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al tomar asistencia: ${errorText}`);
    }

    const data: ApiResponse<Participant> = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(
      error.message || "Hubo un problema al procesar la solicitud."
    );
  }
};

//---------------------------------------------------------------- GET ALL
export const geAttendanceEventById = async (
  id: number
): Promise<Attendance[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/attendance/getByid/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los asistencias del evento");
    }

    const data: ApiResponse<Attendance[]> = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    throw error;
  }
};
