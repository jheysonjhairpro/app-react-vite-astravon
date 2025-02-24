import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import SidebarAuth from "../modules/auth/pages/SidebarAuth";

function AppLayout() {
  const [authType, setAuthType] = useState<"login" | "register">("login");

  // ---------------------------------------------------------------- SCRIPTS
  useEffect(() => {
    const scriptPaths = [
      "../assets/js/bootstrap.bundle.min.js",
      "../assets/js/jquery.min.js",
      "../assets/plugins/simplebar/js/simplebar.min.js",
      "../assets/plugins/metismenu/js/metisMenu.min.js",
      "../assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js",
      "../assets/plugins/vectormap/jquery-jvectormap-2.0.2.min.js",
      "../assets/plugins/vectormap/jquery-jvectormap-world-mill-en.js",
      "../assets/js/app.js",
    ];

    const loadScript = (path: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = path;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadScripts = async () => {
      for (const scriptPath of scriptPaths) {
        try {
          await loadScript(scriptPath);
        } catch (error) {
          console.error(`Failed to load script: ${scriptPath}`, error);
        }
      }
      console.log("All scripts loaded successfully.");
    };

    loadScripts();
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="sidebar-wrapper bg-brown" data-simplebar="true">
          <div className="sidebar-header bg-brown">
            <div>
              <img
                src="../../assets/images/logo_small.png"
                className="logo-icon"
                alt="logo icon"
              />
            </div>
            <div>
              <h4 className="logo-text" style={{ fontWeight: "bold" }}>
                Astravon
              </h4>
            </div>
            <div className="toggle-icon ms-auto">
              <i className="bx bx-arrow-back text-white" />
            </div>
          </div>
          <ul className="metismenu" id="menu">
            <li>
              <NavLink to="/">
                <div className="parent-icon">
                  <i className="bx bx-message-dots" />
                </div>
                <div className="menu-title">Foro</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/podcast">
                <div className="parent-icon">
                  <i className="bx bx-headphone" />
                </div>
                <div className="menu-title">Podcast</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/schools">
                <div className="parent-icon">
                  <i className="bx bx-buildings" />
                </div>
                <div className="menu-title">Escuelas</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/activities">
                <div className="parent-icon">
                  <i className="bx bx-time-five" />
                </div>
                <div className="menu-title">Actividades</div>
              </NavLink>
            </li>
          </ul>
        </div>
        <header>
          <div className="topbar d-flex align-items-center bg-brown">
            <nav className="navbar navbar-expand gap-3 w-100">
              <div className="nav-search me-auto d-flex align-items-center w-25">
                <form
                  className="d-flex align-items-center gap-2 w-100"
                  role="search"
                >
                  <input
                    className="form-control bg-brown-light flex-grow-1 me-2"
                    type="text"
                    placeholder="Buscar..."
                    aria-label="Search"
                  />
                </form>
              </div>
              <div className="mobile-toggle-menu">
                <i className="bx bx-menu" />
              </div>
              <div className="auth-buttons ms-3 d-flex gap-2">
                <button
                  className="btn btn-outline-light"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#authSidebar"
                  onClick={() => setAuthType("register")}
                >
                  Regístrate
                </button>
                <button
                  className="btn btn-primary"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#authSidebar"
                  onClick={() => setAuthType("login")}
                >
                  Iniciar sesión
                </button>
              </div>
            </nav>
          </div>

          <SidebarAuth tipo={authType} />
        </header>

        <div className="page-wrapper">
          <Outlet />
        </div>
        <div className="overlay toggle-icon" />
        <a href="#" className="back-to-top">
          <i className="bx bxs-up-arrow-alt" />
        </a>
        <footer className="page-footer ">
          <p className="mb-0">
            Copyright © ASTRAVON 2025. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </>
  );
}

export default AppLayout;
