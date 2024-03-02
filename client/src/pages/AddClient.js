import React, { useState } from 'react'
import {  useDispatch } from 'react-redux';
import { toggleLogin } from '../redux/appSlice';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
const AddClient = () => {
    const [formdata,setFormData] = useState({name:"",phoneNo:"",address:""})
    // const navigate = useNavigate()
    // const dispatch = useDispatch() ;
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
        const result = await fetch("/api/v1/add/client",{
         method:"POST",
         headers:{
            "Content-Type":"application/json",
            "authorization":JSON.parse(localStorage.getItem("token"))
         },
         body:JSON.stringify(formdata)
        })
        const data =await result.json();
        if(data.success===true){
            toast.success("client added successfully");
            console.log(data);
        }else{
            toast.error(`${data.message}`);
            console.log("err") ;
        }
       
}
  return (

    <div>
        AddClient
        <form onSubmit={submitHandler}>
        <label >
                <p>Name<sup>*</sup></p>
            <input 
            type="string" 
            value={formdata.name} 
            name ="name"
            onChange={changeHandler}
            placeholder="Enter name id"
            required></input>
            </label>
            <label>
                <p>Phone No<sup>*</sup></p>
            <input 
            type="string" 
            value={formdata.phoneNo} 
            name ="phoneNo"
            onChange={changeHandler}
            placeholder="Enter Phone No"
            required></input>
            </label>
            <label>
                <p>Address<sup>*</sup></p>
            <input 
            type="textArea" 
            value={formdata.address} 
            name ="address"
            onChange={changeHandler}
            placeholder="Enter Address"
            required></input>
            </label>
            <button
            type='submit'>
            Add client
            </button>

            {/* </label> */}
        </form>
    </div>


  )
}

export default AddClient