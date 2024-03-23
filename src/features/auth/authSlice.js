import {createSlice , createAsynThunk} from '@reduxjs/toolkit'
import authService from './authService'

const user = localStorage.getItem('user')

const initialState = {
    user: user? user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

//Register New User

export const register = createAsynThunk('auth/register' , async(user , thunkAPI) =>{
    console.log(user);

    try{
        return await authService.register(user)
    }
    catch(err){
        const errres = err.response;
        const message = (errres && errres.data && errres.data.message)|| err.message || err.toString();

        return thunkAPI.rejectWithValue(message)
    }
})

//login User

export const login = createAsynThunk('auth/login' , async(user,thunkAPI)=> {
    console.log(user);
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset: (state)=>{
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },

    extraReducers: (builder)=>{
        builder.addCase(register.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(register.fullfilled ,(state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected , (state , action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
    },
})

export const {reset} = authSlice.actions
export default authSlice.reducer