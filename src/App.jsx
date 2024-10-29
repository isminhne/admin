import {Toaster} from "sonner";
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Login from "./pages/Login/Login.jsx";
import Layout from "./pages/Layout/Layout.jsx";
import Register from "./pages/Register/Register.jsx";

const App = () => {

  return (
    <>
      <Toaster
        richColors={true}
        position={"top-right"}
        expand={true}
        closeButton={true}
      />
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/add" element={<Add/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/orders" element={<Orders/>}/>
        </Route>
        <Route path="/auth/login" element={<Login/>}/>
        <Route path="/auth/register" element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
