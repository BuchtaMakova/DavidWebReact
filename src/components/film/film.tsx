import { useEffect, useLayoutEffect, useRef, useState } from "react";
import filmroll from "@/assets/images/filmRoll.png";
import film from "@/assets/images/film1.png";
import filmend from "../../assets/images/filmend1.png";
import projects from "../../data/projects.json";
import ProjectCard from "../projectCard/ProjectCard";
import "./film.css";

const Film = () => {
  const filmRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getMaxTranslate = () => {
    if (!filmRef.current) return 0;
    return filmRef.current.offsetWidth;
  };

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [startTranslate, setStartTranslate] = useState(0);

  useLayoutEffect(() => {
    const max = getMaxTranslate();
    setTranslateX(-max);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartTranslate(translateX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const delta = e.clientX - startX;
    const max = getMaxTranslate();

    let next = startTranslate + delta;

    // clamp: allow 0 → -filmWidth
    next = Math.min(0, Math.max(next, -max));

    setTranslateX(next);
  };

  const onMouseUp = () => setIsDragging(false);

  return (
    <div className="w-full h-full flex items-center justify-center relative z-20">
      {/* Film Roll */}
      <div className="h-full select-none pointer-events-none flex-shrink-0">
        <img
          src={filmroll}
          alt="Film Cartridge"
          className="h-full object-contain -translate-y-[4%]"
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
            className="flex h-full space-x-9 px-9 items-center"
            style={{
              backgroundImage: `url(${film})`,
              backgroundRepeat: "repeat-x",
              backgroundSize: "contain",
            }}
          >
            {projects.map((project, index) => (
              <div key={index} className="h-[65%]">
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
    </div>
  );
};

export default Film;
