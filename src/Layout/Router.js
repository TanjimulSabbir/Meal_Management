import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/Login/Login';

const Router=createBrowserRouter([
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"meal-count",
    element: 
  }
])

export default Router;