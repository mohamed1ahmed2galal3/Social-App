import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../Services/post'
import Loading from '../Components/Loading'
import PostCard from '../Components/Post/PostCard'
import PostForm from '../Components/Post/PostForm'
import { Button } from '@heroui/react'

export default function FeedPage() {
  const [limit, setLimit] = useState(10)

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', limit],
    queryFn: () => getPosts({ limit }),
    select: (data) => data?.data.posts,
    keepPreviousData: true
  })

  if (isLoading) return <Loading />

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <section className="max-w-xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Post Form */}
        <PostForm />

        {/* Posts List */}
        {posts.map((post) => (
          <PostCard key={post._id} post={post} commentsLimit={false} />
        ))}

        {/* Load More */}
        <Button
          onPress={() => setLimit(prev => prev + 10)}
          className="w-full sm:w-auto mx-auto bg-blue-500"
        >
          Load More
        </Button>
      </section>
    </main>
  )
}
