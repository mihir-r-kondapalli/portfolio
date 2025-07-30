"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "./components/Navigation";
import SectionHeader from "./components/SectionHeader";
import ProjectCard from "./components/ProjectCard";
import ContactLink from "./components/ContactLink";
import ExperienceCard from "./components/ExperienceCard";
// EmailJS will be loaded via CDN script tag

export default function Home() {
  const [currentSection, setCurrentSection] = useState<string>("intro");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  useEffect(() => {
    // Load EmailJS from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
      (window as any).emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
    };
    document.head.appendChild(script);

    const handleScroll = () => {
      const sections = ["intro", "about", "experience", "projects", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Clean up script if component unmounts
      const emailScript = document.querySelector('script[src*="emailjs"]');
      if (emailScript) {
        document.head.removeChild(emailScript);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      return;
    }

    // Check if environment variables are set
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS environment variables not set');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Check if EmailJS is loaded
      if (!(window as any).emailjs) {
        throw new Error('EmailJS not loaded');
      }

      // Use environment variables
      const result = await (window as any).emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Mihir', // Your name
        }
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navigation currentSection={currentSection} />
      
      <main className="max-w-4xl mx-auto px-6 pt-24">
        {/* Intro Section */}
        <section id="intro" className="min-h-screen flex flex-col justify-center py-16">
          <div className="space-y-6 max-w-3xl animate-fade-in">
            <h1 className="text-6xl font-bold tracking-tight">
              <span className="block">Hello, I'm</span>
              <span className="block gradient-text">Mihir Kondapalli</span>
            </h1>
            <h2 className="text-2xl text-gray-600">
              Software Engineering Intern & Academic Researcher
            </h2>
            <p className="text-xl leading-relaxed max-w-2xl">
              I build digital frameworks, develop simulations, and research innovative technologies 
              at the intersection of machine learning and computational science.
            </p>
            <div className="pt-8 flex space-x-4">
              <Link 
                href="#experience" 
                className="btn-primary"
              >
                Experience
              </Link>
              <Link 
                href="#projects" 
                className="btn-primary"
              >
                View Projects
              </Link>
              <Link 
                href="#contact" 
                className="btn-secondary"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 min-h-screen flex flex-col justify-center">
          <SectionHeader>About Me</SectionHeader>
          <div className="grid md:grid-cols-2 gap-12 pt-12">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                I'm a Computer Science major at UC Santa Barbara currently working at Teledyne FLIR as a
                Software Engineering Intern.
              </p>
              <p className="text-lg leading-relaxed">
                As a Regents Scholar and Engineering Honors Student, I've worked with the 
                UCSB Vision Research Lab and the Exoplanet Polarimetry Lab, implementing advanced 
                algorithms, developing high-fidelity simulations, and building robust software.
              </p>
              <p className="text-lg leading-relaxed">
                My research interests include machine learning, simulation, optimization, and computational physics. 
                I enjoy tackling complex problems that bridge the gap between theoretical models and practical applications.
              </p>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium mb-4">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'JAX', 'PyTorch', 'TensorFlow', 'C++', 'React', 'R', 'NextJS', 'FastAPI',
                  'Django', 'AWS', 'Docker', 'CUDA', 'SQL', ].map((skill) => (
                    <span key={skill} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4">Education</h3>
                <div className="space-y-2">
                  <p className="font-medium">University of California, Santa Barbara</p>
                  <p>B.S. Computer Science</p>
                  <p>Regents Scholar, Engineering Honors Program</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="experience" className="py-24">
          <SectionHeader>Work Experience</SectionHeader>
          <div className="grid grid-cols-1 gap-8 pt-12">
            <ExperienceCard
              title="Software Engineering Intern"
              company="Teledyne FLIR"
              date="July 2025 - Present"
              bullets={[
              ]}
              logoSrc="/logos/flir.jpeg"
              logoAlt="Teledyne FLIR logo"
            />
            <ExperienceCard
              title="Software Researcher"
              company="UCSB Vision Research Lab"
              date="April 2025 – June 2025"
              bullets={[
                "Utilized Docker to deploy image algorithms within the BISQUE framework",
                "Researched optimal image stitching algorithm implementations",
              ]}
              logoSrc="/logos/ucsb.png"
              logoAlt="UCSB logo"
            />
            <ExperienceCard
              title="Software and Machine Learning Researcher"
              company="UCSB Exoplanet Polarimetry Lab"
              date="April 2024 – Present"
              bullets={[
                "Built a JAX-based ML framework to analyze protoplanetary disk imagery",
                "Developed optimization pipelines integrating complex image processing",
                "Working towards publishing framework to Journal of Open Source Software"
              ]}
              logoSrc="/logos/ucsb.png"
              logoAlt="UCSB logo"
            />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24">
          <SectionHeader>Featured Projects</SectionHeader>
          <div className="grid md:grid-cols-2 gap-8 pt-12">
            <ProjectCard
              title="4th & Sim"
              description="A full-stack NFL simulation platform with predictive modeling, featuring a React/NextJS frontend, FastAPI backend,
              and PostgreSQL database. Includes a Pytorch football strategizer that wins ~55% of games. Simulations powered by R, C++,
              and Python."
              tags={['R', 'C++', 'Python', 'React', 'NextJS', 'FastAPI', 'PostgreSQL', 'PyTorch', 'Bash Scripting', 'AWS', 'Predictive Modeling',
                'Docker', 'Dynamic Programming', 'Typescript'
              ]}
              link="https://fourthandsim.vercel.app"
            />
            <ProjectCard
              title="GRaTeR Scattered Light Disk Framework"
              description="A complex, JAX-based machine learning framework for analyzing and simulating scattered light disks,
              providing high-fidelity modeling for astrophysics research."
              tags={['JAX', 'Python', 'Simulation', 'Sci-kit Learn', 'CUDA', 'Optimization', 'Computer Vision', 'Optics', 'Image Processing', 'Astrophysics']}
              link="https://github.com/UCSB-Exoplanet-Polarimetry-Lab/GRaTeR-JAX"
            />
            <ProjectCard
              title="GRaTeR Image App"
              description="A web application to simulate and visualize protoplanetary disk images using a custom JAX disk framework, used by multiple research groups."
              tags={['Next.js', 'React', 'Django', 'JAX', 'Astrophysics', 'Typescript', 'Docker', 'Image Processing', 'Memory Management', 'Vercel', 'Railway']}
              link="https://scattered-light-disks.vercel.app"
            />
            <ProjectCard
              title="Fast Radio Bursts - Northwestern CIERA"
              description="Explored the connection between FRBs and magnetars using CHIME and LISA data. Applied statistical analysis with Python and Pandas under PhD mentorship at CIERA."
              tags={['Statistics', 'Python', 'Pandas', 'Data Analysis', 'Visualization', 'Astrophysics']}
              link="https://github.com/mihir-r-kondapalli/REACH-Analysis"
            />
            <ProjectCard
              title="Drought Indemnity Loss - MTF Challenge"
              description="Analyzed time-series data regarding potential mitigation factors for the California drought crisis. Wrote and published a 13-page paper to the Journal of Student ResearchWrote and published a
              13-page paper to the Journal of Student Research."
              tags={['Statistics', 'Python', 'Visualization', 'Data Analysis', 'Time Series Modeling', 'Writing']}
              link="https://www.jsr.org/hs/index.php/path/article/view/2976"
            />
            <ProjectCard
              title="Rocket Simulation"
              description="An rk4 integration rocket simulator. Simulates burns and orbital transfers. Visualizes flight trajectories. Currently implementing tensorflow
              agent to control the rocket."
              tags={['Simulation', 'Physics', 'JAX', 'Numpy', 'Math', 'Visualization']}
              link="https://github.com/mihir-r-kondapalli/RocketSimulation"
            />
            <ProjectCard
              title="Interactive Election Simulation Game"
              description="A web based game where users can add votes to a map given certain rules in order to win majorities for the Presidency, Senate, and House of Representatives."
              tags={['React', 'Vite', 'TypeScript', 'Visualization']}
              link="https://github.com/mihir-r-kondapalli/election-ts/"
            />
            <ProjectCard
              title="Minefield"
              description="A real-time online multiplayer game."
              tags={['Web Sockets', 'Python', 'Pickle', 'Network', 'Pygame']}
              link="https://github.com/mihir-r-kondapalli/MinefieldWebSocketGame"
            />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 min-h-screen flex flex-col justify-center">
          <SectionHeader>Get In Touch</SectionHeader>
          <div className="grid md:grid-cols-2 gap-12 pt-12">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                I'm always open to discussing research opportunities and collaboration on projects. 
                Feel free to reach out through any of the channels below.
              </p>
              <div className="space-y-4 pt-4">
                <ContactLink icon="mail" href="mailto:mihir.kondapalli@gmail.com">
                  mihir.kondapalli@gmail.com
                </ContactLink>
                <ContactLink icon="github" href="https://github.com/mihir-r-kondapalli">
                  github.com/mihir-r-kondapalli
                </ContactLink>
                <ContactLink icon="linkedin" href="https://linkedin.com/in/mihir-kondapalli">
                  linkedin.com/in/mihir-kondapalli
                </ContactLink>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus-ring"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus-ring"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus-ring"
                  ></textarea>
                </div>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    Failed to send message. Please try again or contact me directly.
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 py-12 mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-medium mb-4 md:mb-0">Mihir Kondapalli</div>
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} • Built with Next.js
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}