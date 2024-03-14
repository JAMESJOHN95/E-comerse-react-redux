import React from 'react'
import Header from '../Componants/Header'
import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removewishlistitem } from './REDUX/Slice/WishlistSlice'
import { addtocart } from './REDUX/Slice/CartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Wishlist() {
  const cart = useSelector(state => state.cartReducer)
  const dispatch = useDispatch()
  const wishlist = useSelector(state => state.wishlistreducer)

  // Add to cart
  const handlecart = (products) => {
    const existingproduct = cart?.find(item => item.id == products.id)
    if (existingproduct) {
      dispatch(addtocart(products))
      dispatch(removewishlistitem(products.id))
      toast.success("Products are added")
    }
    else {
      dispatch(addtocart(products))
      dispatch(removewishlistitem(products.id))
      toast.success("Products are added")

    }
  }


  return (
    <>
      <Header />

      <div style={{ marginTop: '90px ', textAlign: 'center' }} className='container'>

        {wishlist?.length > 0 ?
          <Row>
            {wishlist?.map(products => (<Col className='mb-5' sm={12} md={6} lg={3} >
              <Card className='p-2' style={{ width: '18rem', border: 'none', height: '250px' }}>
                <Card.Img variant="top" src={products?.thumbnail} />
                <Card.Body>
                  <Card.Title style={{ textAlign: 'center' }} >{products?.title}</Card.Title>
                  <div className='d-flex justify-content-between'>
                    <div style={{ textAlign: 'center' }}><Link onClick={() => { dispatch(removewishlistitem(products?.id)) }}><i class="fa-solid fa-trash text-danger"></i> </Link></div>
                    <div style={{ textAlign: 'center' }}><Link onClick={() => (handlecart(products))} >   <i class="fa-solid fa-cart-plus text-success"></i></Link></div>
                  </div>

                </Card.Body>
              </Card>
            </Col>))
            }
          </Row>
          :

          <div className='w-100 d-flex justify-content-center align-items-center  flex-column'>
            <img height={"300px"} src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png" alt="" />
            <h4 style={{ color: 'red', fontWeight: '600' }}>Wishlist is empty!!!!!!</h4>

          </div>}
      </div>

      <ToastContainer position='top-center' theme='colored' autoClose={1000} />

    </>
  )
}

export default Wishlist