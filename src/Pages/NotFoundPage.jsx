import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-slate-900">
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-100 sm:max-w-150 flex flex-col items-center text-center">
          {/* 404 Heading */}
          <h1 className="text-blue-500 dark:text-blue-400 tracking-tighter text-[120px] font-extrabold leading-none pb-2">
            404
          </h1>

          {/* Minimalist Illustration */}
          <div className="flex w-full justify-center p-4 mb-8">
            <div className="relative w-full max-w-87.5 sm:max-w-125 aspect-4/3 rounded-xl flex items-center justify-center bg-blue-100/30 dark:bg-blue-900/20 overflow-hidden">
              {/* Placeholder Minimalist Shapes */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-12 h-2 bg-blue-200 dark:bg-blue-700 rounded-full" />
                  <div className="w-24 h-2 bg-blue-200 dark:bg-blue-700 rounded-full" />
                  <div className="w-8 h-2 bg-blue-200 dark:bg-blue-700 rounded-full" />
                </div>
              </div>
              {/* Background Illustration Image */}
              <div
                className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-80"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAIge_jGSj91Tt0A3RnJ1VZ3cfa_4KqOmm3rZxmuNghKD37iXYJNHpVc6bsrKuc_EZwBQE1wNs9ZFKpuHwj5kmd69MnBM8-R7pjqHLLrgSlP0B2_Y70Ah5bQQ5z4_aKgNQw3TRTPsZnIOGLumLUY_AAjw5X4XxYoR9pLleqrhWQrpP6QlIUdgC73tgLUtNWunPu3n3dvOKE4_Aryr_gkGnvX-o5p-W-ucO6rqtV3R3zn77SUI6o0ZmpII27KPp2f6BKifdsOjSdkDw")'
                }}
              />
            </div>
          </div>

          {/* Messaging */}
          <h3 className="text-slate-900 dark:text-white tracking-tight text-2xl sm:text-3xl font-bold leading-tight px-2 sm:px-4 pb-2">
            Oops! The page you are looking for does not exist.
          </h3>
          <p className="text-slate-500 dark:text-gray-400 text-base sm:text-lg font-normal leading-relaxed pb-6 px-2 sm:px-4">
            It seems you've drifted into deep space. Let's get you back to familiar territory where the gravity is much better.
          </p>

          {/* Action Button */}
          <Link
            to="/"
            className="flex items-center justify-center w-full sm:w-auto min-h-12.5 px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold text-base sm:text-lg shadow-lg shadow-blue-300/30 hover:shadow-blue-400/40 hover:-translate-y-0.5 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}
