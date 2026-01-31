import React, { useEffect, useState } from 'react'
import { getPosts } from '../Services/post'
import Loading from '../Components/loading'
import PostCard from '../Components/Post/PostCard'
import PostForm from '../Components/Post/PostForm'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@heroui/react'

export default function FeedPage() {
  const [limit, setLimit] = useState(10)
    const [allPosts, setAllPosts] = useState([]) 



  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);


  // async function getAllPosts() {
  //   const response = await getPosts()
  //   if (response.message === 'success') {
  //     setPosts(response.posts)
  //   }
  //   setLoading(false)
  // }

  // useEffect(() => {
  //   getAllPosts()
  // }, [])

  const { data: posts, isLoading, isFetching } = useQuery({
    queryKey: ['posts', limit],
    queryFn: () => getPosts({ limit }),
    select: (data) => data?.data.posts,
    keepPreviousData: true
  })

  
  

  if (isLoading) return <Loading />

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-xl mx-auto px-4 py-6 space-y-6">

        <PostForm />

        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            commentsLimit={false}
          />
        ))}
        <Button
          onPress={() => setLimit(prev => prev + 10)}
          className="m-auto w-full bg-blue-500"
        >
          Load More
        </Button>

      </section>
    </main>
  )
}
