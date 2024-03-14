import React from 'react'
import { Navbar,  Container, Form, Nav,Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchproducts } from '../Pages/REDUX/Slice/ProductSlice'



function Header({insideHome}) {
  const dispatch = useDispatch()
  const wishlistCount = useSelector(state=>state.wishlistreducer).length
  const cartcount = useSelector(state=>state.cartReducer).length
  return (
    <>
      <Navbar style={{zIndex:'10'}} expand="lg" className="bg-body-tertiary d-flex position-fixed top-0 w-100 justify-content-around">
        <Container fluid>
          <div>
            <Navbar.Brand href="#"><i class="fa-solid fa-truck"></i> E-CART</Navbar.Brand>

          </div>          <div>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >

              </Nav>
              <div className="d-flex">
                { insideHome && <input className="form-control" onChange={(e)=>dispatch(searchproducts(e.target.value.toLowerCase()))}
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />}
              </div>
            </Navbar.Collapse>

          </div>
          <div className='d-flex'>
            <Link to = {'/'} style={{textDecoration:'none'}} className='me-3'>Home</Link>
            <Link to = {'/Wishlist'} style={{textDecoration:'none'}} className='me-3'><i className="fa-solid fa-heart me-1"></i>Wishlist<Badge className='ms-1' bg="success">{wishlistCount}</Badge></Link>
            <Link to  = {'/Cart'} style={{textDecoration:'none'}} className='me-3'><i className="fa-solid fa-cart-plus me-1"></i> Cart <Badge className='ms-1' bg="success">{cartcount}</Badge> </Link>
          </div>
        </Container>
      </Navbar></>
  )
}

export default Header