import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/Login';
import SignUp from './pages/SignUp'
import Netflix from './pages/Netflix'
import { Player } from './pages/Player';
import Movies from './pages/Movies';
import TVShow from './pages/TVShow';
const App = () => {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route exact path='/login'  element={<Login/>} />
      <Route exact path='/signup'  element={<SignUp/>} />
      <Route exact path='/player' element={<Player/>}/>
      <Route exact path='/movie' element={<Movies/>}/>
      <Route exact path="/tv" element={<TVShow />} />
      <Route exact path='/'  element={<Netflix/>} />
    </Routes>
    </BrowserRouter>
   
  )
}

export default App