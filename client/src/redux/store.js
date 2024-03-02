import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../redux/appSlice'

export default configureStore({
  reducer: {
    appSlice:appReducer
  }
})