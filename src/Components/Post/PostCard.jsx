import React, { useEffect, useState } from 'react'
import PostHeader from './PostHeader'
import PlaceHolderImage from '../../assets/notFoundUser.jpeg'
import PostComment from './PostComment'
import PostFooter from './PostFooter'
import PostBody from './PostBody'
import { Button, Input, Spinner } from '@heroui/react'
import { createCommentApi, deleteCommentApi, getPostCommentsApi, updateCommentApi } from '../../Services/commentService'
import { useMutation } from '@tanstack/react-query'
import { deletePostApi } from '../../Services/post'
import { queryClient } from '../../main'


export default function PostCard({post , commentsLimit }) {
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [loading, setLoading] = useState(false);
  const [isUpdatingComment, setIsUpdatingComment] = useState(null);
  const [isDeletingComment, setIsDeletingComment] = useState(false);

  function reverseComments(){
    let newComments = structuredClone(comments);
    newComments.reverse();
    setComments(newComments);
  }

  async function createComment(e) {
    setLoading(true)
    e.preventDefault();
    const response = await createCommentApi(commentContent , post.id);
    if(response.message == 'success'){
      setComments(response.comments);
      setCommentContent('');

    }
    setLoading(false);
  } 

  function sefFormForUpdate(comment){
    setCommentContent(comment.content);
    setIsUpdatingComment(comment._id);
  }

  async function updateComment(e) {
    setLoading(true);
    e.preventDefault();
    const response = await updateCommentApi(isUpdatingComment , commentContent);
    if(response.message == 'success'){
      const {comments} = await getPostCommentsApi(post.id);
      setCommentContent('');
      setIsUpdatingComment(null);
      setComments(comments);
    }
    setLoading(false);
  }

  async function deleteComment(comment) {
    setIsDeletingComment(true);
    const response =await deleteCommentApi(comment._id);
    if(response.message == 'success'){
      const {comments} = await getPostCommentsApi(post.id);
      setComments(comments);
    }
    setIsDeletingComment(false);
  }

  useEffect(()=>{
    reverseComments();
  },[])

  const {mutate : deletePost , isPending : isDeleting} = useMutation({
    mutationKey : ['delete'],
    mutationFn : ()=> deletePostApi(post._id) , 
    onSuccess : async(data)=>{
      await queryClient.invalidateQueries(['posts']);
    }
  })

  return (
  <div
    className="
      bg-white dark:bg-slate-900
      border border-slate-100 dark:border-slate-800
      rounded-2xl shadow-sm hover:shadow-md transition-shadow
      relative overflow-hidden
    "
  >
    {isDeleting && (
      <div className="bg-white/80 dark:bg-slate-900/80 inset-0 z-20 absolute flex justify-center items-center backdrop-blur-sm">
        <Spinner />
      </div>
    )}

    <PostHeader
      photo={post.user.photo}
      name={post.user.name}
      date={post.createdAt}
      postId={post._id}
      userId={post.user._id}
      deletePost={deletePost}
    />

    <PostBody body={post.body} image={post.image} id={post.id} />

    <PostFooter comment={comments} id={post.id} />

    {/* ===== Comment Form ===== */}
    <form
      onSubmit={isUpdatingComment ? updateComment : createComment}
      className="flex flex-col sm:flex-row gap-2 px-3 sm:px-4 pb-3"
    >
      <Input
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Add comment..."
        className="flex-1"
      />

      {isUpdatingComment ? (
        <Button
          isLoading={loading}
          isDisabled={commentContent.length < 3}
          type="submit"
          className="bg-blue-500 w-full sm:w-auto"
        >
          Update
        </Button>
      ) : (
        <Button
          isLoading={loading}
          isDisabled={commentContent.length < 3}
          type="submit"
          className="bg-blue-500 w-full sm:w-auto"
        >
          Add
        </Button>
      )}
    </form>

    {/* ===== Comments ===== */}
    <div className="px-3 sm:px-4 pb-3 space-y-2">
      {comments.length > 0 && commentsLimit == false ? (
        <PostComment
          commentsLimit={commentsLimit}
          userId={post.user._id}
          comment={comments[0]}
          postId={post.id}
          sefFormForUpdate={sefFormForUpdate}
          isUpdatingComment={isUpdatingComment}
          isDeletingComment={isDeletingComment}
          deleteComment={deleteComment}
        />
      ) : (
        comments.map((comment) => (
          <PostComment key={comment._id} comment={comment} id={post.id} />
        ))
      )}
    </div>
  </div>
);

}
