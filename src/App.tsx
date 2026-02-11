import { useState } from "react";
import "./App.css";
import SchoolDetail from "./components/schoolDetail/SchoolDetail";
import Timeline from "./components/timeline/Timeline";
import Film from "./components/film/Film";

function App() {
  const [activeSchool, setActiveSchool] = useState<number>(1);

  const handleSchoolState = (schoolId: number) => {
    setActiveSchool(schoolId);
  };
  return (
    <main className="main min-h-screen text-textlight max-w-5xl mx-auto">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-30">
        <div className="max-w-5xl mx-auto  py-6 flex items-center justify-between text-sm tracking-widest">
          <div className="font-semibold">
            <label>DAVID</label>
            <label className="text-accent-500">
              <b>WEB</b>
            </label>
          </div>
          <nav className="space-x-8">
            <a href="#about">ABOUT</a>
            <a href="#gallery">GALLERY</a>
            <a href="#work">WORK</a>
            <a href="#contact">CONTACT</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        {/* Shared container */}
        <div className="relative w-full">
          <div className="relative w-full">
            {/* Image */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] aspect-[3/2] z-1">
              <img
                src="images/profile.jpg"
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

      {/* Education */}
      <section
        className=" flex flex-col h-screen z-[10] justify-center items-center overflow-hidden"
        id="Education"
      >
        <div className="flex relative items-center  mx-auto h-3/4 justify-between w-full">
          <div className="flex h-full w-3/8 items-center">
            <Timeline updateSchool={handleSchoolState} />
          </div>
          <div className="flex h-full aspect-square">
            <SchoolDetail schoolId={activeSchool} />
          </div>
        </div>
      </section>

      <section
        id="work"
        className="relative h-screen  flex items-center justify-center"
      >
        <div className="relative h-1/2 w-full max-w-6xl mx-auto ">
          <Film />
        </div>
      </section>
    </main>
  );
}

export default App;
