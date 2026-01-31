import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {


  return <>
<div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
  {/* Main Content Area: Centered Layout */}
  <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
    <div className="max-w-160 w-full flex flex-col items-center text-center">
      {/* 404 Heading */}
      <h1 className="text-primary tracking-tighter text-[120px] font-extrabold leading-none pb-2 font-display opacity-90">
        404
      </h1>
      {/* Illustration Component */}
      <div className="flex w-full justify-center p-4 mb-8">
        <div className="relative w-full max-w-100 aspect-4/3 rounded-xl flex items-center justify-center bg-primary/5 dark:bg-primary/10 overflow-hidden">
          {/* Simulated Minimalist Illustration with an Icon */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              <div className="w-12 h-2 bg-primary/20 rounded-full" />
              <div className="w-24 h-2 bg-primary/20 rounded-full" />
              <div className="w-8 h-2 bg-primary/20 rounded-full" />
            </div>
          </div>
          {/* Placeholder Image Tag */}
          <div className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-80" data-alt="Minimalist illustration of a floating astronaut in deep space" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAIge_jGSj91Tt0A3RnJ1VZ3cfa_4KqOmm3rZxmuNghKD37iXYJNHpVc6bsrKuc_EZwBQE1wNs9ZFKpuHwj5kmd69MnBM8-R7pjqHLLrgSlP0B2_Y70Ah5bQQ5z4_aKgNQw3TRTPsZnIOGLumLUY_AAjw5X4XxYoR9pLleqrhWQrpP6QlIUdgC73tgLUtNWunPu3n3dvOKE4_Aryr_gkGnvX-o5p-W-ucO6rqtV3R3zn77SUI6o0ZmpII27KPp2f6BKifdsOjSdkDw")'}}>
          </div>
        </div>
      </div>
      {/* Messaging */}
      <h3 className="text-[#111418] dark:text-white tracking-tight text-3xl font-bold leading-tight px-4 pb-3 font-display">
        Oops! The page you are looking for does not exist.
      </h3>
      <p className="text-[#64748b] dark:text-gray-400 text-lg font-normal leading-relaxed pb-8 px-4 max-w-120">
        It seems you've drifted into deep space. Let's get you back to familiar territory where the gravity is much better.
      </p>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <button className="flex min-w-50 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-primary text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
          <Link to={'/'} className="truncate">Back to Home</Link>
        </button>
      </div>
    </div>
  </main>
</div>

  </>
}
