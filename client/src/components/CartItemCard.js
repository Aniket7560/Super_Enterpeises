import React from 'react'
import { useDispatch } from 'react-redux';
import { updateCount } from '../redux/appSlice';
const CartItemCard = ({cylinder,key}) => {
  console.log(cylinder) ;
  console.log(key) ;
    const dispatch =useDispatch() ;
    function incrementHandler(event){
        dispatch(updateCount({_id:cylinder._id,count:cylinder.count+1}));
      }
      function decrementHandler(event){
        if(cylinder.count>1){
        dispatch(updateCount({_id:cylinder._id,count:cylinder.count-1}));
        }
      }
  return ( <div className='CylinderCard'>
  <div><p>name :</p>
  <p>{cylinder.name}</p>
  </div>
  <div><p>grade:</p>
  <p>{cylinder.cylinderType}</p>
  </div>
  <div><p>cost:</p>
  <p>{cylinder.cost}</p>
  </div>
  <button onClick={decrementHandler}> - </button>
  <div>{cylinder.count}</div>
  <button onClick={incrementHandler}> + </button>
  <div><p>Ammount:</p>
  <p>{Number(cylinder.cost)*cylinder.count}</p>
  </div>
</div>
  )
}

export default CartItemCard