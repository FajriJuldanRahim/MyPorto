import { Certificate } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Calendar, Award } from 'lucide-react';

interface CertificatePreviewModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export default function CertificatePreviewModal({ certificate, onClose }: CertificatePreviewModalProps) {
  if (!certificate) return null;

  const getIssuerColor = (issuer: string) => {
    switch (issuer) {
      case 'Google':
        return 'bg-[#EEF2FF] text-[#2563EB] dark:bg-blue-950/40 dark:text-blue-300';
      case 'Dicoding':
        return 'bg-[#FEF3C7] text-[#D97706] dark:bg-amber-950/40 dark:text-amber-300';
      case 'Coursera':
        return 'bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950/40 dark:text-blue-300';
      case 'BNSP':
        return 'bg-[#FEF2F2] text-[#DC2626] dark:bg-rose-950/40 dark:text-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="cert-modal-overlay" 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id={`cert-modal-container-${certificate.id}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-[16px] w-full max-w-2xl shadow-2xl overflow-hidden border border-[#E2E8F0] dark:border-slate-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${getIssuerColor(certificate.issuer)}`}>
                {certificate.issuer}
              </span>
              <h3 className="font-sans font-bold text-base md:text-lg text-[#0F172A] dark:text-white line-clamp-1">
                {certificate.title}
              </h3>
            </div>
            <button
              id="close-cert-btn"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg transition-colors focus:outline-none"
              aria-label="Tutup Pratinjau Sertifikat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body with Image */}
          <div className="p-6 space-y-5">
            <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden border border-[#E2E8F0] dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-sm">
              <img
                src={certificate.image}
                alt={certificate.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300 hover:scale-[1.02]"
              />
            </div>

            {/* Metadata Info */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-850 p-4 rounded-[12px] border border-[#E2E8F0] dark:border-slate-800 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Tanggal Terbit
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{certificate.date}</p>
              </div>
              
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-slate-400" /> Credential ID
                </span>
                <p className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 truncate" title={certificate.credentialId}>
                  {certificate.credentialId}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between gap-3">
            <a
              id={`verify-cert-${certificate.id}`}
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-[12px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all text-center shadow-md shadow-blue-500/10 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" /> Verifikasi Kredensial
            </a>
            
            <button
              id="close-cert-bottom-btn"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-[12px] transition-all cursor-pointer"
            >
              Tutup Pratinjau
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
