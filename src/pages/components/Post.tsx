import { useState } from "react";
import { FaRegThumbsUp, FaRegComment, FaRegShareSquare } from "react-icons/fa";
import { Modal } from "react-bootstrap";

interface PostProps {
  user: string;
  time: string;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export function Post({ user, time, content, imageUrl, videoUrl }: PostProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="post bg-brown-light text-white p-3 rounded mb-3">
      <div className="d-flex align-items-center mb-2">
        <div className="user-avatar bg-ter  text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: 40, height: 40 }}>
          {user[0]}
        </div>
        <div className="ms-2">
          <strong>{user}</strong>
          <small className="d-block text-muted">{time}</small>
        </div>
      </div>

      {content && <p>{content}</p>}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Publicación"
          className="w-100 rounded mb-2"
          style={{ cursor: "pointer" }}
          onClick={() => setShowModal(true)}
        />
      )}

      {videoUrl && (
        <video
          src={videoUrl}
          className="w-100 rounded mb-2"
          controls
          onClick={() => setShowModal(true)}
        />
      )}

      <div className="d-flex justify-content-around text-muted">
        <button className="btn text-white"><FaRegThumbsUp /> Me gusta</button>
        <button className="btn text-white"><FaRegComment /> Comentar</button>
        <button className="btn text-white"><FaRegShareSquare /> Compartir</button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="p-0">
          {imageUrl && <img src={imageUrl} alt="Publicación" className="w-100" />}
          {videoUrl && <video src={videoUrl} className="w-100" controls autoPlay />}
        </Modal.Body>
      </Modal>
    </div>
  );
}
