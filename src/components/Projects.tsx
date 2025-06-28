
import { Database, Globe, Users, Wifi } from "lucide-react";

export const Projects = () => {
  const projects = [
    {
      name: "Network Scanning with Nmap",
      tools: "Nmap, Zenmap",
      description: "Conducted scans to identify open ports, OS types, and services in a simulated lab environment.",
      achievement: "Successfully mapped subnet vulnerabilities and reported findings in a structured format.",
      icon: Database
    },
    {
      name: "Web App Penetration Test – OWASP Juice Shop",
      tools: "Burp Suite, OWASP Juice Shop",
      description: "Performed black-box testing, intercepted traffic, and detected XSS/SQLi vulnerabilities.",
      achievement: "Documented successful exploit paths and remediation steps.",
      icon: Globe
    },
    {
      name: "Social Engineering",
      tools: "Phishing simulations, social engineering frameworks",
      description: "Explored human-based attack methods in cybersecurity.",
      achievement: "Learned how to spot phishing emails and social engineering attacks.",
      icon: Users
    },
    {
      name: "Packet Analysis with Wireshark",
      tools: "Wireshark",
      description: "Used Wireshark to capture and analyze network traffic in a lab environment.",
      achievement: "Learned how to inspect packets, detect anomalies, and understand protocols like TCP/IP and HTTP.",
      icon: Wifi
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            💻 Cybersecurity Projects
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hands-on cybersecurity projects demonstrating practical skills and real-world applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="group bg-gray-800 dark:bg-gray-800 border border-gray-700 rounded-xl p-8 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <project.icon className="h-10 w-10 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-cyan-400 font-medium text-sm">
                    <span className="font-bold">Tools:</span> {project.tools}
                  </p>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-4">
                <span className="font-medium text-white">Description:</span> {project.description}
              </p>

              <p className="text-gray-300 leading-relaxed bg-gray-700/50 p-4 rounded-lg">
                <span className="font-medium text-cyan-400">Achievement:</span> {project.achievement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
