import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  actualizarGuest,
  eliminarGuest,
  getAllGuest,
} from "../../services/Guest";
import { Guest } from "../../types/Guest";
import { validateForm } from "../../utils/scheme/GuestValidationsForm";
import { Loading } from "../../components/ui/Loading";

export function Guests() {
  const [guest, setGuest] = useState<Guest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [guestPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [formErrors, setFormErrors] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const indexOfLastCliente = currentPage * guestPerPage;
  const indexOfFirstCliente = indexOfLastCliente - guestPerPage;
  const currentGuest = guest.slice(indexOfFirstCliente, indexOfLastCliente);

  const totalPages = Math.ceil(guest.length / guestPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const filteredGuest = currentGuest.filter((guest) =>
    Object.values(guest).some((value) =>
      value
        ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
  );

  //---------------------------------------------------------------- GET GUEST
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllGuest();
      if (data == null) {
        setGuest([]);
      } else {
        setGuest(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  //---------------------------------------------------------------- DELETE GUEST
  const handleDeleteGuest = async (id: number) => {
    try {
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      });

      if (confirmacion.isConfirmed) {
        const response = await eliminarGuest(id);
        if (!response.success) {
          throw new Error(response.message);
        }

        const updatedGuest = guest.filter((guest) => guest.idGuest !== id);
        setGuest(updatedGuest);
        await Swal.fire("¡Eliminado!", response.message, "success");
      }
    } catch (error) {
      Swal.fire("Error", "Oppss, algo salio mal!", "error");
    }
  };

  //---------------------------------------------------------------- EDIT GUEST
  const handleEditGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedGuest(null);
    setFormErrors({});
  };

  const saveChanges = async () => {
    if (selectedGuest?.idGuest) {
      const errors = validateForm(selectedGuest);
      setFormErrors(errors);

      if (Object.values(errors).some((error) => error !== "")) {
        return;
      }

      try {
        console.log(selectedGuest);
        const response = await actualizarGuest(selectedGuest);
        if (!response.success) {
          throw new Error(response.message);
        }
        setGuest(
          guest.map((user) =>
            user.idGuest === selectedGuest.idGuest ? selectedGuest : user
          )
        );
        Swal.fire("Actualizado", response.message, "success");
      } catch (error) {
        Swal.fire("Error", "Oppss, algo salió mal!", "error");
      }
    }

    setModalIsOpen(false);
    setSelectedGuest(null);
    setFormErrors({});
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Invitados</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Todos los invitados
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar Invitado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div
          className="table-responsive"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          {loading ? (
            <Loading />
          ) : filteredGuest.length === 0 ? (
            <div className="text-center">Sin Invitados</div>
          ) : (
            <table
              className="table table-striped table-bordered"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>DNI</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Mail</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuest.map((guest, index) => (
                  <tr key={index}>
                    <td>{guest.dni}</td>
                    <td>{guest.firstName}</td>
                    <td>{guest.lastName}</td>
                    <td>{guest.mail}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ marginRight: "6px" }}
                        title="Editar"
                        onClick={() => handleEditGuest(guest)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteGuest(guest.idGuest || 0)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {!loading && guest.length > 0 && (
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
              >
                <FaChevronLeft />
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 && "active"}`}
              >
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages && "disabled"
              }`}
            >
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
              >
                <FaChevronRight />
              </button>
            </li>
          </ul>
        )}
      </div>

      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Invitado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedGuest && (
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Nombre(s) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={selectedGuest.firstName}
                      onChange={(e) =>
                        setSelectedGuest({
                          ...selectedGuest,
                          firstName: e.target.value,
                        })
                      }
                    />
                    {formErrors.firstName && (
                      <small className="text-danger">
                        {formErrors.firstName}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Apellido(s) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={selectedGuest.lastName}
                      onChange={(e) =>
                        setSelectedGuest({
                          ...selectedGuest,
                          lastName: e.target.value,
                        })
                      }
                    />
                    {formErrors.lastName && (
                      <small className="text-danger">
                        {formErrors.lastName}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="dni" className="form-label">
                  DNI <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dni"
                  value={selectedGuest.dni}
                  onChange={(e) =>
                    setSelectedGuest({
                      ...selectedGuest,
                      dni: e.target.value,
                    })
                  }
                />
                {formErrors.dni && (
                  <small className="text-danger">{formErrors.dni}</small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="mail" className="form-label">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="mail"
                  value={selectedGuest.mail}
                  onChange={(e) =>
                    setSelectedGuest({
                      ...selectedGuest,
                      mail: e.target.value,
                    })
                  }
                />
                {formErrors.mail && (
                  <small className="text-danger">{formErrors.mail}</small>
                )}
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
