import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Users, 
  Target 
} from 'lucide-react';

export default function AboutLoanLink() {
	return (
		<section className="py-20 bg-white" id="about">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Left Column - Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							About Pillar Finance
						</h2>
						<p className="text-xl text-gray-600 mb-8 leading-relaxed">
						Pillar Finance is a purpose-built web platform designed to empower small
							financial organizations, NGOs, and microloan providers with a
							modern, efficient, and affordable loan management system.
						</p>
						<p className="text-lg text-gray-600 mb-10 leading-relaxed">
							We understand the unique challenges faced by community lenders:
							manual processes, scattered paperwork, delayed approvals, and
							difficulty tracking repayments. LoanLink eliminates these pain
							points by bringing everything into one secure, easy-to-use digital
							platform — without the complexity or high costs of enterprise
							software.
						</p>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div className="flex items-start gap-4">
								<HeartHandshake className="w-10 h-10 text-blue-600 flex-shrink-0" />
								<div>
									<h4 className="font-semibold text-gray-900">
										Built for Impact
									</h4>
									<p className="text-gray-600 text-sm">
										Supporting financial inclusion for underserved communities.
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<ShieldCheck className="w-10 h-10 text-blue-600 flex-shrink-0" />
								<div>
									<h4 className="font-semibold text-gray-900">
										Secure & Reliable
									</h4>
									<p className="text-gray-600 text-sm">
										Bank-grade security with data privacy at the core.
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<Zap className="w-10 h-10 text-blue-600 flex-shrink-0" />
								<div>
									<h4 className="font-semibold text-gray-900">Fast & Simple</h4>
									<p className="text-gray-600 text-sm">
										Intuitive design that your team can start using in days.
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<Globe className="w-10 h-10 text-blue-600 flex-shrink-0" />
								<div>
									<h4 className="font-semibold text-gray-900">
										Accessible Anywhere
									</h4>
									<p className="text-gray-600 text-sm">
										Cloud-based, works on any device with internet.
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
						<div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-lg">
							<div className="flex items-center gap-4 mb-4">
								<Target className="w-12 h-12 text-blue-600" />
								<h3 className="text-2xl font-bold text-gray-900">
									Our Mission
								</h3>
							</div>
							<p className="text-gray-700 leading-relaxed">
								To democratize access to efficient microloan management tools,
								enabling small lenders and NGOs to focus on what matters most —
								transforming lives through financial inclusion.
							</p>
						</div>

						<div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 shadow-lg">
							<div className="flex items-center gap-4 mb-4">
								<Users className="w-12 h-12 text-purple-600" />
								<h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
							</div>
							<p className="text-gray-700 leading-relaxed">
								A world where every community lender has the digital tools they
								need to operate professionally, transparently, and at scale —
								helping millions lift themselves out of poverty.
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}