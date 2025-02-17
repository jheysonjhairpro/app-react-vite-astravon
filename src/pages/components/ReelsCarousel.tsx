import { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Reel {
  id: number;
  src: string;
  title: string;
}

const reels: Reel[] = [
  { id: 1, src: "https://www.pexels.com/download/video/856048/", title: "Reel 1" },
  { id: 2, src: "https://www.pexels.com/download/video/857195/", title: "Reel 2" },
  { id: 3, src: "https://www.pexels.com/download/video/856050/", title: "Reel 3" },
  { id: 4, src: "https://www.pexels.com/download/video/857193/", title: "Reel 4" },
  { id: 5, src: "https://www.pexels.com/download/video/856049/", title: "Reel 5" },
  { id: 6, src: "https://www.pexels.com/download/video/857196/", title: "Reel 6" },
  { id: 7, src: "https://www.pexels.com/download/video/857197/", title: "Reel 7" },
  { id: 8, src: "https://www.pexels.com/download/video/857198/", title: "Reel 8" },
  { id: 9, src: "https://www.pexels.com/download/video/857195/", title: "Reel 9" },
  { id: 10, src: "https://www.pexels.com/download/video/856049/", title: "Reel 14" },
  { id: 11, src: "https://www.pexels.com/download/video/856050/", title: "Reel 15" }
];

export function ReelsCarousel() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const reelsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (reelsContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = reelsContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
      }
    };

    checkScroll();
    reelsContainerRef.current?.addEventListener("scroll", checkScroll);

    return () => reelsContainerRef.current?.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollLeft = () => {
    reelsContainerRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    reelsContainerRef.current?.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <div className="reels-wrapper position-relative">
      {canScrollLeft && (
        <button className="scroll-btn left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>
      )}

      <div className="reels-container d-flex gap-2" ref={reelsContainerRef}>
        {reels.map((reel) => (
          <div key={reel.id} className="reel-item" onClick={() => setSelectedVideo(reel.src)}>
            <video src={reel.src} className="reel-video" muted />
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button className="scroll-btn right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      )}

      <Modal show={selectedVideo !== null} onHide={() => setSelectedVideo(null)} centered>
        <Modal.Body className="p-0">
          <video src={selectedVideo ?? ""} controls autoPlay className="w-100" style={{ height: "90vh" }}></video>
        </Modal.Body>
      </Modal>
    </div>
  );
}
