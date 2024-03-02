import React, { useEffect } from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux';
const OrderDetailsCard = ({item ,orderType}) => {
    const [order,setOrder] = useState({}) ;
    const [cylinder,setCylinder] = useState() ;
    const cylinderList = useSelector((state)=> state.appSlice.cylinderList) ;
    console.log(cylinderList) ;
    async function fetchOrderList(){
        try{
            console.log({"_id":item}) ;
            const res= await fetch('/api/v1/getorder',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${JSON.parse(localStorage.getItem('token'))}`
                 },
                 body:JSON.stringify({"_id":item})
            })
            const data = await res.json();
            if(data.success==true){
                // dispatch(setOrderList(data.orderList));
                toast.success(" successfully");
                setOrder(data.order) ;
                console.log(data.message);
                console.log(data.order);
            }else{
                // toast.error("enter valid details");
                console.log("err",data) ;
            }
           
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchOrderList();
    },[])
    if(order.client){
        return (
            <div>
                <div>{order.date}</div>
                <div>{order.time}</div>
                <div>{order.cost}</div>
                { 
                    order.items.map((item)=>{
                        let indx = cylinderList.findIndex((cylinder)=>{
                            console.log("cylinder :",cylinder) ;
                           return item.cylinder===cylinder._id})
                        console.log(indx) ;
                        let cylinder = cylinderList[indx] ;
                        return <div className='CylinderCard'>
                            <p>{cylinder.name}</p>
                            <p>{cylinder.cylinderType}</p>
                            <p>{item.count}</p>
                        </div>
                    })
                }
            </div>
          )
    }else{
        return (
            <div>
                <div>loading</div>
            </div>
          )
    }
  
}

export default OrderDetailsCard