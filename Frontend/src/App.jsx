import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AddJobApplication from './pages/AddJobApplication'
import EditJobApplication from './pages/EditJobApplication'

const App = () => {
  return (
   <Routes>
       <Route path="/" element={<Navbar />} >
           <Route index element={<Home />} />
           <Route path="add" element={<AddJobApplication />} />
           <Route path="/edit/:id" element={<EditJobApplication />} />
       </Route>
       <Route path="/login" element={<Signin />} />
       <Route path="/register" element={<Signup />} />

   </Routes>
  )
}

export default App
