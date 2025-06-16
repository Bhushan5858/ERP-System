import {Toaster} from 'react-hot-toast';
import Home from "./Pages/Home.jsx"
import Login from "./Pages/Login.jsx"



function App() {
  

  return (
    <>
    <Toaster position='top-center' reverseOrder={false}/>
  {/* <Home/> */}
  <Login/>
</>
  )
}

export default App
