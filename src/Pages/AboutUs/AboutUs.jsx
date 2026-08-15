// components/AboutUs.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Lightbulb, Users, TrendingUp } from 'lucide-react';

export default function AboutUs() {
	return (
		<section
			className="py-20 bg-gradient-to-b from-blue-50 to-white"
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
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						About Us
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						We exist to make microloan management simple, efficient, and
						impactful.
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
						<div className="bg-white rounded-2xl shadow-lg p-8">
							<Lightbulb className="w-12 h-12 text-blue-600 mb-4" />
							<h3 className="text-2xl font-bold text-gray-900 mb-4">
								Our Story
							</h3>
							<p className="text-gray-700 leading-relaxed">
							Pillar Finance was born from firsthand experience working with small
								NGOs and microfinance groups in developing communities. We saw
								dedicated teams spending countless hours on paperwork, Excel
								tracking, and manual follow-ups — time that could be better
								spent supporting borrowers and growing impact.
							</p>
							<p className="text-gray-700 leading-relaxed mt-4">
								That's why we built LoanLink: a focused, affordable platform
								that handles the operational burden so you can focus on your
								mission — empowering entrepreneurs and lifting communities out
								of poverty.
							</p>
						</div>
					</motion.div>

					{/* Values */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="grid grid-cols-1 gap-8"
					>
						<div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg">
							<HeartHandshake className="w-12 h-12 mb-4" />
							<h4 className="text-xl font-bold mb-2">Impact-First</h4>
							<p>
								We measure success by the number of lives improved through
								better access to finance.
							</p>
						</div>
						<div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-8 shadow-lg">
							<Users className="w-12 h-12 mb-4" />
							<h4 className="text-xl font-bold mb-2">Community-Driven</h4>
							<p>
								Built with constant feedback from real microfinance operators
								and NGOs.
							</p>
						</div>
						<div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg">
							<TrendingUp className="w-12 h-12 mb-4" />
							<h4 className="text-xl font-bold mb-2">Simple & Sustainable</h4>
							<p>
								Affordable pricing and intuitive design that scales with your
								organization.
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
					className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-5xl mx-auto"
				>
					<h3 className="text-3xl font-bold text-gray-900 mb-6">
						Join us in making financial inclusion a reality
					</h3>
					<p className="text-xl text-gray-600 leading-relaxed">
						Every efficient loan process means one more entrepreneur can start
						or grow their business. Together, we’re building stronger, more
						resilient communities — one microloan at a time.
					</p>
				</motion.div>
			</div>
		</section>
	);
}
