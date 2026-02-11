import { useState } from "react";
import schools from "../../data/schools.json";

interface Props {
  updateSchool: (schoolState: number) => void;
}

const Timeline = ({ updateSchool }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    updateSchool(index + 1);
  };

  const progressHeight = ((activeIndex + 1) / schools.length) * 100;

  return (
    <div className="relative flex flex-col h-full items-center w-full min-w-[290px] ">
      {/* Corner borders */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neutral-500" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-neutral-500" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-neutral-500" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neutral-500" />

      {/* Base vertical line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px] bg-neutral-600" />

      {/* Active progress line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-accent-500 transition-all duration-500"
        style={{ height: `${progressHeight}%` }}
      />

      {schools.map((school, index) => {
        const isLeft = index % 2 === 0;
        const isActive = index <= activeIndex;

        return (
          <div
            key={school.type}
            className="relative flex items-center w-full flex-1"
          >
            {/* LEFT SIDE */}
            <div className="w-1/2 pr-10 text-right">
              {isLeft && (
                <h3 className="text-lg font-semibold text-text-primary">
                  {school.type}
                </h3>
              )}
            </div>

            {/* CIRCLE */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <button
                onClick={() => handleClick(index)}
                className={`
                  w-6 h-6 rounded-full border-4 transition-all duration-300 cursor-pointer
                  ${
                    isActive
                      ? "bg-accent-500 border-accent-500"
                      : "bg-neutral-800 border-neutral-500"
                  }
                `}
              />
            </div>

            {/* RIGHT SIDE */}
            <div className="w-1/2 pl-10 text-left">
              {!isLeft && (
                <h3 className="text-lg font-semibold text-neutral-200">
                  {school.type}
                </h3>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
