import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const reviews = [
	{
		id: 1,
		name: 'Sarah Mwangi',
		role: 'Small Business Owner, Nairobi',
		rating: 5,
		review:
			'LoanLink has completely transformed how I manage loans for my customers. Before, everything was on paper and Excel sheets — it was chaotic and error-prone. Now, applications come in digitally, verification is faster, and EMI reminders ensure timely repayments. My recovery rate has improved by over 30%! Highly recommended for any microfinance group.',
		avatar:
			'https://media.istockphoto.com/id/1412652081/photo/ethnic-small-business-owner-smiling-cheerfully-in-her-shop.jpg?s=612x612&w=0&k=20&c=ev3vJsM_dfjNRcv3HWVxuNFi5K7dtBXCtcXpVs7bXcA=',
	},
	{
		id: 2,
		name: 'Rajesh Patel',
		role: 'NGO Loan Coordinator, Gujarat',
		rating: 5,
		review:
			'As an NGO serving rural women entrepreneurs, we needed a simple yet powerful system. LoanLink is exactly that. The approval workflow is transparent, document uploads are secure, and the automated EMI schedule saves us hours every month. The support team is responsive and always ready to help. Thank you for building such an affordable and effective tool!',
		avatar:
			'https://globalwa.org/wp-content/uploads//2023/10/org-profile-sm-sehgal-1-690.jpg',
	},
	{
		id: 3,
		name: 'Amina Hassan',
		role: 'Microfinance Manager, Mombasa',
		rating: 5,
		review:
			"I was skeptical at first about moving to a web-based system, but LoanLink made the transition seamless. The dashboard gives me a clear overview of all active loans, pending reviews, and repayments. Disbursements are now direct to mobile money — no more cash handling risks. It's reliable, easy to use, and has made our operations much more professional.",
		avatar:
			'https://images.squarespace-cdn.com/content/v1/5aaac2c1d274cb7149773430/f4c25765-4cc8-4a2d-af5e-ef183143c708/Alethia+Mendez.jpg',
	},
	{
		id: 4,
		name: 'Fatima Omondi',
		role: 'Entrepreneur, Kisumu',
		rating: 5,
		review:
			'Thanks to LoanLink, I was able to expand my small retail shop quickly. The application process was straightforward, and funds arrived in my mobile wallet within days. The repayment schedule is flexible, and reminders keep me on track. This platform truly empowers women like me!',
		avatar:
			'https://thumbs.dreamstime.com/b/portrait-business-happy-black-woman-tablet-office-career-job-startup-kenya-face-professional-smile-315467514.jpg',
	},
	{
		id: 5,
		name: 'Priya Sharma',
		role: 'Rural Entrepreneur, Rajasthan',
		rating: 5,
		review:
			'LoanLink helped our self-help group manage loans efficiently. No more manual tracking or delays. The system is user-friendly even for those with basic phone skills. Our group has grown stronger, and we can focus more on business development.',
		avatar:
			'https://idronline.org/wp-content/uploads/2021/08/three-women-looking-at-a-smartphone-and-smiling_Mann-Deshi.jpg.webp',
	},
	{
		id: 6,
		name: 'Joseph Kamau',
		role: 'Field Officer, Nairobi',
		rating: 5,
		review:
			'As a field officer, I love how LoanLink reduces paperwork and speeds up approvals. Real-time updates mean I can assist borrowers instantly. The analytics help us identify issues early and improve recovery rates significantly.',
		avatar:
			'https://juhudikilimo.com/wp-content/uploads/2017/01/BK-560x364.jpg',
	},
	{
		id: 7,
		name: 'Grace Wanjiku',
		role: 'Community Leader, Nakuru',
		rating: 5,
		review:
			'Our community savings group switched to LoanLink last year, and it has been a game-changer. Transparent records build trust among members, and automated calculations eliminate errors. We now serve more families effectively.',
		avatar:
			'https://africa.unwomen.org/sites/default/files/Field%20Office%20Africa/Images/News/2021/03/Zonewo.jpg',
	},
	{
		id: 8,
		name: 'Anita Desai',
		role: 'Small Enterprise Owner, Mumbai',
		rating: 5,
		review:
			"LoanLink's digital platform made accessing credit so much easier for my tailoring business. Quick approvals, clear terms, and easy repayments — everything I needed to grow without stress. Thank you for supporting small businesses!",
		avatar:
			'https://web-assets.bcg.com/fa/95/f49467284b3f8e7caacee197a164/breaking-down-funding-barriers-for-asian-american-and-pacific-islander-entrepreneurs-rectangle.jpg',
	},
];

export default function CustomerFeedback() {
	return (
		<section
			className="py-20 bg-gradient-to-b from-white to-blue-50"
			id="testimonials"
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
						What Our Customers Say
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Real stories from microfinance organizations, NGOs, and
						entrepreneurs using LoanLink every day.
					</p>
				</motion.div>

				{/* Swiper Carousel */}
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					spaceBetween={30}
					slidesPerView={1}
					breakpoints={{
						640: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					navigation
					pagination={{ clickable: true }}
					autoplay={{ delay: 5000, disableOnInteraction: false }}
					loop={true}
					className="pb-12"
				>
					{reviews.map((review, index) => (
						<SwiperSlide key={review.id}>
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								whileHover={{ y: -10 }}
								className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden h-full flex flex-col"
							>
								<div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>

								{/* Avatar + Quote */}
								<div className="flex items-center gap-4 mb-6">
									<div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-blue-100">
										<img
											src={review.avatar}
											alt={review.name}
											className="w-full h-full object-cover"
										/>
									</div>
									<Quote className="w-10 h-10 text-blue-500 opacity-20" />
								</div>

								<p className="text-gray-700 leading-relaxed mb-6 italic flex-grow">
									"{review.review}"
								</p>

								<div className="flex items-center justify-between mt-auto">
									<div>
										<h4 className="font-semibold text-gray-900">
											{review.name}
										</h4>
										<p className="text-sm text-gray-500">{review.role}</p>
									</div>

									<div className="flex items-center gap-1">
										{[...Array(review.rating)].map((_, i) => (
											<Star
												key={i}
												className="w-5 h-5 fill-yellow-400 text-yellow-400"
											/>
										))}
									</div>
								</div>
							</motion.div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
