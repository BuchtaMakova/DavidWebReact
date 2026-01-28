import { useState } from "react";
import "./Timeline.css";

import schools from "../../data/schools.json";

interface Props {
  updateSchool: (schoolState: number) => void;
}

const Timeline = ({ updateSchool }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    updateSchool(index + 1);
  };

  return (
    <div className=" min-w-[290px] flex flex-1 flex-col items-center bg-primary backdrop-blur-3xl justify-center h-full p-7 relative">
      {schools.map((school, index) => {
        const isEven = index % 2 === 0; // Even index = left, Odd index = right

        return (
          <div key={index} className="flex w-full items-center h-1/3">
            {/*Left*/}
            <div className="flex-1 text-right">
              {!isEven && <h3 className="text-lg font-bold">{school.type}</h3>}
            </div>

            {/*Middle*/}
            <div className="flex flex-1 flex-col items-center h-full relative timeline">
              <div
                className={`circle ${
                  activeIndex === index ? "active" : "inactive"
                } inset-shadow-xs/50`}
                style={{ backgroundImage: `url(${school.logo})` }}
                onClick={() => handleClick(index)}
              />

              <div
                className={`line ${activeIndex === index ? "active" : ""}`}
              />
            </div>

            {/*Right*/}
            <div className="flex-1 text-left">
              {isEven && <h3 className="text-lg font-bold">{school.type}</h3>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
