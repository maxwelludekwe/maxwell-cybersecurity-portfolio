
import { Database, Globe, Users, Wifi } from "lucide-react";

export const Projects = () => {
  const projects = [
    {
      name: "Network Penetration Testing Framework",
      tools: "Python, Nmap, Metasploit, Wireshark",
      description: "Comprehensive penetration testing framework for network vulnerability assessment and security auditing.",
      achievement: "Successfully mapped subnet vulnerabilities and reported findings in a structured format.",
      icon: Database,
      date: "2024-11",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop"
    },
    {
      name: "Web App Penetration Test – OWASP Juice Shop",
      tools: "Burp Suite, OWASP Juice Shop",
      description: "Performed black-box testing, intercepted traffic, and detected XSS/SQLi vulnerabilities.",
      achievement: "Documented successful exploit paths and remediation steps.",
      icon: Globe,
      date: "2024-10",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop"
    },
    {
      name: "Social Engineering Awareness Campaign",
      tools: "Phishing simulations, social engineering frameworks",
      description: "Explored human-based attack methods in cybersecurity and developed awareness training materials.",
      achievement: "Learned how to spot phishing emails and social engineering attacks.",
      icon: Users,
      date: "2024-09",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop"
    },
    {
      name: "Network Traffic Analysis Suite",
      tools: "Wireshark, Python, TCP/IP",
      description: "Used Wireshark to capture and analyze network traffic in a lab environment for security assessment.",
      achievement: "Learned how to inspect packets, detect anomalies, and understand protocols like TCP/IP and HTTP.",
      icon: Wifi,
      date: "2024-08",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-800 dark:bg-gray-800 light:bg-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
            💻 Cybersecurity Projects
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 max-w-3xl mx-auto">
            Hands-on cybersecurity projects demonstrating practical skills and real-world applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="group bg-gray-700 dark:bg-gray-700 light:bg-white border border-gray-600 dark:border-gray-600 light:border-gray-200 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-gray-900/80 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
                    {project.date}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Completed
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="p-3 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                    <project.icon className="h-8 w-8 text-cyan-400" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {project.name}
                </h3>
                
                <p className="text-cyan-400 font-medium text-sm mb-4">
                  <span className="font-bold">Tools:</span> {project.tools}
                </p>

                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed mb-4">
                  {project.description}
                </p>

                <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed bg-gray-600/50 dark:bg-gray-600/50 light:bg-gray-50 p-4 rounded-lg">
                  <span className="font-medium text-cyan-400">Achievement:</span> {project.achievement}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
