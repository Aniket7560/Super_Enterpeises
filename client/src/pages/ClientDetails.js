import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import appSlice from '../redux/appSlice';
import OrderDetailsCard from '../components/OrderDetailsCard';
import { updateClientOrder } from '../redux/appSlice';
const ClientDetails = () => {
    const {id} = useParams() ;
    const dispatch = useDispatch() ;
    const clientList = useSelector(state=> state.appSlice.clientList) ;
    let indx = clientList.findIndex((item)=>{
        return item._id==id}) ;
    if(indx===-1){
        return (
            <div>Client details not found</div>
          )
    }else{
        const clientDetail = clientList[indx] ;

        async function clientOrderUpdateHandler(orderId,pop_arr,push_arr){
            try{
                
                const res= await fetch('/api/v1/update/client/order',{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${JSON.parse(localStorage.getItem('token'))}`
                     },
                     body:JSON.stringify({ "pop_arr":pop_arr,
                     "push_arr":push_arr,
                     "clientId":clientDetail._id,
                     "orderId":orderId}
                     )
                })

                const data = await res.json();
                if(data.success==true){
                    // dispatch(setCylinderList(data.cylinderList));
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
        return (
            <div>
            <div>{clientDetail.name}</div>
            <div>{clientDetail.phoneNo}</div>
            <div>{clientDetail.address}</div>
            <div>pending order
                { clientDetail.pending_orders.length>0 ?
                   ( clientDetail.pending_orders.map((item)=>
                   <div><OrderDetailsCard key={item} item={item} />
                   <button onClick={()=>{
                    clientOrderUpdateHandler(item,"pending_orders","pending_payment") ;
                    dispatch(updateClientOrder({_id:clientDetail._id,push_arr:"pending_payment",pop_arr:"pending_orders",orderId:item}))
                   }}>mark as payment pending</button>
                   <button onClick={()=>{
                    clientOrderUpdateHandler(item,"pending_orders","completed") ;
                    dispatch(updateClientOrder({_id:clientDetail._id,push_arr:"completed",pop_arr:"pending_orders",orderId:item}))
                   }}>mark as complete</button>
              </div>
                    )):(<div>no pending orders</div>)
                }
            </div>
            <div>pending payments
                { clientDetail.pending_payment.length>0 ?
                   ( clientDetail.pending_payment.map((item)=>
                   <div><OrderDetailsCard key={item} item={item} />
                        <button onClick={()=>{
                    clientOrderUpdateHandler(item,"pending_payment","pending_orders") ;
                    dispatch(updateClientOrder({_id:clientDetail._id,pop_arr:"pending_payment",push_arr:"pending_orders",orderId:item}))
                   }}>mark as pending_order</button>
                   <button onClick={()=>{
                    clientOrderUpdateHandler(item,"pending_payment","completed") ;
                    dispatch(updateClientOrder({_id:clientDetail._id,push_arr:"completed",pop_arr:"pending_payment",orderId:item}))
                   }}>mark as coplete</button>
                   </div>
                    )):(<div>no pending payment</div>)
                }
            </div>
            <div>completed order
                { clientDetail.completed.length>0 ?
                   ( clientDetail.completed.map((item)=>
                   <div><OrderDetailsCard key={item} item={item} />
                   <button onClick={()=>{
                    clientOrderUpdateHandler(item,"completed","pending_orders") ;
                    dispatch(updateClientOrder({_id:clientDetail._id,pop_arr:"completed",push_arr:"pending_orders",orderId:item}))
                   }}>mark as pending order</button>
                   <button onClick={()=>{
                    clientOrderUpdateHandler(item,"completed","pending_payment") ;
                    dispatch(updateClientOrder({_id:clientDetail._id,pop_arr:"completed",push_arr:"pending_payment",orderId:item}))
                   }}>mark as pending payment</button>
                   </div>
                    )):(<div>no complete orders</div>)
                }
            </div>
            </div>
          )
    }
  
}

export default ClientDetails