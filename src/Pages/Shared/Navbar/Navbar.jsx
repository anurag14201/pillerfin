import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import { Sparkles } from 'lucide-react';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isDark, setIsDark] = useState(
        localStorage.getItem('theme') === 'dark' || 
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    useEffect(() => {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const handleToggle = (e) => {
        setIsDark(e.target.checked);
    };

    const handleLogOut = () => {
        logOut()
            .then(() => {})
            .catch((error) => {
                console.error('Logout error:', error);
            });
    };

    const publicLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-primary font-bold'
                            : 'text-gray-800 dark:text-gray-200 hover:text-primary transition-colors text-sm font-medium'
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/all-loans"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-primary font-bold'
                            : 'text-gray-800 dark:text-gray-200 hover:text-primary transition-colors text-sm font-medium'
                    }
                >
                    All Products
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/about-us"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-primary font-bold'
                            : 'text-gray-800 dark:text-gray-200 hover:text-primary transition-colors text-sm font-medium'
                    }
                >
                    About Us
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-primary font-bold'
                            : 'text-gray-800 dark:text-gray-200 hover:text-primary transition-colors text-sm font-medium'
                    }
                >
                    Contact
                </NavLink>
            </li>
        </>
    );

    return (
        <header className="fixed top-4 left-0 w-full z-50 flex justify-center px-4">
            <nav className="navbar max-w-6xl w-full bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/30 dark:border-white/10 px-6 transition-all duration-300">
                {/* Mobile Menu Dropdown */}
                <div className="dropdown lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost btn-circle text-gray-800 dark:text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content mt-3 p-4 shadow-2xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-white backdrop-blur-lg rounded-2xl w-56 z-10 border border-gray-200/60 dark:border-white/10"
                    >
                        {publicLinks}
                        <div className="divider my-2 border-gray-200 dark:border-white/10"></div>
                        {user ? (
                            <>
                                <li>
                                    <NavLink to="/dashboard" className="font-medium">
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <button
                                        onClick={handleLogOut}
                                        className="btn btn-error btn-sm text-white w-full"
                                    >
                                        Log Out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <div className="flex flex-col gap-2 mt-2">
                                <NavLink to="/login" className="btn btn-sm btn-ghost w-full">
                                    Log In
                                </NavLink>
                                <NavLink to="/register" className="btn btn-sm btn-primary w-full text-white">
                                    Register
                                </NavLink>
                            </div>
                        )}
                    </ul>
                </div>

                {/* Brand Logo */}
                <div className="navbar-start">
                    <NavLink
                        to="/"
                        className="text-xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity flex items-center gap-1.5"
                    >
                        <Sparkles className="w-5 h-5" />
                        <span>Aura</span>
                    </NavLink>
                </div>

                {/* Desktop Nav Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-6 items-center">
                        {publicLinks}
                        {user && (
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-primary font-bold'
                                            : 'text-gray-800 dark:text-gray-200 hover:text-primary transition-colors text-sm font-medium'
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end flex items-center gap-3">
                    {/* Theme Controller Toggle */}
                    <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm text-gray-800 dark:text-white">
                        <input
                            type="checkbox"
                            checked={isDark}
                            onChange={handleToggle}
                        />
                        {/* sun icon */}
                        <svg
                            className="swap-on fill-current w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41a1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        {/* moon icon */}
                        <svg
                            className="swap-off fill-current w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>

                    {/* Desktop Auth Section */}
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar cursor-pointer">
                                <div className="w-9 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                                    <img
                                        alt={user.displayName || 'User'}
                                        src={user.photoURL || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                                    />
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu p-4 shadow-2xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-white backdrop-blur-lg rounded-2xl w-64 z-10 border border-gray-200/60 dark:border-white/10 mt-2"
                            >
                                <li className="font-semibold text-base px-2 py-1">
                                    {user.displayName || 'User'}
                                </li>
                                <li className="text-xs text-gray-500 dark:text-gray-400 px-2 truncate pb-2">
                                    {user.email}
                                </li>
                                <div className="divider my-1 border-gray-200 dark:border-white/10"></div>
                                <li className="mt-1">
                                    <button
                                        onClick={handleLogOut}
                                        className="btn btn-sm btn-error text-white w-full font-medium"
                                    >
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="hidden lg:flex items-center gap-2">
                            <NavLink to="/login" className="btn btn-sm btn-ghost text-gray-800 dark:text-gray-200">
                                Log In
                            </NavLink>
                            <NavLink to="/register" className="btn btn-sm btn-primary rounded-full px-4 text-white">
                                Register
                            </NavLink>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;