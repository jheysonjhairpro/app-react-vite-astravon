import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Carousel } from "./components/Carousel";

export function School() {
  const [filter, setFilter] = useState<string>("");

  const handleFilterChange = (category: string) => {
    setFilter(category);
  };

  const cardsData = [
    {
      id: 1,
      name: "Juan Carlos",
      specialty: "Especialista en estructuras",
      description: "DISEÑO EN ESTRUCTURAS CON PYTHON + AUTOMATIZACIÓN CON SAFE",
      profileImage: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
      backgroundImage:
        "https://insight-construction.com/wp-content/uploads/2024/02/PYTHON-PARA-INGENIERIA.jpg",
      category: "Sostenibilidad",
    },
    {
      id: 2,
      name: "Ana López",
      specialty: "Experta en IA",
      description: "MACHINE LEARNING Y VISIÓN POR COMPUTADORA",
      profileImage: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
      backgroundImage:
        "https://www.hiberus.com/crecemos-contigo/wp-content/uploads/2022/12/vision-artificial.png",
      category: "Hidrahulica",
    },
    {
      id: 3,
      name: "Carlos Pérez",
      specialty: "Ingeniero de software",
      description: "DESARROLLO DE APPS CON REACT Y NODE.JS",
      profileImage: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
      backgroundImage:
        "https://i.ytimg.com/vi/hnCDdOgapWU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBvB56RlMvqM6BPAQ1EkPrfL8ZC1g",
      category: "Urbanismo",
    },
    {
      id: 4,
      name: "Jhair Arone",
      specialty: "Ingeniero de software",
      description: "DESARROLLO DE APPS CON REACT ",
      profileImage: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
      backgroundImage:
        "https://kinsta.com/es/wp-content/uploads/sites/8/2023/04/react-must-be-in-scope-when-using-jsx.jpg",
      category: "Urbanismo",
    },
  ];

  const filteredData = filter
    ? cardsData.filter((item) =>
        item.category.toLowerCase().includes(filter.toLowerCase())
      )
    : cardsData;

  return (
    <div className="page-content">
      <h6 className="mb-0 text-uppercase text-white">
        Recorre aquí todas tus aplicaciones
      </h6>
      <hr />

      <div className="d-flex justify-content-start my-3">
        <button
          className={`btn mx-2 ${
            filter === "" ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={() => handleFilterChange("")}
        >
          Todos
        </button>
        <button
          className={`btn mx-2 ${
            filter === "Radio" ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={() => handleFilterChange("Radio")}
        >
          Radio
        </button>
        <button
          className={`btn mx-2 ${
            filter === "Estructuras" ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={() => handleFilterChange("Estructuras")}
        >
          Estructuras
        </button>
        <button
          className={`btn mx-2 ${
            filter === "Geotecnia" ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={() => handleFilterChange("Geotecnia")}
        >
          Geotecnia
        </button>
        <button
          className={`btn mx-2 ${
            filter === "Concreto" ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={() => handleFilterChange("Concreto")}
        >
          Concreto
        </button>
        <button
          className={`btn mx-2 ${
            filter === "Urbanismo" ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={() => handleFilterChange("Urbanismo")}
        >
          Urbanismo
        </button>
        <button
          className={`btn mx-2 ${
            filter === "Sostenibilidad"
              ? "btn-primary"
              : "btn-outline-secondary"
          }`}
          onClick={() => handleFilterChange("Sostenibilidad")}
        >
          Sostenibilidad
        </button>
        <button
          className={`btn mx-2 ${
            filter === "Hidrahulica" ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={() => handleFilterChange("Hidrahulica")}
        >
          Hidrahulica
        </button>
      </div>
      <Carousel data={filteredData} />
    </div>
  );
}
