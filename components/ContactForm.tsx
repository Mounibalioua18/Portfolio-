
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { LiquidButton } from './ui/LiquidButton';
import { CloudDB } from '../lib/db';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      console.log("Attempting to send message to Firebase...");
      await CloudDB.saveMessage({
        name: formData.name,
        email: formData.email,
        referral: formData.referral,
        message: formData.message,
      });

      console.log("Message saved successfully!");
      setStatus('success');
      setFormData({ name: '', email: '', referral: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      console.error("CRITICAL: Database submission failed.");
      console.error("Error Code:", error.code);
      console.error("Error Message:", error.message);
      console.log("Tip: Check if your Firebase Realtime Database rules allow public writes ('.write': true)");
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">{content.name}</label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={content.namePlaceholder}
              disabled={status === 'submitting' || status === 'success'}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all placeholder:text-gray-600 disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">{content.email}</label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={content.emailPlaceholder}
              disabled={status === 'submitting' || status === 'success'}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all placeholder:text-gray-600 disabled:opacity-50"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">{content.subject}</label>
          <input
            required
            type="text"
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            placeholder={content.subjectPlaceholder}
            disabled={status === 'submitting' || status === 'success'}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all placeholder:text-gray-600 disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">{content.message}</label>
          <textarea
            required
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder={content.messagePlaceholder}
            disabled={status === 'submitting' || status === 'success'}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all placeholder:text-gray-600 resize-none disabled:opacity-50"
          />
        </div>

        <div className="flex flex-col items-center pt-4">
          <LiquidButton 
            type="submit" 
            className={`w-full md:w-auto min-w-[200px] ${status === 'submitting' || status === 'success' ? 'opacity-70 pointer-events-none' : ''}`}
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
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-brand-400 text-sm font-medium"
            >
              {content.success}
            </motion.p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-red-400 text-xs font-medium">
              Please check your browser console (F12) for error details.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
