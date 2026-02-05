import React from 'react'
import { Link } from 'react-router-dom';

export default function PostBody({ body, image, id }) {
  return (
    <div className="px-3 sm:px-4 pb-4 space-y-3">
      <Link
        to={"/single-post/" + id}
        className="block space-y-3 transition-opacity duration-200 hover:opacity-90"
      >
        {body && (
          <p className="text-sm sm:text-[15px] py-1 text-slate-700 dark:text-slate-200 leading-relaxed break-words">
            {body}
          </p>
        )}

        {image && (
          <div className="overflow-hidden rounded-xl">
            <img
              src={image}
              alt="post"
              className="
                w-full 
                max-h-72 sm:max-h-80 
                object-cover 
                transition-transform duration-300 
                hover:scale-[1.02]
              "
            />
          </div>
        )}
      </Link>
    </div>
  );
}
