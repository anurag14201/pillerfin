// components/Contact.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';

export default function Contact() {
	return (
		<section
			className="py-20 bg-gradient-to-b from-gray-50 to-white"
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
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Get in Touch
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Ready to streamline your microloan operations? We're here to help
						you get started.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="bg-white rounded-2xl shadow-xl p-8"
					>
						<h3 className="text-2xl font-semibold text-gray-900 mb-6">
							Send Us a Message
						</h3>
						<form className="space-y-6">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Full Name
								</label>
								<input
									type="text"
									id="name"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Your name"
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Email Address
								</label>
								<input
									type="email"
									id="email"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="your@email.com"
								/>
							</div>
							<div>
								<label
									htmlFor="organization"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Organization / NGO Name
								</label>
								<input
									type="text"
									id="organization"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Your organization"
								/>
							</div>
							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Message
								</label>
								<textarea
									id="message"
									rows="5"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Tell us about your needs..."
								></textarea>
							</div>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								type="submit"
								className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
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
							<h3 className="text-2xl font-semibold text-gray-900 mb-6">
								Contact Information
							</h3>
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-blue-100 rounded-full">
										<Mail className="w-6 h-6 text-blue-600" />
									</div>
									<div>
										<p className="font-medium text-gray-900">Email</p>
										<a
											href="mailto:hello@loanlink.app"
											className="text-blue-600 hover:underline"
										>
											hello@loanlink.app
										</a>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="p-3 bg-blue-100 rounded-full">
										<Phone className="w-6 h-6 text-blue-600" />
									</div>
									<div>
										<p className="font-medium text-gray-900">Phone</p>
										<a
											href="tel:+1234567890"
											className="text-blue-600 hover:underline"
										>
											+1 (234) 567-890
										</a>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="p-3 bg-blue-100 rounded-full">
										<Globe className="w-6 h-6 text-blue-600" />
									</div>
									<div>
										<p className="font-medium text-gray-900">Website</p>
										<a
											href="https://loanlink.app"
											className="text-blue-600 hover:underline"
										>
											www.loanlink.app
										</a>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="p-3 bg-blue-100 rounded-full">
										<MapPin className="w-6 h-6 text-blue-600" />
									</div>
									<div>
										<p className="font-medium text-gray-900">Location</p>
										<p className="text-gray-600">
											Serving microfinance organizations worldwide
											<br />
											(Remote-first team)
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-blue-50 rounded-2xl p-6">
							<p className="text-gray-700">
								<strong>Typical response time:</strong> Within 24 hours
								<br />
								We’re happy to schedule a demo or answer any questions about
								LoanLink.
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
