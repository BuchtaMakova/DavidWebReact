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
import InstagramSVG from "./assets/icons/instagram.svg";
import LinkedInSVG from "./assets/icons/linkedin.svg";
import schools from "./data/schools.json";
import { Projects } from "./components/projects/Projects";
import { ContactForm } from "./components/form/ContactForm";

function App() {
  //school timeline state
  const [activeSchool, setActiveSchool] = useState<number>(1);
  const timelineSchools = schools.map((school) => ({
    id: school.id,
    years: school.years,
  }));
  const selectedSchool = schools.find((school) => school.id === activeSchool);

  const handleSchoolState = (schoolId: number) => {
    setActiveSchool(schoolId);
  };

  //hero section
  const heroHandleScroll = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="main min-h-screen text-textlight overflow-hidden">
      {/* Mobile Menu */}
      <div
        className={`fixed h-screen w-screen z-20 bg-black/95 flex flex-col items-center justify-center gap-8 text-xl text-white md:hidden ${
          menuOpen ? "left-[0vw]" : "left-[100vw]"
        } transition-all duration-300`}
      >
        <button id="buttonAbout" onClick={() => handleNavClick("about")}>
          ABOUT
        </button>
        <button
          id="buttonEducation"
          onClick={() => handleNavClick("education")}
        >
          EDUCATION
        </button>
        <button id="buttonProjects" onClick={() => handleNavClick("projects")}>
          PROJECTS
        </button>
        <button id="buttonContact" onClick={() => handleNavClick("contact")}>
          CONTACT
        </button>
      </div>

      {/* Header */}
      <header className="md:absolute top-0 left-0 w-full z-30 px-6">
        <div className="max-w-7xl mx-auto py-6 flex items-center justify-between tracking-widest">
          <div className="font-semibold z-30">
            <span>DAVID</span>
            <span className="text-[#fd322a] font-bold">WEB</span>
          </div>
          <nav className="hidden md:flex space-x-10">
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
          <div className="md:hidden z-50">
            <button
              id="buttonHamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative w-8 h-8 flex flex-col justify-center items-center group"
              aria-label="Toggle menu"
            >
              <span
                className={`absolute h-[2px] w-6 bg-white transition-all duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-2"
                }`}
              />
              <span
                className={`absolute h-[2px] w-6 bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[2px] w-6 bg-white transition-all duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-2"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative min-h-screen  flex items-center px-6 pb-10 md:py-10"
        id="hero"
      >
        {/* Shared container */}
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="flex flex-col-reverse gap-10 md:flex-row relative w-full">
            {/* Image */}
            <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:w-[70%] aspect-3/2 z-1">
              <img
                fetchPriority="high"
                src="images/profile.webp"
                alt="Portrait"
                className="object-cover grayscale w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent hidden md:block " />
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
                <button
                  id="buttonLetsTalk"
                  onClick={heroHandleScroll}
                  className="text-xs mt-6 px-3 py-2 text-white bg-accent hover:bg-accent-hover transition relative cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>LET'S TALK</span>
                </button>

                <button
                  id="buttonDownlaodCV"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = CV;
                    link.download = "David_Urban_en_CV.pdf";
                    link.click();
                  }}
                  className=" text-xs mt-6 px-3 py-2 bg-background-base text-white border hover:bg-background-light border-background-light transition relative cursor-pointer flex items-center justify-center gap-1"
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
      <section className="bg-background-elevated h-[65px] px-6">
        <TechStrip technologies={technologies} />
      </section>

      {/* About */}
      <section
        className="min-h-screen flex justify-center items-center px-6 p-13"
        id="about"
      >
        <div className="flex w-7xl flex-col-reverse md:flex-row-reverse mx-auto gap-12">
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
        </div>
      </section>

      {/* Education */}
      <section className="min-h-screen relative px-6" id="education">
        {/* Background image */}
        <img
          src={selectedSchool?.image}
          alt={selectedSchool?.alt}
          className="absolute top-0 left-0 h-full w-full object-cover z-0"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute top-0 left-0 h-full w-full bg-black/70 z-10" />

        {/* Text content */}
        <div className="relative max-w-7xl mx-auto z-15 text-white py-13 flex flex-col justify-between min-h-screen">
          <div className="flex flex-col gap-4">
            <h2>Education</h2>
            <div className=" flex flex-col gap-1">
              <h3>{selectedSchool?.name}</h3>
              <p className="md:w-md">{selectedSchool?.description}</p>
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

      <section
        id="projects"
        className="min-h-screen relative flex items-center px-6"
      >
        <div className="w-full max-w-7xl mx-auto py-10">
          <h2 className="mb-6">My Projects</h2>
          <Projects />
        </div>
      </section>

      <section
        id="contact"
        className="min-h-screen relative bg-background-elevated flex items-center px-6 py-10"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-10 md:flex-row justify-between items-center w-full">
          {/* Left side */}
          <div className="flex-1 flex flex-col gap-[18px]">
            <h2 className="text-3xl font-bold">Get In Touch</h2>
            <p className="lg:w-[485px]">
              Would you like to work with me or just chat about possible future
              collaboration? Please feel free to contact me.
            </p>
            <div className="space-y-1">
              <p>npor.Loma 1404</p>
              <p>74258 Příbor</p>
              <p>Czechia</p>
            </div>
            <div className="space-y-1 flex flex-col ">
              <a className="w-fit" href="mailto:urban.dav01@gmail.com">
                urban.dav01@gmail.com
              </a>
              <a className="w-fit" href="tel:+420725887292">
                +420 725 887 292
              </a>
            </div>
            <div className="flex gap-[8px] mt-4">
              <a
                href="https://www.instagram.com/durbangrain/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img src={InstagramSVG} alt="Instagram" className="w-7 h-7" />
              </a>
              <a
                href="https://www.linkedin.com/in/david-urban-62b5913a8/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <img src={LinkedInSVG} alt="LinkedIn" className="w-7 h-7" />
              </a>
            </div>
          </div>

          {/* Right side (form) */}
          <div className="flex-1 flex items-center w-full md:justify-end md:max-w-[485px]">
            <ContactForm />
          </div>
        </div>
      </section>
      <footer className="flex justify-center items-center py-6">
        <p className="text-sm text-text-muted text-center">
          © 2026 David Urban • Built with ❤️ using Rect and Tailwind CSS
        </p>
      </footer>
    </main>
  );
}

export default App;
