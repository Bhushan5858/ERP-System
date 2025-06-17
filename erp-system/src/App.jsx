import {Toaster} from 'react-hot-toast';
import Home from "./Pages/Home.jsx"
import Login from "./Pages/Login.jsx"
import {BrowserRouter,Routes,Route} from 'react-router-dom';



function App() {
  

  return (
    <>
    <BrowserRouter>
    <Toaster position='top-center' reverseOrder={false}/>
       <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Login/>}/> 
       </Routes>
      
    </BrowserRouter>
</>
  )
}

export default App
