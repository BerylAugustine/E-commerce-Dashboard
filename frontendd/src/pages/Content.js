import React from 'react'
import AppRoutes from '../Routes/Routes'
const Content = ({cartItems, setCartItems})=>{
  // const [cartItems, setCartItems] = useState([])
  console.log(cartItems)
  return (
    <div className='appcontent'>
      <AppRoutes cartItems={cartItems} setCartItems={setCartItems}></AppRoutes>
    </div>
  )
}

export default Content
