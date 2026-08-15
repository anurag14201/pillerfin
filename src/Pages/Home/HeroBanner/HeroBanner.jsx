
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const heroSlides = [
	{
		id: 1,
		image: 'https://picsum.photos/id/1015/1920/1080',
		title: 'Your Perfect Loan Starts Here',
		subtitle:
			"Whether you're planning a new purchase, handling an emergency, or investing in your future — LoanLink makes it simple.",
	},
	{
		id: 2,
		image: 'https://picsum.photos/id/106/1920/1080',
		title: 'Fast Approval Loans',
		subtitle:
			'Get approved in minutes with transparent terms and no hidden fees.',
	},
	{
		id: 3,
		image: 'https://picsum.photos/id/201/1920/1080',
		title: 'Loans That Fit Your Life',
		subtitle:
			'Personal, home improvement, or business — find the perfect scheme for you.',
	},
];

const HeroBanner = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	// Auto slide every 5.5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % heroSlides.length);
		}, 5500);
		return () => clearInterval(interval);
	}, []);

	const goToSlide = index => setCurrentSlide(index);

	const current = heroSlides[currentSlide];

	return (
		<div className="relative h-[580px] sm:h-[650px] md:h-[720px] lg:h-[780px] overflow-hidden">
			{/* Background Image */}
			<div
				className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out"
				style={{ backgroundImage: `url(${current.image})` }}
			>
				{/* Enhanced Gradient Overlay for better mobile readability */}
				<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 md:via-black/40 md:to-black/60"></div>
			</div>

			{/* Main Content */}
			<div className="relative z-10 h-full flex items-center px-5 sm:px-8 md:px-12 lg:px-16">
				<div className="max-w-2xl w-full">
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow-lg mb-5 sm:mb-6">
						{current.title}
					</h1>

					<p className="text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed mb-8 sm:mb-10 max-w-lg">
						{current.subtitle}
					</p>

					{/* Buttons - Stacked on very small screens */}
					<div className="flex items-center">
						<Link
							to="/all-loans"
							className="btn btn-primary btn-lg text-base sm:text-lg font-semibold px-8 py-3.5 shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 w-full sm:w-auto"
						>
							Explore All Loans
						</Link>

						
					</div>
				</div>
			</div>

			{/* Carousel Indicators */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
				{heroSlides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white transition-all duration-300 ${
							currentSlide === index
								? 'bg-white scale-125'
								: 'bg-white/50 hover:bg-white/80'
						}`}
						aria-label={`Slide ${index + 1}`}
					/>
				))}
			</div>

			{/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
			<button
				onClick={() =>
					setCurrentSlide(
						prev => (prev - 1 + heroSlides.length) % heroSlides.length,
					)
				}
				className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full text-2xl transition-all z-20"
			>
				←
			</button>

			<button
				onClick={() => setCurrentSlide(prev => (prev + 1) % heroSlides.length)}
				className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full text-2xl transition-all z-20"
			>
				→
			</button>

			{/* Bottom subtle fade */}
			<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
		</div>
	);
};

export default HeroBanner;