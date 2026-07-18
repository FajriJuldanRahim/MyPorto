import { useState, useEffect, useRef } from 'react';
import { 
  Sun, 
  Moon, 
  Download, 
  ArrowUp, 
  Search, 
  Menu, 
  X, 
  Terminal, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Github, 
  Linkedin, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Code, 
  Layout, 
  Server, 
  Database, 
  BarChart2, 
  Settings, 
  Compass, 
  ExternalLink,
  ChevronRight,
  Info,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data and Types
import { PERSONAL_INFO, SKILL_CATEGORIES, PROJECTS, EXPERIENCES, CERTIFICATES, BLOG_POSTS } from './data';
import { Project, Certificate, BlogPost } from './types';

// Subcomponents
import ProjectDetailModal from './components/ProjectDetailModal';
import CertificatePreviewModal from './components/CertificatePreviewModal';
import BlogReadModal from './components/BlogReadModal';
import ContactForm from './components/ContactForm';

export default function App() {
  // Navigation & Scroll
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Theme Management
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Typing Effect
  const roles = ['HR Recruitment & OD Specialist', 'Employer Branding Lead', 'Web & Data Analytics Enthusiast'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeletingRole, setIsDeletingRole] = useState(false);

  // Statistics Count Up
  const [statProjects, setStatProjects] = useState(0);
  const [statCerts, setStatCerts] = useState(0);
  const [statTechs, setStatTechs] = useState(0);
  const [statYears, setStatYears] = useState(0);

  // Filtering & Search
  const [portfolioSearch, setPortfolioSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Selection state for Modals
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [showCvModal, setShowCvModal] = useState(false);

  // Toast Notifications
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'info' }[]>([]);

  // Refs for Scroll Spy
  const sectionIds = ['home', 'about', 'skills', 'portfolio', 'experience', 'certificates', 'blog', 'contact'];

  // Add a toast notification helper
  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Initialize Theme and Scroll Listeners
  useEffect(() => {
    // Check local storage or system default
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme === 'dark' || (!savedTheme && systemPrefersDark) ? 'dark' : 'light';
    
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Scroll Handler
    const handleScroll = () => {
      // Calculate Scroll Progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Navbar change background state
      setIsScrolled(window.scrollY > 20);

      // Back to Top button visibility
      setShowBackToTop(window.scrollY > 400);

      // Active Section Scroll Spy
      let currentSection = 'home';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust threshold for sticky navbar
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Toggle Function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      addToast('Mode Gelap diaktifkan', 'info');
    } else {
      document.documentElement.classList.remove('dark');
      addToast('Mode Terang diaktifkan', 'info');
    }
  };

  // Typing Effect Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = roles[roleIndex];
    
    if (isDeletingRole) {
      // Deleting speed
      timer = setTimeout(() => {
        setTypedText(currentFullText.substring(0, typedText.length - 1));
      }, 50);
    } else {
      // Typing speed
      timer = setTimeout(() => {
        setTypedText(currentFullText.substring(0, typedText.length + 1));
      }, 100);
    }

    // If fully typed, pause before deleting
    if (!isDeletingRole && typedText === currentFullText) {
      timer = setTimeout(() => {
        setIsDeletingRole(true);
      }, 2000);
    }

    // If fully deleted, shift to next index
    if (isDeletingRole && typedText === '') {
      setIsDeletingRole(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeletingRole, roleIndex]);

  // Count up statistics animation trigger
  useEffect(() => {
    const duration = 1200; // Total animation ms
    const steps = 24;
    const intervalMs = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      setStatProjects(Math.min(Math.round((PERSONAL_INFO.stats.projectsCount / steps) * step), PERSONAL_INFO.stats.projectsCount));
      setStatCerts(Math.min(Math.round((PERSONAL_INFO.stats.certsCount / steps) * step), PERSONAL_INFO.stats.certsCount));
      setStatTechs(Math.min(Math.round((PERSONAL_INFO.stats.techsCount / steps) * step), PERSONAL_INFO.stats.techsCount));
      setStatYears(Math.min(Math.round((PERSONAL_INFO.stats.experienceYears / steps) * step), PERSONAL_INFO.stats.experienceYears));

      if (step >= steps) {
        clearInterval(interval);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, []);

  // Filtered Projects List
  const filteredProjects = PROJECTS.filter((project) => {
    const matchesSearch = 
      project.name.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
      project.shortDesc.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(portfolioSearch.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Semua' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getSkillCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Server': return <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Code': return <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'BarChart2': return <BarChart2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Settings': return <Settings className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      default: return <Compass className="w-5 h-5 text-slate-600" />;
    }
  };

  const getCertIssuerBadge = (issuer: string) => {
    switch (issuer) {
      case 'Google':
        return <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-[#EEF2FF] text-[#2563EB] dark:bg-blue-950/40 dark:text-blue-300">Google</span>;
      case 'Dicoding':
        return <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-[#FEF3C7] text-[#D97706] dark:bg-amber-950/40 dark:text-amber-300">Dicoding</span>;
      case 'Coursera':
        return <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950/40 dark:text-blue-300">Coursera</span>;
      case 'BNSP':
        return <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-[#FEF2F2] text-[#DC2626] dark:bg-rose-950/40 dark:text-rose-300">BNSP</span>;
      default:
        return <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-800 dark:bg-slate-850 dark:text-slate-300">Lainnya</span>;
    }
  };

  // Smooth scroll handler
  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // CV Print and Save Handler
  const handlePrintCv = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-sans transition-colors duration-300 selection:bg-blue-500 selection:text-white">
      {/* Scroll Progress Bar */}
      <div 
        id="scroll-progress-indicator"
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-indigo-600 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Top Navbar */}
      <nav 
        id="sticky-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-4 shadow-sm border-slate-200/50 dark:border-slate-800/50' 
            : 'bg-transparent py-5 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              id="navbar-logo" 
              onClick={() => handleScrollTo('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-blue-500/10 group-hover:scale-105 transition-transform duration-300">
                F
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-[#0F172A] dark:text-white transition-colors">
                FAJRI JULDAN
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div id="desktop-menu-links" className="hidden lg:flex items-center gap-6">
              {sectionIds.map((id) => (
                <button
                  key={id}
                  id={`nav-link-${id}`}
                  onClick={() => handleScrollTo(id)}
                  className={`text-sm font-medium transition-colors transition-all duration-200 ${
                    activeSection === id 
                      ? 'text-[#2563EB] dark:text-blue-400 font-semibold' 
                      : 'text-[#64748B] hover:text-[#2563EB] dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {id === 'about' ? 'Tentang' :
                   id === 'skills' ? 'Keahlian' :
                   id === 'portfolio' ? 'Portofolio' :
                   id === 'experience' ? 'Pengalaman' :
                   id === 'certificates' ? 'Sertifikat' :
                   id === 'blog' ? 'Artikel' :
                   id === 'contact' ? 'Kontak' : id}
                </button>
              ))}
            </div>

            {/* Actions: Theme toggle, CV Download, Mobile trigger */}
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button
                id="theme-toggle-btn"
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-[#E2E8F0] dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors focus:outline-none"
                aria-label="Ganti Tema Visual"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
              </button>

              {/* CV Button */}
              <button
                id="download-cv-nav-btn"
                onClick={() => {
                  setShowCvModal(true);
                  addToast('Membuka Hub Curriculum Vitae', 'info');
                }}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-[16px] shadow-lg shadow-blue-500/20 hover:bg-[#1D4ED8] transition-all"
              >
                <Download className="w-4 h-4" /> CV
              </button>

              {/* Mobile Menu Toggle Burger */}
              <button
                id="mobile-menu-burger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl lg:hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                aria-label="Buka Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Drawer overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[73px] z-30 lg:hidden p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl space-y-2 flex flex-col"
          >
            {sectionIds.map((id) => (
              <button
                key={id}
                id={`mobile-link-${id}`}
                onClick={() => handleScrollTo(id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wide transition-all ${
                  activeSection === id 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {id === 'about' ? 'Tentang' :
                 id === 'skills' ? 'Keahlian' :
                 id === 'portfolio' ? 'Portofolio' :
                 id === 'experience' ? 'Pengalaman' :
                 id === 'certificates' ? 'Sertifikat' :
                 id === 'blog' ? 'Artikel' :
                 id === 'contact' ? 'Kontak' : id}
              </button>
            ))}
            <button
              id="mobile-cv-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                setShowCvModal(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md"
            >
              <Download className="w-4 h-4" /> Hub Resume / Curriculum Vitae
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section 
        id="home" 
        className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-slate-50 dark:bg-slate-950"
      >
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />
        
        {/* Abstract floating glowing background circles */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-100/50 dark:border-blue-900/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Tersedia untuk Pekerjaan & Proyek Hibrid
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-none">
                  Halo, saya <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 bg-clip-text text-transparent">{PERSONAL_INFO.fullName}</span>
                </h1>
                
                {/* Simulated Auto-typing profile role */}
                <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start gap-1">
                  <Terminal className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                  <span className="font-mono text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100">
                    {typedText}
                  </span>
                  <span className="inline-block w-1.5 h-6 bg-blue-600 dark:bg-blue-400 typing-cursor" />
                </div>
              </div>

              <p className="max-w-xl mx-auto lg:mx-0 text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">
                {PERSONAL_INFO.subTitle}
              </p>

              {/* Action Trigger Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <button
                  id="hero-view-portfolio-btn"
                  onClick={() => handleScrollTo('portfolio')}
                  className="w-full sm:w-auto px-6 py-3 bg-[#2563EB] text-white text-sm font-semibold rounded-[16px] shadow-lg shadow-blue-500/20 hover:bg-[#1D4ED8] transition-all cursor-pointer"
                >
                  Lihat Portofolio Proyek
                </button>
                <button
                  id="hero-download-cv-btn"
                  onClick={() => {
                    setShowCvModal(true);
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm font-semibold rounded-[16px] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Unduh Curriculum Vitae
                </button>
              </div>

              {/* Social Channels Badge Grid */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                <span>Profil Sosial:</span>
                <div className="flex items-center gap-3">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column Profile Photo with high visual polish */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                {/* Glow rings in background */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-500 rounded-2xl blur opacity-30 dark:opacity-45 animate-pulse" />
                
                {/* Main Image Frame Container */}
                <div className="relative bg-white dark:bg-slate-900 p-2.5 rounded-2xl shadow-xl max-w-xs md:max-w-sm overflow-hidden">
                  <div className="relative rounded-xl overflow-hidden aspect-square bg-slate-100 dark:bg-slate-800">
                    <img
                      src={PERSONAL_INFO.avatar}
                      alt={PERSONAL_INFO.fullName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Micro dashboard stats layout absolute */}
                  <div className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Tahun Pengalaman</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{PERSONAL_INFO.stats.experienceYears}+ Tahun Aktif</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section 
        id="about" 
        className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200/40 dark:border-slate-800/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Header Title Grid */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
                Tentang Saya
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                Profil Profesional & Ambisi
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Detailed bio columns */}
              <div className="lg:col-span-7 space-y-6">
                <p className="text-slate-800 dark:text-slate-200 text-base leading-relaxed font-medium">
                  Saya merupakan seorang profesional <span className="text-blue-600 dark:text-blue-400 font-bold">Human Resources</span> yang berfokus pada <span className="text-blue-600 dark:text-blue-400 font-bold">Recruitment</span> dan <span className="text-blue-600 dark:text-blue-400 font-bold">Employer Branding</span>, serta memiliki ketertarikan yang kuat pada <span className="text-emerald-600 dark:text-emerald-400 font-bold">Web Development</span> dan <span className="text-emerald-600 dark:text-emerald-400 font-bold">Data Analytics</span>.
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                  Berbekal pengalaman dalam Recruitment dan Employer Branding, saya memahami pentingnya membangun proses rekrutmen yang efektif serta pengalaman kandidat yang positif. Ketertarikan saya terhadap teknologi mendorong saya untuk terus mengembangkan kemampuan dalam Web Development dan Data Analytics guna menciptakan solusi digital yang membantu meningkatkan efisiensi proses bisnis, mengoptimalkan pengelolaan data, dan mendukung pengambilan keputusan yang lebih baik. Saya percaya bahwa teknologi yang tepat tidak hanya menyelesaikan permasalahan, tetapi juga memberikan nilai nyata bagi organisasi dan para penggunanya.
                </p>

                {/* Sub info tabs: Pendidikan & Karir */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-[16px] border border-[#E2E8F0] dark:border-slate-800 shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-[#2563EB] dark:text-blue-400 font-bold font-sans text-sm">
                      <GraduationCap className="w-5 h-5" /> Pendidikan
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Univ. Bina Sarana Informatika</p>
                        <p className="text-xs font-bold text-[#0F172A] dark:text-white">S1 Sistem Informasi (2025 - Skrg)</p>
                        <p className="text-[10px] text-[#64748B] dark:text-slate-400">IPK: 3.62/4.00</p>
                      </div>
                      <div className="border-t border-slate-100 dark:border-slate-800 pt-1.5">
                        <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">SMAN 18 Garut</p>
                        <p className="text-xs font-bold text-[#0F172A] dark:text-white">Senior High School IPA (2020 - 2023)</p>
                        <p className="text-[10px] text-[#64748B] dark:text-slate-400">Nilai: 84.00/100.00</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-5 rounded-[16px] border border-[#E2E8F0] dark:border-slate-800 shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold font-sans text-sm">
                      <Briefcase className="w-5 h-5" /> Passion & Fokus
                    </div>
                    <div>
                      <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Bidang Pengkajian</p>
                      <p className="text-sm font-bold text-[#0F172A] dark:text-white">HR & Tech Integration</p>
                      <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">Menggabungkan Recruitment, Employer Branding dengan Web Dev & Data Analytics.</p>
                    </div>
                  </div>
                </div>

                {/* Soft Skills badges */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-[0.2em]">Soft Skills Utama</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Kepemimpinan Tim', 'Analisis Masalah', 'Komunikasi Efektif', 'Kemampuan Adaptasi', 'Bekerja Mandiri', 'Kolaborasi Lintas Divisi'].map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3.5 py-1.5 bg-[#EEF2FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-300 text-xs font-bold rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Counts statistics block (Animated count ups) */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                
                {/* Stats Project */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[16px] border border-[#E2E8F0] dark:border-slate-800 text-center space-y-1.5 group hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 flex items-center justify-center mx-auto mb-2">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h5 className="font-heading font-extrabold text-3xl text-[#2563EB]">
                    {statProjects}+
                  </h5>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-[#94A3B8]">Proyek Selesai</p>
                </div>

                {/* Stats Certs */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[16px] border border-[#E2E8F0] dark:border-slate-800 text-center space-y-1.5 group hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] dark:bg-emerald-950/40 text-[#22C55E] dark:text-emerald-400 flex items-center justify-center mx-auto mb-2">
                    <Award className="w-5 h-5" />
                  </div>
                  <h5 className="font-heading font-extrabold text-3xl text-emerald-600 dark:text-emerald-400">
                    {statCerts}+
                  </h5>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-[#94A3B8]">Sertifikat Diperoleh</p>
                </div>

                {/* Stats Techs */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[16px] border border-[#E2E8F0] dark:border-slate-800 text-center space-y-1.5 group hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 flex items-center justify-center mx-auto mb-2">
                    <Code className="w-5 h-5" />
                  </div>
                  <h5 className="font-heading font-extrabold text-3xl text-[#2563EB]">
                    {statTechs}+
                  </h5>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-[#94A3B8]">Teknologi Dipelajari</p>
                </div>

                {/* Stats Experience */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[16px] border border-[#E2E8F0] dark:border-slate-800 text-center space-y-1.5 group hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h5 className="font-heading font-extrabold text-3xl text-rose-600">
                    {statYears}+
                  </h5>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-[#94A3B8]">Tahun Belajar</p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section 
        id="skills" 
        className="py-24 bg-slate-50 dark:bg-slate-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Header Title Grid */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
                Keahlian Teknis
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                Peta Kompetensi & Teknologi
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILL_CATEGORIES.map((cat) => (
                <div 
                  key={cat.id} 
                  id={`skill-cat-${cat.id}`}
                  className="bg-white dark:bg-slate-900 p-6 rounded-[16px] border border-[#E2E8F0] dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3.5 mb-5 border-b border-[#E2E8F0] dark:border-slate-800 pb-4">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:scale-105 transition-transform">
                      {getSkillCategoryIcon(cat.iconName)}
                    </div>
                    <h3 className="font-heading font-bold text-base text-[#0F172A] dark:text-white">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skills lists with levels */}
                  <div className="space-y-3.5">
                    {cat.skills.map((sk) => (
                      <div key={sk.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#334155] dark:text-slate-300">{sk.name}</span>
                          <span className="text-[#64748B]">{sk.level}%</span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-[#F1F5F9] dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#2563EB] rounded-full" 
                            style={{ width: `${sk.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- PORTFOLIO SECTION --- */}
      <section 
        id="portfolio" 
        className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200/40 dark:border-slate-800/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            
            {/* Header Title Grid */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
                Karya Unggulan
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                Portofolio Proyek Rekayasa
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            </div>

            {/* Filter Controls / Search bar block */}
            <div className="flex flex-col md:flex-row items-center gap-4 justify-between bg-white dark:bg-slate-900 p-4 rounded-[16px] border border-[#E2E8F0] dark:border-slate-800 shadow-sm">
              
              {/* Category tabs */}
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                {['Semua', 'Frontend', 'Backend', 'Data Analytics', 'Full-Stack'].map((catName) => (
                  <button
                    key={catName}
                    id={`filter-tab-${catName.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => setSelectedCategory(catName)}
                    className={`px-4 py-2 rounded-[12px] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === catName
                        ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/15'
                        : 'text-[#64748B] hover:text-[#2563EB] dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {catName === 'Semua' ? 'Semua Proyek' : catName}
                  </button>
                ))}
              </div>

              {/* Search input field */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-400" />
                <input
                  id="portfolio-search-input"
                  type="text"
                  placeholder="Cari teknologi, nama proyek..."
                  value={portfolioSearch}
                  onChange={(e) => setPortfolioSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-[12px] border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                />
              </div>

            </div>

            {/* Projects Cards List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((proj) => (
                  <motion.div
                    key={proj.id}
                    id={`project-card-${proj.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-slate-900 rounded-[16px] border border-[#E2E8F0] dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
                  >
                    {/* Cover image container */}
                    <div className="relative aspect-video overflow-hidden bg-slate-800">
                      <img
                        src={proj.coverImage}
                        alt={proj.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Floating status badge on cover */}
                      <div className="absolute top-4 left-4 flex gap-1.5">
                        <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-[#2563EB] text-white uppercase tracking-wider">
                          {proj.category}
                        </span>
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full text-white uppercase tracking-wider ${
                          proj.status === 'Completed' ? 'bg-[#22C55E]' : 'bg-amber-500'
                        }`}>
                          {proj.status === 'Completed' ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                    </div>

                    {/* Meta info card contents */}
                    <div className="p-6 flex-1 flex flex-col space-y-4">
                      <div className="space-y-1.5 flex-1">
                        <h3 className="font-heading font-bold text-lg text-[#0F172A] dark:text-white leading-tight group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                          {proj.name}
                        </h3>
                        <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                          {proj.shortDesc}
                        </p>
                      </div>

                      {/* Tag list */}
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-2.5 py-1 bg-[#EEF2FF] dark:bg-blue-950/20 text-[#2563EB] dark:text-blue-300 text-[10px] font-semibold rounded-[8px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Buttons: Detail modal triggers & External link */}
                      <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between gap-3">
                        <button
                          id={`proj-detail-btn-${proj.id}`}
                          onClick={() => setSelectedProject(proj)}
                          className="text-[#2563EB] dark:text-blue-400 text-xs font-bold flex items-center gap-1 hover:text-[#1D4ED8] dark:hover:text-blue-300 transition-colors cursor-pointer focus:outline-none"
                        >
                          Selengkapnya <ChevronRight className="w-4 h-4" />
                        </button>
                        
                        <div className="flex items-center gap-2">
                          {proj.githubUrl && (
                            <a
                              id={`card-github-link-${proj.id}`}
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="Tengok Source Code"
                            >
                              <Github className="w-4.5 h-4.5" />
                            </a>
                          )}
                          {proj.demoUrl && (
                            <a
                              id={`card-demo-link-${proj.id}`}
                              href={proj.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="Kunjungi Live Demo"
                            >
                              <ExternalLink className="w-4.5 h-4.5" />
                            </a>
                          )}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredProjects.length === 0 && (
                <div className="col-span-1 md:col-span-2 text-center py-16 bg-slate-50 dark:bg-slate-900/40 rounded-[16px] border border-dashed border-[#E2E8F0] dark:border-slate-800 space-y-2">
                  <Info className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
                  <p className="font-bold text-slate-800 dark:text-slate-200">Tidak ada proyek ditemukan</p>
                  <p className="text-xs text-[#64748B]">Coba ubah kata kunci pencarian Anda atau kembalikan filter ke Semua Proyek.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section 
        id="experience" 
        className="py-24 bg-slate-50 dark:bg-slate-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Header Title Grid */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
                Riwayat Karir
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                Pengalaman Kerja Profesional
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            </div>

            {/* Timeline modern list */}
            <div className="max-w-3xl mx-auto relative border-l-2 border-[#E2E8F0] dark:border-slate-800 pl-6 md:pl-8 space-y-12">
              {EXPERIENCES.map((exp, expIdx) => (
                <div 
                  key={exp.id} 
                  id={`exp-timeline-item-${exp.id}`}
                  className="relative space-y-3"
                >
                  {/* Circle indicator on line */}
                  <span className="absolute -left-[35px] md:-left-[43px] top-1.5 w-4 h-4 rounded-full border-4 border-white dark:border-slate-950 bg-[#2563EB] shadow" />

                  {/* Exp Meta Block */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <div>
                      <span className="text-xs font-bold text-[#2563EB] dark:text-blue-400 uppercase tracking-widest block mb-0.5">
                        {exp.position}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-[#0F172A] dark:text-white">
                        {exp.company}
                      </h3>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-xs text-[#64748B] font-bold tracking-wide w-fit mt-1 md:mt-0 shadow-sm">
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullet description text */}
                  <div className="space-y-2">
                    <ul className="list-disc list-inside text-sm text-[#334155] dark:text-slate-400 space-y-1.5 leading-relaxed pl-1">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="marker:text-[#2563EB]">
                          <span className="pl-1">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Major Achievement highlights with highlight styling */}
                  <div className="bg-[#F0FDF4] dark:bg-emerald-950/10 border border-[#E2E8F0] dark:border-emerald-900/30 p-4 rounded-[12px] space-y-1.5 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#22C55E]">Pencapaian Utama (Impact)</p>
                    <ul className="space-y-1 text-xs text-[#334155] dark:text-slate-300">
                      {exp.achievement.map((ach, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-1.5 font-semibold">
                          <CheckCircle className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools Badge */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {exp.tags.map((t) => (
                      <span 
                        key={t} 
                        className="px-3 py-1 bg-[#EEF2FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-300 text-xs font-bold rounded-full shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- CERTIFICATES SECTION --- */}
      <section 
        id="certificates" 
        className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200/40 dark:border-slate-800/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Header Title Grid */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
                Sertifikasi Kompetensi
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                Sertifikat & Kredensial Resmi
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            </div>

            {/* Grid display certificates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CERTIFICATES.map((cert) => (
                <div 
                  key={cert.id} 
                  id={`cert-card-${cert.id}`}
                  onClick={() => setSelectedCertificate(cert)}
                  className="bg-white dark:bg-slate-900 rounded-[16px] border border-[#E2E8F0] dark:border-slate-800 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                >
                  {/* Thumbnail and hover zoom */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3.5 py-1.5 rounded-[12px] bg-black/60 backdrop-blur-sm text-white text-xs font-semibold">Pratinjau Dokumen</span>
                    </div>
                  </div>

                  {/* Certification information */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        {getCertIssuerBadge(cert.issuer)}
                        <span className="text-[10px] text-[#64748B] font-semibold">{cert.date}</span>
                      </div>
                      <h3 className="font-heading font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                        {cert.title}
                      </h3>
                    </div>
                    
                    <div className="text-[10px] text-[#64748B] font-mono truncate border-t border-[#E2E8F0] dark:border-slate-800 pt-2.5">
                      ID: {cert.credentialId}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- BLOG SECTION --- */}
      <section 
        id="blog" 
        className="py-24 bg-slate-50 dark:bg-slate-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Header Title Grid */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
                Artikel Terkini
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                Catatan & Pemikiran Teknis
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            </div>

            {/* Blog Post cards list */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post) => (
                <div 
                  key={post.id} 
                  id={`blog-card-${post.id}`}
                  onClick={() => setSelectedBlog(post)}
                  className="bg-white dark:bg-slate-900 rounded-[16px] border border-[#E2E8F0] dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl cursor-pointer hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-[8px] bg-[#2563EB] text-white text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  {/* Text details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[10px] text-[#64748B] font-semibold">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                      </div>

                      <h3 className="font-heading font-bold text-base text-[#0F172A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                    </div>

                    <div className="text-xs font-bold text-[#2563EB] dark:text-blue-400 flex items-center gap-1 pt-3 border-t border-[#E2E8F0] dark:border-slate-800">
                      Baca Artikel Penuh <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section 
        id="contact" 
        className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200/40 dark:border-slate-800/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Header Title Grid */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
                Hubungi Saya
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                Hubungkan & Mulai Kolaborasi
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            </div>

            {/* Modular validation ContactForm */}
            <ContactForm onSuccess={(message) => addToast(message, 'success')} />

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-slate-900 pb-8 mb-8">
            {/* Logo and metadata */}
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-heading font-extrabold text-white text-lg tracking-tight">
                Juldan.<span className="text-blue-500">Dev</span>
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto md:mx-0">
                Portofolio profesional HR Recruitment, Employer Branding & Data Analytics.
              </p>
            </div>

            {/* Quick footer menu links */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wider">
              {['home', 'about', 'portfolio', 'contact'].map((id) => (
                <button
                  key={id}
                  onClick={() => handleScrollTo(id)}
                  className="hover:text-white transition-colors"
                >
                  {id === 'home' ? 'Beranda' : id === 'about' ? 'Tentang' : id === 'portfolio' ? 'Portofolio' : 'Kontak'}
                </button>
              ))}
            </div>

            {/* Social channels */}
            <div className="flex justify-center md:justify-end items-center gap-3">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors" aria-label="GitHub">
                <Github className="w-4.5 h-4.5" />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors" aria-label="Email">
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <p>© {new Date().getFullYear()} Fajri Juldan Rahim. Hak Cipta Dilindungi Undang-Undang.</p>
            <p className="flex items-center gap-1 font-mono">
              Crafted with precision & React + TailwindCSS
            </p>
          </div>
        </div>
      </footer>

      {/* --- FLOATING ACTIONS --- */}
      {/* Back to Top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            id="back-to-top-btn"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 z-40 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Kembali ke Atas Halaman"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- TOAST NOTIFICATIONS OVERLAY --- */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 max-w-sm">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.9 }}
              className={`p-4 rounded-xl shadow-lg border text-sm font-semibold flex items-center gap-2.5 ${
                toast.type === 'success' 
                  ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
              }`}
            >
              <CheckCircle className={`w-5 h-5 shrink-0 ${toast.type === 'success' ? 'text-emerald-500' : 'text-blue-500'}`} />
              <span>{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- MODALS HANDLER --- */}
      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Certificate Preview Modal */}
      <CertificatePreviewModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      {/* Blog Read Modal */}
      <BlogReadModal
        post={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />

      {/* Dynamic CV Printable Resume Hub Modal */}
      <AnimatePresence>
        {showCvModal && (
          <div 
            id="cv-modal-overlay" 
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowCvModal(false)}
          >
            <motion.div
              id="cv-modal-container"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-[16px] w-full max-w-3xl shadow-2xl overflow-hidden my-6 border border-[#E2E8F0] dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header block with actions */}
              <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-heading font-extrabold text-base md:text-lg text-slate-900 dark:text-white">
                    Resume / Curriculum Vitae
                  </h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    id="print-cv-btn"
                    onClick={handlePrintCv}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-[#E2E8F0] dark:border-slate-800 transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4" /> Cetak / PDF
                  </button>
                  <button
                    id="close-cv-modal-btn"
                    onClick={() => setShowCvModal(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg transition-colors focus:outline-none cursor-pointer"
                    aria-label="Tutup Resume"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Printable Area */}
              <div id="printable-cv-area" className="p-8 md:p-10 space-y-8 max-h-[65vh] overflow-y-auto custom-scrollbar bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
                {/* Header Profile Resume */}
                <div className="text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#E2E8F0] dark:border-slate-800">
                  <div className="space-y-1.5">
                    <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                      {PERSONAL_INFO.fullName}
                    </h2>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 font-sans tracking-wide">
                      {PERSONAL_INFO.title}
                    </p>
                    <p className="text-xs text-slate-400 flex items-center justify-center md:justify-start gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {PERSONAL_INFO.location} | {PERSONAL_INFO.email}
                    </p>
                  </div>
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 border-2 border-blue-100/50 dark:border-blue-900/40">
                    <img 
                      src={PERSONAL_INFO.avatar} 
                      alt="FJR Avatar" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 border-b border-[#E2E8F0] dark:border-slate-800 pb-1">
                    Profil Profesional
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                    HR Recruitment & Organizational Development professional dengan pengalaman mengelola proses recruitment end-to-end, employer branding, dan HR administration di industri manufaktur otomotif. Berhasil mempercepat lead time rekrutmen serta menangani lebih dari 5000+ kandidat setiap bulan. Memiliki minat pada HR Analytics, Data Science, dan People Analytics.
                  </p>
                </div>

                {/* Experience Resume */}
                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 border-b border-[#E2E8F0] dark:border-slate-800 pb-1">
                    Pengalaman Kerja
                  </h4>
                  <div className="space-y-5">
                    {EXPERIENCES.map(e => (
                      <div key={e.id} className="space-y-1.5">
                        <div className="flex justify-between items-start text-sm">
                          <p className="font-bold text-slate-900 dark:text-white">{e.position}</p>
                          <p className="text-xs text-slate-400 font-bold">{e.period}</p>
                        </div>
                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{e.company}</p>
                        <ul className="list-disc list-inside text-xs text-slate-500 dark:text-slate-400 space-y-1">
                          {e.description.map((bul, bIdx) => (
                            <li key={bIdx}>{bul}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education Resume */}
                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 border-b border-[#E2E8F0] dark:border-slate-800 pb-1">
                    Pendidikan
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start text-sm">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">S1 Sistem Informasi</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">Universitas Bina Sarana Informatika</p>
                        <p className="text-xs text-slate-400">IPK: 3.62 / 4.00</p>
                      </div>
                      <p className="text-xs text-slate-400 font-bold">Sep 2025 - Sekarang</p>
                    </div>
                    <div className="flex justify-between items-start text-sm border-t border-slate-100 dark:border-slate-800 pt-2">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">Senior High School IPA</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">SMAN 18 Garut</p>
                        <p className="text-xs text-slate-400">Nilai Rata-rata: 84.00 / 100.00</p>
                      </div>
                      <p className="text-xs text-slate-400 font-bold">Jun 2020 - Mei 2023</p>
                    </div>
                  </div>
                </div>

                {/* Key Skills Resume */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 border-b border-[#E2E8F0] dark:border-slate-800 pb-1">
                    Keahlian Teknis Inti
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Recruitment', 'Talent Acquisition', 'Employer Branding', 'HR Administrasi', 'Power BI', 'Spreadsheet', 'HRIS Euclid', 'Python', 'Pandas', 'MySQL', 'Web Development', 'Data Science'].map(k => (
                      <span key={k} className="px-2.5 py-1 rounded-[8px] bg-[#EEF2FF] dark:bg-slate-800 text-xs text-[#2563EB] dark:text-slate-300 font-semibold border border-[#E2E8F0] dark:border-slate-850">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 text-center pt-4 border-t border-[#E2E8F0] dark:border-slate-800">
                  CV ini dihasilkan secara interaktif. Tekan tombol 'Cetak / PDF' di atas untuk menyimpan ke perangkat Anda.
                </div>
              </div>

              {/* Footer action bar */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-[#E2E8F0] dark:border-slate-800 text-right flex justify-between items-center">
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> Sesuai standar ATS rekruter
                </p>
                <button
                  id="close-cv-bottom"
                  onClick={() => setShowCvModal(false)}
                  className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-[12px] transition-all cursor-pointer"
                >
                  Tutup Resume
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
