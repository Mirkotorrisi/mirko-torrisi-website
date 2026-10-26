'use client';

import { useState } from 'react';
import { submitForm } from '@/services/formService';
import type { Dictionary } from '@/i18n/dictionaries';
import type { Locale } from '@/i18n/config';

type Status = 'idle' | 'sending' | 'success' | 'error';

const inputClass =
  'w-full rounded-sm border border-limestone/30 bg-lava-soft px-4 py-3 text-limestone placeholder-ash/70 transition-colors focus:border-majolica-light user-invalid:border-[#ff8a7a]';

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
        className="w-full border-l-4 border-lemon bg-lava-soft p-8 text-xl text-limestone"
      >
        {dict.success}
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid w-full grid-cols-1 gap-6 md:grid-cols-2"
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
        <span className="font-display font-medium">
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
        <span className="font-display font-medium">
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
        <span className="font-display font-medium">
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
        <p role="alert" className="text-[#ff8a7a] md:col-span-2">
          {dict.error}
        </p>
      )}

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="cursor-pointer rounded-sm bg-majolica px-8 py-3.5 font-display font-semibold text-white transition-colors hover:bg-limestone hover:text-lava disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'sending' ? dict.sending : dict.submit}
        </button>
      </div>
    </form>
  );
}
