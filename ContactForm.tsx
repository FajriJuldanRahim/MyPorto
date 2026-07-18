import React, { useState } from 'react';
import { Mail, MessageSquare, User, Send, CheckCircle2, ShieldAlert, Phone, Github, Linkedin, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface ContactFormProps {
  onSuccess: (message: string) => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error as typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let errorMsg = '';
    
    if (name === 'name' && value.trim() === '') {
      errorMsg = 'Nama lengkap wajib diisi.';
    } else if (name === 'email') {
      if (value.trim() === '') {
        errorMsg = 'Alamat email wajib diisi.';
      } else if (!validateEmail(value)) {
        errorMsg = 'Format alamat email tidak valid.';
      }
    } else if (name === 'message') {
      if (value.trim() === '') {
        errorMsg = 'Pesan wajib diisi.';
      } else if (value.trim().length < 15) {
        errorMsg = 'Pesan minimal berisi 15 karakter agar informatif.';
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Perform full validation
    const newErrors = {
      name: formData.name.trim() === '' ? 'Nama lengkap wajib diisi.' : '',
      email: formData.email.trim() === '' 
        ? 'Alamat email wajib diisi.' 
        : !validateEmail(formData.email) 
          ? 'Format alamat email tidak valid.' 
          : '',
      message: formData.message.trim() === '' 
        ? 'Pesan wajib diisi.' 
        : formData.message.trim().length < 15 
          ? 'Pesan minimal berisi 15 karakter.' 
          : ''
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(err => err !== '');
    if (hasErrors) return;

    // Proceed to submit
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSuccess(`Pesan dari ${formData.name} berhasil terkirim! Terima kasih telah menghubungi saya.`);
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success status after some time
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Contact Metadata Block */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
        <div className="space-y-3">
          <h3 className="text-xl font-bold font-sans text-slate-950 dark:text-white">
            Mari Berdiskusi & Berkolaborasi
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            Apakah Anda memiliki proyek menarik, tawaran pekerjaan full-time, atau sekadar ingin bertukar pikiran tentang analisis data dan rekayasa perangkat lunak? Kirimkan pesan Anda!
          </p>
        </div>

        {/* Channels Card */}
        <div className="bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 p-6 rounded-[16px] shadow-sm space-y-5">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Kirim Email</p>
              <a 
                href={`mailto:${PERSONAL_INFO.email}`} 
                className="text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors text-sm break-all"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">WhatsApp / Telepon</p>
              <a 
                href={PERSONAL_INFO.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition-colors text-sm"
              >
                +62 812-3456-7890
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Lokasi</p>
              <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm">
                {PERSONAL_INFO.location}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Social Icons */}
        <div className="flex items-center gap-3">
          <a
            id="contact-github-link"
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-[12px] bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            id="contact-linkedin-link"
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-[12px] bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      </div>

      {/* Actual Form Panel */}
      <form 
        id="contact-portfolio-form" 
        onSubmit={handleSubmit} 
        className="lg:col-span-7 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 p-6 md:p-8 rounded-[16px] shadow-sm space-y-6"
        noValidate
      >
        {isSuccess && (
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-[#E2E8F0] dark:border-emerald-900/50 p-4 rounded-[12px] text-emerald-800 dark:text-emerald-300 text-sm flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <div>
              <p className="font-bold">Pesan Terkirim!</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">Saya akan membalas pesan Anda ke email yang tercantum secepat mungkin.</p>
            </div>
          </div>
        )}

        {/* Input Name */}
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <User className="w-4 h-4 text-slate-400" /> Nama Lengkap <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Masukkan nama lengkap Anda"
              className={`w-full px-4 py-3 rounded-[12px] border ${
                errors.name 
                  ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/10' 
                  : 'border-[#E2E8F0] dark:border-slate-800 focus:ring-[#2563EB]'
              } dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2`}
              disabled={isSubmitting}
              required
            />
          </div>
          {errors.name && (
            <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
              <ShieldAlert className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>

        {/* Input Email */}
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-slate-400" /> Alamat Email <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="contoh@domain.com"
              className={`w-full px-4 py-3 rounded-[12px] border ${
                errors.email 
                  ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/10' 
                  : 'border-[#E2E8F0] dark:border-slate-800 focus:ring-[#2563EB]'
              } dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2`}
              disabled={isSubmitting}
              required
            />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
              <ShieldAlert className="w-3.5 h-3.5" /> {errors.email}
            </p>
          )}
        </div>

        {/* Input Message */}
        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-slate-400" /> Isi Pesan <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tuliskan detail pertanyaan atau tawaran kolaborasi Anda di sini..."
            className={`w-full px-4 py-3 rounded-[12px] border ${
              errors.message 
                ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/10' 
                : 'border-[#E2E8F0] dark:border-slate-800 focus:ring-[#2563EB]'
            } dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 resize-none`}
            disabled={isSubmitting}
            required
          />
          {errors.message ? (
            <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
              <ShieldAlert className="w-3.5 h-3.5" /> {errors.message}
            </p>
          ) : (
            <p className="text-xs text-slate-400">Pesan yang informatif memudahkan saya membalas lebih cepat.</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          id="contact-submit-btn"
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold rounded-[16px] text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 disabled:opacity-75 disabled:cursor-not-allowed shadow-md shadow-blue-500/10 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Mengirimkan Pesan...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Kirim Pesan Sekarang
            </>
          )}
        </button>
      </form>
    </div>
  );
}
