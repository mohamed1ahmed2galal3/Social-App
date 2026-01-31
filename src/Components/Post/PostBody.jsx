import React from 'react'
import { Link } from 'react-router-dom';

export default function PostBody({body , image , id}) {
  return <>
    {/* ===== Body ===== */}
          <div className="px-4 pb-4 space-y-3">
            <Link to={'/single-post/'+id}>
                {body && (
                <p className="text-sm py-2 text-slate-700 dark:text-slate-200 leading-relaxed">
                    {body}
                </p>
                )}

                {image && (
                <img
                    src={image}
                    alt="post"
                    className="w-full h-80 object-cover rounded-xl"
                />
                )}
            </Link>
          </div>
  </>
}
