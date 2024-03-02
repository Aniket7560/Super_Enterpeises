import React, { useState } from 'react'
import { GrCheckboxSelected } from "react-icons/gr";
import { FaRegSquare } from "react-icons/fa";
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { addCartList, removeCartList } from '../redux/appSlice';

const CylinderCard = ({cylinder}) => {
  const [selected,setSelected] = useState(false) ;
  let cartList = useSelector(state=> state.appSlice.cartList) ;
  // console.log(cartList) ;
  const dispatch = useDispatch() ;
    function selectClick(){
      setSelected(!selected)
      if(!selected){
        console.log(cylinder) ;
        // let cylinderCopy = {
        //   _id:cylinder._id,
        //   cost:cylinder.cost,
        //   cylinderType:cylinder.cylinderType,
        //   count:1
        // }
        // cartList.push("hi");
        // console.log(cartList) ;
        dispatch(addCartList({...cylinder,count:1})) ;
        console.log("in add") ;
      }
      else{
        // cartList = cartList.filter((item)=>item._id!=cylinder._id) ;
        dispatch(removeCartList(cylinder._id)) ;
        console.log("in remove") ;
      }
    }
  return (
    <div className='CylinderCard'>
        <div onClick={selectClick}>{selected?(<GrCheckboxSelected />):(<FaRegSquare />)}</div>
        <div><p>name :</p>
        <p>{cylinder.name}</p>
        </div>
        <div><p>grade:</p>
        <p>{cylinder.cylinderType}</p>
        </div>
        <div><p>cost:</p>
        <p>{cylinder.cost}</p>
        </div>
    </div>
  )
}

export default CylinderCard