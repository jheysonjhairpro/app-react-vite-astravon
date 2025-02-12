import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


export default function TeachersAssistance() {
  const [showModal, setShowModal] = useState(false);
 const navigate = useNavigate();
  useEffect(() => {

    setShowModal(true);
  }, []);

  const handleConfirm = () => {
    alert("Huella registrada exitosamente");
    setShowModal(false);
    navigate("/teacher/");
  };
  const hide = () => {
   
    setShowModal(false);
    navigate("/teacher/");
  };
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Toma de Asistencia</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h6>Coloca tu dedo en el lector de huellas para registrar tu asistencia</h6>
              <img
                src="https://media.istockphoto.com/id/1282383374/es/vector/icono-de-huella-digital-sobre-fondo-transparente.jpg?s=612x612&w=0&k=20&c=2BM00xvbrONCwsTCXh_ti8S3ZhLJI9ffEUX0fDO1Poo="
                alt="Huella dactilar"
                className="img-fluid mt-3"
                style={{width:"120px"}}
              />
              <p className="mt-4">
                Si tienes problemas, contacta al administrador.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hide}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Confirmar Asistencia
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
