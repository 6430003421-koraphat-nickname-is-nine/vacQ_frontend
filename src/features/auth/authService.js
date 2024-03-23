import axios from 'axios'

const API_URL = 'http://localhost:5000/api/v1/register'

//Register User 

const register = async (userData) =>{
    try{
        const response = await axios.post(API_URL , userData)
        console.log(JSON.stringify(response.data))
        const resdata = response.data;
        console.log(resdata.name)
        if( resdata){
            // localStorage.setItem('user',JSON.stringify(response.data))
            localStorage.setItem('user',resdata.name)
        }
        return resdata.name //response.data
    }catch(err){
        console.log('authService: register')
        console.log(err);
    }
}

const authService = {
    register,
}

export default authService;