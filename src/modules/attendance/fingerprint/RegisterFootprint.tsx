import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiFingerprint } from "react-icons/bi";
import Swal from "sweetalert2";
import { getAllTeacher } from "../../../services/Teacher";
import { Teacher } from "../../../types/Teacher";
import { validateForm } from "../../../utils/scheme/TeacherValidationsForm";
import { Loading } from "../../../components/ui/Loading";

export function RegisterFootprint() {
  const [teacher, setTeacher] = useState<Teacher[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teacherPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  //const [formErrors, setFormErrors] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);

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

  const [activeStep, setActiveStep] = useState(0);
  const [showFingerprint, setShowFingerprint] = useState(false);

  //---------------------------------------------------------------- GET TEACHER
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTeacher();
      if (data == null) {
        setTeacher([]);
      } else {
        setTeacher(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  //---------------------------------------------------------------- REGISTER FOOTPRINT
  const handleRegisterFootprintTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setModalIsOpen(true);
    setStep(1);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTeacher(null);
    //setFormErrors({});
  };

  const continueToNextStep = () => {
    setStep(2);
  };

  const handleFingerprintClick = () => {
    setShowFingerprint(true);
    if (activeStep < 3) {
      setActiveStep((prevStep) => prevStep + 1);
    }
    setTimeout(() => {
      setShowFingerprint(false);
    }, 2000);
    if (activeStep === 2) {
      Swal.fire({
        title: "Registrado!",
        text: "Se registro tu huella correctamente",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };
  const saveChanges = async () => {
    if (selectedTeacher?.idTeacher) {
      const errors = validateForm(selectedTeacher);
      //setFormErrors(errors);

      if (Object.values(errors).some((error) => error !== "")) {
        return;
      }

      try {
        Swal.fire(
          "Registrado!",
          "Se registro tu huella correctamente",
          "success"
        );
      } catch (error) {
        Swal.fire("Error", "Oppss, algo salió mal!", "error");
      }
    }

    setModalIsOpen(false);
    setSelectedTeacher(null);
    //setFormErrors({});
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
                  Registrar huella
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
                  <th>Estado</th>
                  <th>Registrar</th>
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
                    <td className="text-center">
                      <span className="text-white bg-danger rounded-3 p-1">
                        No completado
                      </span>
                    </td>

                    <td className="text-center">
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ marginRight: "6px" }}
                        title="Registrar Huella"
                        onClick={() => handleRegisterFootprintTeacher(teacher)}
                      >
                        <BiFingerprint />
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

      <Modal show={modalIsOpen} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Huella</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <button
            onClick={handleFingerprintClick}
            className="position-absolute d-flex align-items-center justify-content-center"
            style={{
              top: "10%",
              left: "90%",
              transform: "translate(-10%, -10%)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#155a9a",
              border: "none",
              color: "#fff",
              fontSize: "18px",
            }}
          ></button>
          {step === 1 && (
            <>
              <p>
                Este proceso te permitirá registrar tu huella para su uso en
                asistencia y otras funciones. Asegúrate de estar listo para
                continuar.
              </p>
              <div className="text-center">
                <img
                  src="../../assets/images/hand.png"
                  alt="Huella"
                  width="300"
                  height="200"
                />
              </div>

              <h4 className="text-center">
                {selectedTeacher?.firstName} {selectedTeacher?.lastName}
              </h4>

              <p className="text-center">{selectedTeacher?.dni}</p>
              <hr />
              <div className="d-flex justify-content-end align-items-center">
                <Button
                  variant="secondary"
                  className="me-3"
                  onClick={closeModal}
                >
                  Terminar
                </Button>
                <Button variant="primary" onClick={continueToNextStep}>
                  Continuar
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h6 className="text-left px-5">
                Escanear su medio derecho Dedo cuatro veces
              </h6>
              <div className="d-flex align-items-center mb-4 px-5 py-2">
                <div
                  className="w-40 d-flex flex-column align-items-center text-center p-4"
                  style={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src="../../../assets/images/avatars/avatar_huella.png"
                    alt="Foto de usuario"
                    style={{
                      width: "80%",
                      height: "100%",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />

                  <h5
                    className="mb-1"
                    style={{
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    {selectedTeacher?.firstName +
                      " " +
                      selectedTeacher?.lastName}
                  </h5>
                  <p
                    className="mb-1"
                    style={{
                      color: "#555",
                      fontSize: "14px",
                    }}
                  >
                    <strong>DNI:</strong> {selectedTeacher?.dni}
                  </p>
                  <p
                    className="mb-0"
                    style={{
                      color: "#555",
                      fontSize: "14px",
                    }}
                  >
                    <strong>Teléfono:</strong>{" "}
                    {selectedTeacher?.phone || "No disponible"}
                  </p>
                </div>
                <div
                  className="w-60 d-flex flex-column mt-4"
                  style={{ paddingLeft: "50px" }}
                >
                  <div className="d-flex">
                    <div className="w-40 d-flex flex-column align-items-center justify-content-center">
                      <div
                        className="rounded-circle"
                        style={{
                          width: "90px",
                          height: "105px",
                          border: "3px solid #155A9A",
                        }}
                      >
                        {showFingerprint && (
                          <div
                            className="position-absolute"
                            style={{
                              top: "50%",
                              left: "50%",
                              transform: "translate(-46%, -123%)",
                              width: "130px",
                              height: "110px",
                              borderRadius: "50%",

                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src="../../../assets/images/huella.png"
                              alt="Huella Digital"
                              style={{
                                width: "85%",
                                height: "85%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <img
                        src="../../../assets/images/hand_pintado.png"
                        alt="Huella Digital"
                        style={{
                          width: "90px",

                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <div className="w-60 px-4">
                      <div
                        className="border p-3 rounded"
                        style={{ borderColor: "#155a9a" }}
                      >
                        <h5 className="text-center mb-3">Pasos</h5>
                        <div className="d-flex justify-content-between">
                          {[1, 2, 3].map((step) => (
                            <div
                              key={step}
                              className="text-center"
                              style={{
                                width: "30%",
                                padding: "10px",
                                borderRadius: "5px",
                                backgroundColor:
                                  step <= activeStep
                                    ? "#155a9a"
                                    : "transparent",
                                color: step <= activeStep ? "white" : "#155a9a",
                                border: `1px solid ${
                                  step <= activeStep ? "#155a9a" : "#ccc"
                                }`,
                              }}
                            >
                              <p className="mb-0">Paso {step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-primary mt-4">
                    Se ha realizado la digitalización. Vuelva a colocar el dedo
                    en el lector de huella digital.
                  </p>
                </div>
              </div>

              <hr />
              <div className="d-flex justify-content-end align-items-center">
                <Button
                  variant="secondary"
                  className="me-3"
                  onClick={closeModal}
                >
                  Terminar
                </Button>
                <Button variant="primary" onClick={saveChanges}>
                  Guardar Huella
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
