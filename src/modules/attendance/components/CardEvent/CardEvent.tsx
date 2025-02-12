import React from "react";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { CardEventProps } from "./CardEvent.types";

const CardEvent: React.FC<CardEventProps> = ({
  date,
  title,
  location,
  hora,
}) => {
  return (
    <div className="card bg-primary text-white rounded-lg shadow-lg p-3 position-relative">
      <div className="triangle"></div>
      <div className="position-relative">
        <div className="bg-white text-secondary px-2 py-1 rounded text-sm fw-semibold d-inline-block mb-3">
          {date}
        </div>
      </div>
      <div>
        <h3 className="card-title fs-5 fw-bold mb-3">
          {title.length > 21 ? `${title.substring(0, 21)}...` : title}
        </h3>
        <div className="d-flex justify-content-between align-items-center text-sm">
          <div className="d-flex align-items-center">
            <FaMapMarkerAlt className="me-2" />
            {location.length > 18
              ? `${location.substring(0, 18)}...`
              : location}
          </div>
          <div className="d-flex align-items-center">
            <FaClock className="me-2" />
            {hora}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEvent;
