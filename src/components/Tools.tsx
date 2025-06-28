
import { Shield, Code, Database, Globe, Wifi, Zap } from "lucide-react";

export const Tools = () => {
  const tools = [
    {
      name: "Kali Linux",
      description: "Penetration testing and ethical hacking OS.",
      achievement: "Built a virtual home lab and conducted simulated attacks.",
      icon: Shield,
      category: "Operating System"
    },
    {
      name: "Wireshark",
      description: "Packet analysis and network monitoring.",
      achievement: "Captured and inspected network traffic to identify unencrypted data and signs of malicious activity.",
      icon: Wifi,
      category: "Network Analysis"
    },
    {
      name: "Metasploit",
      description: "Vulnerability exploitation framework.",
      achievement: "Simulated attacks in a safe lab environment using Metasploitable to learn exploit execution and payload delivery.",
      icon: Code,
      category: "Exploitation"
    },
    {
      name: "Burp Suite",
      description: "Web application security testing.",
      achievement: "Identified XSS and SQLi vulnerabilities in test applications like OWASP Juice Shop.",
      icon: Globe,
      category: "Web Security"
    },
    {
      name: "Nmap",
      description: "Network scanning and reconnaissance.",
      achievement: "Mapped networks, discovered open ports and services, and created visual scan reports using Zenmap GUI.",
      icon: Database,
      category: "Network Scanning"
    },
    {
      name: "Python",
      description: "Scripting and automation in cybersecurity workflows.",
      achievement: "Wrote scripts for log parsing, brute-force simulations, and automated vulnerability scans in a controlled lab environment.",
      icon: Code,
      category: "Scripting"
    }
  ];

  return (
    <section id="tools" className="py-20 bg-gray-900 dark:bg-gray-900 transition-colors duration-300">
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
              className="group bg-gray-800 dark:bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-2"
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

              <p className="text-gray-400 leading-relaxed mb-4">
                <span className="font-medium">Use:</span> {tool.description}
              </p>

              <p className="text-gray-300 leading-relaxed text-sm bg-gray-700/50 p-3 rounded-lg">
                <span className="font-medium text-cyan-400">Achievement:</span> {tool.achievement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
