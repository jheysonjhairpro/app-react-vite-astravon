import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
const coursesData = [
    {
      id: 1,
      title: "Introducción a la Ing. Estructural",
      description: "Aprende los fundamentos de la ingeniería estructural.",
      image: "https://formaciononline.eu/wp-content/uploads/2021/06/mejores-cursos-arquitectura-online.jpg",
      video: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
      duration: "10:45",
      level: "Básico",
    },
    {
      id: 2,
      title: "Fundamentos de la Construcción",
      description: "Curso introductorio sobre materiales y técnicas de construcción.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKjw-UKDabb4EAZjdzqwGkjqq2O91S3yCMKw&s",
      video: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
      duration: "12:30",
      level: "Básico",
    },
    {
      id: 3,
      title: "Diseño de Estructuras de Concreto",
      description: "Aprende a diseñar estructuras de concreto reforzado.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj27Xog5vUgSTJkfF8lokTShVxM4c6WNpthQ&s",
      video: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
      duration: "15:00",
      level: "Intermedio",
    },
    {
      id: 4,
      title: "Cálculo Avanzado de Estructuras",
      description: "Profundiza en el cálculo estructural con ejemplos prácticos.",
      image: "https://i.ytimg.com/vi/5bRPINodWuc/sddefault.jpg",
      video: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
      duration: "20:10",
      level: "Avanzado",
    },
    {
      id: 5,
      title: "Modelado de Estructuras en 3D",
      description: "Crea modelos estructurales en software especializado.",
      image: "https://blog.konstruedu.com/wp-content/uploads/2024/08/Portadas-Blog-Konstruedu-3.png",
      video: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
      duration: "30:45",
      level: "Avanzado",
    },
  ];
  

const commentsData = [
  {
    id: 1,
    name: "Carlos",
    text: "Buen curso, pero aumenten la resolución",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "José",
    text: "Excelente contenido, muy útil",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Ana",
    text: "Sería genial agregar más ejemplos",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
];

export default function CourseDetail() {
  const { id } = useParams();
  const course = coursesData.find((course) => course.id === Number(id));
  const [comments, setComments] = useState(commentsData);
  const [newComment, setNewComment] = useState("");

  if (!course) {
    return <h2 className="text-white text-center">Curso no encontrado</h2>;
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          name: "Tú",
          text: newComment,
          avatar: "https://i.pravatar.cc/40?img=4",
        },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="page-content text-white">
      <div className="row">
        <div className="col-md-7">
          <div className="video-container position-relative">
            <video
              src={course.video}
              controls
              className="w-100 rounded"
            ></video>
          </div>
        </div>

        <div className="col-md-5 d-flex flex-column mt-2">
          <h2 className="text-uppercase text-white">{course.title}</h2>
          <h5 className="text-warning">{course.level}</h5>
        </div>
      </div>

      <div className="comment-box py-2 rounded d-flex align-items-center">
        <input
          className="form-control bg-brown-light flex-grow-1 me-2"
          type="text"
          placeholder="Buscar..."
          aria-label="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="btn btn-primary ms-2 rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "40px", height: "40px" }}
          onClick={handleAddComment}
        >
          <FaPaperPlane />
        </button>
      </div>

      <div className="mt-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="d-flex align-items-center mb-3  bg-brown-light p-2 rounded"
          >
            <img
              src={comment.avatar}
              alt={comment.name}
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px" }}
            />
            <div>
              <strong>{comment.name}</strong>
              <p className="mb-0">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
