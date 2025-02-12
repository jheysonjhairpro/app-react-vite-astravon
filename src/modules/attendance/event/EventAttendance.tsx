import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CardEvent from "../components/CardEvent/CardEvent";
import { getAllEvents } from "../../../services/EventService";
import { Event } from "../../../types/Events";
import { Loading } from "../../../components/ui/Loading";

export function EventAttendance() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const navigate = useNavigate();

    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await getAllEvents();
          if(response == null){
            setEvents([]);
            setFilteredEvents([]);
          }else{
            setEvents(response);
            setFilteredEvents(response);
          }
          
        } catch (err: any) {
          console.error("Error fetching events:", err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }, []);

  const handleCardClick = (id: number) => {
    navigate(`/attendance-event/${id}`);
  };

  const handleFilter = () => {
    const filtered = events.filter((event) => {
      const eventDate = new Date(event.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (end) {
        end.setDate(end.getDate() + 1);
      }

      return (!start || eventDate >= start) && (!end || eventDate < end);
    });

    setFilteredEvents(filtered);
  };

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
                  Todas las asistencias
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleFilter}>
              Obtener Datos
            </button>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="row">
            {filteredEvents.map((event) => (
              <div className="col-md-3 mb-4" key={event.idEvent}>
                <div
                  onClick={() => handleCardClick(event.idEvent)}
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                >
                  <CardEvent
                    date={new Date(event.date).toLocaleDateString()}
                    title={event.name}
                    location={event.location}
                    hora={event.startTime}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
