import React, { useEffect, useState } from 'react'
import Header from '../Componants/Header'
import { useDispatch, useSelector } from 'react-redux'
import { decquantity, incquantity, removecartitem,emptycart } from './REDUX/Slice/CartSlice'
import { Link } from 'react-router-dom'

function Cart() {
  const dispatch = useDispatch()
  const cartitem = useSelector(state => state.cartReducer)
  const [cartTotal, setcartTotal] = useState(0)
  useEffect(() => {
    if (cartitem?.length > 0) {
      setcartTotal(cartitem?.map(item => item.totalprice).reduce((t1, t2) => t1 + t2))

    }
    else {
      setcartTotal(0)
    }

  }, [cartitem])

  const handledecrementquantity = (products) => {
    if (products.quantity > 1) {
      dispatch(decquantity(products.id))
    }
    else {
      dispatch(removecartitem(products.id))
    }
  }

  return (
    <>
      <Header />

      {cartitem?.length > 0 ?
        <div className='mt-5'>
          <h1 className='ms-5'>Cart Summary</h1>
          <div className="row mt-5 ms-5">
            <div className="col-lg-8">
              <table className='table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>...</th>
                  </tr>
                </thead>



                {
                  cartitem?.map((products, index) => (
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{products.title}</td>
                        <td><img style={{ height: '70px', width: '70px' }} src={products.thumbnail} /></td>
                        <td>
                          <div>
                            <button onClick={() => handledecrementquantity(products)} style={{ height: '30px', width: '30px', border: 'none', borderRadius: '15px' }} className='me-2'>-</button>
                            <input value={products.quantity} style={{ width: '20px' }} type="text" readOnly className='Form-control' placeholder='0' />
                            <button onClick={() => dispatch(incquantity(products.id))} style={{ height: '30px', width: '30px', border: 'none', borderRadius: '15px' }} className='ms-2'>+</button>
                          </div>
                        </td>
                        <td>${products.totalprice}</td>
                        <td><i onClick={() => dispatch(removecartitem(products.id))} class="fa-solid fa-trash text-danger"></i></td>
                      </tr>

                    </tbody>
                  ))
                }


              </table>
              <div style={{ justifyContent: 'flex-end' }} className='d-flex '>
                <button onClick={()=>dispatch(emptycart())} style={{ width: '150px', border: 'none', borderRadius: '15px', color: 'white' }} className='me-5 p-2 bg-danger' >Empty Cart</button>
                <Link to = {'/'}><button style={{ width: '150px', border: 'none', borderRadius: '15px', color: 'white' }} className='me-5 p-2 bg-primary'> Shop More</button></Link>
              </div>
            </div>

            <div className="col-lg-4 p-4 ">
              <h4 className='mt-2'>Total Item : {cartitem?.length} </h4>
              <h3 className='mt-2'>Total Amount :$ {cartTotal}</h3>
              <button style={{ width: '150px', border: 'none', borderRadius: '15px', color: 'green' }} className='me-5 p-2 mt-2 bg-success'>Check Out</button>
            </div>
          </div>
        </div>
        :
        <div style={{ marginTop: '90px ', textAlign: 'center' }} className='container'>
          <div className='w-100 d-flex justify-content-center align-items-center  flex-column'>
            <img height={'300px'} src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png" alt="" />
            <h4 style={{ color: 'red', fontWeight: '600' }}>Your Cart is empty!!!!!!</h4>
          </div>
        </div>
      }
    </>
  )
}

export default Cart