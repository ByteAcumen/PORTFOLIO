import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Calendar } from 'lucide-react';
import { useCursor } from '../contexts/useCursor';
import ParticleBackground from './ParticleBackground';

// Removed complex 3D sphere component

const WEB3FORMS_ACCESS_KEY = 'f5e7c2f4-0df5-4eed-a715-6c88965dda43';

const Contact: React.FC = React.memo(() => {
  const { setCursorVariant } = useCursor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult('Sending...');
    setErrorMsg(null);
    if (!formRef.current) return;
    const formDataObj = new FormData(formRef.current);
    formDataObj.append('access_key', WEB3FORMS_ACCESS_KEY);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataObj
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus('success');
        setResult('Form Submitted Successfully');
        setFormData({ name: '', email: '', subject: '', message: '' });
        formRef.current.reset();
      } else {
        setSubmitStatus('error');
        setResult(data.message);
        setErrorMsg(data.message);
      }
    } catch (error: any) {
      setSubmitStatus('error');
      setResult('Something went wrong. Please try again.');
      setErrorMsg(error?.message || 'Unknown error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hemanth.kumar04hh@gmail.com",
      link: "mailto:hemanth.kumar04hh@gmail.com",
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 8488834807",
      link: "tel:+918488834807",
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Yelahanka, Bangalore",
      link: "https://maps.google.com/?q=Yelahanka,Bangalore",
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/h-h-hemanth-kumar",
      link: "https://linkedin.com/in/h-h-hemanth-kumar",
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: Github,
      title: "GitHub",
      value: "github.com/ByteAcumen",
      link: "https://github.com/ByteAcumen",
      color: "from-blue-600 to-indigo-600"
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ByteAcumen', label: 'GitHub', color: 'hover:text-blue-600' },
    { icon: Linkedin, href: 'https://linkedin.com/in/h-h-hemanth-kumar', label: 'LinkedIn', color: 'hover:text-blue-600' }
  ];

  return (
    <section id="contact" className="py-28 min-h-[520px] relative overflow-hidden transition-colors duration-300 animate-fadein">
      {/* Hero-style Background */}
      <div className="absolute inset-0 z-0 pointer-events-none will-change-transform will-change-opacity">
        {/* Light Theme */}
        <div className="absolute inset-0 block dark:hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-indigo-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-32 left-16 w-48 h-48 bg-gradient-to-tr from-indigo-100/30 to-purple-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.1) 1px,transparent 1px)`, backgroundSize: '50px 50px' }} />
        </div>
        {/* Dark Theme */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1128] via-[#101630] to-[#14213d]" />
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-indigo-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-32 left-16 w-48 h-48 bg-gradient-to-tr from-indigo-600/8 to-purple-600/6 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(59,130,246,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.15) 1px,transparent 1px)`, backgroundSize: '50px 50px' }} />
        </div>
        {/* ParticleBackground for subtle depth */}
        <ParticleBackground className="opacity-20 dark:opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 dark:to-black/5" />
      </div>
      <div className="container mx-auto px-6 max-w-7xl relative z-10 will-change-transform will-change-opacity animate-fadein">
        <div className="text-center mb-16 relative animate-fadein">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full opacity-70"></div>
          <span 
            className="inline-block px-5 py-2 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-5 border border-blue-100 dark:border-blue-700/30 shadow-sm animate-fadein-up"
          >
            Get In Touch
          </span>
          <h2 
            className="text-4xl sm:text-5xl font-bold mb-6 font-heading animate-fadein-up"
            onMouseEnter={() => setCursorVariant('text')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            Let's <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative">
              Connect
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400/40 to-indigo-400/40 rounded-full"></span>
            </span>
          </h2>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed text-center animate-fadein-up"
          >
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out through any of the following channels or send me a direct message.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent rounded-full mx-auto mt-8"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-start animate-fadein-up">
          {/* Contact Form */}
          <div
            className="glass p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden group animate-border-glow animate-fadein-up"
            style={{ boxShadow: '0 8px 40px 0 rgba(59,130,246,0.13)' }}
          >
            {/* Animated glowing border */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 animate-border-glow z-10" style={{ opacity: 0.7 }}></div>
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-br-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-tl-3xl"></div>
            <h3 className="relative inline-block text-2xl font-bold font-heading text-gray-900 dark:text-white mb-8 z-10">
              Send Me a Message
              <div className="absolute -bottom-2 left-0 h-1 w-1/2 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
            </h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-7 relative">
              {/* Staggered entrance for fields */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 transition-all shadow-sm"
                      onMouseEnter={() => setCursorVariant('text')}
                      onMouseLeave={() => setCursorVariant('default')}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm">
                    Your Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="example@email.com"
                      className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 transition-all shadow-sm"
                      onMouseEnter={() => setCursorVariant('text')}
                      onMouseLeave={() => setCursorVariant('default')}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm">
                  Subject
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 transition-all shadow-sm"
                    onMouseEnter={() => setCursorVariant('text')}
                    onMouseLeave={() => setCursorVariant('default')}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell me about your project or inquiry..."
                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 transition-all shadow-sm resize-none"
                    onMouseEnter={() => setCursorVariant('text')}
                    onMouseLeave={() => setCursorVariant('default')}
                  ></textarea>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl disabled:opacity-70 transition-all duration-300 relative overflow-hidden group"
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-xl animate-pulse"></span>
                  {isSubmitting ? (
                    <div className="flex items-center z-10">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="font-semibold">Sending Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center z-10">
                      <Send size={18} className="mr-3 animate-bounce" />
                      <span className="font-semibold">Send Message</span>
                    </div>
                  )}
                </button>
              </div>
              {submitStatus === 'success' && (
                <div
                  className="mt-6 px-5 py-4 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 flex items-center shadow-sm border border-emerald-100 dark:border-emerald-900/30"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-800/30 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mr-4">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-base">Message Sent Successfully!</h4>
                    <p className="text-sm opacity-90 mt-0.5">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div
                  className="mt-6 px-5 py-4 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300 flex items-center shadow-sm border border-rose-100 dark:border-rose-900/30"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-800/30 flex items-center justify-center text-rose-500 dark:text-rose-400 mr-4">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-base">Message Failed to Send</h4>
                    <p className="text-sm opacity-90 mt-0.5">Something went wrong. Please try again or contact me directly via email.</p>
                    {errorMsg && <p className="text-xs mt-1 text-rose-500">Error: {errorMsg}</p>}
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center animate-fadein-up">Your information is kept private. I usually respond within 24 hours.</p>
              <span className="block mt-4 text-center text-sm font-medium">{result}</span>
            </form>
          </div>
          {/* Contact Info Card */}
          <div
            className="w-full max-w-md mx-auto glass p-5 sm:p-8 rounded-3xl shadow-2xl flex flex-col gap-2 sm:gap-4 relative overflow-hidden animate-border-glow animate-fadein-up"
            style={{ boxShadow: '0 8px 40px 0 rgba(59,130,246,0.13)' }}
          >
            <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 mr-2 animate-pulse"></span>
              Contact Information
            </h3>
            <div className="flex flex-col gap-3 sm:gap-4">
              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-2 py-3 rounded-2xl transition-all duration-200 cursor-pointer group hover:bg-blue-50/60 dark:hover:bg-blue-900/30"
                >
                  <span className={`min-w-[48px] min-h-[48px] sm:min-w-[52px] sm:min-h-[52px] flex items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-lg group-hover:scale-110 transition-transform`}>
                    <item.icon size={26} className="text-white drop-shadow" />
                  </span>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-base sm:text-lg font-medium text-blue-700 dark:text-blue-300 group-hover:underline break-all transition-colors duration-200">{item.value}</a>
                  ) : (
                    <span className="text-base sm:text-lg font-medium text-blue-700 dark:text-blue-300 break-all transition-colors duration-200">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Map background pattern - decorative element */}
        <div className="absolute bottom-0 right-0 w-full h-[350px] opacity-[0.02] dark:opacity-[0.03] bg-repeat pointer-events-none" 
             style={{ backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/77.594,12.972,11,0/1200x600?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2wzdzFjM3IwNTd2MnBtd25yZzlxMGRzIn0.qPe9KUGFNlsFuy5E_4TqzQ')" }}>
        </div>
      </div>
      {/* Optional floating decorative elements */}
      <div
        className="absolute left-[5%] top-[20%] w-12 h-12 rounded-full bg-gradient-to-br from-blue-200/10 to-indigo-300/10 backdrop-blur-md hidden lg:flex animate-fadein-up"
      />
      <div
        className="absolute right-[10%] bottom-[10%] w-20 h-20 rounded-full bg-gradient-to-tr from-primary-200/5 to-secondary-300/5 backdrop-blur-sm hidden lg:flex animate-fadein-up"
      />

      <div className="flex justify-center mt-20 animate-fadein">
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>  
      </div>
    </section>
  );
});

export default Contact;