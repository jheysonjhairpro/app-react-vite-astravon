import React from "react";

interface Podcast {
  id: number;
  title: string;
  date: string;
  duration: string;
  image: string;
}

const PodcastCard: React.FC<{ podcast: Podcast }> = ({ podcast }) => {
  return (
    <div className=" text-white border-0 shadow-sm w-100" style={{ minHeight: "180px" }}>
      <img
        src={podcast.image}
        alt={podcast.title}
        className="card-img-top rounded"
        style={{ objectFit: "cover", height: "160px" }}
      />
      <div className="card-body mt-2 d-flex flex-column justify-content-between">
        <h6
          className="card-title"
          title={podcast.title}
          style={{ whiteSpace: "normal", overflow: "hidden", textOverflow: "ellipsis", fontSize: "14px" }}
        >
          {podcast.title}
        </h6>
        <p className="card-text pt-2 text-muted small m-0">
          {podcast.date} • {podcast.duration}
        </p>
      </div>
    </div>
  );
};

export default PodcastCard;
