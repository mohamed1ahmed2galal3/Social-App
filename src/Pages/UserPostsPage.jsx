import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../Components/Post/PostCard';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/AuthContext';
import { getUserPostsApi } from '../Services/post';
import { Spinner } from '@heroui/react';
import PostForm from '../Components/Post/PostForm';

export default function UserPostsPage() {
  const navigate = useNavigate();
  const {userData} = useContext(AuthContext);


  const { data: posts, isLoading } = useQuery({
    queryKey: ['userPosts', userData?._id],
    queryFn: () => getUserPostsApi(userData?._id, 100), 
    enabled: !!userData,
    select: (data) => data.posts,
  });

  useEffect(() => {
    if (posts && posts.length === 0) {
      navigate('/profile');
    }
  }, [posts, navigate]);
  return <>
  {isLoading ? <div className=' max-w-xl mx-auto px-4 py-6 space-y-6 flex justify-center items-center '>
    <Spinner/>
    </div> :
        <main className="min-h-screen bg-gray-50">
          <section className="max-w-xl mx-auto px-4 py-6 space-y-6">
            <PostForm/>
            {(posts || []).map(post => (
              <PostCard
              key={post._id}
              post={post}
              commentsLimit={false}
              />
            ))}
          </section>
        </main>
        }
  </>
}
