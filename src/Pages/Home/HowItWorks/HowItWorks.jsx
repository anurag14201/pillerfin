import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { 
  UserCheck, 
  Smartphone, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Sparkles,
  Layers 
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Explore Flagship Devices',
    description: 'Browse our curated collection of the latest Apple, Samsung, Google, and Oppo flagship hardware.',
    icon: <Smartphone className="w-8 h-8" />,
  },
  {
    id: 2,
    title: 'Customize Your Specs',
    description: 'Select your preferred storage capacity, custom color finish, and official accessories.',
    icon: <Layers className="w-8 h-8" />,
  },
  {
    id: 3,
    title: 'Secure Account Sign-In',
    description: 'Log into your Aura profile for a seamless, encrypted, and personalized checkout experience.',
    icon: <UserCheck className="w-8 h-8" />,
  },
  {
    id: 4,
    title: 'Frictionless Payment',
    description: 'Complete your purchase securely with instant payment verification and transparent pricing.',
    icon: <CreditCard className="w-8 h-8" />,
  },
  {
    id: 5,
    title: 'Insured Express Delivery',
    description: 'Your factory-sealed flagship is safely packed and dispatched with priority global tracking.',
    icon: <Truck className="w-8 h-8" />,
  },
  {
    id: 6,
    title: 'Unbox & Experience',
    description: 'Unwrap your new device and enjoy the pinnacle of modern technology and design.',
    icon: <Sparkles className="w-8 h-8" />,
  },
];

export default function HowItWorks() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-black transition-colors duration-300" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">
            Seamless Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            How Aura Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal">
            A meticulously designed, end-to-end shopping experience — from selecting your flagship to doorstep delivery.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -8 }}
              className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-lg p-8 border border-gray-200/60 dark:border-white/10 hover:shadow-2xl transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                  {step.icon}
                </div>
                <span className="text-6xl font-extrabold text-gray-200 dark:text-zinc-800 absolute top-4 right-6 select-none opacity-50">
                  0{step.id}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base font-normal">
                {step.description}
              </p>

              {/* Subtle connector graphics for larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-10 transform -translate-y-1/2 pointer-events-none opacity-40">
                  <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
                    <path
                      d="M0 10H50M50 10L40 3M50 10L40 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/20">
            <ShieldCheck className="w-6 h-6" />
            <p className="text-base sm:text-lg font-medium">
              Guaranteed authentic flagships with priority insured delivery.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}