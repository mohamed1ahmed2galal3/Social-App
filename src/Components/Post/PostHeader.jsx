import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import React, { useContext } from 'react'
import { AuthContext } from './../../Context/AuthContext';
import { deletePostApi, getSinglePostApi } from '../../Services/post';

export default function PostHeader({photo , name , date ,postId , userId , deletePost  }) {
  
  const {setUpdatePost} = useContext(AuthContext);

  // async function deletePost() {
  //   setIsDeleting(true);
  //   const response = await deletePostApi(postId);
  //   if(response.message == 'success'){
  //     getAllPosts();
  //   }
  //   setIsDeleting(false);
  // }

  async function getPostForUpdate(){
    const response =await getSinglePostApi(postId);
    if(response.message == 'success'){
      setUpdatePost(response.post);
    }
  }


  const {userData} = useContext(AuthContext);
  return <>
  {/* ===== Header ===== */}
          <div className="flex items-center justify-between p-4">
            <div className="flex  items-center gap-3">
              <img
                src={photo}
                onError={(e) => e.target.src = PlaceHolderImage}
                alt={name}
                className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-200"
              />
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  {name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {date.split('.', 1)[0].replace('T', ' ')}
                </p>
              </div>
            </div>
            {userData?._id === userId && 
              <Dropdown>
                <DropdownTrigger>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer outline-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem onClick={getPostForUpdate} key="edit">Update Post</DropdownItem>
                  <DropdownItem onClick={deletePost} key="delete" className="text-danger" color="danger">
                    Delete Post
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }
          </div>
  </>
}
