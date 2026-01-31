import React from 'react'

export default function Footer() {
  return <>
<footer className="py-12 border-t border-[#f0f2f4] bg-gray-50 dark:border-gray-800 text-center">
  <p className="text-sm text-[#617589]">© 2026 SocialApp. All rights reserved.</p>
  <div className="flex items-center justify-center gap-4 mt-4">
    <a className="text-xs font-medium text-[#617589] hover:text-primary" href="#">Privacy Policy</a>
    <a className="text-xs font-medium text-[#617589] hover:text-primary" href="#">Terms of Service</a>
    <a className="text-xs font-medium text-[#617589] hover:text-primary" href="#">Help Center</a>
  </div>
</footer>

  </>
}
