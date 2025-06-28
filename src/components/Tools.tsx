
import { Shield, Code, Database, Globe, Wifi, Zap } from "lucide-react";

export const Tools = () => {
  const tools = [
    {
      name: "Kali Linux",
      description: "Penetration testing and digital forensics",
      icon: Shield,
      category: "Operating System"
    },
    {
      name: "Wireshark",
      description: "Network protocol analyzer for traffic analysis",
      icon: Wifi,
      category: "Network Analysis"
    },
    {
      name: "Burp Suite",
      description: "Web application security testing platform",
      icon: Globe,
      category: "Web Security"
    },
    {
      name: "Nmap",
      description: "Network discovery and security auditing",
      icon: Database,
      category: "Network Scanning"
    },
    {
      name: "Metasploit",
      description: "Penetration testing framework",
      icon: Code,
      category: "Exploitation"
    },
    {
      name: "OWASP ZAP",
      description: "Web application vulnerability scanner",
      icon: Zap,
      category: "Web Security"
    }
  ];

  return (
    <section id="tools" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            🔧 Cybersecurity Tools
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the essential tools I use to secure digital environments and conduct ethical security assessments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              className="group bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <tool.icon className="h-8 w-8 text-cyan-400" />
                </div>
                <span className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full">
                  {tool.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                {tool.name}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {tool.description}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center text-cyan-400 text-sm font-medium">
                  <span>Learn More</span>
                  <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-xl border border-cyan-500/20">
            <Shield className="h-8 w-8 text-cyan-400" />
            <div className="text-left">
              <h3 className="text-white font-semibold">Ready to Secure Your Systems?</h3>
              <p className="text-gray-400 text-sm">Let's discuss your cybersecurity needs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
