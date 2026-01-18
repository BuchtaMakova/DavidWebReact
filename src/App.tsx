import { useState } from "react";
import "./App.css";
import SchoolDetail from "./components/schoolDetail/SchoolDetail";
import Timeline from "./components/timeline/Timeline";
import Film from "./components/film/film";

function App() {
  const [activeSchool, setActiveSchool] = useState<number>(1);

  const handleSchoolState = (schoolId: number) => {
    setActiveSchool(schoolId);
  };
  return (
    <main className="main min-h-screen bg-background text-secondary overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-30">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-6 flex items-center justify-between text-sm tracking-widest">
          <div className="font-semibold">
            <b>DAVID</b>WEB
          </div>
          <nav className="space-x-8">
            <a className="hover:opacity-70" href="#about">
              ABOUT
            </a>
            <a className="hover:opacity-70" href="#gallery">
              GALLERY
            </a>
            <a className="hover:opacity-70" href="#work">
              WORK
            </a>
            <a className="hover:opacity-70" href="#contact">
              CONTACT
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        {/* Shared container */}
        <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-10">
          <div className="relative w-full">
            {/* Image */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] aspect-[3/2] z-0">
              <img
                src="/profile.jpg"
                alt="Portrait"
                className="object-cover grayscale w-full h-full"
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Hello,
                <br />
                I’m David Urban
              </h1>

              <p className="max-w-md leading-relaxed">
                I’m a tech enthusiast and musician who loves programming,
                playing guitar, and exploring creative projects. When I’m not
                coding or making music, I’m into gaming, scale modeling, and
                watches. Currently, I’m in L’Aquila for Erasmus, expanding my
                horizons. Welcome to my space!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="flex h-screen z-[10] justify-center items-center overflow-hidden"
        id="Education"
      >
        <div className="flex relative items-center max-w-6xl mx-auto h-3/4 justify-between  px-6 lg:px-10 w-full">
          <div className="flex h-full w-3/8 items-center">
            <Timeline updateSchool={handleSchoolState} />
          </div>

          <div className="flex h-full aspect-square">
            <SchoolDetail schoolId={activeSchool} />
          </div>
        </div>
        <div className="absolute w-[600px] h-[600px] bg-primary rounded-full right-[65%] bottom-100 transform translate-x-[50%] translate-y-[50%] z-[-1] blur-[100px] opacity-50" />
      </section>

      <section
        id="work"
        className="relative h-screen overflow-hidden flex items-center justify-center"
      >
        <div className="relative h-1/2 w-full max-w-6xl mx-auto px-6 lg:px-10">
          <Film />
        </div>
      </section>
    </main>
  );
}

export default App;
