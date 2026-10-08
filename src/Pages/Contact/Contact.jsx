// components/Contact.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe, Sparkles } from 'lucide-react';

export default function Contact() {
    return (
        <section
            className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-black text-gray-900 dark:text-white transition-colors duration-300"
            id="contact"
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">
                        Concierge Support
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        Get in Touch
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal">
                        Have questions about a flagship device or need assistance with your order? Our support team is here for you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 border border-gray-200/60 dark:border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-6">
                            Send Us a Message
                        </h3>
                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="device"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Inquiry Topic / Device
                                </label>
                                <input
                                    type="text"
                                    id="device"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. iPhone 18 Pro Order Inquiry"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="How can we assist you with your tech upgrade..."
                                ></textarea>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-primary text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition"
                            >
                                <Send className="w-5 h-5" />
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-6">
                                Contact Information
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Email</p>
                                        <a
                                            href="mailto:support@aurastore.app"
                                            className="text-primary hover:underline text-sm"
                                        >
                                            support@aurastore.app
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                                        <a
                                            href="tel:+18005550199"
                                            className="text-primary hover:underline text-sm"
                                        >
                                            +1 (800) 555-AURA
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Website</p>
                                        <a
                                            href="https://aurastore.app"
                                            className="text-primary hover:underline text-sm"
                                        >
                                            www.aurastore.app
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Headquarters</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            Aura Flagship Center, Silicon Valley, CA
                                            <br />
                                            (Global Priority Shipping Available)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6 border border-gray-200/60 dark:border-white/10 flex items-start gap-4">
                            <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <strong className="text-gray-900 dark:text-white block mb-1">Apple-Grade Response Time:</strong>
                                <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">
                                    Our concierge support team responds within 2 hours to assist with orders, device customization, and global tracking inquiries.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}