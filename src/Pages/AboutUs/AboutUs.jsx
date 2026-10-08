// components/AboutUs.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, ShieldCheck, Zap } from 'lucide-react';

export default function AboutUs() {
    return (
        <section
            className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-black text-gray-900 dark:text-white transition-colors duration-300"
            id="about-us"
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
                        The Aura Story
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        About Us
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-normal">
                        We exist to make acquiring the world’s finest flagship devices effortless, inspiring, and transparent.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Story & Background */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 border border-gray-200/60 dark:border-white/10">
                            <Compass className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-2xl font-bold mb-4">
                                Our Origin
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                                Aura was born from a passion for minimalist design and uncompromising hardware performance. We noticed that buying cutting-edge tech online often felt cluttered, complicated, and lacking the elegance of the devices themselves — hours spent navigating confusing specs, unverified sellers, and clunky checkouts.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 font-normal">
                                That's why we built Aura: a focused, high-end platform that handles the operational friction so you can experience pure innovation — empowering creators, developers, and tech enthusiasts to upgrade without compromise.
                            </p>
                        </div>
                    </motion.div>

                    {/* Values / Pillars */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 gap-6"
                    >
                        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-900 dark:to-zinc-800 text-white rounded-3xl p-8 shadow-lg border border-white/10">
                            <Sparkles className="w-10 h-10 mb-4 text-primary" />
                            <h4 className="text-xl font-bold mb-2">Design-First</h4>
                            <p className="text-gray-300 text-sm leading-relaxed font-normal">
                                We measure our success by the beauty and seamlessness of the unboxing and shopping experience we deliver.
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-3xl p-8 shadow-lg">
                            <ShieldCheck className="w-10 h-10 mb-4 text-white" />
                            <h4 className="text-xl font-bold mb-2">100% Genuine Flagships</h4>
                            <p className="text-white/90 text-sm leading-relaxed font-normal">
                                Built with strict verification, factory-sealed guarantees, and direct global manufacturer warranties.
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 dark:from-zinc-800 dark:to-zinc-900 text-white rounded-3xl p-8 shadow-lg border border-white/10">
                            <Zap className="w-10 h-10 mb-4 text-amber-400" />
                            <h4 className="text-xl font-bold mb-2">Frictionless & Fast</h4>
                            <p className="text-gray-300 text-sm leading-relaxed font-normal">
                                Streamlined checkouts and priority insured shipping designed to get your tech into your hands instantly.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Closing Statement */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-12 max-w-5xl mx-auto border border-gray-200/60 dark:border-white/10"
                >
                    <h3 className="text-3xl font-bold mb-6 tracking-tight">
                        Join us at the cutting edge of technology
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-normal max-w-3xl mx-auto">
                        Every flawless device delivered means one more creator empowered to build, capture, and imagine without limits. Together, we are setting a new standard for modern digital retail.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}