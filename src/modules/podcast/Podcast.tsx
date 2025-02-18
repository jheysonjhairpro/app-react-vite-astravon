import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PodcastCard from "./components/PodcastCard";

interface Podcast {
  id: number;
  title: string;
  date: string;
  duration: string;
  image: string;
  category: string;
}

const podcasts: Podcast[] = [
  {
    id: 1,
    title: "#4.12 - Inteligencia Artificial Generativa",
    date: "Jul 2023",
    duration: "43 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhH8B6uJ1sesYMWK4wCryLsyUrhXrhcaoeA&s",
    category: "Radio",
  },
  {
    id: 2,
    title: "#M34 - IA: del wow a la práctica",
    date: "Dic 2024",
    duration: "47 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFU1y4eK5rcbnQhtIWgdfAO6P2XAz1yXnjaQ&s",
    category: "Radio",
  },
  {
    id: 3,
    title: "¿Qué y cómo tienen que aprender los...",
    date: "Jun 2024",
    duration: "60 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCVY1FdDdG_P5BHujqJ8eaHMNqkg8qDXdzA&s",
    category: "Estructuras",
  },
  {
    id: 4,
    title: "Robots industriales y robots de servicio...",
    date: "May 2024",
    duration: "7 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwyM_bqtH1DR3CDOrbknTR_WG1XX2Yq5Cadg&s",
    category: "Geotecnia",
  },
  {
    id: 5,
    title: "Carlos ingenieria estructural para puentes",
    date: "Jun 2024",
    duration: "60 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxiT47rV2UteFBAAJuD1YKw9DUhYLtjsF1jQ&s",
    category: "Estructuras",
  },
  {
    id: 6,
    title: "Jhair - El mundo de la programación",
    date: "Jun 2018",
    duration: "12 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTp-7babLQisN9fnM_yIBCm3d9oKBOWR8wUg&s",
    category: "Estructuras",
  },
  {
    id: 7,
    title: "Mecanica y robotica la hera actual",
    date: "May 2024",
    duration: "7 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDvOQzF4kosSrVt0T8yIjCVm7jQMjZzVd92g&s",
    category: "Geotecnia",
  },
  {
    id: 8,
    title: "Concreto diseñado, soporte con...",
    date: "May 2024",
    duration: "7 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBEpMaC5mP3ZahmJ_7WDfLRLJsGAGYgDC_7Q&s",
    category: "Concreto",
  },
  {
    id: 9,
    title: "Mecanica y robotica la hera actual",
    date: "May 2024",
    duration: "7 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStEmg4nUGjfRHAomuTApXBr_8IaHzpGm5ptg&s",
    category: "Urbanismo",
  },
  {
    id: 10,
    title: "La union y desunion esta en ...",
    date: "May 2024",
    duration: "7 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD0KxwnGZwyTgudRib5mTwS7_CCA2loLpDJA&s",
    category: "Sostenibilidad",
  },
  {
    id: 11,
    title: "Hidraulica aqui y ahora entre los...",
    date: "May 2024",
    duration: "7 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Hi0Gyc5sRxrH9bhp1dARC9WkSJp_x_fwxw&s",
    category: "Hidrahulica",
  },
];

const categories = ["Todos", ...new Set(podcasts.map((p) => p.category))];

export function Podcast() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const filteredPodcasts =
    selectedCategory === "Todos"
      ? podcasts
      : podcasts.filter((p) => p.category === selectedCategory);

  return (
    <div className="page-content">
      <div className="d-flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn ${
              selectedCategory === category
                ? "btn-primary"
                : "btn-outline-secondary"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <h6 className="mb-0 text-uppercase text-white">Programas que podria gustarte</h6>
      <hr />
      <div className="row g-3 justify-content-left">
        {filteredPodcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex mb-2"
          >
            <PodcastCard podcast={podcast} />
          </div>
        ))}
      </div>
    </div>
  );
}
