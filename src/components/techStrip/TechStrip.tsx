import React from "react";
import "./TechStrip.css";

type Technology = {
  id: number;
  name: string;
};

type TechStripProps = {
  technologies: Technology[];
};

export const TechStrip = ({ technologies }: TechStripProps) => {
  return (
    <div className="max-w-7xl strip-container overflow-hidden mx-auto flex flex-wrap justify-between items-center text-text-subtle font-semibold text-[20px] h-full">
      <div className="tech-scroll">
        {[...technologies, ...technologies].map((tech, index) => (
          <span className="mx-[43px]" key={index}>
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
};
