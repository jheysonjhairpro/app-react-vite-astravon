export default function AttendanceSection({
    title,
    attendanceList,
    headers,
  }: {
    title: string;
    attendanceList: any[];
    headers: string[];
  }) {
    const calculateDuration = (start: string | null, end: string | null): number | "-" => {
      if (!start || !end) return "-";
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return "-"; 
      const durationInMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
      return durationInMinutes > 0 ? Math.round(durationInMinutes) : "-";
    };
  
    const isWithinTolerance = (start: string | null, end: string | null, expectedDuration: number): boolean => {
      if (!start || !end || expectedDuration <= 0) return false;
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return false; 
      const actualDuration = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
      return Math.abs(actualDuration - expectedDuration) <= 15;
    };
  
    return (
      <div className="card shadow-lg p-3 mb-4">
        <h6 className="mb-3 text-uppercase">{title}</h6>
        <hr />
        {attendanceList.length > 0 ? (
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-light">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((item: any, index: number) => {
                const duration = calculateDuration(item.attendance?.date, item.attendance?.departureDate);
                const withinTolerance =
                  duration !== "-" &&
                  isWithinTolerance(item.attendance?.date, item.attendance?.departureDate, item.attendance?.expectedDuration || 0);
  
                return (
                  <tr key={index}>
                    <td>{item.dni}</td>
                    <td>
                      {item.firstName} {item.lastName}
                    </td>
                    <td>{item.mail}</td>
                    <td>{item.gender ? "Masculino" : "Femenino"}</td>
                    <td>{new Date(item.attendance?.date).toLocaleDateString() || "-"}</td>
                    <td>{item.attendance?.departureDate || "-"}</td>
                    <td>{duration !== "-" ? `${duration} min` : "-"}</td>
                    <td className="text-center">
                      <i
                        className={`bx ${
                          withinTolerance ? "bx-check-circle text-success" : "bx-x-circle text-danger"
                        }`}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-muted text-center">
            No hay registros disponibles para {title.toLowerCase()}.
          </p>
        )}
      </div>
    );
  }
  