
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Tools } from "@/components/Tools";
import { Certificates } from "@/components/Certificates";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-900 dark:bg-gray-900 text-white transition-colors duration-300">
        <Navigation />
        <Hero />
        <About />
        <Tools />
        <Certificates />
        <Projects />
        <Contact />
      </div>
    </ThemeProvider>
  );
};

export default Index;
