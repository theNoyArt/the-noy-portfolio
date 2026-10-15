import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Showcase } from "../sections/Showcase";
import { Experience } from "../sections/Experience";
import { OtherActivities } from "../sections/OtherActivities";

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Showcase />
      <Experience />
      <OtherActivities />
    </>
  );
}
