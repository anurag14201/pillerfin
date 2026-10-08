import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Component/Loading/Loading';
import { Search, SlidersHorizontal } from 'lucide-react';

const AllLoans = () => {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [maxPrice, setMaxPrice] = useState(3000);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const { data: products = [], isPending } = useQuery({
        queryKey: ['allLoans'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-loans');
            return res.data;
        },
    });

    if (isPending) {
        return <Loading></Loading>;
    }

    const categories = ['All', 'Phones', 'Smartwatches', 'Audio', 'Laptops', 'Tablets', 'Accessories'];

    // Filter products based on search, category, and price range with fallback title support
    const filteredProducts = products.filter(product => {
        const productPrice = product.price || product.maxLimit || 0;
        const productTitle = (product.title || product.loanTitle || '').toLowerCase();
        const matchesSearch = productTitle.includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesPrice = productPrice <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    // Pagination logic (9 items per page)
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="max-w-7xl mx-auto p-5 pt-28">
            {/* Header Title */}
            <div className="text-center mb-8">
                <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-2 block">
                    Flagship Store
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                    Available Devices ({filteredProducts.length})
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Explore the pinnacle of personal technology and flagship design.
                </p>
            </div>

            {/* Apple-Style Category Breakdown Navbar */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto py-4 mb-8">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => {
                            setSelectedCategory(cat);
                            setCurrentPage(1);
                        }}
                        className={`text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                            selectedCategory === cat
                                ? 'bg-primary text-white shadow-md scale-105'
                                : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Search Bar & Price Filter Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto mb-12">
                {/* Search Bar */}
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search flagship devices by name..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-full pl-12 pr-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary shadow-sm transition-all"
                    />
                </div>

                {/* Price Range Filter */}
                <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 px-5 py-3 rounded-full w-full md:w-auto shadow-sm">
                    <SlidersHorizontal className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-gray-500">Max: ${maxPrice}</span>
                    <input
                        type="range"
                        min="100"
                        max="3000"
                        step="50"
                        value={maxPrice}
                        onChange={(e) => {
                            setMaxPrice(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="range range-primary range-xs w-32 cursor-pointer"
                    />
                </div>
            </div>

            {/* Product Grid */}
            {currentProducts.length === 0 ? (
                <div className="text-center py-20 text-gray-500 text-lg">
                    No devices found matching your criteria.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {currentProducts.map(product => (
                        <div
                            key={product._id}
                            className="card bg-white dark:bg-zinc-900 shadow-xl border border-gray-200/60 dark:border-white/10 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden flex flex-col justify-between"
                        >
                            <figure className="relative h-64 bg-black overflow-hidden">
                                <img
                                    src={product.images || product.image}
                                    alt={product.title || product.loanTitle}
                                    loading="lazy"
                                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-transform duration-500 hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/10 font-medium">
                                    {product.category}
                                </div>
                            </figure>

                            <div className="flex px-6 pt-5 gap-2 flex-wrap justify-end">
                                <div className="badge badge-outline border-primary text-primary font-medium">
                                    Price: ${product.price || product.maxLimit}
                                </div>
                                <div className="badge badge-outline border-secondary text-secondary font-medium">
                                    Stock: {product.stock || 'Available'}
                                </div>
                            </div>

                            <div className="card-body items-center text-center p-6">
                                <h2 className="card-title text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {product.title || product.loanTitle}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                    {product.description}
                                </p>

                                <div className="card-actions mt-auto w-full">
                                    <Link
                                        to={`/all-loans/${product._id}`}
                                        className="btn btn-primary w-full rounded-full shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="border-t border-gray-200/60 dark:border-white/10 pt-8 mt-12 flex justify-between items-center max-w-4xl mx-auto mb-12">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white font-medium text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                        <span>←</span> Previous
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all ${
                                    currentPage === number
                                        ? 'bg-orange-500 text-white shadow-md'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
                                }`}
                            >
                                {number}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white font-medium text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                        Next <span>→</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllLoans;