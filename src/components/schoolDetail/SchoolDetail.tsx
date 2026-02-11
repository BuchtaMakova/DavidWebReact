import React, { useEffect, useRef, useState } from "react";
import schools from "../../data/schools.json";
import "./SchoolDetail.css";
import arrow from "@/assets/icons/arrow-white.svg";

interface activeSchoolProps {
  schoolId: number;
}

const SchoolDetail = ({ schoolId }: activeSchoolProps) => {
  const school = schools.find((s) => s.id === schoolId);
  const [currentSchool, setCurrentSchool] = React.useState(school);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const updateScrollable = () => {
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          setIsScrollable(
            scrollRef.current.scrollHeight > scrollRef.current.clientHeight,
          );
        }
      });
    }
  };

  useEffect(() => {
    updateScrollable();
    window.addEventListener("resize", updateScrollable);
    return () => window.removeEventListener("resize", updateScrollable);
  }, [schoolId]);

  const handleImageLoad = () => {
    updateScrollable();
  };

  useEffect(() => {
    setCurrentSchool(school);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      setIsScrolled(false);
    }
  }, [schoolId]);

  useEffect(() => {
    const element = scrollRef.current;

    const handleScroll = () => {
      if (element && scrollRef.current) {
        setIsScrolled(scrollRef.current.scrollTop > 10);
      }
    };

    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  if (!school) {
    return <div className="text-red-500">School not found.</div>;
  }

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-background-polaroid min-w-[500px] px-10 pt-10 text-polaroid-text-primary relative">
      <div
        ref={scrollRef}
        className="flex flex-col gap-3 overflow-auto content max-h-full scrollbar-hide pb-10"
      >
        <div className="w-full aspect-[5/4]">
          <img
            src={currentSchool?.image}
            alt={currentSchool?.alt}
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xl">
            <b>{school.school}</b>
          </span>
          <span className="text-lg">
            <b>{school.years}</b>
          </span>
          <p className="text-sm text-justify">{school.description}</p>
        </div>
      </div>
      {!isScrolled && isScrollable && (
        <div
          onClick={scrollDown}
          className="bg-accent-500 rounded-full flex items-center justify-center  w-[65px] h-[65px] dis absolute transform -translate-x-1/2 -translate-y-1/2 top-[100%] left-[50%] hover:cursor-pointer"
        >
          <img src={arrow} alt="Arrow Icon" className="w-[80%] h-[80%]" />
        </div>
      )}
    </div>
  );
};

export default SchoolDetail;
