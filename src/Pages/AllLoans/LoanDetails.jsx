import React from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Component/Loading/Loading';
import useRole from '../../Hooks/useRole';
import { ShoppingBag, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';

const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();

    // Restored original endpoint to match your database collection (/all-loans)
    const { data: product = {}, isPending } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-loans/${id}`);
            return res.data;
        },
    });

    if (isPending) {
        return <Loading></Loading>;
    }

    return (
        <div className="max-w-6xl mx-auto p-5 pt-32 pb-20 text-gray-900 dark:text-white transition-colors duration-300">
            {/* Top Back Navigation */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Store
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left: Product Image Showcase */}
                <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-200/20 dark:border-white/10 relative h-[420px] sm:h-[500px] flex items-center justify-center">
                    <img
                        src={product.images || product.image}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-95 hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-4 py-1.5 rounded-full border border-white/10 font-medium">
                        {product.category}
                    </span>
                </div>

                {/* Right: Product Info & Actions */}
                <div className="flex flex-col justify-between h-full space-y-6">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-2 block">
                            Flagship Edition
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-extrabold text-primary">
                                ${product.price || product.maxLimit}
                            </span>
                            <span className="badge badge-outline border-secondary text-secondary font-medium px-3 py-2">
                                In Stock: {product.stock || 'Available'}
                            </span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-8 font-normal">
                            {product.description}
                        </p>

                        {/* Specs Badges */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200/60 dark:border-white/10 text-center">
                                <span className="block text-xs text-gray-400 mb-1">Warranty</span>
                                <span className="font-semibold text-sm">1 Year Official</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200/60 dark:border-white/10 text-center">
                                <span className="block text-xs text-gray-400 mb-1">Condition</span>
                                <span className="font-semibold text-sm">Brand New</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200/60 dark:border-white/10 text-center">
                                <span className="block text-xs text-gray-400 mb-1">Shipping</span>
                                <span className="font-semibold text-sm">Insured Priority</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4 pt-6 border-t border-gray-200/60 dark:border-white/10">
                        {role !== 'Admin' && role !== 'Manager' ? (
                            <Link
                                to={`/loan-application/${product._id}`}
                                className="btn btn-primary w-full rounded-full py-4 text-base font-semibold shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Proceed to Checkout
                            </Link>
                        ) : (
                            <button
                                disabled
                                className="btn btn-disabled w-full rounded-full py-4 text-base font-semibold"
                            >
                                Admin/Manager View Only
                            </button>
                        )}
                    </div>

                    {/* Trust Guarantees */}
                    <div className="grid grid-cols-2 gap-4 pt-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-primary" />
                            <span>Fast global doorstep delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                            <span>100% factory sealed guarantee</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;