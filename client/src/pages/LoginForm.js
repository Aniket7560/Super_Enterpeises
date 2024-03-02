import React, { useState } from 'react'
import {  useDispatch } from 'react-redux';
import { toggleLogin } from '../redux/appSlice';
import { useNavigate } from 'react-router-dom';
import { setCylinderList } from '../redux/appSlice';
const LoginForm = () => {
    const [formdata,setFormData] = useState({email:"",password:""})
    const navigate = useNavigate()
    const dispatch = useDispatch() ;
    function changeHandler(event){
            setFormData(()=>{
                return {
                    ...formdata,
                    [event.target.name]:event.target.value,
                }
            }
            )
    }
    
    async function submitHandler(event){
        event.preventDefault();
        const result = await fetch("/api/v1/login",{
         method:"POST",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify(formdata)
        })
        const data =await result.json();
        if(data.success===true){
            dispatch(toggleLogin());

            navigate('/client') ;
            // toast.success("logged in successfully");
            console.log(data);
            // localStorage.setItem("user",JSON.stringify(data.data.user));
            localStorage.setItem("token",JSON.stringify(data.admin.token));
            fetchCylinderList() ;
        }else{
            // toast.error("enter valid details");
            console.log("err") ;
        }
        async function fetchCylinderList(){
            try{
                const res= await fetch('api/v1/getcylinder',{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${JSON.parse(localStorage.getItem('token'))}`
                     },
                })
                const data = await res.json();
                if(data.success==true){
                    dispatch(setCylinderList(data.cylinderList));
                    // toast.success("logged in successfully");
                    console.log(data.message);
                    console.log(data.cylinderList);
                }else{
                    // toast.error("enter valid details");
                    console.log("a",data) ;
                }
               
            }catch(err){
                console.log(err);
            }
        }
      
}
  return (

    <div>
        LoginForm
        <form onSubmit={submitHandler}>
        <label >
                <p>Email Address<sup>*</sup></p>
            <input 
            type="email" 
            value={formdata.email} 
            name ="email"
            onChange={changeHandler}
            placeholder="Enter email id"
            required></input>
            </label>
            <label>
                <p>Password<sup>*</sup></p>
            <input 
            type="password" 
            value={formdata.password} 
            name ="password"
            onChange={changeHandler}
            placeholder="Enter password"
            required></input>
            </label>
            <button
            type='submit'>
            login
            </button>

            {/* </label> */}
        </form>
    </div>


  )
}

export default LoginForm