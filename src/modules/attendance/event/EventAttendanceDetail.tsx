import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReportAttedanceEventById } from "../../../services/EventServiceDetail";
import { Loading } from "../../../components/ui/Loading";
import {
  EventAttedance,
  TeacherAttendance,
  StudentAttendance,
  GuestAttendance,
} from "../../../types/EventsAttendance";
import * as XLSX from "xlsx";

export function EventAttendanceDetail() {
  const { id } = useParams<{ id: string }>();
  const [eventDetails, setEventDetails] = useState<EventAttedance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingGuests, setLoadingGuests] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (id) {
          const response = await getReportAttedanceEventById(id);
          setEventDetails(response);
        }
      } catch (err: any) {
        console.error("Error fetching event details:", err.message);
        setError(
          "Hubo un error al cargar los detalles del evento. Por favor, intente nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    } else {
      setError("No se ha proporcionado un ID de evento válido.");
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (eventDetails) {
      setLoadingTeachers(false);
      setLoadingStudents(false);
      setLoadingGuests(false);
    }
  }, [eventDetails]);

  const calculateDuration = (startDate: string, endDate: string) => {
    const durationInMilliseconds = Math.abs(
      new Date(endDate).getTime() - new Date(startDate).getTime()
    );
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
    const minutes = Math.floor(durationInHours * 60);
    const seconds = Math.round((durationInHours * 3600) % 60);

    return `${minutes} min ${seconds} seg`;
  };

  const calculateStatus = (
    startTime: string,
    endTime: string,
    duration: string
  ) => {
    const eventStart = new Date(startTime).getTime();
    const eventEnd = new Date(endTime).getTime();
    const [durationHours, durationMinutes] = duration.split(" ").map(Number);
  
    const totalDurationInMinutes = durationHours * 60 + durationMinutes;
    const tolerance = 15;

    const effectiveDuration = (eventEnd - eventStart) / (1000 * 60) - tolerance;
  
    if (totalDurationInMinutes >= effectiveDuration) {
      return "Aceptado";
    } else {
      return "Rechazado";
    }
  };
  
  

  const exportToExcel = () => {
    const data = [
      ...(eventDetails?.listTeacherAttendance || []).map((teacher) => ({
        Tipo: "Docente",
        Dni: teacher.dni,
        Nombre: `${teacher.firstName} ${teacher.lastName}`,
        Email: teacher.mail,
        Genero: teacher.gender ? "Masculino" : "Femenino",
        HoraEntrada: new Date(teacher.attendance.date).toLocaleTimeString(),
        HoraSalida: new Date(
          teacher.attendance.departureDate
        ).toLocaleTimeString(),
        Duracion: calculateDuration(
          teacher.attendance.date,
          teacher.attendance.departureDate
        ),
        Estado: calculateStatus(
          eventDetails!.event.startTime,
          eventDetails!.event.endTime,
          calculateDuration(
            teacher.attendance.date,
            teacher.attendance.departureDate
          )
        ),
      })),
      ...(eventDetails?.listStudentAttendance || []).map((student) => ({
        Tipo: "Estudiante",
        Dni: student.dni,
        Nombre: `${student.firstName} ${student.lastName}`,
        Email: student.mail,
        Codigo: student.code,
        Genero: student.gender ? "Masculino" : "Femenino",
        Telefono: student.phone,
        HoraEntrada: new Date(student.attendance.date).toLocaleTimeString(),
        HoraSalida: new Date(
          student.attendance.departureDate
        ).toLocaleTimeString(),
        Duracion: calculateDuration(
          student.attendance.date,
          student.attendance.departureDate
        ),
        Estado: calculateStatus(
          eventDetails!.event.startTime,
          eventDetails!.event.endTime,
          calculateDuration(
            student.attendance.date,
            student.attendance.departureDate
          )
        ),
      })),
      ...(eventDetails?.listGuestAttendancee || []).map((guest) => ({
        Tipo: "Invitado",
        Dni: guest.dni,
        Nombre: `${guest.firstName} ${guest.lastName}`,
        Email: guest.mail,
        HoraEntrada: new Date(guest.attendance.date).toLocaleTimeString(),
        HoraSalida: new Date(
          guest.attendance.departureDate
        ).toLocaleTimeString(),
        Duracion: calculateDuration(
          guest.attendance.date,
          guest.attendance.departureDate
        ),
        Estado: calculateStatus(
          eventDetails!.event.startTime,
          eventDetails!.event.endTime,
          calculateDuration(
            guest.attendance.date,
            guest.attendance.departureDate
          )
        ),
      })),
    ];

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Asistencias");

    XLSX.writeFile(wb, "Asistencias_Evento.xlsx");
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3">Eventos</div>
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="#">
                      <i className="bx bx-home-alt" />
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Asistencias
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div className="alert alert-danger w-50 mx-auto">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Eventos</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Sus asistencias
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="card shadow-lg p-4">
          <h2 className="text-center mb-3">{eventDetails?.event.name}</h2>
          <h5 className="text-muted text-center">
            {eventDetails?.event.startTime} - {eventDetails?.event.endTime}
          </h5>
        </div>

        <div className="card p-5">
          <button className="btn btn-success mb-4" onClick={exportToExcel}>
            Descargar Excel
          </button>

          <div className="mb-4">
            <h6 className="mb-3 text-uppercase text-primary">Docentes</h6>
            <hr />
            {loadingTeachers ? (
              <Loading />
            ) : eventDetails?.listTeacherAttendance &&
              eventDetails.listTeacherAttendance.length > 0 ? (
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Dni</th>
                    <th>Nombres y apellidos</th>
                    <th>Email</th>
                    <th>Genero</th>
                    <th>Hora de entrada</th>
                    <th>Hora de salida</th>
                    <th>Duracion de asistencia</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {eventDetails.listTeacherAttendance.map(
                    (teacher: TeacherAttendance) => {
                      const duration = calculateDuration(
                        teacher.attendance.date,
                        teacher.attendance.departureDate
                      );
                      const status = calculateStatus(
                        eventDetails.event.startTime,
                        eventDetails.event.endTime,
                        duration
                      );
                      return (
                        <tr key={teacher.idTeacher}>
                          <td>{teacher.dni}</td>
                          <td>
                            {teacher.firstName} {teacher.lastName}
                          </td>
                          <td>{teacher.mail}</td>
                          <td>{teacher.gender ? "Masculino" : "Femenino"}</td>
                          <td>
                            {new Date(
                              teacher.attendance.date
                            ).toLocaleTimeString()}
                          </td>
                          <td>
                            {new Date(
                              teacher.attendance.departureDate
                            ).toLocaleTimeString()}
                          </td>
                          <td>{duration}</td>
                          <td>{status}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            ) : (
              <p>No hay registro de asistencia para los docentes.</p>
            )}
          </div>

          <div className="mb-4">
            <h6 className="mb-3 text-uppercase text-primary">Estudiantes</h6>
            <hr />
            {loadingStudents ? (
              <Loading />
            ) : eventDetails?.listStudentAttendance &&
              eventDetails.listStudentAttendance.length > 0 ? (
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Dni</th>
                    <th>Nombres y apellidos</th>
                    <th>Email</th>
                    <th>Codigo</th>
                    <th>Genero</th>
                    <th>Telefono</th>
                    <th>Hora de entrada</th>
                    <th>Hora de salida</th>
                    <th>Duracion de asistencia</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {eventDetails.listStudentAttendance.map(
                    (student: StudentAttendance) => {
                      const duration = calculateDuration(
                        student.attendance.date,
                        student.attendance.departureDate
                      );
                      const status = calculateStatus(
                        eventDetails.event.startTime,
                        eventDetails.event.endTime,
                        duration
                      );
                      return (
                        <tr key={student.idStudent}>
                          <td>{student.dni}</td>
                          <td>
                            {student.firstName} {student.lastName}
                          </td>
                          <td>{student.mail}</td>
                          <td>{student.code}</td>
                          <td>{student.gender ? "Masculino" : "Femenino"}</td>
                          <td>{student.phone}</td>
                          <td>
                            {new Date(
                              student.attendance.date
                            ).toLocaleTimeString()}
                          </td>
                          <td>
                            {new Date(
                              student.attendance.departureDate
                            ).toLocaleTimeString()}
                          </td>
                          <td>{duration}</td>
                          <td>{status}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            ) : (
              <p>No hay registro de asistencia para los estudiantes.</p>
            )}
          </div>

          <div className="mb-4">
            <h6 className="mb-3 text-uppercase text-primary">Invitados</h6>
            <hr />
            {loadingGuests ? (
              <Loading />
            ) : eventDetails?.listGuestAttendancee &&
              eventDetails.listGuestAttendancee.length > 0 ? (
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Dni</th>
                    <th>Nombres y apellidos</th>
                    <th>Email</th>
                    <th>Hora de entrada</th>
                    <th>Hora de salida</th>
                    <th>Duracion de asistencia</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {eventDetails.listGuestAttendancee.map(
                    (guest: GuestAttendance) => {
                      const duration = calculateDuration(
                        guest.attendance.date,
                        guest.attendance.departureDate
                      );
                      const status = calculateStatus(
                        eventDetails.event.startTime,
                        eventDetails.event.endTime,
                        duration
                      );
                      return (
                        <tr key={guest.idGuest}>
                          <td>{guest.dni}</td>
                          <td>
                            {guest.firstName} {guest.lastName}
                          </td>
                          <td>{guest.mail}</td>
                          <td>
                            {new Date(
                              guest.attendance.date
                            ).toLocaleTimeString()}
                          </td>
                          <td>
                            {new Date(
                              guest.attendance.departureDate
                            ).toLocaleTimeString()}
                          </td>
                          <td>{duration}</td>
                          <td>{status}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            ) : (
              <p>No hay registro de asistencia para los invitados.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
