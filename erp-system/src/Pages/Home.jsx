import Header from '../Components/Header.jsx';
import Sidebar from "../Components/Sidebar.jsx";


const Home =()=>{
return(<>

    <div className='h-screen w-screen'>

        <div className='h-[10%] w-screen bg-amber-200'>
            <Header/>
        </div>

        <div className='h-[90%] w-screen  bg-gray-50 mt-[0.2%]'>
            <Sidebar/>

        </div>

    </div>
</>)
}

export default Home;