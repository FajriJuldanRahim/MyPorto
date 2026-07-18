import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle, Target, Award, ShieldAlert, Cpu, BookOpen, Layers } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        id="project-modal-overlay" 
        className="fixed inset-0 bg-slate-900/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id={`project-modal-container-${project.id}`}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-[16px] w-full max-w-4xl shadow-2xl overflow-hidden my-8 border border-[#E2E8F0] dark:border-slate-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image & Close Button */}
          <div className="relative h-64 md:h-80 w-full overflow-hidden bg-slate-800">
            <img
              src={project.coverImage}
              alt={project.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
            
            {/* Badges and actions on image */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                id="close-modal-btn"
                onClick={onClose}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Tutup Detail Proyek"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#2563EB] text-white">
                  {project.category}
                </span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${
                  project.status === 'Completed' ? 'bg-[#22C55E]' : 'bg-amber-500'
                }`}>
                  {project.status}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-sans text-white tracking-tight">
                {project.name}
              </h2>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 md:p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold font-sans flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <BookOpen className="w-5 h-5" /> Deskripsi Proyek
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>
              </div>
              
              {/* Sidebar Action & Meta */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-[12px] border border-[#E2E8F0] dark:border-slate-800 space-y-4 shadow-sm">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#94A3B8]">Teknologi</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-semibold rounded-[8px] bg-[#EEF2FF] dark:bg-blue-950/20 text-[#2563EB] dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-800 flex flex-col gap-2">
                  {project.demoUrl && (
                    <a
                      id={`demo-link-${project.id}`}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-[12px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all text-center shadow-md shadow-blue-500/10 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      id={`github-link-${project.id}`}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-[12px] bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-[#0F172A] dark:text-slate-200 transition-all text-center border border-[#E2E8F0] dark:border-slate-800 cursor-pointer"
                    >
                      <Github className="w-4 h-4" /> Kode GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Problem & Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold font-sans flex items-center gap-2 text-red-500">
                  <ShieldAlert className="w-5 h-5" /> Problem Statement (Masalah)
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold font-sans flex items-center gap-2 text-emerald-500">
                  <Target className="w-5 h-5" /> Goals (Tujuan)
                </h3>
                <ul className="space-y-2">
                  {project.goals.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Solution & Workflow */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold font-sans flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Layers className="w-5 h-5" /> Solusi yang Ditawarkan
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold font-sans flex items-center gap-2 text-purple-500">
                  <Cpu className="w-5 h-5" /> Alur Kerja (Workflow)
                </h3>
                <ol className="space-y-2 list-decimal list-inside text-sm text-slate-600 dark:text-slate-300">
                  {project.workflow.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Tech Architecture & Challenges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Cpu className="w-4 h-4 text-amber-500" /> Arsitektur & Aliran Data
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {project.architecture}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-rose-500" /> Tantangan & Hambatan
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            </div>

            {/* Results & Lessons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E2E8F0] dark:border-slate-800">
              <div className="space-y-3 bg-[#F0FDF4] dark:bg-emerald-950/10 p-4 rounded-[12px] border border-[#E2E8F0] dark:border-emerald-900/30 shadow-sm">
                <h3 className="text-base font-semibold font-sans flex items-center gap-2 text-[#22C55E]">
                  <Award className="w-5 h-5" /> Hasil Akhir (Results)
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {project.results}
                </p>
              </div>

              <div className="space-y-3 bg-[#EEF2FF] dark:bg-blue-950/10 p-4 rounded-[12px] border border-[#E2E8F0] dark:border-blue-900/30 shadow-sm">
                <h3 className="text-base font-semibold font-sans flex items-center gap-2 text-[#2563EB]">
                  <BookOpen className="w-5 h-5" /> Pembelajaran (Lessons Learned)
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {project.lessons}
                </p>
              </div>
            </div>

            {/* Screenshots Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-[#E2E8F0] dark:border-slate-800">
                <h3 className="text-lg font-semibold font-sans text-slate-800 dark:text-slate-200">
                  Galeri & Tangkapan Layar (Screenshots)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.screenshots.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-[12px] overflow-hidden bg-slate-100 dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-800 shadow-sm">
                      <img
                        src={img}
                        alt={`Screenshot ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Area of Modal */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-[#E2E8F0] dark:border-slate-800 text-right">
            <button
              id="close-modal-bottom-btn"
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-[12px] transition-all cursor-pointer"
            >
              Tutup Kembali
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
