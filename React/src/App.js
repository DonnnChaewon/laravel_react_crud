import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Home'
import Edit from './Edit'
import View from './View'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/view/:id' element={<View />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App