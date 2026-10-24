'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { submitForm } from '@/services/formService';
import type { Dictionary } from '@/i18n/dictionaries';
import type { Locale } from '@/i18n/config';

type Status = 'idle' | 'sending' | 'success' | 'error';

const inputClass =
  'w-full rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 user-invalid:border-red-500';

export default function ContactForm({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary['contact'];
}) {
  const [status, setStatus] = useState<Status>('idle');
  const { name, email, message } = dict.fields;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus('sending');
    const ok = await submitForm(form);
    setStatus(ok ? 'success' : 'error');
    if (ok) form.reset();
  };

  if (status === 'success') {
    return (
      <p
        role="status"
        className="w-full rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center font-medium text-emerald-300"
      >
        {dict.success}
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid w-full grid-cols-1 gap-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 shadow-xl backdrop-blur-sm md:grid-cols-2 md:p-8"
    >
      <input type="hidden" name="lang" value={lang} />
      {/* Honeypot: hidden from people, often filled in by bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <label className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
          {name.label}
        </span>
        <input
          name="name"
          required
          autoComplete="name"
          placeholder={name.placeholder}
          title={name.error}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
          {email.label}
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={email.placeholder}
          title={email.error}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
          {message.label}
        </span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder={message.placeholder}
          title={message.error}
          className={`${inputClass} resize-none`}
        />
      </label>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-400 md:col-span-2">
          {dict.error}
        </p>
      )}

      <div className="flex justify-center md:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'sending' ? dict.sending : dict.submit}
          <Send className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </form>
  );
}
