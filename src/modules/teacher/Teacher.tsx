import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  actualizarTeacher,
  eliminarTeacher,
  getAllTeacher,
} from "../../services/Teacher";
import { Teacher } from "../../types/Teacher";
import { validateForm } from "../../utils/scheme/TeacherValidationsForm";
import { Loading } from "../../components/ui/Loading";

export function Teachers() {
  const [teacher, setTeacher] = useState<Teacher[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teacherPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [formErrors, setFormErrors] = useState<any>({});
  const [loading, setLoading] = useState(true); 

  const indexOfLastTeacher = currentPage * teacherPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teacherPerPage;
  const currentTeacher = teacher.slice(indexOfFirstTeacher, indexOfLastTeacher);

  const totalPages = Math.ceil(teacher.length / teacherPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const filteredTeacher = currentTeacher.filter((teacher) =>
    Object.values(teacher).some((value) =>
      value
        ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
  );

  //---------------------------------------------------------------- GET TEACHER
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTeacher();
      if(data == null){
        setTeacher([]);
      }else{
        setTeacher(data)
      }
      setLoading(false); 
    };

    fetchData();
  }, []);

  //---------------------------------------------------------------- DELETE TEACHER
  const handleDeleteTeacher = async (id: number) => {
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
        const response = await eliminarTeacher(id);
        if (!response.success) {
          throw new Error(response.message);
        }

        const updatedTeacher = teacher.filter(
          (teacher) => teacher.idTeacher !== id
        );
        setTeacher(updatedTeacher);
        await Swal.fire("¡Eliminado!", response.message, "success");
      }
    } catch (error) {
      Swal.fire("Error", "Oppss, algo salio mal!", "error");
    }
  };

  //---------------------------------------------------------------- EDIT TEACHER
  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTeacher(null);
    setFormErrors({});
  };

  const saveChanges = async () => {
    if (selectedTeacher?.idTeacher) {
      const errors = validateForm(selectedTeacher);
      setFormErrors(errors);

      if (Object.values(errors).some((error) => error !== "")) {
        return;
      }

      try {
        const response = await actualizarTeacher(
          selectedTeacher
        );
        if (!response.success) {
          throw new Error(response.message);
        }
        setTeacher(
          teacher.map((user) =>
            user.idTeacher === selectedTeacher.idTeacher
              ? selectedTeacher
              : user
          )
        );
        Swal.fire("Actualizado", response.message, "success");
      } catch (error) {
        Swal.fire("Error", "Oppss, algo salió mal!", "error");
      }
    }

    setModalIsOpen(false);
    setSelectedTeacher(null);
    setFormErrors({});
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Docente</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Todos los docentes
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar docente..."
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
          ) : filteredTeacher.length === 0 ? (
            <div className="text-center">Sin docentes</div>
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
                  <th>Telefono</th>
                  <th>Género</th>
                  <th>Cumpleaños</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeacher.map((teacher, index) => (
                  <tr key={index}>
                    <td>{teacher.dni}</td>
                    <td>{teacher.firstName}</td>
                    <td>{teacher.lastName}</td>
                    <td>{teacher.mail}</td>
                    <td>{teacher.phone}</td>
                    <td>{teacher.gender ? "Masculino" : "Femenino"}</td>
                    <td>{teacher.birthDate}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ marginRight: "6px" }}
                        title="Editar"
                        onClick={() => handleEditTeacher(teacher)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDeleteTeacher(teacher.idTeacher || 0)
                        }
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
        {!loading && teacher.length > 0 && (
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
          <Modal.Title>Editar Docente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTeacher && (
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
                      value={selectedTeacher.firstName}
                      onChange={(e) =>
                        setSelectedTeacher({
                          ...selectedTeacher,
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
                      value={selectedTeacher.lastName}
                      onChange={(e) =>
                        setSelectedTeacher({
                          ...selectedTeacher,
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
                  value={selectedTeacher.dni}
                  onChange={(e) =>
                    setSelectedTeacher({
                      ...selectedTeacher,
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
                  value={selectedTeacher.mail}
                  onChange={(e) =>
                    setSelectedTeacher({
                      ...selectedTeacher,
                      mail: e.target.value,
                    })
                  }
                />
                {formErrors.mail && (
                  <small className="text-danger">{formErrors.mail}</small>
                )}
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label">
                    Teléfono <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={selectedTeacher.phone}
                    onChange={(e) =>
                      setSelectedTeacher({
                        ...selectedTeacher,
                        phone: e.target.value,
                      })
                    }
                  />
                  {formErrors.phone && (
                    <small className="text-danger">{formErrors.phone}</small>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="gender" className="form-label">
                    Género <span className="text-danger">*</span>
                  </label>
                  <select
                    id="gender"
                    className="form-control"
                    value={selectedTeacher.gender ? "Masculino" : "Femenino"}
                    onChange={(e) =>
                      setSelectedTeacher({
                        ...selectedTeacher,
                        gender: e.target.value === "Masculino",
                      })
                    }
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                  {formErrors.gender && (
                    <small className="text-danger">{formErrors.gender}</small>
                  )}{" "}
                </div>
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
