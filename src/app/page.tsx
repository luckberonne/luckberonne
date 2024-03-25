import About from "@/components/sections/about";
import Curses from "@/components/sections/curses";
import Experience from "@/components/sections/experience";
import IAM from "@/components/sections/iam";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";

export default function Home() {
  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
      <div className="mb-24 mt-20">
        <IAM/>
      </div>
      <div className="my-8">
        <Skills/>
      </div>
      <div className="my-8">
        <Experience/>
      </div>
      <div className="my-8">
        <Curses/>
      </div>
      <div className="my-8">
        <Projects/>
      </div>
      <div className="my-8">
        <About/>
      </div>
    </main>
  );
}
