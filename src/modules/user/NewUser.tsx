import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validateForm } from "../../utils/scheme/UserValidationsForm";
import { createUser } from "../../services/User";

export function NewUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    mail: "",
    nameUser: "",
    phone: "",
    gender: "",
    dni: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    mail: "",
    nameUser: "",
    phone: "",
    gender: "",
    dni: "",
    password: "",
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
        setLoading(true);
        const userData = {
          name: formData.name,
          lastName: formData.lastName,
          mail: formData.mail,
          nameUser: formData.nameUser,
          phone: formData.phone,
          gender: formData.gender === "Masculino" ? true : false,
          dni: formData.dni,
          password: formData.password,
        };

        const response = await createUser(userData);
        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Usuario creado!",
            text: response.message,
            confirmButtonText: "Aceptar",
          });
          navigate("/users/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.message,
            confirmButtonText: "Aceptar",
          });
        }
        setLoading(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Opps, Algo salio mal",
          text: "Hubo un error al crear el Usuario. Por favor, intente nuevamente.",
          confirmButtonText: "Aceptar",
        });
        setLoading(false);
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Usuario</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Nuevo Usuario
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="card p-4">
          <div className="row">
            <div className="col-sm-3 d-flex flex-column align-items-center text-center">
              <img
                src="../../assets/images/avatars/avatar-4.png"
                alt="Usuario"
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
                              border: errors.name ? "1px solid red" : "",
                            }}
                          >
                            <i
                              className={`bx bx-user${
                                errors.name ? " text-danger" : ""
                              }`}
                            />
                          </span>

                          <input
                            type="text"
                            className={`form-control ${
                              errors.name ? "is-invalid" : ""
                            }`}
                            id="input01"
                            placeholder="Nombre"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.name && (
                          <small className="text-danger">{errors.name}</small>
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
                    <div className="row mb-3">
                      <label
                        htmlFor="input07"
                        className="col-sm-4 col-form-label"
                      >
                        Usuario
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{
                              border: errors.nameUser ? "1px solid red" : "",
                            }}
                          >
                            <i
                              className={`bx bx-id-card${
                                errors.nameUser ? " text-danger" : ""
                              }`}
                            />
                          </span>

                          <input
                            type="text"
                            className={`form-control ${
                              errors.nameUser ? "is-invalid" : ""
                            }`}
                            id="input07"
                            placeholder="Nombre de usuario"
                            name="nameUser"
                            value={formData.nameUser}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.nameUser && (
                          <small className="text-danger">
                            {errors.nameUser}
                          </small>
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
                        Correo Electrónico
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

                    <div className="row mb-3">
                      <label
                        htmlFor="input10"
                        className="col-sm-4 col-form-label"
                      >
                        Teléfono
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{
                              border: errors.phone ? "1px solid red" : "",
                            }}
                          >
                            <i
                              className={`bx bx-phone${
                                errors.phone ? " text-danger" : ""
                              }`}
                            />
                          </span>

                          <input
                            type="text"
                            className={`form-control ${
                              errors.phone ? "is-invalid" : ""
                            }`}
                            id="input10"
                            placeholder="Número de teléfono"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.phone && (
                          <small className="text-danger">{errors.phone}</small>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="input05"
                        className="col-sm-4 col-form-label"
                      >
                        Género
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{
                              border: errors.gender ? "1px solid red" : "",
                            }}
                          >
                            <i
                              className={`bx bx-user-circle${
                                errors.gender ? " text-danger" : ""
                              }`}
                            />
                          </span>

                          <select
                            className={`form-select ${
                              errors.gender ? "is-invalid" : ""
                            }`}
                            id="input05"
                            value={formData.gender}
                            onChange={handleChange}
                            name="gender"
                          >
                            <option value="">Seleccionar género</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                          </select>
                        </div>
                        {errors.gender && (
                          <small className="text-danger">{errors.gender}</small>
                        )}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="input02"
                        className="col-sm-4 col-form-label"
                      >
                        Contraseña
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{
                              border: errors.password ? "1px solid red" : "",
                            }}
                          >
                            <i
                              className={`bx bx-lock${
                                errors.password ? " text-danger" : ""
                              }`}
                            />
                          </span>

                          <input
                            type="password"
                            className={`form-control ${
                              errors.password ? "is-invalid" : ""
                            }`}
                            id="input02"
                            placeholder="********"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.password && (
                          <small className="text-danger">
                            {errors.password}
                          </small>
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
                            <i className="bx bx-user-check" />
                            Registrar usuario
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
