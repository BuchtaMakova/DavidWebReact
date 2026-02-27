import React, { useRef, useState, useEffect } from "react";
import projects from "../../data/projects.json";
import "./projects.css";
import Modal from "../modal/Modal";
import closeIcon from "@/assets/icons/close.svg";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import arrowRight from "@/assets/icons/arrow-right.svg";

type Project = {
  name: string;
  images: string[];
  thumbnail: string;
  description: string;
  links: string[];
};

export const Projects: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  //modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const isPortrait = (filename: string) => filename.endsWith("p.jpg");

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Current project index
  const [currentIndex, setCurrentIndex] = useState(1);

  // Card width
  const [cardWidth, setCardWidth] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cardRef.current) {
      const width = cardRef.current.offsetWidth;
      setCardWidth(width);
    }
  }, []);

  // Handle drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  //scroll
  const [isManualScroll, setIsManualScroll] = useState(true);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const gap = 24;
    const scrollAmount = index * (cardWidth + gap);

    setIsManualScroll(false); // ignore handleScroll updates temporarily
    setCurrentIndex(index + 1);

    scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });

    // reset flag after animation (~300ms)
    setTimeout(() => setIsManualScroll(true), 300);
  };

  const handleScroll = () => {
    if (!scrollRef.current || cardWidth === 0 || !isManualScroll) return;
    const gap = 24;
    const scrollLeft = scrollRef.current.scrollLeft;
    const index = Math.round(scrollLeft / (cardWidth + gap)) + 1;
    setCurrentIndex((prev) => (prev !== index ? index : prev));
  };

  return (
    <>
      <div className="hidden sm:flex justify-between mb-3  w-full">
        <div>
          {currentIndex}/{projects.length}
        </div>
        <div className="flex flex-row gap-1">
          <button
            onClick={() => {
              const nextIndex = Math.max(0, currentIndex - 2);
              scrollToIndex(nextIndex);
            }}
            className="text-xs px-2 py-2 text-white bg-text-subtle hover:bg-background-light transition cursor-pointer"
          >
            <img src={arrowLeft} alt="Previous" className="w-[16px] h-[16px]" />
          </button>

          <button
            onClick={() => {
              const nextIndex = Math.min(projects.length - 1, currentIndex);
              scrollToIndex(nextIndex);
            }}
            className="text-xs px-2 py-2 text-white bg-text-subtle hover:bg-background-light transition cursor-pointer"
          >
            <img src={arrowRight} alt="Next" className="w-[16px] h-[16px]" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-col sm:flex-row overflow-x-auto hide-scrollbar gap-6 cursor-grab snap-x snap-mandatory select-none sm:pr-[100%]"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        onScroll={handleScroll}
      >
        {projects.map((project, index) => (
          <div
            ref={index === 0 ? cardRef : null}
            key={project.id}
            className="flex-shrink-0 aspect-3/2 w-full sm:w-[485px] flex flex-col gap-3 snap-start"
          >
            <img
              className=" object-cover rounded"
              src={project.thumbnail}
              alt={project.name}
              draggable={false}
            />
            <p>{project.descriptionShort}</p>
            <span
              className="text-sm text-text-muted underline hover:text-text-primary cursor-pointer"
              onClick={() => {
                setSelectedProject(project);
              }}
            >
              Learn more ⟶
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject !== null && (
        <Modal
          width="w-3/4"
          height="h-3/4"
          backgroundColor="bg-background-elevated"
          onClose={() => setSelectedProject(null)}
          isOpen={true}
        >
          <div className="relative h-full flex flex-col-reverse md:grid  md:grid-cols-[2fr_1fr] overflow-hidden text-polaroid-text-primary bg-background-polaroid">
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
            <div className="p-6 md:overflow-y-auto relative">
              <button
                className="absolute top-2 right-2 cursor-pointer z-20"
                onClick={() => setSelectedProject(null)}
              >
                <img src={closeIcon} alt="Close" className="w-8 h-8" />
              </button>

              <h3 className="block mb-2 text-[25px]!">
                {selectedProject.name}
              </h3>
              <p className="text-sm">{selectedProject.description}</p>
              {selectedProject.links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted underline hover:text-text-primary block mt-2"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
