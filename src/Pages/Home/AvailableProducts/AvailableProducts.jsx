import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import Loading from '../../../Component/Loading/Loading';

const AvailableLoans = () => {
    const axiosSecure = useAxiosSecure();
    const { data: products = [], isPending } = useQuery({
        queryKey: ['sixLoans'],
        queryFn: async () => {
            const res = await axiosSecure.get('/six-loans');
            return res.data;
        }
    });

    if (isPending) {
        return <Loading />;
    }

    return (
        <section className='w-full p-0 m-0 text-white overflow-hidden bg-black'>
            {/* Apple-style True Seamless Edge-to-Edge Grid with Zero Gap */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-0 w-full'>
                {products.map((product, index) => (
                    <div
                        key={product._id}
                        className={`relative group bg-black rounded-none p-8 sm:p-16 overflow-hidden flex flex-col justify-between min-h-[540px] sm:min-h-[620px] shadow-none transition-all duration-700 ${
                            index % 3 === 0 ? 'md:col-span-2 min-h-[680px]' : ''
                        }`}
                    >
                        {/* Background Product Image with Gradient Vignette */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={product.images || product.image}
                                alt={product.title}
                                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
                        </div>

                        {/* Top Category & Title Content */}
                        <div className="z-10 space-y-2 max-w-xl">
                            <span className="text-xs uppercase tracking-widest text-gray-300 font-semibold">
                                {product.category}
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
                                {product.title}
                            </h2>
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-2 max-w-lg">
                                {product.description}
                            </p>
                        </div>

                        {/* Bottom Action Area (Apple Style Pill Buttons) */}
                        <div className="flex items-center justify-between z-10 pt-6 mt-auto">
                            <span className="text-2xl font-bold text-white drop-shadow">
                                ${product.price || product.maxLimit}
                            </span>
                            <div className="flex items-center gap-3">
                                <Link
                                    to={`/all-loans/${product._id}`}
                                    className="bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-medium px-6 py-2.5 rounded-full shadow-lg transition-all duration-200"
                                >
                                    Learn more
                                </Link>
                                <Link
                                    to={`/loan-application/${product._id}`}
                                    className="bg-white/20 backdrop-blur-md hover:bg-white hover:text-black text-white text-sm font-medium px-7 py-2.5 rounded-full border border-white/30 transition-all duration-200"
                                >
                                    Buy
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AvailableLoans;