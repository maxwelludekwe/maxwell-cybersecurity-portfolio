
import { Shield, Code, Lock, Database } from "lucide-react";

export const About = () => {
  const highlights = [
    "IT Support Background",
    "Ethical Hacking",
    "Network Defense",
    "Malware Analysis",
    "Penetration Testing",
    "SOC Analyst Skills",
    "Cloud Security",
    "Social Engineering Awareness"
  ];

  return (
    <section id="about" className="py-20 bg-gray-800 dark:bg-gray-800 light:bg-gray-100 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-4 transition-colors duration-300">
            About Me
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed transition-colors duration-300">
              I'm <span className="text-cyan-400 font-semibold">Maxwell Udekwe</span>, a passionate cybersecurity enthusiast with a strong background in IT support and digital systems. Over the past few years, I've shifted my focus fully into cybersecurity, building hands-on experience with industry-standard tools.
            </p>

            <p className="text-lg text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed transition-colors duration-300">
              My goal is to help secure digital environments through ethical hacking, network defense, and awareness of modern cyber threats. I enjoy exploring real-world attack simulations, studying malware behavior, and staying ahead of emerging vulnerabilities.
            </p>

            <p className="text-lg text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed transition-colors duration-300">
              Whether it's penetration testing, SOC analysis, social engineering awareness, or cloud security, I approach each project with <span className="text-cyan-400 font-semibold">curiosity</span>, <span className="text-cyan-400 font-semibold">precision</span>, and a constant drive to learn.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-8">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight}
                  className="flex items-center space-x-2 p-3 bg-gray-700/50 dark:bg-gray-700/50 light:bg-gray-200/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors duration-200"
                >
                  <div className="h-2 w-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-sm font-medium transition-colors duration-300">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-2xl p-8 border border-cyan-500/30">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-700/50 dark:bg-gray-700/50 light:bg-gray-200/50 rounded-lg transition-colors duration-300">
                  <Shield className="h-12 w-12 text-cyan-400 mx-auto mb-3" />
                  <h3 className="text-white dark:text-white light:text-gray-900 font-semibold transition-colors duration-300">Defense</h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-sm transition-colors duration-300">Network Security</p>
                </div>
                <div className="text-center p-4 bg-gray-700/50 dark:bg-gray-700/50 light:bg-gray-200/50 rounded-lg transition-colors duration-300">
                  <Code className="h-12 w-12 text-cyan-400 mx-auto mb-3" />
                  <h3 className="text-white dark:text-white light:text-gray-900 font-semibold transition-colors duration-300">Analysis</h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-sm transition-colors duration-300">Threat Detection</p>
                </div>
                <div className="text-center p-4 bg-gray-700/50 dark:bg-gray-700/50 light:bg-gray-200/50 rounded-lg transition-colors duration-300">
                  <Lock className="h-12 w-12 text-cyan-400 mx-auto mb-3" />
                  <h3 className="text-white dark:text-white light:text-gray-900 font-semibold transition-colors duration-300">Testing</h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-sm transition-colors duration-300">Penetration</p>
                </div>
                <div className="text-center p-4 bg-gray-700/50 dark:bg-gray-700/50 light:bg-gray-200/50 rounded-lg transition-colors duration-300">
                  <Database className="h-12 w-12 text-cyan-400 mx-auto mb-3" />
                  <h3 className="text-white dark:text-white light:text-gray-900 font-semibold transition-colors duration-300">Research</h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-sm transition-colors duration-300">Vulnerability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
