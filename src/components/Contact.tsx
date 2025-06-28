
import { Mail, MessageCircle, Linkedin, Github, Phone, Shield } from "lucide-react";

export const Contact = () => {
  const contactMethods = [
    {
      name: "Email",
      value: "maxwelludekwe@gmail.com",
      href: "mailto:maxwelludekwe@gmail.com",
      icon: Mail,
      color: "text-red-400"
    },
    {
      name: "WhatsApp",
      value: "Chat with me",
      href: "https://wa.link/nd899q",
      icon: MessageCircle,
      color: "text-green-400"
    },
    {
      name: "LinkedIn",
      value: "maxwell-udekwe",
      href: "https://www.linkedin.com/in/maxwell-udekwe-7b6296343/",
      icon: Linkedin,
      color: "text-blue-400"
    },
    {
      name: "GitHub",
      value: "maxwelludekwe",
      href: "https://github.com/maxwelludekwe",
      icon: Github,
      color: "text-gray-400"
    },
    {
      name: "Phone",
      value: "+234 913 240 7288",
      href: "tel:+2349132407288",
      icon: Phone,
      color: "text-cyan-400"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-800 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            🔐 Secure Channel
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            This isn't just another contact form — it's an encrypted handshake waiting to happen. 
            Reach out, and let's decode something amazing together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods.map((contact, index) => (
              <a
                key={contact.name}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-700 dark:bg-gray-700 border border-gray-600 rounded-xl p-6 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-2 block"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 bg-gray-600/50 rounded-lg group-hover:bg-cyan-500/20 transition-colors duration-300`}>
                    <contact.icon className={`h-6 w-6 ${contact.color} group-hover:text-cyan-400 transition-colors duration-300`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      {contact.name}
                    </h3>
                    <p className="text-gray-400 text-sm break-all">
                      {contact.value}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-4 p-8 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-xl border border-cyan-500/20">
              <Shield className="h-12 w-12 text-cyan-400" />
              <div className="text-left">
                <h3 className="text-white font-bold text-xl mb-2">Ready to Secure Your Systems?</h3>
                <p className="text-gray-400">Let's discuss your cybersecurity needs and build something secure together.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
