import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostApi } from '../Services/post';
import Loading from '../Components/loading';
import PostCard from '../Components/Post/PostCard';

export default function SinglePostpage() {

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const {id} = useParams();

  // console.log(id);
  
  async function getPost() {
    const response = await getPostApi(id);
    if(response.message == 'success'){
      setPost(response.post);
    }
    setLoading(false);
  }

  useEffect(()=>{
    getPost();
  },[])

  return <>
    {loading ? 
      <Loading/> :
      <section className="max-w-xl mx-auto px-4 py-6 space-y-6 ">
        <PostCard post={post} commentsLimit={true}/>
      </section>
    }
  </>
}
