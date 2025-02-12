import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { validateForm } from "../../utils/scheme/GuestValidationsForm";
import { addInvitedToEvent } from "../../services/Guest";

export function NewGuest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    mail: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    mail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.values(validationErrors).every((error) => !error)) {
      try {
        setLoading(true)
        const guestData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dni: formData.dni,
          mail: formData.mail,
        };

        const response = await addInvitedToEvent(guestData);
        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Invitado creado!",
            text: response.message,
            confirmButtonText: "Aceptar",
          });
          navigate("/guest/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.message,
            confirmButtonText: "Aceptar",
          });
        }
        setLoading(false)
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Opps, Algo salio mal",
          text: "Hubo un error al crear el Invitado. Por favor, intente nuevamente.",
          confirmButtonText: "Aceptar",
        });
        setLoading(false)
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Invitado</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Nuevo Invitado
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="card p-4">
          <div className="row">
            <div className="col-sm-3 d-flex flex-column align-items-center text-center">
              <img
                src="../../assets/images/avatars/avatar-2.png"
                alt="Estudiante"
                className="p-1 bg-primary"
                width={200}
              />
            </div>

            <div className="col-sm-9">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="row mb-3">
                      <label
                        htmlFor="input01"
                        className="col-sm-4 col-form-label"
                      >
                        Nombres
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{
                              border: errors.firstName ? "1px solid red" : "",
                            }}
                          >
                            <i
                              className={`bx bx-user${
                                errors.firstName ? " text-danger" : ""
                              }`}
                            />
                          </span>

                          <input
                            type="text"
                            className={`form-control ${
                              errors.firstName ? "is-invalid" : ""
                            }`}
                            id="input01"
                            placeholder="Nombre"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.firstName && (
                          <small className="text-danger">
                            {errors.firstName}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="input02"
                        className="col-sm-4 col-form-label"
                      >
                        Apellidos
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{
                              border: errors.lastName ? "1px solid red" : "",
                            }}
                          >
                            <i
                              className={`bx bx-user${
                                errors.lastName ? " text-danger" : ""
                              }`}
                            />
                          </span>

                          <input
                            type="text"
                            className={`form-control ${
                              errors.lastName ? "is-invalid" : ""
                            }`}
                            id="input02"
                            placeholder="Apellidos"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.lastName && (
                          <small className="text-danger">
                            {errors.lastName}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="input07"
                        className="col-sm-4 col-form-label"
                      >
                        DNI
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{
                              border: errors.dni ? "1px solid red" : "",
                            }}
                          >
                            <i
                              className={`bx bx-id-card${
                                errors.dni ? " text-danger" : ""
                              }`}
                            />
                          </span>

                          <input
                            type="text"
                            className={`form-control ${
                              errors.dni ? "is-invalid" : ""
                            }`}
                            id="input07"
                            placeholder="DNI"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.dni && (
                          <small className="text-danger">{errors.dni}</small>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="row mb-3">
                      <label
                        htmlFor="input09"
                        className="col-sm-4 col-form-label"
                      >
                        Correo Electrónico (Opcional)
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{
                              border: errors.mail ? "1px solid red" : "",
                            }}
                          >
                            <i
                              className={`bx bx-envelope${
                                errors.mail ? " text-danger" : ""
                              }`}
                            />
                          </span>

                          <input
                            type="text"
                            className={`form-control ${
                              errors.mail ? "is-invalid" : ""
                            }`}
                            id="input09"
                            placeholder="Email"
                            name="mail"
                            value={formData.mail}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.mail && (
                          <small className="text-danger">{errors.mail}</small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                  <div className="col"></div>
                  <div className="col-auto ml-auto">
                  <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            />{" "}
                            Registrando...
                          </>
                        ) : (
                          <>
                            <i className="bx bx-user-circle" /> Registrar
                            invitado
                          </>
                        )}
                      </button>
                  </div>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
