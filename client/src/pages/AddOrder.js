import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCylinderList } from '../redux/appSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import CylinderCard from '../components/CylinderCard';
export const AddOrder = () => {
    const cylinderList = useSelector(state=>state.appSlice.cylinderList );
    const navigate= useNavigate() ;
    const dispatch = useDispatch() ;
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
    useEffect(()=>{
        fetchCylinderList() ;
    },[])
    function proceedClickHandler(){
        navigate("/cart") ;
    }
  return (
    <div>
        
        <div>{
        cylinderList?( 
            cylinderList.map((cylinder)=><CylinderCard key={cylinder._id}  cylinder={cylinder}/>
            )):(<div>no data found</div>)
            }
        </div>
        <button onClick={proceedClickHandler}>proceed order</button>
    </div>
  )
}

export default AddOrder ;