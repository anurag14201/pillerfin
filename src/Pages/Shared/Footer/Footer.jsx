import React from 'react';
import { NavLink } from 'react-router';
import { Sparkles } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-base-200 dark:bg-zinc-950 text-base-content dark:text-gray-300 p-10 lg:p-16 border-t border-gray-200/40 dark:border-white/10 relative overflow-hidden transition-colors duration-300">
            <aside className="relative z-10 space-y-3">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Aura.
                    </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed font-normal">
                    Delivering the world’s finest flagship devices with uncompromising design, security, and speed since 2001.
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 pt-2">
                    © {new Date().getFullYear()} Aura Inc. All rights reserved.
                </p>
            </aside>

            <nav className="relative z-10 space-y-2">
                <h6 className="footer-title text-gray-900 dark:text-white uppercase tracking-wider text-xs font-semibold">Flagships</h6>
                <NavLink to="/all-loans" className="link link-hover text-sm">Apple iPhone Series</NavLink>
                <NavLink to="/all-loans" className="link link-hover text-sm">MacBook Pro & Air</NavLink>
                <NavLink to="/all-loans" className="link link-hover text-sm">Samsung Galaxy Ultra</NavLink>
                <NavLink to="/all-loans" className="link link-hover text-sm">Google Pixel Pro</NavLink>
            </nav>

            <nav className="relative z-10 space-y-2">
                <h6 className="footer-title text-gray-900 dark:text-white uppercase tracking-wider text-xs font-semibold">Company</h6>
                <NavLink to="/about-us" className="link link-hover text-sm">About Aura</NavLink>
                <NavLink to="/contact" className="link link-hover text-sm">Contact Support</NavLink>
                <NavLink to="/dashboard" className="link link-hover text-sm">My Orders</NavLink>
                <NavLink to="/all-loans" className="link link-hover text-sm">Press & Media</NavLink>
            </nav>

            <nav className="relative z-10 space-y-2">
                <h6 className="footer-title text-gray-900 dark:text-white uppercase tracking-wider text-xs font-semibold">Legal & Privacy</h6>
                <a className="link link-hover text-sm">Terms of Service</a>
                <a className="link link-hover text-sm">Privacy Policy</a>
                <a className="link link-hover text-sm">Cookie Preferences</a>
                <a className="link link-hover text-sm">Warranty & Returns</a>
            </nav>
        </footer>
    );
};

export default Footer;