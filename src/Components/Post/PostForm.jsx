import { Button, Spinner, Textarea } from '@heroui/react'
import React, { useContext, useEffect, useState } from 'react'
import { createPostApi, updatePostApi } from '../../Services/post';
import { AuthContext } from '../../Context/AuthContext';
import { queryClient } from '../../main';

export default function PostForm() {

  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const { updatePost, setUpdatePost } = useContext(AuthContext);

  // prefill Form When Update 
  useEffect(() => {
    if(updatePost){
      setBody(updatePost.body || '');
      setImageUrl(updatePost.image || '');
      setImageName(updatePost.imageName || '');
    } else {
      setBody('');
      setImage(null);
      setImageName('');
      setImageUrl('');
    }
  }, [updatePost]);

  function handleImage(e){
    if(!e.target.files[0]) return;
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    e.target.value = '';
  }

  function removeImage(){
    setImage(null);
    setImageName('');
    setImageUrl('');
  }

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    body && formData.append('body', body);
    image && formData.append('image', image);

    if(updatePost){ 
      // Update post
      const response = await updatePostApi(updatePost._id, formData);
      if(response.message === 'success'){
        setUpdatePost(null); 
      }
    } else {
      await createPostApi(formData);
    }


    await queryClient.invalidateQueries(['posts']);
    setBody('');
    setImage(null);
    setImageName('');
    setImageUrl('');
    setLoading(false);
  }

  return (
  <div
    className="
      bg-white dark:bg-slate-900
      border border-slate-100 dark:border-slate-800
      rounded-2xl shadow-sm hover:shadow-md transition-shadow
      py-3 sm:py-4 px-2 sm:px-3 relative
    "
  >
    {loading && (
      <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 z-50 flex justify-center items-center backdrop-blur-sm">
        <Spinner variant="wave" />
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What's in your mind..."
        minRows={2}
      />

      {imageUrl && (
        <div className="rounded-xl overflow-hidden relative border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 end-2 bg-white/80 dark:bg-slate-900/80 rounded-full p-1 hover:scale-105 transition"
          >
            ✕
          </button>

          <img
            src={imageUrl}
            alt=""
            className="w-full max-h-72 object-cover"
          />
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center">
        <label className="flex gap-2 items-center cursor-pointer text-sm text-slate-600 dark:text-slate-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 hover:text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z"
            />
          </svg>

          <span className="truncate max-w-40">
            {imageName || "Add image"}
          </span>

          <input onChange={handleImage} type="file" className="hidden" />
        </label>

        <Button
          disabled={!(body || image)}
          className="bg-blue-500 w-full sm:w-auto"
          type="submit"
        >
          {updatePost ? "Update Post" : "Post"}
        </Button>
      </div>
    </form>
  </div>
);

}
