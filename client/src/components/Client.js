import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setClientList } from '../redux/appSlice'
import {NavLink, useNavigate} from "react-router-dom"
function Client() {
    const dispatch = useDispatch() ;
    const items =useSelector(state => state.appSlice.clientList) ;
    const navigate = useNavigate() ;
    async function fetchClientList(){
        try{
            const res= await fetch('/api/v1/getClient',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${JSON.parse(localStorage.getItem('token'))}`
                 },
            })
            const data = await res.json();
            if(data.success==true){
                dispatch(setClientList(data.clientList));
                // navigate('/client') ;
                // toast.success("logged in successfully");
                console.log(data.message);
            }else{
                // toast.error("enter valid details");
                console.log("a",data) ;
            }
           
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchClientList() ;
    },[])
    return (
        <div className="container">
             <button onClick={()=>{
        navigate("/addclient") ;
      }}>add Client</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>contact</th>
                        <th>Name</th>
                        <th>address</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                       <NavLink to={`/client/${item._id}`}><tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.phoneNo}</td>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                        </tr></NavLink> 
                    ))}
                </tbody>
            </table>
            {/* <button onClick={}>click me</button> */}
        </div>
    );
}

export default Client;