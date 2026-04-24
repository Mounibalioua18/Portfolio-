
import React, { useState, useRef } from 'react';
import { Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { LiquidButton } from './ui/LiquidButton';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface ContactFormProps {
  content: {
    name: string;
    email: string;
    subject: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    btn: string;
    success: string;
  }
}

const ContactForm: React.FC<ContactFormProps> = ({ content }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    referral: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (status === 'success' || status === 'error') {
      gsap.fromTo('.status-message', 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.3 }
      );
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "767afaa6-4f85-4667-a0f0-bbc0b2cf22d1";
      
      if (!accessKey) {
        console.warn("VITE_WEB3FORMS_KEY is missing. Simulating success for preview.");
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
        setFormData({ name: '', email: '', referral: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.referral,
          message: formData.message,
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', referral: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error("Web3Forms submission failed:", result.message);
        setStatus('error');
      }
    } catch (error: any) {
      console.error("Form submission failed.", error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-md mx-auto" ref={containerRef}>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 text-left">
        <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">{content.name}</label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={content.namePlaceholder}
              disabled={status === 'submitting' || status === 'success'}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 sm:py-3 text-slate-900 text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-slate-400 disabled:opacity-50"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">{content.email}</label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={content.emailPlaceholder}
              disabled={status === 'submitting' || status === 'success'}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 sm:py-3 text-slate-900 text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-slate-400 disabled:opacity-50"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">{content.subject}</label>
          <input
            required
            type="text"
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            placeholder={content.subjectPlaceholder}
            disabled={status === 'submitting' || status === 'success'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 sm:py-3 text-slate-900 text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-slate-400 disabled:opacity-50"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">{content.message}</label>
          <textarea
            required
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder={content.messagePlaceholder}
            disabled={status === 'submitting' || status === 'success'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-slate-400 resize-none disabled:opacity-50"
          />
        </div>

        <div className="flex flex-col items-center pt-2">
          <LiquidButton 
            type="submit" 
            className={`w-full min-w-[200px] h-12 text-sm ${status === 'submitting' || status === 'success' ? 'opacity-70 pointer-events-none' : ''}`}
            disabled={status === 'submitting' || status === 'success'}
          >
            {status === 'submitting' ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" /> Syncing...
              </span>
            ) : status === 'success' ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} /> Sent
              </span>
            ) : status === 'error' ? (
               <span className="flex items-center gap-2">
                <AlertCircle size={18} /> DB Error
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send size={18} /> {content.btn}
              </span>
            )}
          </LiquidButton>
          
          {status === 'success' && (
            <p className="status-message mt-4 text-brand-500 text-sm font-medium">
              {content.success}
            </p>
          )}
          {status === 'error' && (
            <p className="status-message mt-4 text-red-500 text-xs font-medium">
              Please check your browser console (F12) for error details.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
