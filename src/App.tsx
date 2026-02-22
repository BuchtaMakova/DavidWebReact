import { useState } from "react";
import "./App.css";

import Timeline from "./components/timeline/Timeline";
import downloadIcon from "@/assets/icons/download.svg";
import CV from "@/assets/files/David_Urban_en_CV.pdf";
import { TechStrip } from "./components/techStrip/TechStrip";
import technologies from "./data/technologies.json";
import MessageSVG from "./assets/icons/message.svg";
import LayersSVG from "./assets/icons/code.svg";
import CodeSVG from "./assets/icons/layers.svg";
import schools from "./data/schools.json";
import { Projects } from "./components/projects/Projects";

function App() {
  const [activeSchool, setActiveSchool] = useState<number>(1);
  const timelineSchools = schools.map((school) => ({
    id: school.id,
    years: school.years,
  }));
  const selectedSchool = schools.find((school) => school.id === activeSchool);

  const handleSchoolState = (schoolId: number) => {
    setActiveSchool(schoolId);
  };
  return (
    <main className="main min-h-screen text-textlight">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-30">
        <div className="max-w-7xl mx-auto  py-6 flex items-center justify-between tracking-widest">
          <div className="font-semibold">
            <span>DAVID</span>
            <span className="text-accent font-bold">WEB</span>
          </div>
          <nav className="space-x-15">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault(); // Prevent URL change
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              ABOUT
            </a>

            <a
              href="#education"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("education")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              EDUCATION
            </a>

            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              PROJECTS
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              CONTACT
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        {/* Shared container */}
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="relative w-full">
            {/* Image */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] aspect-[3/2] z-1">
              <img
                src="images/profile.jpg"
                alt="Portrait"
                className="object-cover grayscale w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h1 className="mb-3">
                Hello,
                <br />
                I’m David Urban
              </h1>

              <p className="max-w-md">
                I’m a tech enthusiast and musician who loves programming,
                playing guitar, and exploring creative projects.
              </p>

              <div className="flex-row flex gap-3">
                <button className="text-xs mt-6 px-3 py-2 text-white bg-accent hover:bg-accent-hover transition relative cursor-pointer flex items-center justify-center gap-1">
                  <span>LET'S TALK</span>
                </button>

                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = CV;
                    link.download = "David_Urban_en_CV.pdf";
                    link.click();
                  }}
                  className=" text-xs mt-6 px-3 py-2 text-white border hover:bg-background-light border-background-light transition relative cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>DOWNLOAD CV</span>

                  <img
                    src={downloadIcon}
                    alt=""
                    className="w-[1.5em] h-[1.5em] object-contain"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Strip */}
      <section className="bg-background-elevated h-[65px]">
        <TechStrip technologies={technologies} />
      </section>

      {/* About */}
      <section className="h-screen flex justify-center items-center" id="about">
        <div className="flex w-7xl mx-auto">
          <div className="flex-1 flex flex-col gap-5">
            <div className="h-[80px] border-l-2 border-border-light hover:border-accent transition-colors duration-250 flex flex-row">
              <div className="h-full aspect-square flex items-center justify-center">
                <img
                  src={CodeSVG}
                  alt="Code Icon"
                  className="w-[45px] h-[45px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-[20px]!">Frontend Developement</h3>
                <p className="small! text-text-muted!">
                  Building modern, responsive web applications with React.
                </p>
              </div>
            </div>
            <div className="h-[80px] border-l-2 border-border-light hover:border-accent transition-colors duration-250 flex flex-row">
              <div className="h-full aspect-square flex items-center justify-center">
                <img
                  src={LayersSVG}
                  alt="Layers Icon"
                  className="w-[45px] h-[45px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-[20px]!">UI & UX Focus</h3>
                <p className="small! text-text-muted!">
                  Creating clean, intuitive interfaces with attention to detail.
                </p>
              </div>
            </div>
            <div className="h-[80px] border-l-2 border-border-light hover:border-accent transition-colors duration-250 flex flex-row">
              <div className="h-full aspect-square flex items-center justify-center">
                <img
                  src={MessageSVG}
                  alt="Message Icon"
                  className="w-[45px] h-[45px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-[20px]!">International Collaboration</h3>
                <p className="small! text-text-muted!">
                  Comfortable working in English and diverse environments.
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <article>
              <h2 className="mb-5">About Me</h2>
              <p>
                I enjoy building web applications that are not only functional,
                but clean and intuitive to use. For me, development is about
                structure, clarity, and creating interfaces that feel natural
                and well thought out. Living and working abroad helped me become
                adaptable and confident in international environments. Outside
                of coding, I am passionate about analog photography, music, and
                historical fencing. Interests that reflect my appreciation for
                precision, discipline, and continuous improvement.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="h-screen relative" id="education">
        {/* Background image */}
        <img
          src={selectedSchool?.image}
          alt={selectedSchool?.alt}
          className="absolute top-0 left-0 h-full w-full object-cover z-0"
        />
        {/* Overlay */}
        <div className="absolute top-0 left-0 h-full w-full bg-black/70 z-10" />

        {/* Text content */}
        <div className="relative max-w-7xl mx-auto z-20 text-white py-13 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            <h2>Education</h2>
            <div className=" flex flex-col w-fit gap-1">
              <h3>{selectedSchool?.name}</h3>
              <p className="w-md">{selectedSchool?.description}</p>
            </div>
          </div>
          <div>
            <Timeline
              updateSchool={handleSchoolState}
              schools={timelineSchools}
            />
          </div>
        </div>
      </section>

      <section id="projects" className="h-screen relative flex items-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-6">My Personal Projects</h2>
          <Projects />
        </div>
      </section>
    </main>
  );
}

export default App;
