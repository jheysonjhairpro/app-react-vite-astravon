import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

import { AddParticipantsModalProps } from "./AddParticipantsModal.types";
import { Participant } from "../../../../types/Participant";
import {
  addParticipantToEvent,
  searchParticipantByDni,
} from "../../../../services/EventService";
import { FaUserCircle } from "react-icons/fa";

const AddParticipantsModal: React.FC<AddParticipantsModalProps> = ({
  show,
  onClose,
  eventId,
}) => {
  const [dni, setDni] = useState("");
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState("");

  //---------------------------------------------------------------- GET PARTICIPANT BY DNI
  const handleSearchParticipant = async () => {
    if (!dni) {
      setError("El DNI es obligatorio.");
      return;
    }

    setLoading(true);
    setError("");
    setParticipant(null);

    try {
      const result = await searchParticipantByDni(dni);

      if (!result) {
        setError("Participante no encontrado.");
        return;
      }
      setParticipant(result);
    } catch (err) {
      setError(
        "Error al buscar el participante. Por favor, intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  //---------------------------------------------------------------- POST PARTICIPANT
  const handleAddParticipant = async () => {
    if (!participant || !eventId ) return;

    if( participant.role != 2){
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes registrarte como invitado para continuar.",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    setLoading2(true);
    try {
      const result = await addParticipantToEvent(
        eventId,
        participant.role,
        participant.idGuest!
      );

      if (!result.success) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
          confirmButtonText: "Aceptar",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: result.message,
        confirmButtonText: "Aceptar",
      });

      setLoading2(false);
      onClose();
      window.location.reload();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al intentar agregar al participante.",
        confirmButtonText: "Aceptar",
      });
      setLoading2(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Participantes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="searchDni">
            <Form.Label>Ingresar DNI</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <Button
              variant="primary"
              style={{ marginTop: "20px", width: "100%" }}
              onClick={handleSearchParticipant}
              disabled={loading || !dni}
            >
              {loading ? "Buscando..." : "Buscar"}
            </Button>
            {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
          </Form.Group>

          {participant && (
            <>
              <div className="text-center">
                <FaUserCircle
                  style={{
                    fontSize: "90px",
                    color: "#00407d",
                    borderRadius: "50%",
                    marginBottom: "20px",
                    marginTop: "20px",
                  }}
                />
                <p className="m-0">
                  {participant.firstName} {participant.lastName}
                </p>
                <p className="m-0 mb-1">
                  <strong>
                    {participant.role === 0
                      ? "Docente"
                      : participant.role === 1
                      ? "Estudiante"
                      : "Invitado"}
                  </strong>
                </p>
              </div>

              <div className="px-5">
                <Button
                  variant="primary"
                  style={{ marginTop: "10px", width: "100%" }}
                  onClick={handleAddParticipant}
                  disabled={loading2 || !dni}
                  >
                    {loading2 ? "Agregando..." : "Agregar"}
                </Button>
              </div>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddParticipantsModal;
