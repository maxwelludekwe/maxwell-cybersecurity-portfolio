import { Database, Globe, Users, Wifi, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  name: string;
  tools: string;
  description: string | null;
  achievement: string | null;
  date: string | null;
  image_url: string | null;
  video_url: string | null;
  status: string;
}

const iconMap: Record<number, React.ElementType> = {
  0: Database,
  1: Globe,
  2: Users,
  3: Wifi,
};

const defaultProjects = [
  {
    id: "default-1",
    name: "Network Penetration Testing Framework",
    tools: "Python, Nmap, Metasploit, Wireshark",
    description: "Comprehensive penetration testing framework for network vulnerability assessment and security auditing.",
    achievement: "Successfully mapped subnet vulnerabilities and reported findings in a structured format.",
    date: "2024-11",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    video_url: null,
    status: "completed"
  },
  {
    id: "default-2",
    name: "Web App Penetration Test – OWASP Juice Shop",
    tools: "Burp Suite, OWASP Juice Shop",
    description: "Performed black-box testing, intercepted traffic, and detected XSS/SQLi vulnerabilities.",
    achievement: "Documented successful exploit paths and remediation steps.",
    date: "2024-10",
    image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    video_url: null,
    status: "completed"
  },
  {
    id: "default-3",
    name: "Social Engineering Awareness Campaign",
    tools: "Phishing simulations, social engineering frameworks",
    description: "Explored human-based attack methods in cybersecurity and developed awareness training materials.",
    achievement: "Learned how to spot phishing emails and social engineering attacks.",
    date: "2024-09",
    image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
    video_url: null,
    status: "completed"
  },
  {
    id: "default-4",
    name: "Network Traffic Analysis Suite",
    tools: "Wireshark, Python, TCP/IP",
    description: "Used Wireshark to capture and analyze network traffic in a lab environment for security assessment.",
    achievement: "Learned how to inspect packets, detect anomalies, and understand protocols like TCP/IP and HTTP.",
    date: "2024-08",
    image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    video_url: null,
    status: "completed"
  }
];

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('date', { ascending: false });
      
      if (data && data.length > 0) {
        setProjects(data);
      } else {
        setProjects(defaultProjects);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-800 dark:bg-gray-800 light:bg-gray-100 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
        </div>
      </section>
    );
  }

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
          {projects.map((project, index) => {
            const IconComponent = iconMap[index % 4];
            return (
              <div
                key={project.id}
                className="group bg-gray-700 dark:bg-gray-700 light:bg-white border border-gray-600 dark:border-gray-600 light:border-gray-200 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop"} 
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  {project.date && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-gray-900/80 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
                        {project.date}
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-gray-900'
                    }`}>
                      {project.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="p-3 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                      <IconComponent className="h-8 w-8 text-cyan-400" />
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

                  {project.description && (
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  )}

                  {project.achievement && (
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed bg-gray-600/50 dark:bg-gray-600/50 light:bg-gray-50 p-4 rounded-lg">
                      <span className="font-medium text-cyan-400">Achievement:</span> {project.achievement}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
