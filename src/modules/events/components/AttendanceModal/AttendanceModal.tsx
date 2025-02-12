import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import CustomClock from "../../../../components/ui/CustomClock";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

import { asistenciaEvent } from "../../../../services/Attendance";
import { ParticipantAttendance } from "../../../../types/Participant";

interface AttendanceModalProps {
  show: boolean;
  onHide: () => void;
  eventId: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({
  show,
  onHide,
  eventId,
  startTime,
  endTime,
}) => {
  const [dni, setDni] = useState<string>("");
  const [userData, setUserData] = useState<ParticipantAttendance | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [dniError, setDniError] = useState<string | null>(null);
  const [attendanceType, setAttendanceType] = useState<"entrada" | "salida">(
    "entrada"
  );
  const dniInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (show) {
      setDni("");
      setUserData(null);
      setDniError(null);
      setDisabled(false);
    }
  }, [show]);

  useEffect(() => {
    if (dni.length === 8 && !isNaN(Number(dni))) {
      handleDniSubmit();
    }
  }, [dni]);

  useEffect(() => {
    if (dni === "" && dniInputRef.current) {
      dniInputRef.current.focus();
    }
  }, [dni, disabled]);

  const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDni(e.target.value);
  };

  const handleAttendanceTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAttendanceType(e.target.checked ? "salida" : "entrada");
  };

  //---------------------------------------------------------------- POST ATTENDANCE
  const handleDniSubmit = async () => {
    if (dni.length !== 8 || isNaN(Number(dni))) {
      setDniError("Por favor ingrese un DNI válido de 8 dígitos.");
      setTimeout(() => {
        setDniError(null);
      }, 3000);
      return;
    } else {
      setDniError(null);
    }
    if (!startTime || !endTime) {
      setDniError("La hora de inicio o fin no está definida.");
      return;
    }

    const parseTime = (time: string): Date => {
      const [hours, minutes] = time.split(":").map(Number);
      const now = new Date();
      now.setHours(hours, minutes, 0, 0);
      return now;
    };

    const startDateTime = parseTime(startTime);

    const currentTime = new Date();

    const isLate = currentTime > new Date(startDateTime.getTime() + 15 * 60000);

    const band = attendanceType === "entrada";

    setDisabled(true);
    setLoading(true);

    try {
      const eventData = {
        dni,
        eventId: parseInt(eventId || "0"),
        band,
        isLate,
      };
      console.log(eventData);
      const response = await asistenciaEvent(eventData);

      if (response.success) {
        if (response.data) {
          setUserData({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            role: response.data.role,
          });

          Swal.fire({
            icon: "success",
            title: "Asistencia",
            text: response.message,
            confirmButtonText: "Aceptar",
            position: "top-end",
            timer: 3000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.message,
            confirmButtonText: "Aceptar",
            position: "top-end",
            timer: 3000,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Opps, Algo salio mal",
          text: "Por favor, intente nuevamente.",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      setDniError("Hubo un error al buscar el usuario.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setDni("");
        setUserData(null);
        setDisabled(false);
      }, 3000);
    }
  };
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Tomar Asistencia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#EAF1F7",
              marginRight: "10px",
              marginLeft: "30px",
            }}
          >
            <Form.Check
              type="switch"
              id="attendanceTypeSwitch"
              label={attendanceType === "entrada" ? "Entrada" : "Salida"}
              checked={attendanceType === "salida"}
              onChange={handleAttendanceTypeChange}
              style={{
                position: "absolute",
                top: "-64px",
                left: "86%",
                transform: "translateX(-50%)",
                fontSize: "18px",
              }}
            />
            <Form.Check
              type="switch"
              id="attendanceTypeSwitch"
              label={attendanceType === "entrada" ? "Entrada" : "Salida"}
              checked={attendanceType === "salida"}
              onChange={handleAttendanceTypeChange}
              style={{
                position: "absolute",
                top: "-64px",
                left: "86%",
                transform: "translateX(-50%)",
                fontSize: "18px",
              }}
            />
            <CustomClock />
          </div>
          <div
            style={{
              width: "60%",
              paddingRight: "50px",
              paddingLeft: "50px",
            }}
          >
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group controlId="formDni">
                <Form.Label>Digite Identificación</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese DNI"
                  value={dni}
                  onChange={handleDniChange}
                  disabled={disabled}
                  autoFocus
                  ref={dniInputRef}
                />
              </Form.Group>
              {dniError && (
                <Alert
                  variant="danger"
                  style={{ marginTop: "10px", padding: "10px" }}
                >
                  {dniError}
                </Alert>
              )}
              <Button
                variant="primary"
                style={{ marginTop: "10px", width: "100%" }}
                type="submit"
                disabled={loading || disabled}
                onClick={handleDniSubmit}
              >
                {loading ? "Buscando..." : "Capturar"}
              </Button>
            </Form>

            <div
              style={{
                marginTop: "20px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                background: "#f9f9f9",
                height: "200px",
              }}
            >
              {userData && (
                <div className="text-center">
                  <FaUserCircle
                    style={{
                      fontSize: "60px",
                      color: "#5cd198",
                      borderRadius: "50%",
                      marginBottom: "15px",
                    }}
                  />
                  <p className="m-0">
                    {userData.firstName} {userData.lastName}
                  </p>
                  <p className="m-0 mb-1">
                    <strong>Rol:</strong>{" "}
                    {userData.role === 0
                      ? "Docente"
                      : userData.role === 1
                      ? "Estudiante"
                      : "Invitado"}
                  </p>

                  <div
                    style={{
                      backgroundColor: "#5cd198",
                      color: "white",
                      padding: "8px",
                      borderRadius: "5px",
                      marginLeft: "30px",
                      marginRight: "30px",
                    }}
                  >
                    <strong>Asistencia</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={onHide}>
          Terminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttendanceModal;
