import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronLeft
      className={className}
      style={{
        ...style,
        color: "#fff",
        fontSize: "24px",
        left: "-40px",
        zIndex: 1,
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronRight
      className={className}
      style={{
        ...style,
        color: "#fff",
        fontSize: "24px",
        right: "-40px",
        zIndex: 1,
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
};

interface CarouselProps {
  data: {
    id: number;
    name: string;
    specialty: string;
    description: string;
    profileImage: string;
    backgroundImage: string;
  }[];
}

export const Carousel = ({ data }: CarouselProps) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/school/cursos/${id}`);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const isSingleItem = data.length === 1;

  return (
    <div className="py-4">
      {isSingleItem ? (
        <div className="card-container split-bg-secondary  cursor-pointer"  onClick={() => handleClick(data[0].id)}>
          <div className="row no-gutters">
            <div className="col-12 col-md-4 d-flex flex-column align-items-center p-3">
              <div
                className="d-flex justify-content-center"
                style={{ width: "100px", height: "100px" }}
              >
                <img
                  src={data[0].profileImage}
                  alt={data[0].name}
                  className="profile-image rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                className="mt-3"
                style={{ color: "#fff", textAlign: "center" }}
              >
                <h4 style={{ color: "#E4823B" }}>{data[0].name}</h4>
                <p style={{ color: "#c9c3c3" }}>{data[0].specialty}</p>
              </div>

              <div
                className="mt-3 px-5"
                style={{ color: "#fff", textAlign: "center" }}
              >
                <p>{data[0].description}</p>
              </div>
            </div>

            <div
              className="col-12 col-md-8 position-relative"
              style={{ height: "100%" }}
            >
              <img
                src={data[0].backgroundImage}
                alt="background"
                className="img-fluid rounded"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <Slider {...settings}>
          {data.map((item) => (
            <div
              key={item.id}
              className="card-container split-bg-secondary  cursor-pointer"
              onClick={() => handleClick(item.id)}
            >
              <div className="row no-gutters">
                <div className="col-12 col-md-4 d-flex flex-column align-items-center p-3">
                  <div
                    className="d-flex justify-content-center"
                    style={{ width: "100px", height: "100px" }}
                  >
                    <img
                      src={item.profileImage}
                      alt={item.name}
                      className="profile-image rounded-circle"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div
                    className="mt-3"
                    style={{ color: "#fff", textAlign: "center" }}
                  >
                    <h4 style={{ color: "#E4823B" }}>{item.name}</h4>
                    <p style={{ color: "#c9c3c3" }}>{item.specialty}</p>
                  </div>

                  <div
                    className="mt-3 px-5"
                    style={{ color: "#fff", textAlign: "center" }}
                  >
                    <p>{item.description}</p>
                  </div>
                </div>

                <div
                  className="col-12 col-md-8 position-relative"
                  style={{ height: "100%" }}
                >
                  <img
                    src={item.backgroundImage}
                    alt="background"
                    className="img-fluid rounded"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};
