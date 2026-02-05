import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import PostCard from '../Components/Post/PostCard';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/AuthContext';
import { getUserPostsApi } from '../Services/post';
import { Spinner } from '@heroui/react';
import PostForm from '../Components/Post/PostForm';

export default function UserPostsPage() {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  const { data: posts, isLoading } = useQuery({
    queryKey: ['userPosts', userData?._id],
    queryFn: () => getUserPostsApi(userData?._id, 100),
    enabled: !!userData,
    select: (data) => data.posts || [],
  });

  useEffect(() => {
    if (posts && posts.length === 0) {
      navigate('/profile');
    }
  }, [posts, navigate]);

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-950">
          <Spinner />
        </div>
      ) : (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
          <section className="max-w-xl mx-auto px-4 space-y-6">
            {/* Form to create new post */}
            <PostForm />

            {/* User posts list */}
            {(posts || []).map(post => (
              <PostCard
                key={post._id}
                post={post}
                commentsLimit={false}
              />
            ))}

            {posts.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                No posts found.
              </div>
            )}
          </section>
        </main>
      )}
    </>
  );
}
