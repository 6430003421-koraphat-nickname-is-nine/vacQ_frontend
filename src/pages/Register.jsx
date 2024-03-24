import { useState , useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { FaUser } from "react-icons/fa";

import {useDispatch, useSelector , } from 'react-redux'
import {register , reset} from '../features/auth/authSlice'

function Register(){
    const [fromData , setFormData] = useState({
        name: '',
        email:'',
        password:'',
        password2:'',
        role: 'user'
    });

    const {name,email , password , password2 , role} = fromData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, isLoading , isError , isSuccess , message}  = useSelector((state) =>{
        return state.auth
    }) 

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        // redirect when login

        if(isSuccess||user){
            navigate('/')
        }

        dispatch(reset())
    },[isError , isSuccess , user, message , navigate , dispatch]) 

    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = (e) =>{
        e.preventDefault()

        if(password !== password2){
            toast.error('Passwords do not match')
        }
        else{
            const userData = {
                name , 
                email, 
                password , 
                role
            }

            dispatch(register(userData))
        }
    }

    return(
        <>
        <section className="heading">
            <h1>
                <FaUser />Register
            </h1>
            <p>Please create an account</p>
        </section>
        <section>
            <form onSubmit = 'form'>
                <div className="form-group">
                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={onChange} placeholder="Enter Your Name" required/>
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" id="email" name="email" value={email} onChange={onChange} placeholder="Enter Your Email" required/>
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={onChange} placeholder="Enter Your Password" required/>
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" id="password2" name="password2" value={password2} onChange={onChange} placeholder="Confirm Your Password" required/>
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" id="role" name="role" value={role} onChange={onChange} placeholder="Enter Your Role" required/>
                </div>

                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>

        </>
    );
}

export default Register;