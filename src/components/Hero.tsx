
import { Shield, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 light:from-gray-50 light:via-white light:to-gray-100 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1)_0%,transparent_50%)] light:bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.05)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1)_0%,transparent_50%)] light:bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05)_0%,transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-8 animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <img 
              src="/lovable-uploads/8faa3dfa-7000-4a5f-8882-af01963cc7c4.png"
              alt="Maxwell Udekwe"
              className="w-full h-full rounded-full border-4 border-cyan-400 shadow-2xl object-cover"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-blue-500/20 animate-pulse"></div>
          </div>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 animate-fade-in delay-500">
          <span className="text-white dark:text-white light:text-gray-900">Maxwell</span>{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Udekwe
          </span>
        </h1>
        
        <div className="text-xl sm:text-2xl text-gray-300 dark:text-gray-300 light:text-gray-600 mb-8 animate-fade-in delay-1000">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Shield className="h-6 w-6 text-cyan-400" />
            <span className="font-semibold">Cybersecurity Enthusiast</span>
          </div>
          <p className="max-w-3xl mx-auto leading-relaxed">
            Guarding the digital realm with <span className="text-cyan-400 font-medium">precision</span>, 
            <span className="text-blue-400 font-medium"> persistence</span>, and 
            <span className="text-purple-400 font-medium"> passion</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-1500">
          <Button
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </Button>
          
          <Button
            variant="outline"
            className="border-2 border-cyan-400 text-cyan-400 dark:text-cyan-400 light:text-cyan-600 hover:bg-cyan-400 hover:text-gray-900 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
            onClick={() => window.open('#', '_blank')}
          >
            <Eye className="h-5 w-5" />
            View Resume
          </Button>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-bounce delay-700 opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000 opacity-60"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300 opacity-60"></div>
      </div>
    </section>
  );
};
