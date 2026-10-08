import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ShieldCheck, Truck, Sparkles } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const reviews = [
    {
        id: 1,
        name: 'Alex Rivera',
        role: 'Tech Reviewer & Creator, New York',
        rating: 5,
        review:
            'Unboxing the iPhone Pro from Aura was an absolute dream. The packaging is pristine, shipping was lightning fast, and the device condition is flawless. It is rare to find an online store that matches Apple’s level of premium presentation and customer care.',
        avatar:
            'https://media.istockphoto.com/id/1412652081/photo/ethnic-small-business-owner-smiling-cheerfully-in-her-shop.jpg?s=612x612&w=0&k=20&c=ev3vJsM_dfjNRcv3HWVxuNFi5K7dtBXCtcXpVs7bXcA=',
    },
    {
        id: 2,
        name: 'Marcus Chen',
        role: 'Software Engineer, San Francisco',
        rating: 5,
        review:
            'Bought the latest MacBook Pro here. The checkout was seamless, and tracking updates kept me informed every step of the way. Aura has become my go-to destination for high-end flagship gear without the hassle of traditional retail lines.',
        avatar:
            'https://globalwa.org/wp-content/uploads//2023/10/org-profile-sm-sehgal-1-690.jpg',
    },
    {
        id: 3,
        name: 'Elena Rostova',
        role: 'Digital Designer, London',
        rating: 5,
        review:
            'The website design itself inspired me, and ordering my Samsung Ultra felt effortless. When the package arrived, everything was securely sealed with genuine factory wrappers. Exceptional service from start to finish!',
        avatar:
            'https://images.squarespace-cdn.com/content/v1/5aaac2c1d274cb7149773430/f4c25765-4cc8-4a2d-af5e-ef183143c708/Alethia+Mendez.jpg',
    },
    {
        id: 4,
        name: 'Liam Vance',
        role: 'Photographer, Sydney',
        rating: 5,
        review:
            'Finding authentic flagship gear online can sometimes be stressful, but Aura completely nailed the experience. Fast secure shipping, pristine devices, and a gorgeous minimalist shopping interface. 10/10 recommendation!',
        avatar:
            'https://thumbs.dreamstime.com/b/portrait-business-happy-black-woman-tablet-office-career-job-startup-kenya-face-professional-smile-315467514.jpg',
    },
    {
        id: 5,
        name: 'Sophia Sterling',
        role: 'Creative Director, Tokyo',
        rating: 5,
        review:
            'The clean layout, stunning product displays, and hassle-free checkout make Aura feel just like shopping at an official Apple flagship store. My Google Pixel arrived overnight in pristine condition.',
        avatar:
            'https://idronline.org/wp-content/uploads/2021/08/three-women-looking-at-a-smartphone-and-smiling_Mann-Deshi.jpg.webp',
    },
];

export default function CustomerFeedback() {
    return (
        <section
            className="py-24 bg-base-200/50 dark:bg-black relative overflow-hidden"
            id="testimonials"
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">
                        Loved by Tech Enthusiasts
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                        What Our Customers Say
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal">
                        Discover why creators, developers, and flagship collectors choose Aura for their premium tech upgrades.
                    </p>
                </motion.div>

                {/* Trust Badges Bar Added for Extra E-Commerce Credibility */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-white/10 shadow-sm">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl">
                            <Truck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Express Delivery</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Insured and priority global shipping</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-white/10 shadow-sm">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">100% Genuine Flagships</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Verified factory sealed devices</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-white/10 shadow-sm">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Apple-Grade Support</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Dedicated concierge assistance</p>
                        </div>
                    </div>
                </div>

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
                    className="pb-16"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={review.id} className="h-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg p-8 border border-gray-200/60 dark:border-white/10 relative overflow-hidden h-full flex flex-col justify-between"
                            >
                                <div>
                                    {/* Avatar + Quote Icon */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/30">
                                            <img
                                                src={review.avatar}
                                                alt={review.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <Quote className="w-8 h-8 text-primary opacity-30" />
                                    </div>

                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm sm:text-base font-normal">
                                        "{review.review}"
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10 mt-auto">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                            {review.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{review.role}</p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-4 h-4 fill-amber-400 text-amber-400"
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