import { useState } from "react";
import "./App.css";
import SchoolDetail from "./components/schoolDetail/SchoolDetail";
import Timeline from "./components/timeline/Timeline";
import Film from "./components/film/Film";
import downloadIcon from "@/assets/icons/download.svg";
import CV from "@/assets/files/David_Urban_en_CV.pdf";

function App() {
  const [activeSchool, setActiveSchool] = useState<number>(1);

  const handleSchoolState = (schoolId: number) => {
    setActiveSchool(schoolId);
  };
  return (
    <main className="main min-h-screen text-textlight">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-30">
        <div className="max-w-5xl mx-auto  py-6 flex items-center justify-between tracking-widest">
          <div className="font-semibold">
            <span>DAVID</span>
            <span className="text-accent-500 font-bold">WEB</span>
          </div>
          <nav className="space-x-8">
            <a href="#about">ABOUT</a>
            <a href="#education">EDUCATION</a>
            <a href="#projects">PROJECTS</a>
            <a href="#contact">CONTACT</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        {/* Shared container */}
        <div className="relative w-full max-w-5xl mx-auto">
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
              <h1 className="font-bold leading-tight mb-3">
                Hello,
                <br />
                I’m David Urban
              </h1>

              <p className="max-w-md leading-relaxed">
                I’m a tech enthusiast and musician who loves programming,
                playing guitar, and exploring creative projects.
              </p>

              <div className="flex-row flex gap-3">
                <button className="text-xs mt-6 px-3 py-2 text-white bg-accent-500 hover:bg-accent-600 transition relative cursor-pointer flex items-center justify-center gap-1">
                  <span>LET'S TALK</span>
                </button>

                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = CV;
                    link.download = "David_Urban_en_CV.pdf";
                    link.click();
                  }}
                  className=" text-xs mt-6 px-3 py-2 text-white border hover:bg-neutral-700 border-neutral-700 transition relative cursor-pointer flex items-center justify-center gap-1"
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

      {/* Education */}
      <section
        className="flex flex-col relative h-screen z-[10] justify-start items-center overflow-hidden bg-surface-1 py-20"
        id="education"
      >
        <div className="flex flex-1 max-w-5xl w-full gap-25 min-h-0">
          {/* Timeline */}
          <div className="flex flex-1 flex-col p-10 min-h-0 bg-surface-2 items-center justify-center">
            <Timeline updateSchool={handleSchoolState} />
          </div>

          {/* School Details */}
          <div className="bg-surface-2 flex-1 min-h-0">
            <SchoolDetail schoolId={activeSchool} />
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="relative h-screen flex flex-col items-center justify-start max-w-5xl mx-auto py-15"
      >
        <h2 className="text-sm tracking-widest text-text-secondary text-center">
          PROJECTS
        </h2>

        <div className="w-full h-full flex items-center justify-center">
          <div className="relative h-3/4 w-full max-w-6xl mx-auto">
            <Film />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
