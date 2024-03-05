import { Navigate,Routes,Route } from 'react-router-dom'
import './App.css'
import Footer from './Componants/Footer'
import Header from './Componants/Header'
import Home from './Pages/Home'
import View from './Pages/View'
import Cart from './Pages/Cart'
import Wishlist from './Pages/Wishlist'



function App() {

  return (
    <>
    <Header/>
    <Routes>
<Route path =  '/' element = {<Home/>}/> 
<Route path =  '/Wishlist' element = {<Wishlist/>}/> 
<Route path =  '/View/:id' element = {<View/>}/> 
<Route path =  '/Cart' element = {<Cart/>}/> 
<Route path='/*' element = {<Navigate to= {'/'}/>}/> // if a user enters a invalid url we need to redirect the page to home ... this path should be given lanst

    </Routes>
    <Footer/>
    </>
  )
}

export default App
