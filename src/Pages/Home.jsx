import React, { useEffect, useState } from 'react'
import Header from '../Componants/Header'
import { Row, Col } from 'react-bootstrap'
import { Card, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FetchProducts } from './REDUX/Slice/ProductSlice'

function Home() {

  const dispatch = useDispatch()
  const { allProducts, error, loading } = useSelector(state => state.productreducer)
  console.log(allProducts, error, loading);

  const [currentpage, setcurrentpage] = useState(1)
  const productperpage = 8
  const totalpages = Math.ceil(allProducts?.length / productperpage)
  const lastproductindex = productperpage * currentpage
  const firstproductindex = lastproductindex - productperpage
  const visiblecards = allProducts.slice(firstproductindex,lastproductindex)

  useEffect(() => {
    dispatch(FetchProducts())
  }, [])

  const navigatetonext = () => {
    if (currentpage != totalpages) {
      setcurrentpage(currentpage + 1)
    }
  }

  const navigateToPrev = () => {
    if (currentpage != 1) {
      setcurrentpage(currentpage - 1)
    }
  }

  return (

    <>
      <Header insideHome />
      <div className='container' style={{ marginTop: '100px' }}>
        {loading ? <div className='text-center text-success fw-1'> <Spinner animation="border" variant="success" /> Loading.....</div> :
          <Row>
            {
              allProducts?.length > 0 ?
                visiblecards?.map(products => (<Col className='mb-5' sm={12} md={6} lg={3} >
                  <Card className='p-2' style={{ width: '18rem', border: 'none' }}>
                    <Card.Img style={{ height: '200px' }} variant="top" src={products?.thumbnail} />
                    <Card.Body>
                      <Card.Title style={{ textAlign: 'center' }} >{products?.title.slice(0, 15)}....</Card.Title>
                      <div style={{ textAlign: 'center' }}><Link to={`/View/${products?.id}`}>View More ...</Link></div>
                    </Card.Body>
                  </Card>
                </Col>)) : <div>Nothing to sisplay</div>
            }

          </Row>}

          <div className='d-flex justify-content-center align-item-center mt-4 mb-4'>
            <span onClick={navigateToPrev} style={{cursor:'pointer', color:'green'}}> <i class="fa-solid fa-backward me-4"></i></span>
            <span style={{color:'green'}}>{currentpage} of {totalpages}</span>
            <span onClick={navigatetonext} style={{cursor:'pointer', color:'green'}}> <i class="fa-solid fa-forward ms-4"></i></span>

          </div>

      </div>
    </>
  )
}

export default Home