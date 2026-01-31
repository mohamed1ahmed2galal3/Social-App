import React from 'react'
import { Link } from 'react-router-dom'

export default function PostFooter({comment , id}) {
  return <>
    {/* ===== Stats ===== */}
              <div className="px-4 py-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  125 Likes
                </span>
                <div className="flex gap-3">
                  <Link to={'/single-post/'+id} className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600">
                    {comment.length} Comments
                  </Link>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600">
                    12 Shares
                  </span>
                </div>
              </div>
    
              {/* ===== Actions ===== */}
              <div className="flex px-2 py-1">
                {['Like', 'Comment', 'Share'].map(action => (
                  <button
                    key={action}
                    className="flex-1 py-2 text-sm font-medium text-slate-600 dark:text-slate-400
                               hover:bg-slate-100 dark:hover:bg-slate-800
                               rounded-lg transition"
                  >
                    {action}
                  </button>
                ))}
              </div>
  </>
}
