import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// We use Route in order to define the different routes of our application
import { Route, Routes, useLocation} from "react-router-dom"
import { AnimatePresence } from "framer-motion"
// We import all the components we need in our app

import Login from './components/Login/Login';

import useToken from './components/App/useToken';

import Navbar from './components/pages/layout/Navbar';
import Dashboard from "./components/pages/Dashboard";

import About from './components/pages/about'
import Help from './components/pages/help'
import SalesOrder from './components/pages/sales_order/index'
import NewSalesOrder from './components/pages/sales_order/new'
import Lookup from "./components/pages/sales_order/lookup"
import EditItem from './components/pages/sales_order/edit'
import Checkout from "./components/pages/sales_order/checkout"
import DetailSales from './components/pages/sales_order/detail'
import List from "./components/pages/products/list"
import Detail from './components/pages/products/detail'
import Edit from './components/pages/products/edit'
import Add from './components/pages/products/add'

//Category
import ShowItems from "./components/pages/categories/Showitems";
import ViewCategory from "./components/pages/categories/ViewCategory"

//guestbook
import NewGuestbook from "./components/pages/guestbook/NewGuestbook";

import Register from "./components/Register/Register"
 
const App = () => {
  const location = useLocation()
  const { token, setToken } = useToken();

  
  if(!token){
    return(
      <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
              <Route path="/" element={<Login setToken={setToken} />} />
              <Route path="/register" element={<Register />} />
          </Routes>
      </AnimatePresence>
    )
  }else{
    return (
      <div>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
              <Route path="/guestbook/new" element={<NewGuestbook/>}/>
              
              <Route path="/sales_order" element={<SalesOrder/>}/>
              <Route path="/sales_order/new" element={<NewSalesOrder/>} />
              <Route path="/sales_order/new/lookup" element={<Lookup />} />
              <Route path="/sales_order/new/checkout" element={<Checkout/>} /> 
              <Route path="/sales_order/new/:id/edit" element={<EditItem/>} />
              <Route path="/sales_order/detail" element={<DetailSales/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/help" element={<Help/>} />
              <Route path="/products" element={<List/>} />
              <Route path="/" element={<Dashboard/>} />
              <Route path="/list/detail/:id" element={<Detail/>}/>
              <Route path="/list/detail/:id/edit" element={<Edit/>} />
              <Route path="/list/add" element={<Add/>} />
    
              <Route path="/category" element={<ShowItems/>} />
              <Route path="/category/:id/view" element={<ViewCategory/>} />
              
          </Routes>
          </AnimatePresence>
        </div>
    ) 
  }
}
 
export default App;