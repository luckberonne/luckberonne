import About from "@/components/sections/about";
import IAM from "@/components/sections/iam";
import Skills from "@/components/sections/skills";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-20">
      <IAM/>
      <Skills/>
      <About/>
    </main>
  );
}
