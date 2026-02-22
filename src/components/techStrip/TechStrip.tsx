import React from "react";

type Technology = {
  id: number;
  name: string;
};

type TechStripProps = {
  technologies: Technology[];
};

export const TechStrip = ({ technologies }: TechStripProps) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-text-subtle font-semibold text-[20px] h-full">
      {technologies.map((tech, index) => (
        <span key={index}>{tech.name}</span>
      ))}
    </div>
  );
};
