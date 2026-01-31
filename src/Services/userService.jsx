import axios from "axios";



export async function getLoggedUserData(){
    try{
        const {data} =await axios.get('https://linked-posts.routemisr.com/users/profile-data'
            ,{headers:{token:localStorage.getItem('token')},
        });
        console.log(data);
        
        return data
    }
    catch(err){
        console.log(err)
    }

}

export async function uploadProfilePhotoApi(formData){
    try{
        const {data} =await axios.put('https://linked-posts.routemisr.com/users/upload-photo',
            formData
            ,{headers:{token:localStorage.getItem('token')},
        });
        console.log(data);
        
        return data
    }
    catch(err){
        console.log(err)
    }

}
export async function changePasswordApi(password, newPassword) {
    const token = localStorage.getItem('token') // جلب التوكن
    console.log(token);
    

    const { data } = await axios.patch(
        'https://linked-posts.routemisr.com/users/change-password',
        { password, newPassword },   // body زي ما backend متوقع
        {
            headers: {
                token
            }
        }
    )

    return data
}