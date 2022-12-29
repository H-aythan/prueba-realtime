import { useState } from 'react'
import Form from './page/Form'
import {BrowserRouter as Router,Route,Routes}from 'react-router-dom'
import AdminsPage from './page/AdminsPage'
function App() {
 
  return (<>
  <div className="flex justify-center bg-slate-800 h-screen px-5">
    <Router>
      <Routes>
        <Route path='/' element={<Form/>}/>
        <Route path='/admin' element={<AdminsPage/>}/>
      </Routes>
    </Router>
     
    </div>
    </>
  )
}

export default App
