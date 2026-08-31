import Rail from "@/components/Rail";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import OtherProjects from "@/components/OtherProjects";
import Skills from "@/components/Skills";
import Recommendation from "@/components/Recommendation";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Rail />
      <main className="main">
        <div className="main-inner">
          <Hero />
          <Projects />
          <Experience />
          <OtherProjects />
          <Skills />
          <Recommendation />
          <Contact />
        </div>
      </main>
    </>
  );
}
