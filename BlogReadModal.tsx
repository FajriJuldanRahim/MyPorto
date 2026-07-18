import { BlogPost } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Tag } from 'lucide-react';

interface BlogReadModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function BlogReadModal({ post, onClose }: BlogReadModalProps) {
  if (!post) return null;

  return (
    <AnimatePresence>
      <div 
        id="blog-modal-overlay" 
        className="fixed inset-0 bg-slate-900/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id={`blog-modal-container-${post.id}`}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-[16px] w-full max-w-3xl shadow-2xl overflow-hidden my-6 border border-[#E2E8F0] dark:border-slate-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cover image with Title overlay */}
          <div className="relative h-56 md:h-72 w-full overflow-hidden bg-slate-800">
            <img
              src={post.thumbnail}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            {/* Close button top right */}
            <button
              id="close-blog-btn"
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full border border-white/10 transition-colors focus:outline-none"
              aria-label="Tutup Artikel"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title Block */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-[8px] bg-[#2563EB] text-white">
                  {post.category}
                </span>
                <span className="text-white/80 text-xs flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-sans text-white leading-tight tracking-tight">
                {post.title}
              </h2>
            </div>
          </div>

          {/* Article Body */}
          <div className="p-6 md:p-8 space-y-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
            {/* Meta row */}
            <div className="flex items-center gap-4 text-xs text-[#64748B] font-semibold border-b border-[#E2E8F0] dark:border-slate-800 pb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#64748B]" /> {post.date}
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span>Ditulis oleh Fajri Juldan Rahim</span>
            </div>

            {/* Description (Abstract) */}
            <p className="text-[#334155] dark:text-slate-300 font-semibold text-sm md:text-base border-l-4 border-[#2563EB] pl-4 py-3 leading-relaxed bg-[#EEF2FF] dark:bg-blue-950/20 rounded-r-lg">
              {post.description}
            </p>

            {/* Formatted Content */}
            <div className="prose dark:prose-invert prose-blue max-w-none text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed space-y-4">
              {post.content.split('\n\n').map((para, pIdx) => {
                // simple header checker
                if (para.startsWith('### ')) {
                  return (
                    <h3 key={pIdx} className="text-lg font-bold font-sans text-slate-900 dark:text-white pt-4 pb-1">
                      {para.replace('### ', '')}
                    </h3>
                  );
                }
                if (para.startsWith('## ')) {
                  return (
                    <h2 key={pIdx} className="text-xl font-bold font-sans text-slate-900 dark:text-white pt-5 pb-1">
                      {para.replace('## ', '')}
                    </h2>
                  );
                }
                // list items
                if (para.includes('\n* ') || para.includes('\n1. ')) {
                  const isOrdered = para.includes('\n1. ');
                  const lines = para.split('\n');
                  const header = lines[0];
                  const items = lines.slice(1).map(l => l.replace(/^[*\-\d\.\s]+/, ''));
                  return (
                    <div key={pIdx} className="space-y-2">
                      {header && <p className="font-semibold text-slate-800 dark:text-slate-200">{header}</p>}
                      {isOrdered ? (
                        <ol className="list-decimal list-inside space-y-1.5 pl-2">
                          {items.map((it, idx) => <li key={idx}>{it}</li>)}
                        </ol>
                      ) : (
                        <ul className="list-disc list-inside space-y-1.5 pl-2">
                          {items.map((it, idx) => <li key={idx}>{it}</li>)}
                        </ul>
                      )}
                    </div>
                  );
                }
                // check code snippet
                if (para.startsWith('```')) {
                  const lines = para.split('\n');
                  const code = lines.slice(1, -1).join('\n');
                  return (
                    <pre key={pIdx} className="bg-[#0F172A] text-slate-200 p-4 rounded-[12px] overflow-x-auto font-mono text-xs border border-slate-800 my-4 shadow-inner">
                      <code>{code}</code>
                    </pre>
                  );
                }
                // default paragraph
                return (
                  <p key={pIdx} className="text-slate-600 dark:text-slate-300">
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Tags footer */}
            <div className="flex flex-wrap items-center gap-1.5 pt-6 border-t border-[#E2E8F0] dark:border-slate-800">
              <span className="text-xs text-[#64748B] flex items-center gap-1 font-semibold mr-1">
                <Tag className="w-3.5 h-3.5 text-[#64748B]" /> Tag:
              </span>
              {post.tags.map(t => (
                <span key={t} className="px-2.5 py-1 text-xs rounded-[8px] bg-[#EEF2FF] dark:bg-blue-950/30 text-[#2563EB] dark:text-blue-400 font-semibold border border-[#E2E8F0] dark:border-blue-900/30">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Area */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-[#E2E8F0] dark:border-slate-800 text-right">
            <button
              id="close-blog-bottom-btn"
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-[12px] transition-all cursor-pointer"
            >
              Selesai Membaca
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
