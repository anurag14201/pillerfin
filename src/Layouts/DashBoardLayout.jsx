import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { FaUserTie } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdDensitySmall, MdPendingActions, MdVerified, MdDashboard } from 'react-icons/md';
import { SiReacthookform } from 'react-icons/si';
import { VscUnverified } from 'react-icons/vsc';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../Hooks/useRole';
import { Sparkles, Menu } from 'lucide-react';

const DashBoardLayout = () => {
    const { role } = useRole();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col min-h-screen">
                    {/* Top Navbar */}
                    <nav className="navbar w-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border-b border-gray-200/40 dark:border-white/10 px-6 sticky top-0 z-40">
                        <label
                            htmlFor="my-drawer-4"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost lg:hidden text-gray-800 dark:text-white"
                        >
                            <Menu className="w-5 h-5" />
                        </label>
                        <Link 
                            to="/" 
                            className="px-4 text-xl font-bold tracking-tight text-primary flex items-center gap-2 hover:opacity-85 transition-opacity"
                        >
                            <Sparkles className="w-5 h-5" />
                            <span>Aura Dashboard</span>
                        </Link>
                    </nav>

                    {/* Main Page Content */}
                    <div className="flex-1 p-6 md:p-10">
                        <Outlet />
                    </div>
                </div>

                {/* Sidebar Drawer */}
                <div className="drawer-side z-50">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <div className="flex min-h-full flex-col items-start bg-white dark:bg-zinc-900 border-r border-gray-200/40 dark:border-white/10 w-64 p-6 shadow-xl lg:shadow-none">
                        
                        {/* Sidebar Brand Header */}
                        <div className="flex items-center gap-2 px-2 pb-8 pt-2">
                            <span className="p-2 bg-primary/10 text-primary rounded-xl">
                                <Sparkles className="w-5 h-5" />
                            </span>
                            <span className="text-lg font-bold tracking-tight">Aura Portal</span>
                        </div>

                        {/* Navigation Links */}
                        <ul className="menu w-full grow gap-2 p-0">
                            {/* Customer / Borrower Menu */}
                            {(role === 'Borrower' || role === 'Customer') && (
                                <>
                                    <li>
                                        <NavLink
                                            to="/dashboard/my-loans"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active bg-primary text-white font-semibold rounded-xl py-3 px-4 shadow-md'
                                                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl py-3 px-4 transition-colors font-medium'
                                            }
                                        >
                                            <CiMoneyCheck1 className="text-xl" />
                                            <span>My Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashBoard/profile"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active bg-primary text-white font-semibold rounded-xl py-3 px-4 shadow-md'
                                                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl py-3 px-4 transition-colors font-medium'
                                            }
                                        >
                                            <CgProfile className="text-xl" />
                                            <span>My Profile</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* Manager Menu */}
                            {role === 'Manager' && (
                                <>
                                    <li>
                                        <NavLink
                                            to="/dashboard"
                                            end
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active bg-primary text-white font-semibold rounded-xl py-3 px-4 shadow-md'
                                                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl py-3 px-4 transition-colors font-medium'
                                            }
                                        >
                                            <MdDashboard className="text-xl" />
                                            <span>Overview</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/add-loan"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active bg-primary text-white font-semibold rounded-xl py-3 px-4 shadow-md'
                                                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl py-3 px-4 transition-colors font-medium'
                                            }
                                        >
                                            <IoIosAddCircleOutline className="text-xl" />
                                            <span>Add Products</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/manage-loans"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active bg-primary text-white font-semibold rounded-xl py-3 px-4 shadow-md'
                                                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl py-3 px-4 transition-colors font-medium'
                                            }
                                        >
                                            <FaUserTie className="text-xl" />
                                            <span>Manage Products</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/pending-loans"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active bg-primary text-white font-semibold rounded-xl py-3 px-4 shadow-md'
                                                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl py-3 px-4 transition-colors font-medium'
                                            }
                                        >
                                            <MdPendingActions className="text-xl" />
                                            <span>Pending Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/approved-loans"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active bg-primary text-white font-semibold rounded-xl py-3 px-4 shadow-md'
                                                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl py-3 px-4 transition-colors font-medium'
                                            }
                                        >
                                            <MdVerified className="text-xl" />
                                            <span>Approved Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/manager-profile"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active bg-primary text-white font-semibold rounded-xl py-3 px-4 shadow-md'
                                                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl py-3 px-4 transition-colors font-medium'
                                            }
                                        >
                                            <CgProfile className="text-xl" />
                                            <span>My Profile</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* Admin Menu */}
                            {role === 'Admin' && (
                                <>
                                    <li>
                                        <NavLink
                                            to="/dashboard"
                                            end
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active bg-primary text-white font-semibold rounded-xl py-3 px-4 shadow-md'
                                                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl py-3 px-4 transition-colors font-medium'
                                            }
                                        >
                                            <MdDashboard className="text-xl" />
                                            <span>Overview</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/manage-users"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active bg-primary text-white font-semibold rounded-xl py-3 px-4 shadow-md'
                                                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl py-3 px-4 transition-colors font-medium'
                                            }
                                        >
                                            <VscUnverified className="text-xl" />
                                            <span>Manage Users</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/all-loans-admin"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active bg-primary text-white font-semibold rounded-xl py-3 px-4 shadow-md'
                                                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl py-3 px-4 transition-colors font-medium'
                                            }
                                        >
                                            <MdDensitySmall className="text-xl" />
                                            <span>All Products</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/loan-application-admin"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active bg-primary text-white font-semibold rounded-xl py-3 px-4 shadow-md'
                                                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl py-3 px-4 transition-colors font-medium'
                                            }
                                        >
                                            <SiReacthookform className="text-xl" />
                                            <span>All Orders</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;