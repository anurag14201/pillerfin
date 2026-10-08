import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const heroSlides = [
	{
        id: 1,
        // Official Apple iPhone 18 Pro Asset
        image: 'https://www.apple.com/v/iphone-18-pro/c/images/overview/highlights/siri__eprmtp3edh8i_large_2x.jpg',
        title: 'iPhone 18 Pro',
        subtitle: 'Pro further.',
    },
    {
        id: 2,
        // Official Apple iPhone Duo Asset
        image: 'https://www.apple.com/v/iphone-duo/d/images/overview/design/design_hero__gczn1e74mwa6_large_2x.jpg',
        title: 'iPhone Duo',
        subtitle: 'Hello, hello.',
    },
    {
        id: 3,
        // MacBook Pro Flagship Asset
        image: 'https://www.apple.com/v/macbook-pro/ax/images/overview/battery/battery_hero__db4y37bs7cmu_xlarge_2x.jpg',
        title: 'MacBook Pro M5',
        subtitle: 'Mind-blowing. Head-turning.',
    },
    {
        id: 4,
        // Samsung Galaxy Ultra Flagship Asset
        image: 'https://images.samsung.com/bd/smartphones/galaxy-s26/images/galaxy-s26-features-kv.jpg?imbypass=true',
        title: 'Galaxy S26 Ultra',
        subtitle: 'Epic standard. Unmatched power.',
    },
    {
        id: 5,
        // Google Pixel Flagship Asset
        image: 'https://lh3.googleusercontent.com/BNG6BxSFujvScTyHIV0sRyTeRrpcSXaHu05qaNHUoE2Q0YKOWpJZsr-vqS2OY73YlIz0MQcbCaDl_xeBIBQN7ZXY1DjRF7Iu0A=w2880-h1400-rw-nu',
        title: 'Google Pixel 11 Pro',
        subtitle: 'Advanced AI. Incredible photography.',
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
        <div className="relative h-[580px] sm:h-[650px] md:h-[720px] lg:h-[780px] overflow-hidden bg-black">
            {/* Background Image with Smooth Transition */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out scale-105"
                style={{ backgroundImage: `url(${current.image})` }}
            >
                {/* Cinematic Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/40"></div>
            </div>

            {/* Main Content - Apple Style Typography & Button Pairs */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-28 text-center px-5 sm:px-8 max-w-4xl mx-auto">
                <div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-2">
                        {current.title}
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-300 font-normal tracking-wide mb-6">
                        {current.subtitle}
                    </p>

                    <div className="flex justify-center items-center gap-3">
                        <Link
                            to="/all-loans"
                            className="btn btn-primary btn-sm sm:btn-md rounded-full px-6 font-normal tracking-wide shadow-md hover:scale-105 transition-all"
                        >
                            Learn more
                        </Link>
                        <Link
                            to="/all-loans"
                            className="btn btn-outline btn-sm sm:btn-md text-white border-white/60 hover:bg-white hover:text-black hover:border-white rounded-full px-6 font-normal tracking-wide transition-all"
                        >
                            Buy
                        </Link>
                    </div>
                </div>
            </div>

            {/* Carousel Indicators (Pills) */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 transition-all duration-300 rounded-full ${
                            currentSlide === index
                                ? 'w-8 bg-white'
                                : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Side Navigation Arrows */}
            <button
                onClick={() =>
                    setCurrentSlide(
                        prev => (prev - 1 + heroSlides.length) % heroSlides.length,
                    )
                }
                className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full text-xl transition-all z-20 border border-white/10"
            >
                ←
            </button>

            <button
                onClick={() => setCurrentSlide(prev => (prev + 1) % heroSlides.length)}
                className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full text-xl transition-all z-20 border border-white/10"
            >
                →
            </button>
        </div>
    );
};

export default HeroBanner;