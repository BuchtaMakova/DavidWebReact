import { useState } from "react";
import "./Timeline.css";
import highschool from "@/assets/images/logos/frengplogo.png";
import college from "@/assets/images/logos/osulogo.png";
import erasmus from "@/assets/images/logos/univaqlogo2.png";

interface Props {
  updateSchool: (schoolState: number) => void;
}

const Timeline = ({ updateSchool }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    updateSchool(index + 1);
  };

  const events = [
    { name: "High School", image: highschool },
    { name: "College", image: college },
    { name: "Erasmus", image: erasmus },
  ];

  return (
    <div className=" min-w-[290px] flex flex-1 flex-col items-center timeline-container  justify-center h-full p-7 ">
      {events.map((event, index) => {
        const isEven = index % 2 === 0; // Even index = left, Odd index = right

        return (
          <div key={index} className="flex w-full items-center h-1/3">
            {/*Left*/}
            <div className="flex-1 text-right">
              {!isEven && <h3 className="text-lg font-bold">{event.name}</h3>}
            </div>

            {/*Middle*/}
            <div className="flex flex-1 flex-col items-center h-full relative timeline">
              <div
                className={`circle ${activeIndex === index ? "active" : ""}`}
                style={{ backgroundImage: `url(${event.image})` }}
                onClick={() => handleClick(index)}
              ></div>

              <div
                className={`line ${activeIndex === index ? "active" : ""}`}
              ></div>
            </div>

            {/*Right*/}
            <div className="flex-1 text-left">
              {isEven && <h3 className="text-lg font-bold">{event.name}</h3>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
