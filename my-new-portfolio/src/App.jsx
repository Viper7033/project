import React, { useState, useEffect, useRef } from 'react';

// --- Helper Hook for Animations ---
// This custom hook detects if an element is visible in the viewport.
const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                // We can unobserve after it becomes visible if we don't need to re-trigger the animation
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};


// --- SVG Icon Components ---
const MenuIcon = (props) => (
    <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const XIcon = (props) => (
    <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const GithubIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const LinkedinIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const ExternalLinkIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);


// --- Data ---
const personalInfo = {
    name: "Vivek Shankar",
    email: "vivekshankar7033@gmail.com",
    linkedin: "https://www.linkedin.com/in/vivek-shankar-a43a60291",
    github: "https://github.com/Viper7033",
    resume: "https://drive.google.com/file/d/15s_e6PR-wyIwnniD3Edn6QwjPTHMzW-J/view?usp=sharing"
};

const projects = [
    {
      title: 'Spotify Clone',
      description: 'A responsive, front-end clone of the Spotify web player, focusing on recreating the user interface with pure HTML and CSS to practice layout and design principles.',
      tags: ['HTML5', 'CSS3', 'UI/UX', 'Responsive Design'],
      liveUrl: 'https://spotify-clone-1emh7yzww-vivek-shankars-projects.vercel.app',
      githubUrl: 'https://github.com/Viper7033',
      imageUrl: 'https://placehold.co/600x400/1DB954/ffffff?text=Spotify+Clone'
    },
    {
      title: 'AI Roadway Classification',
      description: 'A group machine learning project to classify roadways and track vehicles using GNSS data. Implemented data preprocessing, model training (XG Boost), and map matching.',
      tags: ['Python', 'Scikit-learn', 'XG Boost', 'Pandas', 'Machine Learning'],
      liveUrl: '#',
      githubUrl: 'https://github.com/Viper7033',
      imageUrl: 'https://placehold.co/600x400/4f46e5/ffffff?text=AI+Vehicle+Tracking'
    },
    {
      title: 'Personal Portfolio',
      description: 'A modern, single-page portfolio built from scratch to showcase my skills and projects, featuring a mobile-first design and subtle animations.',
      tags: ['React', 'Tailwind CSS', 'JavaScript (ES6+)', 'Vite'],
      liveUrl: '#',
      githubUrl: 'https://github.com/Viper7033',
      imageUrl: 'https://placehold.co/600x400/0d9488/ffffff?text=Portfolio'
    },
];

const skills = ['C/C++', 'JavaScript (ES6+)', 'React', 'Node.js', 'HTML & CSS', 'Tailwind CSS', 'Express.js', 'Git & GitHub', 'REST APIs', 'SQL'];

// --- Sub-Components ---

const AnimatedSection = ({ children, id }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <section ref={ref} id={id} className={`py-24 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {children}
        </section>
    );
};

const Header = ({ onNavClick }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'about', title: 'About' },
        { id: 'projects', title: 'Projects' },
        { id: 'contact', title: 'Contact' },
    ];

    const handleLinkClick = (id) => {
        onNavClick(id);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-slate-900'}`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-white tracking-wider cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => handleLinkClick('hero')}>
                    {personalInfo.name}
                </div>
                <div className="hidden md:flex space-x-8 items-center">
                    {navLinks.map((link, index) => (
                        <a key={link.id} href={`#${link.id}`} onClick={(e) => { e.preventDefault(); handleLinkClick(link.id); }} className="text-slate-300 hover:text-cyan-400 transition-colors duration-300">
                           <span className="text-cyan-400">0{index+1}.</span> {link.title}
                        </a>
                    ))}
                    <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer" className="bg-transparent border border-cyan-500 text-cyan-500 font-bold py-2 px-4 rounded-md transition-all duration-300 hover:bg-cyan-500/10">
                        Resume
                    </a>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300 hover:text-cyan-400">
                        {isMobileMenuOpen ? <XIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
                    </button>
                </div>
            </nav>
            {isMobileMenuOpen && (
                <div className="md:hidden bg-slate-800/95 backdrop-blur-sm">
                    <div className="px-4 pt-2 pb-4 space-y-2 flex flex-col items-center">
                        {navLinks.map(link => (
                            <a key={link.id} href={`#${link.id}`} onClick={(e) => { e.preventDefault(); handleLinkClick(link.id); }} className="block py-2 rounded-md text-base font-medium hover:text-white hover:bg-slate-700 w-full text-center">
                                {link.title}
                            </a>
                        ))}
                        <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer" className="block py-2 rounded-md text-base font-medium bg-cyan-500 text-white hover:bg-cyan-600 w-full text-center mt-2">
                            Resume
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

const HeroSection = ({ onNavClick }) => (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-start py-20">
        <p className="text-lg md:text-xl text-cyan-400 mb-4 animate-[fadeInUp_1s_ease-out]">Hi, my name is</p>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-100 mb-3 animate-[fadeInUp_1.2s_ease-out]">{personalInfo.name}.</h1>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-400 mb-8 animate-[fadeInUp_1.4s_ease-out]">I build solutions for the web.</h2>
        <p className="max-w-xl text-lg text-slate-400 mb-8 animate-[fadeInUp_1.6s_ease-out]">
            I am a B.Tech student in Electronics and Instrumentation at NIT Silchar, with a strong passion for developing and designing high-quality digital experiences. Currently focused on mastering the MERN stack.
        </p>
        <div className="flex items-center gap-6 animate-[fadeInUp_1.8s_ease-out]">
            <a href={`mailto:${personalInfo.email}`} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1">
                Get In Touch
            </a>
            <div className="flex gap-4">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"><GithubIcon className="h-7 w-7" /></a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"><LinkedinIcon className="h-7 w-7" /></a>
            </div>
        </div>
    </section>
);

const AboutSection = () => (
    <AnimatedSection id="about">
        <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center">
            <span className="text-cyan-400 text-2xl mr-3">01.</span> About Me
            <span className="flex-grow h-px bg-slate-700 ml-4"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-3 text-slate-400 text-lg space-y-4">
                <p>
                    Hello! I'm Vivek, a student and developer with a keen interest in bringing ideas to life on the internet. My journey into tech is driven by a desire to solve problems and build useful, elegant applications.
                </p>
                <p>
                    Currently pursuing my B.Tech at NIT Silchar, I'm honing my skills in full-stack development. I have hands-on experience from my industrial training at Indian Oil Corporation, which provided valuable insights into large-scale instrumentation systems.
                </p>
                <p>Here are a few technologies I’ve been working with recently:</p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 list-inside font-mono text-sm">
                    {skills.map(skill => (
                        <li key={skill} className="flex items-center"><span className="text-cyan-400 mr-2">▹</span>{skill}</li>
                    ))}
                </ul>
            </div>
            <div className="md:col-span-2 flex justify-center items-start">
                <div className="w-64 h-64 rounded-lg bg-slate-800 relative group">
                    <img
                        src="/vivek.jpg"
                        alt={personalInfo.name}
                        className="rounded-lg w-full h-full object-cover z-10 relative transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5"
                    />
                    <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const ProjectsSection = () => (
    <AnimatedSection id="projects">
        <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center">
            <span className="text-cyan-400 text-2xl mr-3">02.</span> Things I've Built
            <span className="flex-grow h-px bg-slate-700 ml-4"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <div key={project.title} className="bg-slate-800/50 rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 border border-transparent hover:border-slate-700">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                            <div className="flex items-center space-x-4 text-slate-400">
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors"><GithubIcon className="h-6 w-6" /></a>
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors"><ExternalLinkIcon className="h-6 w-6" /></a>
                            </div>
                        </div>
                        <p className="text-slate-400 mb-4 flex-grow">{project.description}</p>
                        <div className="mt-auto">
                            <ul className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <li key={tag} className="text-xs font-mono text-cyan-300 bg-slate-700/50 px-2 py-1 rounded-md">{tag}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </AnimatedSection>
);

const ContactSection = () => (
    <AnimatedSection id="contact">
        <div className="text-center max-w-xl mx-auto">
            <h2 className="text-center text-cyan-400 font-mono mb-4">03. What’s Next?</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">Get In Touch</h3>
            <p className="text-slate-400 mb-8">
                I'm actively seeking new opportunities and collaborations. My inbox is always open, whether you have a question, a proposal, or just want to say hello. I'll get back to you promptly!
            </p>
            <a href={`mailto:${personalInfo.email}`} className="inline-block bg-transparent border-2 border-cyan-500 text-cyan-500 font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-cyan-500/10 transform hover:-translate-y-1">
                Say Hello
            </a>
        </div>
    </AnimatedSection>
);

const Footer = () => (
    <footer className="py-8 text-center text-slate-500">
        <div className="flex justify-center gap-5 mb-4">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-transform duration-300 hover:scale-110"><GithubIcon className="h-6 w-6" /></a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-transform duration-300 hover:scale-110"><LinkedinIcon className="h-6 w-6" /></a>
        </div>
        <p className="font-mono text-sm">Designed & Built by {personalInfo.name}</p>
        <p className="text-xs">&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
    </footer>
);


// --- Main App Component ---

function App() {
    const handleNavClick = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-slate-900 text-slate-300 font-sans leading-relaxed selection:bg-cyan-500/20">
            <Header onNavClick={handleNavClick} />
            <main className="container mx-auto px-6">
                <HeroSection onNavClick={handleNavClick} />
                <AboutSection />
                <ProjectsSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}

export default App;

