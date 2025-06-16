import LOGO from '../assets/ERPLOGO.png';
import { LogOut } from "lucide-react";

const Header=()=>{

    return(<>
    <div className="h-[5%] w-screen bg-gray-50 px-8 py-2 flex">
        <div className="LOGO ">
            <img src={LOGO} alt="LOGO" className=' w-[10%]'/>
        </div>

        <button className="btn btn-success">Clocked In</button>
    </div>
    </>)
}

export default Header;