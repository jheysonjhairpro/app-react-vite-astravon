import { EventAttedance } from "../types/EventsAttendance";

// Definimos el tipo de la respuesta de la API
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getReportAttedanceEventById = async (
  id: string
): Promise<EventAttedance> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/Attendance/ReportAttendanceByEvent/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener las asistencias de eventos");
    }

    // La respuesta de la API
    const data: ApiResponse<EventAttedance> = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data; // Aquí retornamos los datos correctamente tipados
  } catch (error) {
    throw error;
  }
};
