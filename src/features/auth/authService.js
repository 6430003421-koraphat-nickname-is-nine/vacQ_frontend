import axios from 'axios'

const API_URL = 'http://localhost:5000/api/v1/auth/'

//Register User 

const register = async (userData) =>{
    try{
        const response = await axios.post(API_URL + 'register/' , userData)
        console.log('respones data',JSON.stringify(response.data))
        console.log(response.data.name)
        if( response.data){
            // localStorage.setItem('user',JSON.stringify(response.data))
            localStorage.setItem('user',response.data.name)
        }
        return response.data.name //response.data
    }catch(err){
        console.log('authService: register')
        console.log(err);
    }
}


// Login user
const login = async (userData) =>{
    
    const response = await axios.post(API_URL + 'login' , userData)

    if( response.data){
        // localStorage.setItem('user',JSON.stringify(response.data))
        localStorage.setItem('user',response.data.name)
    }

    console.log(response.data);
    return response.data;   
}
// Logout user

const logout = ()=>{
    localStorage.setItem('user' , null)
}

const authService = {
    register,
    logout,
    login,
}

export default authService;