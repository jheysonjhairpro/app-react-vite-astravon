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
      "data:image/jpeg;base64,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",
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
