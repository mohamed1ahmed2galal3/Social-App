import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../Context/AuthContext';
import { Spinner } from '@heroui/react';
import { getUserPostsApi } from '../Services/post';
import { useQuery } from '@tanstack/react-query';
import PostCard from './../Components/Post/PostCard';
import { Link, useNavigate } from 'react-router-dom';


export default function ProfilePage() {
  const [limit, setLimit] = useState(20);
  const [userPosts, setUserPosts] = useState(20);

  const { userData } = useContext(AuthContext);

  const { data: posts, isLoading, isError } = useQuery({
  queryKey: ['userPosts', userData?._id, limit],
  queryFn: () => getUserPostsApi(userData?._id, limit),
  enabled: !!userData,
  select: (data) => data?.posts || [] 
});


  useEffect(() => {
  if (posts && posts.length > 0) {
    const newUserPosts = structuredClone(posts);
    newUserPosts.reverse();
    setUserPosts(newUserPosts);
  }
}, [posts]);

  const navigate = useNavigate();
  function handleViewAll() {
    navigate('/user-posts', { state: { posts: userPosts } });
  }

  function handleUpdate(){
    navigate('update-profile');
  }


  if (!userData || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner/>
      </div>
    );
  }
  return <>
  <main className="max-w-2xl mx-auto pb-20">
  {/* Profile Header Section */}
  <section className="mt-6 px-4">
    {/* Header Image / Gradient */}
    <div className="w-full h-40 rounded-xl overflow-hidden bg-linear-to-r from-primary/30 via-primary/10 to-blue-50 relative" data-alt="Soft blue and white minimalist gradient background banner">
      {/* If it were an image: <img src="..." class="w-full h-full object-cover"> */}
    </div>
    {/* Profile Info Overlap */}
    <div className="px-4 md:px-8 -mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-[#f0f2f4] dark:border-gray-800">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
        <div className="size-32 rounded-full border-4 border-white dark:border-background-dark bg-white shadow-lg overflow-hidden shrink-0">
          <div className="w-full h-full bg-cover bg-center relative z-40 "  >
            <img src={userData?.photo} alt={userData?.name} />
          </div>
        </div>
        <div className="mb-2">
          <h1 className="text-3xl font-bold tracking-tight">{userData?.name}</h1>
          <p className="text-[#617589] font-medium">{userData?.email}</p>
        </div>
      </div>
      <div className="flex gap-3 mb-2">
        <button onClick={handleUpdate} className="cursor-pointer flex-1 md:flex-none h-10 px-6 rounded-lg bg-primary text-white text-sm font-bold transition-all hover:bg-primary/90 flex items-center justify-center gap-2">
          Update Profile
        </button>
      </div>
    </div>
  </section>
  {/* Body Content */}
  <div className="flex flex-col gap-8 px-4 mt-8">
    {/* Basic Info Card */}
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="p-6 border-b border-[#f0f2f4] dark:border-gray-800 flex justify-between items-center">
        <h3 className="text-lg font-bold">Basic Information</h3>
        <span className="text-xs font-medium text-[#617589] bg-[#f0f2f4] dark:bg-gray-800 px-3 py-1 rounded-full">Joined on {userData?.createdAt.split("T")[0]}</span>
      </div>
      <div className="divide-y divide-[#f0f2f4] dark:divide-gray-800">
        {/* Email Item */}
        <div className="flex items-center gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined">mail</span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-[#617589] font-medium">Email Address</p>
            <p className="font-medium">{userData?.email}</p>
          </div>
        </div>
        {/* DOB Item */}
        <div className="flex items-center gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined">Birth</span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-[#617589] font-medium">Date of Birth</p>
            <p className="font-medium">{userData?.dateOfBirth.split("T")[0]}</p>
          </div>
        </div>
        {/* Gender Item */}
        <div className="flex items-center gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined">Gen</span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-[#617589] font-medium">Gender</p>
            <p className="font-medium">{userData?.gender}</p>
          </div>
        </div>
      </div>
    </div>
    {/* Recent Activity Placeholder */}
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold">Recent Activity</h3>
        {userPosts.length > 1 && <button onClick={handleViewAll} className="text-primary text-sm font-semibold hover:underline cursor-pointer">View All</button>}
      </div>
      {/* Empty State */}
      {userPosts.length > 0 ? (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
      <PostCard post = {userPosts[0]} />
    </div>
    ) : (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="size-20 bg-[#f0f2f4] dark:bg-gray-800 rounded-full flex items-center justify-center text-[#617589] mb-4">
        <span className="material-symbols-outlined text-4xl">post_add</span>
      </div>
      <h4 className="text-lg font-bold mb-1">No posts yet</h4>
      <p className="text-[#617589] max-w-[320px] mb-6">
        Start sharing your thoughts, photos, and updates with your network.
      </p>
      <Link to={'/'} className="bg-primary/10 hover:bg-primary/20 text-primary px-6 py-2 rounded-lg font-bold text-sm transition-all">
        Create Your First Post
      </Link>
    </div>
  )}
    </div>
  </div>
</main>

  </>
}
