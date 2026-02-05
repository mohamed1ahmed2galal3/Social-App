import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function PostFooter({ comment, id }) {

  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)

  function updateLikes(){
    if (!liked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
    setLiked(!liked);
  }

  return (
    <>
      {/* ===== Stats ===== */}
      <div className="px-3 sm:px-4 py-2 flex flex-wrap justify-between items-center gap-2 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs flex items-center text-slate-500 dark:text-slate-400">
          {likes}  Likes
        </span>

        <div className="flex gap-2 flex-wrap">
          <Link
            to={"/single-post/" + id}
            className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600"
          >
            {comment.length} Comments
          </Link>

          <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600">
            12 Shares
          </span>
        </div>
      </div>

      {/* ===== Actions ===== */}
      <div className="flex px-2 sm:px-3 py-1 gap-1">
          <button onClick={updateLikes}
            className="
              flex-1 py-2 text-sm font-medium cursor-pointer
              text-slate-600 dark:text-slate-400
              hover:bg-slate-100 dark:hover:bg-slate-800
              rounded-lg transition
              active:scale-[0.98]
            "
          >
            Like
          </button>
          <Link to={"/single-post/" + id}  className="
                flex-1 py-2 text-sm font-medium cursor-pointer
                text-slate-600 dark:text-slate-400
                hover:bg-slate-100 dark:hover:bg-slate-800
                rounded-lg transition
                active:scale-[0.98]
                text-center
              "
            >
              Comment
          </Link>
          <button
            className="
              flex-1 py-2 text-sm font-medium cursor-pointer
              text-slate-600 dark:text-slate-400
              hover:bg-slate-100 dark:hover:bg-slate-800
              rounded-lg transition
              active:scale-[0.98]
            "
          >
            Share
          </button>
      </div>
    </>
  );
}
