import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

import { AddInvitedsModalProps } from "./AddInvitedModal.types";
import { addInvitedToEvent } from "../../../../services/Guest";

const AddInvitedModal: React.FC<AddInvitedsModalProps> = ({
  show,
  onClose,
}) => {
  const [dni, setDni] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //---------------------------------------------------------------- POST PARTICIPANT
  const handleAddParticipant = async () => {
    if (!firstName || !lastName || !dni) {
      setError("Por favor complete todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    const participantData = {
      firstName,
      lastName,
      mail: email,
      dni,
    };

    try {
      const result = await addInvitedToEvent(participantData);

      if (!result.success) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
          confirmButtonText: "Aceptar",
        });
        setLoading(false);
        return;
      }

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: result.message,
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
      onClose();
      window.location.reload();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al intentar agregar al participante.",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
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
        <Modal.Title>Agregar Invitado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="firstName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese los Apellidos"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="dni">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              placeholder="00000000"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>
              Correo Electrónico{" "}
              <span style={{ color: "#aaa" }}>(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}

          <Button
            variant="primary"
            style={{ marginTop: "20px", width: "100%" }}
            onClick={handleAddParticipant}
            disabled={loading || !firstName || !lastName || !dni}
          >
            {loading ? "Agregando..." : "Agregar Participante"}
          </Button>
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

export default AddInvitedModal;
