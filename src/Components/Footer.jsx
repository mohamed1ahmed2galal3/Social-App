import React from 'react'

export default function Footer() {
  return (
    <footer className="py-8 sm:py-10 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-center">
      
      <p className="text-sm text-slate-500 dark:text-slate-400">
        © 2026 SocialApp. All rights reserved.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4">
        <a
          className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-500 transition"
          href="#"
        >
          Privacy Policy
        </a>

        <a
          className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-500 transition"
          href="#"
        >
          Terms of Service
        </a>

        <a
          className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-500 transition"
          href="#"
        >
          Help Center
        </a>
      </div>
    </footer>
  );
}
