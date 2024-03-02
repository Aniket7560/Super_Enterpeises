import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setOrderList,setCylinderList} from '../redux/appSlice' ;
import { useNavigate } from 'react-router-dom';

function Order() {
  const items = useSelector(state => state.appSlice.orderList) ;
  const dispatch = useDispatch() ;
  console.log(items) ;
  const [date,setDate] = useState({"startDate":"","startDate":""});
  const navigate = useNavigate()
  
  async function fetchOrderList(){
    try{
        const res= await fetch('api/v1/getorder',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem('token'))}`
             },
             body:JSON.stringify(date)
        })
        const data = await res.json();
        if(data.success==true){
            dispatch(setOrderList(data.orderList));
            // toast.success("logged in successfully");
            console.log(data.message);
            console.log(data.orderList);
        }else{
            // toast.error("enter valid details");
            console.log("a",data) ;
        }
       
    }catch(err){
        console.log(err);
    }
}

   function dateChangeHandler(event){
      setDate(()=>({
        ...date,
        [event.target.name]:event.target.value
      }))
   }
function dateSubmitHandler(){
  fetchOrderList() ;
  console.log(items)
}
  

  return (
    <div className="container">
      <input
      type='date'
      name="startDate"
      onChange={dateChangeHandler}
      >
      </input>
      <input
      type='date'
      name="endDate"
      onChange={dateChangeHandler}
      >
      </input>
      <button onClick={dateSubmitHandler}>Find</button>
      <button onClick={()=>{
        navigate("/addorder") ;
      }}>add order</button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Name</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              {/* <td>{item.cost}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Order;