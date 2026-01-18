import { useLayoutEffect, useRef, useState } from "react";
import filmroll from "@/assets/images/filmRoll4.png";
import film from "@/assets/images/film2.png";
import filmend from "../../assets/images/filmend1.png";
import projects from "../../data/projects.json";
import ProjectCard from "../projectCard/ProjectCard";
import "./film.css";
import Modal from "../modal/Modal";

const DRAG_THRESHOLD = 5; // pixels

type Project = {
  name: string;
  image: string;
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

  const getMaxTranslate = () => {
    if (!filmRef.current) return 0;
    return filmRef.current.offsetWidth;
  };

  useLayoutEffect(() => {
    const max = getMaxTranslate();
    setTranslateX(-max);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartTranslate(translateX);
    setDidMove(false);
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
    <div className="w-full h-full flex items-center justify-center relative z-20">
      {/* Film Roll */}
      <div className="h-full select-none pointer-events-none flex-shrink-0">
        <img
          src={filmroll}
          alt="Film Cartridge"
          className="h-full object-contain -translate-y-[5.8%]"
          draggable={false}
        />
      </div>

      {/* Film Strip */}
      <div
        ref={containerRef}
        className={`h-[77%] overflow-hidden film ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
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
                <ProjectCard image={project.image} name={project.name} />
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
          width="w-3/4" // 75% width
          height="h-3/4"
          onClose={() => setSelectedProject(null)}
          isOpen={true}
        >
          <div className="flex flex-row">
            <div className="flex-2">leve</div>
            <div className="flex-1">
              <div>
                <b>{selectedProject.name}</b>
              </div>
              <div>{selectedProject.description}</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Film;
