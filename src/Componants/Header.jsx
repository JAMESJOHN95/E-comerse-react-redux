import React from 'react'
import { Navbar, Button, Container, Form, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'



function Header() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary d-flex  justify-content-around">
        <Container fluid>
          <div>
            <Navbar.Brand href="#"><i class="fa-solid fa-cart-shopping"></i> E-CART</Navbar.Brand>

          </div>          <div>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >

              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>

          </div>
          <div className='d-flex'>
            <Link to = {'/'} className='me-3'>Home</Link>
            <Link to = {'/Wishlist'} className='me-3'>Wishlist</Link>
            <Link to  = {'/Cart'} className='me-3'> Cart </Link>
          </div>
        </Container>
      </Navbar></>
  )
}

export default Header