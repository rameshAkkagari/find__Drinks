import React from 'react'
import Drink from './Drink'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import EachDrink from './EachDrink';

const router = createBrowserRouter([
  {path:"/",element:<Drink/>},
  {path:"/:ID",element:<EachDrink/>}
])
function App() {
  return (
    <RouterProvider router={router}>
      
    </RouterProvider>
  )
}

export default App