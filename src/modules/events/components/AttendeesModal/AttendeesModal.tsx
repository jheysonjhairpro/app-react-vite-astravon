import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaChalkboardTeacher, FaUser, FaUserGraduate } from "react-icons/fa";
import { formatTime } from "../../../../utils/common";
import { AttendeesModalProps } from "./AttendeesModalt.ypes";

const AttendeesModal: React.FC<AttendeesModalProps> = ({
  show,
  onClose,
  attendees,
}) => {
  const filteredAttendees = attendees.filter((attendee) => attendee.isPresent);
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lista de Asistentes Presentes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Cantidad de asistentes:{filteredAttendees.length}</p>
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          <ul className="list-group">
            {filteredAttendees.map((attendee) => (
              <li
                key={attendee.date}
                className="list-group-item d-flex align-items-center"
              >
                {attendee.role == 0 ? (
                  <FaChalkboardTeacher
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: "#007BFF",
                    }}
                  />
                ) : attendee.role == 1 ? (
                  <FaUserGraduate
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: "#155A9A",
                    }}
                  />
                ) : (
                  <FaUser
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: "#6C757D",
                    }}
                  />
                )}
                <span>
                  {attendee.firstName} {attendee.lastName}
                </span>
                <span className="ms-auto text-muted">
                  {formatTime(attendee?.date!)}
                </span>
              </li>
            ))}
          </ul>
          {filteredAttendees.length === 0 && (
            <p className="text-center text-muted">
              No hay asistentes presentes en este momento.
            </p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttendeesModal;
