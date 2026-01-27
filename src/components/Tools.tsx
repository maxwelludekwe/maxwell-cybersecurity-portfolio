
import { Shield, Code, Database, Globe, Wifi, Terminal } from "lucide-react";

export const Tools = () => {
  const tools = [
    {
      name: "Kali Linux",
      description: "Penetration testing and ethical hacking OS.",
      achievement: "Built a virtual home lab and conducted simulated attacks.",
      icon: Terminal,  // Using Terminal as OS icon
      category: "Operating System",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
    },
    {
      name: "Wireshark",
      description: "Packet analysis and network monitoring.",
      achievement: "Captured and inspected network traffic to identify unencrypted data and signs of malicious activity.",
      icon: Wifi,
      category: "Network Analysis",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
    },
    {
      name: "Metasploit",
      description: "Vulnerability exploitation framework.",
      achievement: "Simulated attacks in a safe lab environment using Metasploitable to learn exploit execution and payload delivery.",
      icon: Code,
      category: "Exploitation",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
    },
    {
      name: "Burp Suite",
      description: "Web application security testing.",
      achievement: "Identified XSS and SQLi vulnerabilities in test applications like OWASP Juice Shop.",
      icon: Globe,
      category: "Web Security",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"
    },
    {
      name: "Nmap",
      description: "Network scanning and reconnaissance.",
      achievement: "Mapped networks, discovered open ports and services, and created visual scan reports using Zenmap GUI.",
      icon: Database,
      category: "Network Scanning",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=300&fit=crop"
    },
    {
      name: "Python",
      description: "Scripting and automation in cybersecurity workflows.",
      achievement: "Wrote scripts for log parsing, brute-force simulations, and automated vulnerability scans in a controlled lab environment.",
      icon: Code,
      category: "Scripting",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section id="tools" className="py-20 bg-gray-900 dark:bg-gray-900 light:bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
            🔧 Cybersecurity Tools
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 max-w-3xl mx-auto">
            Explore the essential tools I use to secure digital environments and conduct ethical security assessments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              className="group bg-gray-800 dark:bg-gray-800 light:bg-gray-50 border border-gray-700 dark:border-gray-700 light:border-gray-200 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={tool.image} 
                  alt={tool.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                      <tool.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <span className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full">
                      {tool.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                    {tool.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed mb-4">
                  <span className="font-medium text-white dark:text-white light:text-gray-900">Use:</span> {tool.description}
                </p>

                <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed text-sm bg-gray-700/50 dark:bg-gray-700/50 light:bg-gray-100 p-3 rounded-lg">
                  <span className="font-medium text-cyan-400">Achievement:</span> {tool.achievement}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
