import LOGO from '../assets/ERPLOGO.png';
import { LogOut, User } from "lucide-react";

const Header = () => {
    return (
        <div className="h-[100%] w-screen bg-gray-50 px-8 py-2 flex justify-between ">
            {/* Logo Section */}
            <div className="flex items-center">
                <img src={LOGO} alt="LOGO" className='w-28' />
            </div>

            {/* Right Side: Clock Button & User Icon */}
            <div className='flex items-center gap-6'>
                {/* Clocked In Button with hover */}
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-green-700 hover:scale-105">
                    Clocked In
                </button>

                {/* User Icon with hover */}
                <div className='transition duration-300 transform hover:scale-110 cursor-pointer'>
                    <User className='size-10 text-white bg-black rounded-full p-2' />
                </div>
            </div>
        </div>
    );
};

export default Header;
