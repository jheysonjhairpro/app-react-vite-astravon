import { useRef, useState } from "react";

interface SidebarAuthProps {
  tipo: "login" | "register";
}

function SidebarAuth({ tipo }: SidebarAuthProps) {
  const [step, setStep] = useState<"email" | "code" | "register">("email");

  const handleNextStep = () => {
    if (step === "email") setStep("code");
    else if (step === "code") setStep("register");
  };
  const [verificationCode, setVerificationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d$/.test(value) && value !== "") return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && !verificationCode[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <div
      className="offcanvas offcanvas-end bg-sidebar text-white px-4 py-3"
      id="authSidebar"
      style={{
        backgroundImage: "url('../../assets/images/bg/prueba.png')",
        backgroundSize: "100% 100%", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="offcanvas-header">
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body d-flex flex-column align-items-center">
        <div className="d-flex align-items-center">
          <img
            src="../../assets/images/logo.png"
            alt="Logo"
            className="me-2"
            style={{ width: "40px", height: "35px" }}
          />
          <h5 className="text-white mb-0">stravon</h5>{" "}
        </div>

        <p className="mb-4">Ingresar o crear una cuenta aquí</p>
        {tipo === "login" ? (
          <form className="w-100 text-center">
            <div className="mb-2">
              <input
                type="email"
                className="form-control custom-input mb-3"
                id="emailInput"
                placeholder="Correo electrónico"
              />
            </div>

            <input
              type="password"
              className="form-control custom-input mb-3"
              id="passwordInput"
              placeholder="Contraseña"
            />

            <button
              className="btn btn-primary w-100"
              style={{ height: "3rem", borderRadius: "10px" }}
            >
              Ingresar
            </button>

            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1 border-light" />
              <span className="mx-2 text-white">o</span>
              <hr className="flex-grow-1 border-light" />
            </div>

            <button className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              />
              Ingresar con Google
            </button>
          </form>
        ) : (
          <>
            {step === "email" && (
              <div className="w-100">
                <div className="mb-2">
                  <input
                    type="email"
                    className="form-control custom-input mb-3"
                    id="emailInput"
                    placeholder="Correo electrónico"
                  />
                </div>
                <button
                  className="btn btn-primary w-100"
                  style={{ height: "3rem", borderRadius: "10px" }}
                  onClick={handleNextStep}
                >
                  Continuar →
                </button>{" "}
                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1 border-light" />
                  <span className="mx-2 text-white">o</span>
                  <hr className="flex-grow-1 border-light" />
                </div>
                <button className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center">
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                    }}
                  />
                  Ingresar con Google
                </button>
              </div>
            )}

            {step === "code" && (
              <div className="w-100">
                <div className="d-flex justify-content-between px-4">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      type="text"
                      className="form-control text-center "
                      style={{
                        width: "50px",
                        height: "50px",
                        fontSize: "24px",
                        borderRadius: "10px",
                      }}
                      value={verificationCode[index] || ""}
                      onChange={(e) => handleCodeChange(e, index)}
                      onKeyDown={(e) => handleBackspace(e, index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                    />
                  ))}
                </div>
                <button
                  className="btn btn-primary w-100 mt-3"
                  style={{ height: "3rem", borderRadius: "10px" }}
                  onClick={handleNextStep}
                >
                  Verificar código
                </button>
              </div>
            )}

            {step === "register" && (
              <form className="w-100">
                <input
                  type="text"
                  className="form-control custom-input mb-3"
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  className="form-control custom-input mb-3"
                  placeholder="Apellidos"
                />
                <input
                  type="password"
                  className="form-control custom-input mb-3"
                  placeholder="Contraseña"
                />
                <button
                  className="btn btn-primary w-100"
                  style={{ height: "3rem", borderRadius: "10px" }}
                >
                  Registrarse
                </button>{" "}
                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1 border-light" />
                  <span className="mx-2 text-white">o</span>
                  <hr className="flex-grow-1 border-light" />
                </div>
                <button className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center">
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                    }}
                  />
                  Ingresar con Google
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SidebarAuth;
