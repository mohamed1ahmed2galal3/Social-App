import React, { useContext } from 'react'
import PlaceHolderImage from '../../assets/notFoundUser.jpeg'
import { Link } from 'react-router-dom'
import { AuthContext } from './../../Context/AuthContext';
import { Spinner } from '@heroui/react';

export default function PostComment({
  comment,
  postId,
  commentsLimit,
  userId,
  sefFormForUpdate,
  isUpdatingComment,
  deleteComment,
  isDeletingComment
}) {
  const { userData } = useContext(AuthContext);

  return (
    <>
      {comment && (
        <div className="px-3 sm:px-4 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="flex gap-3 items-start">
            <img
              src={
                comment.commentCreator._id == userData?._id
                  ? userData?.photo
                  : comment.commentCreator.photo
              }
              onError={(e) => (e.target.src = PlaceHolderImage)}
              className="h-8 w-8 rounded-full object-cover shrink-0"
              alt={comment.commentCreator.name}
            />

            <div className="flex-1 min-w-0">
              <div className="bg-slate-100 relative overflow-hidden dark:bg-slate-800 rounded-xl px-3 py-2">
                {isUpdatingComment && (
                  <div className="bg-black/60 absolute inset-0 flex justify-center items-center">
                    <Spinner size="sm" />
                  </div>
                )}

                <p className="text-xs font-semibold text-slate-800 dark:text-white truncate">
                  {comment.commentCreator.name}
                </p>

                <p className="text-sm text-slate-700 dark:text-slate-200 wrap-break-word">
                  {comment.content}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                <span>
                  {comment.createdAt.split('.', 1)[0].replace('T', ' ')}
                </span>

                {userId === userData?._id &&
                  userData?._id === comment.commentCreator._id && (
                    <>
                      <button
                        onClick={() => sefFormForUpdate(comment)}
                        className="text-blue-500 hover:underline cursor-pointer"
                      >
                        Update
                      </button>

                      {isDeletingComment ? (
                        <Spinner size="sm" />
                      ) : (
                        <button
                          onClick={() => deleteComment(comment)}
                          className="cursor-pointer text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </>
                  )}
              </div>
            </div>
          </div>

          {commentsLimit == false && (
            <Link
              to={"/single-post/" + postId}
              className="mt-3 block text-sm text-blue-500 hover:underline"
            >
              View more comments
            </Link>
          )}
        </div>
      )}
    </>
  );
}
