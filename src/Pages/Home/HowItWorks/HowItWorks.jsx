import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { 
  UserPlus, 
  FileText, 
  FileSearch, 
  ThumbsUp, 
  DollarSign, 
  Calendar,
  Users 
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Borrower Registration',
    description: 'Borrowers create an account and submit a loan request with personal and business details.',
    icon: <UserPlus className="w-8 h-8" />,
  },
  {
    id: 2,
    title: 'Application Submission',
    description: 'Upload required documents like ID proof, income statements, and business plan.',
    icon: <FileText className="w-8 h-8" />,
  },
  {
    id: 3,
    title: 'Review & Verification',
    description: 'Loan officers review the application, verify documents, and assess eligibility.',
    icon: <FileSearch className="w-8 h-8" />,
  },
  {
    id: 4,
    title: 'Approval Decision',
    description: 'Based on credit check and risk assessment, the loan is approved or rejected with feedback.',
    icon: <ThumbsUp className="w-8 h-8" />,
  },
  {
    id: 5,
    title: 'Disbursement',
    description: 'Approved funds are transferred directly to the borrower\'s bank account.',
    icon: <DollarSign className="w-8 h-8" />,
  },
  {
    id: 6,
    title: 'EMI & Repayment Management',
    description: 'Automated EMI schedule generation and easy repayment tracking with reminders.',
    icon: <Calendar className="w-8 h-8" />,
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How Pillar Finance Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A streamlined, end-to-end process for microloan management — from application to repayment.
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
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-blue-100 rounded-full text-blue-600">
                  {step.icon}
                </div>
                <span className="text-5xl font-bold text-gray-200 absolute -top-4 -right-4 opacity-20">
                  {step.id}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Arrow connector for larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-12 transform -translate-y-1/2">
                  <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                    <path
                      d="M0 20 H60 L70 10 M70 30 L60 20"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
          <div className="flex items-center justify-center gap-4 text-blue-600">
            <Users className="w-10 h-10" />
            <p className="text-2xl font-medium">
              Empowering small organizations and borrowers with a simple, transparent process.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}