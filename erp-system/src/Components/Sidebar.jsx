import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useAuthUserStore } from '../Store/AuthUserStore.js';

// Lucide icons
import {
    LayoutDashboard,
    Clock,
    CalendarCheck,
    ClipboardList,
    Plane,
    FileText,
    Users
} from 'lucide-react';

const Sidebar = () => {
    const { authUser } = useAuthUserStore();
    const [activeItem, setActiveItem] = useState('Dashboard');

    // Menus by role
    const developerMenu = [
        { name: 'Dashboard', icon: <LayoutDashboard className="w-6 h-6" /> },
        { name: 'Clock', icon: <Clock className="w-6 h-6" /> },
        { name: 'Timesheet', icon: <ClipboardList className="w-6 h-6" /> },
        { name: 'Attendance', icon: <CalendarCheck className="w-6 h-6" /> },
        { name: 'My Leaves', icon: <Plane className="w-6 h-6" /> },
    ];

    const managerMenu = [
        { name: 'Dashboard', icon: <LayoutDashboard className="w-6 h-6" /> },
        { name: 'Team Timesheets', icon: <ClipboardList className="w-6 h-6" /> },
        { name: 'Leave Requests', icon: <FileText className="w-6 h-6" /> },
    ];

    const adminMenu = [
        { name: 'Dashboard', icon: <LayoutDashboard className="w-6 h-6" /> },
        { name: 'Team Management', icon: <Users className="w-6 h-6" /> },
        { name: 'Team Timesheets', icon: <ClipboardList className="w-6 h-6" /> },
        { name: 'Leave Requests', icon: <FileText className="w-6 h-6" /> },
    ];

    // Determine which menu to show
    let menuItems = developerMenu;
    let title = "Developer";

    const role =  authUser?.role || 'Developer';

    if (role === 'Manager') {
        menuItems = managerMenu;
        title = 'Manager';
    } else if (role === 'Admin') {
        menuItems = adminMenu;
        title = 'Admin';
    }

    return (
        <div className='bg-gray-800 h-[100%] w-[20%] flex flex-col rounded-lg'>
            {/* Sidebar header */}
            <div className='w-full h-[30%] flex flex-col mb-2 bg-black'>
                <DotLottieReact
                    src="https://lottie.host/68a16681-508e-4521-9c37-8bf3dd606407/leqgKsKzqE.lottie"
                    loop
                    autoplay
                    className='w-full h-full object-contain'
                />
                <p className='text-2xl font-bold text-white w-full text-center'>
                    {title} {authUser.name}
                </p>
            </div>

            {/* Sidebar Navigation */}
            <div className='h-full w-full flex flex-col items-center'>
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveItem(item.name)}
                        className={`
                            w-full flex items-center gap-4 pl-6 text-left text-2xl border-y py-3 cursor-pointer
                            transition-all duration-300 transform
                            ${activeItem === item.name
                                ? 'bg-gray-50 text-black scale-105 font-semibold'
                                : 'text-white hover:bg-gray-50 hover:text-black hover:scale-105'}
                        `}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
