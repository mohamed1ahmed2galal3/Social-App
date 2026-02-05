import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import React, { useContext } from 'react'
import { AuthContext } from './../../Context/AuthContext';
import { getSinglePostApi } from '../../Services/post';
import PlaceHolderImage from '../../assets/notFoundUser.jpeg'

export default function PostHeader({ photo, name, date, postId, userId, deletePost }) {
  
  const { setUpdatePost, userData } = useContext(AuthContext);

  async function getPostForUpdate() {
    const response = await getSinglePostApi(postId);
    if (response.message == 'success') {
      setUpdatePost(response.post);
    }
  }

  return (
    <div className="flex items-start justify-between px-3 sm:px-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={photo}
          onError={(e) => (e.target.src = PlaceHolderImage)}
          alt={name}
          className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-200 flex-shrink-0"
        />

        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">
            {name}
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {date.split('.', 1)[0].replace('T', ' ')}
          </p>
        </div>
      </div>

      {userData?._id === userId && (
        <Dropdown>
          <DropdownTrigger>
            <button className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Post Actions">
            <DropdownItem onClick={getPostForUpdate} key="edit">
              Update Post
            </DropdownItem>

            <DropdownItem
              onClick={deletePost}
              key="delete"
              className="text-danger"
              color="danger"
            >
              Delete Post
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
}
