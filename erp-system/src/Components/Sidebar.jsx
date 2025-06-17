
import {useAuthUserStore } from '../Store/AuthUserStore.js';

const Sidebar =()=>{
    const {authUser} = useAuthUserStore();

    console.log(authUser)
    return(<>
 <div className='bg-gray-800 h-screen w-[20%] flex flex-col'>
        <div className='profile'>
            
           <div className='flex justify-center border-'>
            <img src='https://images.pexels.com/photos/1575983/pexels-photo-1575983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='profile'/>
           </div>
           <div className='flex justify-center'>
            <h1>Admin</h1>
           </div>
           <div className='flex justify-center'>
            <p>admin@example.com</p>
           </div>
        </div>

 </div>
    </>)
}

export default Sidebar;