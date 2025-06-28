
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Tools } from "@/components/Tools";
import { Projects } from "@/components/Projects";
import { Certificates } from "@/components/Certificates";
import { Contact } from "@/components/Contact";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-900 dark:bg-gray-900 light:bg-gray-50 text-white dark:text-white light:text-gray-900 transition-colors duration-300">
        <Navigation />
        <Hero />
        <About />
        <Tools />
        <Projects />
        <Certificates />
        <Contact />
      </div>
    </ThemeProvider>
  );
};

export default Index;
