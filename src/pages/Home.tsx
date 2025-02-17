import { Post } from "./components/Post";
import { ReelsCarousel } from "./components/ReelsCarousel";

export function HomePage() {
  return (
    <div className="page-content">
      <h6 className="mb-0 text-uppercase text-white">Todos los foros</h6>
      <hr />
      <ReelsCarousel />
      <Post
        user="Luis Gómez"
        time="Hace 5 minutos"
        content="¿Alguien recomienda una buena serie?"
      />
      <Post
        user="Jhair Arone"
        time="Hace 2 horas"
        content="Hoy les quiero compartir una imagen donde jale el curso por gil :v"
        imageUrl="https://static-wc.arcux.net/uploads/20200529130551/la-arquitectura-1.jpg"
      />

      <Post
        user="Ana López"
        time="Hace 30 minutos"
        videoUrl="https://www.pexels.com/download/video/856048/"
      />
    </div>
  );
}
