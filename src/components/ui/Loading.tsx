import { FaCircleNotch } from "react-icons/fa";

export const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "20vh" }}
    >
      <div className="d-flex align-items-center">
        <FaCircleNotch
          style={{
            fontSize: "1.5rem",
            animation: "spin 1.5s linear infinite",
            marginRight: "10px",
            color: "#3A86FF",
          }}
        />
      </div>
    </div>
  );
};
