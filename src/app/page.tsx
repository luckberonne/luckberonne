import About from "@/components/sections/about";
import Curses from "@/components/sections/curses";
import { getData } from "@/components/sections/dataProvider";
import Experience from "@/components/sections/experience";
import Header from "@/components/sections/header";
import IAM from "@/components/sections/iam";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";

export default async function Home() {
  const data = await getData();

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 grid gap-32">
        <IAM title="lucas" items={data.items}/>
        <Skills/>
        <Experience/>
        <Curses/>
        <Projects/>
        <About/>
    </main>
  );
}
