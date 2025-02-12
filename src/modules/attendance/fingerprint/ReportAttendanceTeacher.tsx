import { useEffect, useState } from "react";
import { Loading } from "../../../components/ui/Loading";
import { TeacherAttendance } from "../../../types/EventsAttendance";
import * as XLSX from "xlsx";

export function ReportAttendanceTeacher() {
  const [eventDetails, setEventDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingTeachers, setLoadingTeachers] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoadingTeachers(true);

        const simulatedData = {
          listTeacherAttendance: [
            {
              idTeacher: 1,
              dni: "12345678",
              firstName: "Juan",
              lastName: "Pérez",
              mail: "juan.perez@example.com",
              gender: true,
              attendance: {
                date: new Date().setHours(8, 30, 0),
                departureDate: new Date().setHours(16, 0, 0),
              },
            },
            {
              idTeacher: 2,
              dni: "87654321",
              firstName: "Ana",
              lastName: "Gómez",
              mail: "ana.gomez@example.com",
              gender: false,
              attendance: {
                date: new Date().setHours(9, 0, 0),
                departureDate: new Date().setHours(17, 0, 0),
              },
            },
          ],
        };

        setEventDetails(simulatedData);
      } catch (e) {
      } finally {
        setLoading(false);
        setLoadingTeachers(false);
      }
    };

    fetchEventDetails();
  }, []);

  const exportToExcel = () => {
    const data =
      eventDetails?.listTeacherAttendance?.map((teacher: any) => ({
        Nombre: `${teacher.firstName} ${teacher.lastName}`,
        Dni: teacher.dni,
        Email: teacher.mail,
        Genero: teacher.gender ? "Masculino" : "Femenino",
        HoraEntrada: new Date(teacher.attendance.date).toLocaleTimeString(),
        HoraSalida: new Date(
          teacher.attendance.departureDate
        ).toLocaleTimeString(),
      })) || [];

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Asistencias");

    XLSX.writeFile(
      wb,
      `Asistencias_Teachers_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Docentes</div>
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
        <div className="card p-5">
          <button className="btn btn-success mb-4" onClick={exportToExcel}>
            Descargar Excel
          </button>

          <div className="mb-4">
            <h6 className="mb-3 text-uppercase text-primary">Docentes</h6>
            <hr />
            {loadingTeachers ? (
              <Loading />
            ) : eventDetails?.listTeacherAttendance?.length > 0 ? (
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Dni</th>
                    <th>Email</th>
                    <th>Genero</th>
                    <th>Hora de Entrada</th>
                    <th>Hora de Salida</th>
                  </tr>
                </thead>
                <tbody>
                  {eventDetails.listTeacherAttendance.map(
                    (teacher: TeacherAttendance) => (
                      <tr key={teacher.idTeacher}>
                        <td>
                          {teacher.firstName} {teacher.lastName}
                        </td>
                        <td>{teacher.dni}</td>
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
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <p>No hay registro de asistencia para los docentes.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
