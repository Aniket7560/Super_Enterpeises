import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'appslice',
  initialState: {
    islogin: true,
    clientList:[],
    cylinderList:[],
    orderList:[],
    cartList:[]
  },
  reducers: {
    toggleLogin: state => {
        console.log(state) ;
        state.islogin = state.islogin ;
    },
    setClientList: (state,action)=>{
          state.clientList = action.payload ;
          // console.log(state.clientList) ;
    },
    setOrderList: (state,action)=>{
          state.orderList = action.payload ;
    },
    setCylinderList: (state,action)=>{
          state.cylinderList = action.payload ;
    },
    addCartList: (state,action)=>{
      console.log(action.payload) ;
      state.cartList.push(action.payload) ;
      console.log("in addcartList",state.cartList) ;
    },
    removeCartList: (state,action)=>{
      state.cartList = state.cartList.filter((item)=>item._id!==action.payload) ;
      console.log("in removecartList",state.cartList) ;
    },
    updateCount:(state,action)=>{
          let indx = state.cartList.findIndex((item)=>item._id===action.payload._id) ;
          if(indx!== -1){
              console.log("count = ",action.payload.count) ;
              state.cartList[indx] = {...state.cartList[indx],
              count:action.payload.count };
              console.log(state.cartList) ;
          }
          
        },
    updateClientOrder:(state,action)=>{
      let indx = state.clientList.findIndex((item)=>item._id===action.payload._id) ;
      if(indx!== -1){
        console.log("payload ",action.payload) ;
       
        let pop_arr = state.clientList[indx][action.payload.pop_arr] ;
        let push_arr =  state.clientList[indx][action.payload.push_arr] ;
        let indx2  = pop_arr.findIndex((id)=> id===action.payload.orderId) ;
        
        if(indx2!==-1){
          pop_arr.splice(indx2,1) ;
          push_arr.push(action.payload.orderId) ;
          state.clientList[indx][action.payload.pop_arr] = pop_arr ;
          state.clientList[indx][action.payload.push_arr] = push_arr ;
          console.log(state.clientList) ;
          
        }else{
          console.log("order not found")
        }
    }
    }

  }
})

// Action creators are generated for each case reducer function
export const { toggleLogin,setClientList ,setOrderList,setCylinderList,addCartList,removeCartList,updateCount,updateClientOrder} = appSlice.actions
export default appSlice.reducer