/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import PixelButton from "../../../components/PixelButton";
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
      className="py-24 bg-blue-950/20 relative px-2"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-900/20 px-3 py-1 rounded-md mb-4">
              <h2 className="font-pixel text-sm text-blue-400">Contact</h2>
            </div>
            <h3 className="font-pixel text-3xl md:text-4xl">Get In Touch</h3>
            <p className="text-gray-400 mt-4 max-w-lg mx-auto">
              Interested in working together? Feel free to reach out through any
              of the channels below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black border border-blue-900/30 rounded-lg p-6">
              <h4 className="font-pixel text-xl text-blue-400 mb-6">
                Send a Message
              </h4>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-pixel text-gray-400 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={contactData.subject}
                    onChange={(e) => {
                      setContactData({
                        ...contactData,
                        subject: e.target.value,
                      });
                    }}
                    className="w-full bg-blue-950/10 border border-blue-900/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-pixel text-gray-400 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={7}
                    value={contactData.message}
                    onChange={(e) => {
                      setContactData({
                        ...contactData,
                        message: e.target.value,
                      });
                    }}
                    className="w-full bg-blue-950/10 border border-blue-900/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  ></textarea>
                </div>
                <PixelButton type="submit" variant="primary" className="w-full">
                  Send Message
                </PixelButton>
              </form>
            </div>

            <div className="bg-black border border-blue-900/30 rounded-lg p-6">
              <h4 className="font-pixel text-xl text-blue-400 mb-6">
                Connect With Me
              </h4>
              <div className="space-y-6">
                <a
                  href="mailto:joegsuero@gmail.com"
                  className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <div className="bg-blue-900/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-pixel text-sm text-gray-400">
                      Email
                    </div>
                    <div>joegsuero@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://github.com/joegsuero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <div className="bg-blue-900/20 p-3 rounded-lg">
                    <Github className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-pixel text-sm text-gray-400">
                      GitHub
                    </div>
                    <div>github.com/joegsuero</div>
                  </div>
                </a>
                <a
                  href="https://medium.com/@joegsuero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <div className="bg-blue-900/20 p-3 rounded-lg">
                    <img src="medium.svg" className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-pixel text-sm text-gray-400">
                      Medium
                    </div>
                    <div>medium.com/@joegsuero</div>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/joegsuero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <div className="bg-blue-900/20 p-3 rounded-lg">
                    <Linkedin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-pixel text-sm text-gray-400">
                      LinkedIn
                    </div>
                    <div>linkedin.com/in/joegsuero</div>
                  </div>
                </a>

                <div className="pt-4 mt-4 border-t border-blue-900/30">
                  <div className="font-pixel text-sm text-gray-400 mb-2">
                    Location
                  </div>
                  <div className="text-gray-300">
                    Available for remote work worldwide
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default Contact;
