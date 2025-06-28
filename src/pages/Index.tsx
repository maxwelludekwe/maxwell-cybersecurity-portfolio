
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Tools } from "@/components/Tools";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <Hero />
      <About />
      <Tools />
    </div>
  );
};

export default Index;
