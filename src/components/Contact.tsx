
import { Mail, MessageCircle, Linkedin, Github, Phone, Shield, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
    <section id="contact" className="py-20 bg-gray-800 dark:bg-gray-800 light:bg-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
            🔐 Secure Channel
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 max-w-3xl mx-auto">
            This isn't just another contact form — it's an encrypted handshake waiting to happen. 
            Reach out, and let's decode something amazing together.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 bg-gray-700/50 dark:bg-gray-700/50 light:bg-white border border-gray-600 dark:border-gray-600 light:border-gray-200 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white dark:text-white light:text-gray-700 text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600/50 dark:bg-gray-600/50 light:bg-gray-50 border-gray-500 dark:border-gray-500 light:border-gray-300 text-white dark:text-white light:text-gray-900 focus:border-cyan-400 focus:ring-cyan-400/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white dark:text-white light:text-gray-700 text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600/50 dark:bg-gray-600/50 light:bg-gray-50 border-gray-500 dark:border-gray-500 light:border-gray-300 text-white dark:text-white light:text-gray-900 focus:border-cyan-400 focus:ring-cyan-400/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-white dark:text-white light:text-gray-700 text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600/50 dark:bg-gray-600/50 light:bg-gray-50 border-gray-500 dark:border-gray-500 light:border-gray-300 text-white dark:text-white light:text-gray-900 focus:border-cyan-400 focus:ring-cyan-400/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white dark:text-white light:text-gray-700 text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600/50 dark:bg-gray-600/50 light:bg-gray-50 border-gray-500 dark:border-gray-500 light:border-gray-300 text-white dark:text-white light:text-gray-900 focus:border-cyan-400 focus:ring-cyan-400/20 resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-6">
              Get in Touch
            </h3>
            <div className="grid gap-4">
              {contactMethods.map((contact, index) => (
                <a
                  key={contact.name}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-700/50 dark:bg-gray-700/50 light:bg-white border border-gray-600 dark:border-gray-600 light:border-gray-200 rounded-xl p-4 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1 block"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-gray-600/50 dark:bg-gray-600/50 light:bg-gray-100 rounded-lg group-hover:bg-cyan-500/20 transition-colors duration-300`}>
                      <contact.icon className={`h-6 w-6 ${contact.color} group-hover:text-cyan-400 transition-colors duration-300`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white dark:text-white light:text-gray-900 font-semibold mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                        {contact.name}
                      </h4>
                      <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm break-all">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8">
              <div className="inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-xl border border-cyan-500/20">
                <Shield className="h-10 w-10 text-cyan-400" />
                <div className="text-left">
                  <h4 className="text-white dark:text-white light:text-gray-900 font-bold text-lg mb-1">Ready to Secure Your Systems?</h4>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">Let's discuss your cybersecurity needs and build something secure together.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
