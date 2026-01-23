// app/page.tsx

import Hero from "./components/Hero";
import HomeContent from "./components/HomeContent";
import About from "./components/About";
import SquareReveal from "./components/SquareReveal";


export default function Home() {
  return (
    <main>
      <SquareReveal gridSize={12}>
        <Hero />
      </SquareReveal>

      <SquareReveal gridSize={15}>
        <HomeContent />
      </SquareReveal>

      <SquareReveal gridSize={10}>
        <About />
      </SquareReveal>
    </main>
  );
}
