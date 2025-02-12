import { useEffect, useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Participant } from "../../types/Participant";
import AddParticipantsModal from "./components/AddParticipantsModal/AddParticipantsModal";
import AttendeesModal from "./components/AttendeesModal/AttendeesModal";
import { Event } from "../../types/Events";
import {
  closeEvent,
  getEventById,
  getPartipantEventById,
} from "../../services/EventService";
import { Loading } from "../../components/ui/Loading";
import AttendanceModal from "./components/AttendanceModal/AttendanceModal";
import AddInvitedModal from "./components/AddInvitedModal/AddInvitedModal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function DetailEvent() {
  const { id } = useParams<{ id: string }>();

  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddParticipantsModal, setShowAddParticipantsModal] =
    useState(false);
  const [showAddInvitedModal, setShowAddInvitedModal] = useState(false);

  const handleOpenAttendanceModal = () => setShowAttendanceModal(true);
  const handleOpenViewModal = () => setShowViewModal(true);
  const handleCloseViewModal = () => setShowViewModal(false);
  const handleOpenAddParticipantsModal = () =>
    setShowAddParticipantsModal(true);
  const handleOpenAddInvitedModal = () => setShowAddInvitedModal(true);

  const [imageLoading, setImageLoading] = useState(true);
  const [loadingSpinner, setLoadingSpinner] = useState(true);

  const [eventData, setEventData] = useState<Event | null>(null);
  const [participantData, setParticipantData] = useState<Participant[]>([]);
  const navigate = useNavigate();
  //---------------------------------------------------------------- GET PARTICPANT AND EVENT
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEventById(Number(id));
        setEventData(event);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    const fetchParticipantEvent = async () => {
      try {
        const participant = await getPartipantEventById(Number(id));
        setParticipantData(participant);
      } catch (error) {
        console.error("Error fetching participant event:", error);
      } finally {
        setLoadingSpinner(false);
      }
    };

    const fetchData = () => {
      fetchEvent();
      fetchParticipantEvent();
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [id]);

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    const durationInMs = end.getTime() - start.getTime();

    const durationInMinutes = durationInMs / (1000 * 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.floor(durationInMinutes % 60);

    return `${hours} horas ${minutes} minutos`;
  };

  //---------------------------------------------------------------- DELETE EVENT
  const handleCloseEvent = async () => {
    try {
      const response = await closeEvent(Number(id));
      console.log(response);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "¡Evento deshabilitado!",
          text: response.message,
          confirmButtonText: "Aceptar",
        });
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message,
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Opps, Algo salio mal",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const eventImages: { [key: number]: string } = {
    0: "https://cdn.goconqr.com/uploads/media/image/29660408/desktop_50fb8cca-040d-4a46-8a44-83b47ae93438.jpeg",
    1: "https://alianzaestudiantil.org/wp-content/uploads/2022/03/conferencias-para-profesionales.jpg",
    2: "https://tesisymasters.com.co/wp-content/uploads/2022/08/imagenes-de-blog-13.jpg",
    3: "https://media.istockphoto.com/id/523998271/es/vector/vector-de-las-personas-de-negocios-reuniones-y-discurso-de-burbujas.jpg?s=612x612&w=0&k=20&c=JiOZGsJQoBjrhhRTqrSaiDAAgE4pwMKNAIXuNbxVJL4=",
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Evento</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a>
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Detalles del evento
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="card border-primary border-bottom border-3 border-0">
          <div className="row g-0">
            <div className="col-md-4 border-end">
              {imageLoading && <Loading />}{" "}
              <img
                src={eventImages[eventData?.eventTypeId!]}
                className="img-fluid"
                alt="..."
                onLoad={() => setImageLoading(false)}
                style={{
                  display: imageLoading ? "none" : "block",
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
              <div className="row mb-3 row-cols-auto g-2 justify-content-center mt-3">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between mb-2">
                    <p className="m-0">
                      <strong>Fecha:</strong>{" "}
                      {new Date(eventData?.date!).toLocaleDateString()}
                    </p>
                    <small className="text-muted">{eventData?.startTime}</small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="card-text m-0">
                      <strong>Ubicación:</strong> {eventData?.location}
                    </p>
                    <small className="text-muted d-flex align-items-center mb-0">
                      <span>
                        {eventData?.isPrivate ? (
                          <FaLock style={{ marginRight: "5px" }} />
                        ) : (
                          <FaLockOpen style={{ marginRight: "5px" }} />
                        )}
                      </span>
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="card-text m-0">
                      <strong>Duración:</strong>
                      {eventData && eventData.startTime && eventData.endTime
                        ? calculateDuration(
                            eventData.startTime,
                            eventData.endTime
                          )
                        : "Duración no disponible"}
                    </p>
                  </div>

                  <div
                    className="card-text text-justify"
                    style={{
                      borderTop: "1px solid #ddd",
                      paddingTop: "10px",
                      maxHeight: "100px",
                      overflowY: "auto",
                      marginTop: "10px",
                    }}
                  >
                    <p>{eventData?.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="card-title">{eventData?.name}</h2>
                  <button
                    disabled={eventData?.isOpen == false}
                    className="btn btn-danger"
                    onClick={handleCloseEvent}
                  >
                    Cerrar Evento
                  </button>
                </div>
                <div className="gap-3">
                  <div className="cursor-pointer">
                    <i className="bx bxs-star text-warning"></i>
                    <i className="bx bxs-star text-warning"></i>
                    <i className="bx bxs-star text-warning"></i>
                    <i className="bx bxs-star text-warning"></i>
                    <i className="bx bxs-star text-warning"></i>
                  </div>
                  <div>
                    {
                      participantData.filter(
                        (participant) => participant.role === 2
                      ).length
                    }{" "}
                    Participantes invitados
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-12">
                    <h6 className="text-bold">NUEVOS INVITADOS</h6>
                    <ul
                      style={{
                        listStyleType: "none",
                        padding: 0,
                        height: "250px",
                        overflowY: "auto",
                      }}
                    >
                      {loadingSpinner ? (
                        <Loading />
                      ) : (
                        participantData
                          .filter((participant) => participant.role === 2)
                          .map((participant) => (
                            <li
                              key={participant.idTeacher}
                              style={{
                                borderBottom: "1px solid #ddd",
                                padding: "5px 0",
                              }}
                            >
                              {participant.firstName}{" "}
                              {participant.lastName || "Sin apellido"}
                            </li>
                          ))
                      )}
                    </ul>
                  </div>
                </div>

                <hr />
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={handleOpenAttendanceModal}
                    disabled={eventData?.isOpen == false}
                  >
                    <span className="text">Tomar Asistencia</span>
                    <i className="bx bx-barcode" />
                  </button>

                  <div className="d-flex gap-3">
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleOpenViewModal}
                      disabled={eventData?.isOpen == false}
                    >
                      <span className="text">Ver Asistentes</span>
                      <i className="bx bxs-user"></i>
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleOpenAddInvitedModal}
                      disabled={eventData?.isOpen == false}
                    >
                      <span className="text">Agregar Invitado</span>
                      <i className="bx bxs-user"></i>
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleOpenAddParticipantsModal}
                      disabled={eventData?.isOpen == false}
                    >
                      <span className="text">Agregar Participantes</span>
                      <i className="bx bxs-user"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddInvitedModal
        show={showAddInvitedModal}
        onClose={() => setShowAddInvitedModal(false)}
      />

      <AddParticipantsModal
        show={showAddParticipantsModal}
        onClose={() => setShowAddParticipantsModal(false)}
        eventId={Number(id)}
      />

      <AttendanceModal
        show={showAttendanceModal}
        onHide={() => setShowAttendanceModal(false)}
        eventId={id}
        startTime={eventData?.startTime}
        endTime={eventData?.endTime}
      />

      <AttendeesModal
        show={showViewModal}
        onClose={handleCloseViewModal}
        attendees={participantData}
      />
    </div>
  );
}

export default DetailEvent;
