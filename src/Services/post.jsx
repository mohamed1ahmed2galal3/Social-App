import axios from "axios";



export async function getPosts({ limit = 10 }){
    
    return await axios.get('https://linked-posts.routemisr.com/posts?'
            ,{headers:{token:localStorage.getItem('token')},
        params :{
            limit : limit ,
            sort : '-createdAt'
        }
        });

}
export async function getUserPostsApi(userId, limit) {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/${userId}/posts`,
      {
        headers: { token: localStorage.getItem('token') },
        params: { limit }
      }
    );
    return data; // لازم يكون data.posts موجود
  } catch (err) {
    console.log(err);
    return { posts: [] }; // لو في error رجع array فاضية
  }
}

export async function getSinglePostApi(postId){
    try{
        const {data} =await axios.get('https://linked-posts.routemisr.com/posts/'+postId
            ,{headers:{token:localStorage.getItem('token')}
        });
        return data
    }
    catch(err){
        console.log(err)
    }

}

export async function getPostApi(id){
    try{
        const {data} =await axios.get('https://linked-posts.routemisr.com/posts/'+ id
            ,{headers:{token:localStorage.getItem('token')}});
            return data 
    }
    catch(err){
        console.log(err)
    }

}
export async function deletePostApi(id){
    try{
        const {data} =await axios.delete('https://linked-posts.routemisr.com/posts/'+ id
            ,{headers:{token:localStorage.getItem('token')}});
            return data 
    }
    catch(err){
        console.log(err)
    }

}

export async function createPostApi(formData){
    try{
        const {data} =await axios.post('https://linked-posts.routemisr.com/posts?',formData
            ,{headers:{token:localStorage.getItem('token')},
        });
            return data
    }
    catch(err){
        console.log(err)
    }

}
export async function updatePostApi(id,formData){
    try{
        const {data} =await axios.put('https://linked-posts.routemisr.com/posts/'+id ,formData
            ,{headers:{token:localStorage.getItem('token')},
        });
            return data
    }
    catch(err){
        console.log(err)
    }

}


// export async function getUserPostsApi(){
//     try{
//         const {data} =await axios.get(`https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts?`
//             ,{headers:{token:localStorage.getItem('token')},
//         params :{
//             limit : '100' ,
//             sort : '-createdAt'
//         }
//         });
//         console.log(data);
        
//         return data
//     }
//     catch(err){
//         console.log(err)
//     }

// }