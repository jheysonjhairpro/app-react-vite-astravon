import { useParams, useNavigate } from "react-router-dom";

const coursesData = [
  {
    category: "Básico",
    courses: [
      {
        id: 1,
        title: "Introducción a la Ing. Estructural",
        image:
          "https://formaciononline.eu/wp-content/uploads/2021/06/mejores-cursos-arquitectura-online.jpg",
      },
      {
        id: 2,
        title: "Fundamentos de la Construcción",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKjw-UKDabb4EAZjdzqwGkjqq2O91S3yCMKw&s",
      },
      {
        id: 3,
        title: "Fundamentos de Software",
        image:
          "https://togrowagencia.com/wp-content/uploads/2023/12/software-de-programacion-1.jpg",
      },
    ],
  },
  {
    category: "Intermedio",
    courses: [
      {
        id: 4,
        title: "Diseño de Estructuras de Concreto",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj27Xog5vUgSTJkfF8lokTShVxM4c6WNpthQ&s",
      },
    ],
  },
  {
    category: "Avanzado",
    courses: [
      {
        id: 5,
        title: "Cálculo Avanzado de Estructuras",
        image: "https://i.ytimg.com/vi/5bRPINodWuc/sddefault.jpg",
      },
      {
        id: 6,
        title: "Modelado de Estructuras",
        image:
          "https://blog.konstruedu.com/wp-content/uploads/2024/08/Portadas-Blog-Konstruedu-3.png",
      },
    ],
  },
];

export default function SchoolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
console.log(id)
  return (
    <div className="page-content py-4 text-white ">
      {coursesData.map((categoryData, index) => (
        <div key={index}>
          <h6 className="text-uppercase text-white">{categoryData.category}</h6>
          <hr className="border-gray-500" />
          <div className="row">
            {categoryData.courses.map((course) => (
              <div key={course.id} className="col-12 col-md-4 mb-4">
                <div
                  className="card bg-dark text-white rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/course/${course.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="card-img-top img-fluid"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
