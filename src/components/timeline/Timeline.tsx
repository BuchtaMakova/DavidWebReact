import { useState } from "react";

interface Props {
  updateSchool: (schoolState: number) => void;
  schools: TimelineSchool[];
}

interface TimelineSchool {
  id: number;
  years: string;
}

const Timeline = ({ updateSchool, schools }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index - 1);
    updateSchool(index);
  };

  const progressWidth = ((activeIndex + 1) / schools.length) * 100;

  return (
    <div className="relative flex flex-row w-full items-center h-32 min-h-[100px]">
      {/* Base horizontal line */}
      <div className="absolute top-1/2 left-0 h-[2px] w-full bg-accent-light -translate-y-1/2" />

      {/* Active progress line */}
      <div
        className="absolute top-1/2 left-0 h-[2px] bg-accent transition-all duration-500 -translate-y-1/2"
        style={{ width: `${progressWidth}%` }}
      />

      {schools.map((school, index) => {
        const isActive = index <= activeIndex;
        const isSelected = index === activeIndex;

        return (
          <div
            key={school.id}
            className="relative flex-1 flex justify-center items-center"
          >
            {/* YEARS */}
            <span
              className={`
    absolute -top-8 text-[15px] md:text-[20px] font-medium transition-all duration-300
    ${
      isSelected
        ? "opacity-100 translate-y-0 text-text-primary"
        : "opacity-0 -translate-y-2 pointer-events-none"
    }
  `}
            >
              {school.years}
            </span>

            {/* CIRCLE */}
            <button
              onClick={() => handleClick(school.id)}
              className={`
          w-6 h-6 rounded-full border-4 transition-all duration-300 cursor-pointer
          ${
            isActive
              ? "bg-accent border-accent"
              : "bg-background-light border-accent-light"
          }
        `}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
