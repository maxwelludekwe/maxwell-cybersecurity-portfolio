import { Award, CheckCircle, Clock, Eye, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  description: string | null;
  achievement: string | null;
  status: string;
  certificate_url: string | null;
}

const defaultCertificates = [
  {
    id: "default-1",
    name: "Cisco Cybersecurity Essentials",
    issuer: "Cisco",
    description: "Core cybersecurity principles and tools.",
    achievement: "Learned practical network defense, threat classification, and mitigation strategies.",
    status: "completed",
    certificate_url: null
  },
  {
    id: "default-2",
    name: "Alison Cybersecurity Fundamentals",
    issuer: "Alison",
    description: "Foundational understanding of security principles and cyber hygiene.",
    achievement: "Completed modules on data protection, social engineering, and endpoint defense.",
    status: "completed",
    certificate_url: null
  },
  {
    id: "default-3",
    name: "Toolkit for Cybersecurity Professionals: Cybersecurity Fundamentals",
    issuer: "Alison",
    description: "Comprehensive toolkit covering cybersecurity fundamentals for professionals.",
    achievement: "Completed the full course and graduated as part of Alison's 15 million+ community.",
    status: "completed",
    certificate_url: "/alison_cert.jpg"
  }
];

export const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data && data.length > 0) {
        setCertificates(data);
      } else {
        setCertificates(defaultCertificates);
      }
      setLoading(false);
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return (
      <section id="certificates" className="py-20 bg-gray-800 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="certificates" className="py-20 bg-gray-800 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            🏅 Cybersecurity Certificates
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional certifications and continuous learning in cybersecurity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group bg-gray-700 border border-gray-600 rounded-xl p-6 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <Award className="h-8 w-8 text-cyan-400" />
                </div>
                <div className="flex items-center space-x-2">
                  {cert.status === 'completed' ? (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-xs font-medium text-green-400">Completed</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-yellow-400" />
                      <span className="text-xs font-medium text-yellow-400">In Progress</span>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                {cert.name}
              </h3>
              
              <p className="text-cyan-400 font-medium text-sm mb-3">{cert.issuer}</p>

              {cert.description && (
                <p className="text-gray-400 leading-relaxed mb-4">
                  <span className="font-medium">Use:</span> {cert.description}
                </p>
              )}

              {cert.achievement && (
                <p className="text-gray-300 leading-relaxed text-sm bg-gray-600/50 p-3 rounded-lg">
                  <span className="font-medium text-cyan-400">Achievement:</span> {cert.achievement}
                </p>
              )}

              {cert.certificate_url && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
                  onClick={() => window.open(cert.certificate_url!, '_blank')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Certificate
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
