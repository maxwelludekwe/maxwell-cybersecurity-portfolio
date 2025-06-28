
import { Shield, Lock, Code, Database } from "lucide-react";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 light:from-gray-50 light:via-gray-100 light:to-gray-50 overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-cyan-400/20">
          <Code className="h-12 w-12 animate-pulse" />
        </div>
        <div className="absolute top-40 right-32 text-cyan-400/20">
          <Lock className="h-16 w-16 animate-pulse delay-1000" />
        </div>
        <div className="absolute bottom-32 left-16 text-cyan-400/20">
          <Database className="h-14 w-14 animate-pulse delay-2000" />
        </div>
        <div className="absolute bottom-20 right-20 text-cyan-400/20">
          <Shield className="h-10 w-10 animate-pulse delay-3000" />
        </div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-cyan-400/10 rounded-full border border-cyan-400/20 mb-6">
            <Shield className="h-16 w-16 text-cyan-400" />
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-cyan-400 dark:from-white dark:via-cyan-100 dark:to-cyan-400 light:from-gray-900 light:via-cyan-600 light:to-cyan-500 bg-clip-text text-transparent animate-fade-in">
          Maxwell Udekwe
        </h1>

        <h2 className="text-xl sm:text-2xl lg:text-3xl text-cyan-400 font-semibold mb-6 animate-fade-in delay-500">
          Cybersecurity Enthusiast
        </h2>

        <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-1000">
          Guarding the digital realm with <span className="text-cyan-400 font-semibold">precision</span>, 
          <span className="text-cyan-400 font-semibold"> persistence</span>, and 
          <span className="text-cyan-400 font-semibold"> passion</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-1500">
          <a
            href="#about"
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            Learn More
          </a>
          <a
            href="#tools"
            className="px-8 py-3 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105"
          >
            View Tools
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
