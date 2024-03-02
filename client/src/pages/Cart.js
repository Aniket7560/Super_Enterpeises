import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItemCard from '../components/CartItemCard';
import toast from 'react-hot-toast';
const Cart = () => {
    const cartList = useSelector(state => state.appSlice.cartList) ;
    const dispatch = useDispatch() ;
    let price = 0  ;
    const [phoneNo,setPhone] = useState("") ;
    function changeHandler(event){
        setPhone(event.target.value) ;
    }

    async function placeorderHandler(){
        try{
            const res= await fetch('api/v1/add/order',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${JSON.parse(localStorage.getItem('token'))}`
                 },
                 body:JSON.stringify({phoneNo,
                items:cartList,
                cost:`$price`})
        
            })
            const data = await res.json();
            if(data.success==true){
                toast.success("logged in successfully");
                console.log(data.message);
                console.log(data.cylinderList);
            }else{
                toast.error("enter valid details");
                console.log("a",data) ;
            }
           
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div>
        <form >
        <label>
                <p>client Phone no.<sup>*</sup></p>
            <input 
            type="string" 
            value={phoneNo} 
            name ="phoneNo"
            onChange={changeHandler}
            placeholder="Enter client phone no"
            required></input>
            </label>
        </form>
        {
            cartList.length<=0 ?(
                <p>cart is empty</p>
            ):(
                cartList.map((cylinder)=>{
                price += Number(cylinder.cost)*cylinder.count
                return<CartItemCard key={cylinder._id} cylinder = {cylinder}/>})
            )
        }
        <div>Total : {price}</div>
        <button onClick={placeorderHandler}>place order</button>
    </div>
  )
}

export default Cart