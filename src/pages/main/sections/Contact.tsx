/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import React, { forwardRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Contact = forwardRef((_props, ref: any) => {
  const [contactData, setContactData] = useState({
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const email = "joegsuero@gmail.com";
    const subject = encodeURIComponent(contactData.subject);
    const body = encodeURIComponent(contactData.message);

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 relative px-6 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6 glass"
            >
              <h2 className="text-sm font-medium tracking-wider uppercase text-blue-400">Connect</h2>
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Get In <span className="text-gradient">Touch</span>
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              Interested in working together or just want to say hi? 
              Feel free to reach out through any of the channels below.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 border border-white/5 rounded-3xl p-10 glass-dark"
            >
              <h4 className="text-2xl font-bold text-white mb-8">
                Send a Message
              </h4>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-400 mb-2 ml-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Project Inquiry"
                    value={contactData.subject}
                    onChange={(e) => {
                      setContactData({
                        ...contactData,
                        subject: e.target.value,
                      });
                    }}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-400 mb-2 ml-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Hello Jose, I'd like to talk about..."
                    value={contactData.message}
                    onChange={(e) => {
                      setContactData({
                        ...contactData,
                        message: e.target.value,
                      });
                    }}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 border border-white/5 rounded-3xl p-10 glass-dark flex flex-col"
            >
              <h4 className="text-2xl font-bold text-white mb-8">
                Connect With Me
              </h4>
              <div className="space-y-6 flex-grow">
                <a
                  href="mailto:joegsuero@gmail.com"
                  className="flex items-center gap-5 p-4 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all group"
                >
                  <div className="bg-blue-500/10 p-4 rounded-2xl group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors">
                    <Mail className="w-6 h-6 text-blue-400 group-hover:text-inherit" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
                      Email
                    </div>
                    <div className="text-gray-300 font-medium group-hover:text-white transition-colors">joegsuero@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://github.com/joegsuero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-4 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all group"
                >
                  <div className="bg-blue-500/10 p-4 rounded-2xl group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors">
                    <Github className="w-6 h-6 text-blue-400 group-hover:text-inherit" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
                      GitHub
                    </div>
                    <div className="text-gray-300 font-medium group-hover:text-white transition-colors">github.com/joegsuero</div>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/joegsuero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-4 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all group"
                >
                  <div className="bg-blue-500/10 p-4 rounded-2xl group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors">
                    <Linkedin className="w-6 h-6 text-blue-400 group-hover:text-inherit" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
                      LinkedIn
                    </div>
                    <div className="text-gray-300 font-medium group-hover:text-white transition-colors">linkedin.com/in/joegsuero</div>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Availability
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <div className="text-gray-300 font-medium">
                    Available for new opportunities
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;
