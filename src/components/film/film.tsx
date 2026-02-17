import { useEffect, useLayoutEffect, useRef, useState } from "react";
import filmroll from "@/assets/images/film/filmroll5.png";
import film from "@/assets/images/film/film2.png";
import filmend from "../../assets/images/film/filmend1.png";
import projects from "../../data/projects.json";
import ProjectCard from "../projectCard/ProjectCard";
import "./film.css";
import Modal from "../modal/Modal";
import closeIcon from "@/assets/icons/close.svg";

const DRAG_THRESHOLD = 5; // pixels

type Project = {
  name: string;
  images: string[];
  thumbnail: string;
  description: string;
};

const Film = () => {
  const filmRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [startTranslate, setStartTranslate] = useState(0);
  const [didMove, setDidMove] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const isPortrait = (filename: string) => filename.endsWith("p.jpg");

  const getMaxTranslate = () => {
    if (!filmRef.current) return 0;
    return filmRef.current.offsetWidth;
  };

  useLayoutEffect(() => {
    if (!filmRef.current) return;

    const observer = new ResizeObserver(() => {
      const max = getMaxTranslate();
      setTranslateX(-max);
    });

    observer.observe(filmRef.current);

    return () => observer.disconnect();
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartTranslate(translateX);
    setDidMove(false);
    if (!hasInteracted) setHasInteracted(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const delta = e.clientX - startX;
    if (Math.abs(delta) > DRAG_THRESHOLD) setDidMove(true);
    const max = getMaxTranslate();

    let next = startTranslate + delta;

    // clamp: allow 0 → -filmWidth
    next = Math.min(0, Math.max(next, -max));

    setTranslateX(next);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const delta = e.clientX - startX;

    // If movement is small, treat it as a click
    if (Math.abs(delta) < DRAG_THRESHOLD) {
      // It's a click, let onClick handle it
    }

    setIsDragging(false);
  };

  return (
    <div className="w-full h-full flex items-center relative z-20 film-clip">
      {/* Film Roll */}
      <div className="h-full select-none pointer-events-none flex-shrink-0 z-20">
        <img
          src={filmroll}
          alt="Film Cartridge"
          className="h-full object-contain -translate-y-[4.5%]"
          draggable={false}
        />
      </div>

      {/* Film Strip */}
      <div
        ref={containerRef}
        className={`h-[77%] z-10 film  ${
          isDragging ? "dragging cursor-grabbing" : "cursor-grab"
        } ${!hasInteracted ? "film-wiggle" : ""}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          ref={filmRef}
          className="inline-flex items-center h-full"
          style={{
            transform: `translateX(${translateX}px)`,
          }}
        >
          {/* Film background + projects */}
          <div
            className="flex h-full space-x-7 px-7 items-center"
            style={{
              backgroundImage: `url(${film})`,
              backgroundRepeat: "repeat-x",
              backgroundSize: "contain",
            }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="h-[65%] card"
                onClick={() => {
                  if (didMove) return;
                  setSelectedProject(project);
                }}
              >
                <ProjectCard image={project.thumbnail} name={project.name} />
              </div>
            ))}
          </div>

          {/* Film end */}
          <img
            src={filmend}
            alt="Film End"
            className="h-full object-contain select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Modal */}
      {selectedProject !== null && (
        <Modal
          width="w-3/4"
          height="h-3/4"
          onClose={() => setSelectedProject(null)}
          isOpen={true}
        >
          <div className="relative grid h-full grid-cols-[2fr_1fr] overflow-hidden text-polaroid-text-primary bg-background-polaroid">
            {/* Images */}
            <div
              className={`grid gap-6 overflow-y-auto p-6 ${
                selectedProject.images.every((img) => isPortrait(img))
                  ? "grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {selectedProject.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedProject.name} ${index + 1}`}
                  className="w-full modal-image mb-6"
                  draggable={false}
                />
              ))}
            </div>

            {/* Info */}
            <div className="p-6 overflow-y-auto relative">
              <button
                className="absolute top-0 right-0 cursor-pointer z-20"
                onClick={() => setSelectedProject(null)}
              >
                <img src={closeIcon} alt="Close" className="w-8 h-8" />
              </button>

              <b className="block mb-2 text-lg">{selectedProject.name}</b>
              <p className="text-sm">{selectedProject.description}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Film;
