import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Cpu, 
  Compass 
} from 'lucide-react';

export default function AboutAura() {
    return (
        <section className="py-24 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300" id="about">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">
                            The Aura Philosophy
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            About Aura
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-normal">
                            Aura is a meticulously engineered e-commerce platform designed to bring the world’s most advanced flagship devices directly into your hands with effortless elegance.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-normal">
                            We believe that purchasing high-end technology should match the precision and beauty of the devices themselves. Aura eliminates the friction of traditional electronics retail by offering a streamlined, immersive shopping experience built around genuine flagship hardware, transparent pricing, and lightning-fast delivery.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <Sparkles className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        Pristine Flagships
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        Curated selection of the finest Apple, Samsung, and Google hardware.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        Secure & Verified
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        100% factory sealed and authentic devices with global warranties.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Zap className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Frictionless Checkout</h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        Lightning-fast transactions designed for speed and convenience.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Globe className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        Global Delivery
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        Insured priority shipping straight to your doorstep.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Mission & Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 rounded-3xl p-8 border border-gray-200/60 dark:border-white/10 shadow-lg">
                            <div className="flex items-center gap-4 mb-4">
                                <Cpu className="w-10 h-10 text-primary" />
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Our Mission
                                  </h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                                To redefine digital retail by combining minimalist interface design with high-performance flagship technology, empowering creators and tech enthusiasts to experience the absolute peak of innovation.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 rounded-3xl p-8 border border-gray-200/60 dark:border-white/10 shadow-lg">
                            <div className="flex items-center gap-4 mb-4">
                                <Compass className="w-10 h-10 text-primary" />
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                                A world where acquiring cutting-edge personal technology is as intuitive, inspiring, and seamless as using the devices themselves.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}