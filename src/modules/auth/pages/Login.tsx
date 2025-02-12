import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useAuth } from "../../../hooks/AuthContext";
import { loginUser } from "../../../services/User";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  //---------------------------------------------------------------- POST LOGIN
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password) {
      Swal.fire({
        title: "Datos incompletos",
        text: "Por favor, ingresa un usuario y una contraseña.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      const response = await loginUser(username, password);

      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("isAuthenticated", "true");
        setUser(response.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Bienvenido ${response.data.nameUser}`,
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/");
      } else {
        Swal.fire({
          title: "Algo salió mal!",
          text: response.message || "Usuario o contraseña incorrectos",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message || "Hubo un error al intentar iniciar sesión",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="row g-0">
      <div className="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center justify-content-center d-none d-xl-flex">
        <div className="card bg-transparent shadow-none rounded-0 mb-0">
          <div className="card-body">
            <img
              src="assets/images/login-images/login-cover.svg"
              className="img-fluid auth-img-cover-login"
              width={700}
            />
          </div>
        </div>
      </div>
      <div className="col-12 col-xl-5 col-xxl-4 auth-cover-right align-items-center justify-content-center">
        <div className="card rounded-0 m-3 shadow-none bg-transparent mb-0 ">
          <div
            className="card-body p-sm-5  m-4 "
            style={{
              borderRadius: "20px",
              boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div>
              <div className="mb-3 text-center">
                <img src="assets/images/logo-icon.png" width={120} />
              </div>
              <div className="text-center mb-4">
                <h5 className="mb-3 fs-4" style={{ fontWeight: "bold" }}>
                  Bienvenido
                </h5>
                <p className="mb-0 fs-6">
                  Continua iniciando sesión de manera rápida y sencilla!
                </p>
              </div>

              <div className="col-12 mb-4">
                <p
                  style={{ backgroundColor: "#eff0f4", textAlign: "center" }}
                  className=" w-100 p-3"
                >
                  INICIAR SESIÓN
                </p>
              </div>

              <div className="form-body">
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <label htmlFor="inputEmailAddress" className="form-label">
                      Usuario
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ padding: "9px" }}
                      id="inputEmailAddress"
                      placeholder="Usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputChoosePassword" className="form-label">
                      Contraseña
                    </label>
                    <div className="input-group" id="show_hide_password">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control border-end-0"
                        style={{ padding: "9px" }}
                        id="inputChoosePassword"
                        placeholder="Tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                      />
                      <a
                        className="input-group-text bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <i className="bx bx-show" />
                        ) : (
                          <i className="bx bx-hide" />
                        )}
                      </a>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary "
                        style={{ padding: "9px" }}
                      >
                        Ingresar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
