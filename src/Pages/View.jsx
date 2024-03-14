import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistItem } from './REDUX/Slice/WishlistSlice'
import Header from '../Componants/Header'
import { addtocart } from './REDUX/Slice/CartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function View() {
  const cart = useSelector(state => state.cartReducer)
const wishlist = useSelector(state=>state.wishlistreducer)
console.log(wishlist);
const dispatch = useDispatch()

const [products,setproducts]=useState({})
const {id}=useParams()
useEffect(()=>{
  if(sessionStorage.getItem("allproducts")){
    const allproducts = JSON.parse(sessionStorage.getItem("allproducts"))
    setproducts(allproducts.find(item=>item.id==id))
  }
},[])
// console.log(products);

// condition to check weather item is in the wishlist if present dont add

const handlewishlist = (products)=>{
  console.log(products);
  if(wishlist?.includes(products)){
    toast.info("The item is in your wishlist")
  }
  else{
    dispatch(addWishlistItem(products))
  }

}

// Add products to cart
const handlecart = (products)=>{
  const existingproduct = cart?.find(item=>item.id==products.id)
  if(existingproduct){
    dispatch(addtocart(products))
    toast.success("Products are added")
  }
  else{
    dispatch(addtocart(products))
    toast.success("Product are added")

  }
}

  return (
    <>
      <Header/>
      <div className='container'>
        <div style={{ marginTop: '100px' }} className='row'>
          <div className="col-lg-5 p-2 ">
            <img style={{ height: '250px', width: '250px',marginLeft:'100px' }} variant="top" src={products?.thumbnail} />
          </div>
          <div className="col-lg-7 p-2 ">
            <h5>PID :{products?.id}</h5>
            <h4>{products?.title}</h4>
            <h3>$ {products?.price}</h3>
            <h5>{products?.description}</h5>
            <div className='mt-4 '>
              <button onClick={()=>{handlewishlist(products)}} style={{width:'150px',border:'none',borderRadius:'15px',color:'green'}} className='ms-5 me-5 p-2'><i className="fa-solid fa-heart me-1"></i>Add to Wishlist</button>
              <button onClick={()=>{handlecart(products)}} style={{width:'150px',border:'none',borderRadius:'15px',color:'green'}} className='ms-5 p-2'><i className="fa-solid fa-cart-plus me-1"></i>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>

  )
}

export default View