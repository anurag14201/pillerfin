import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Component/Loading/Loading';
import { ShoppingBag, DollarSign, PackagePlus, ClipboardList, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all customer orders
    const { data: orders = [], isPending: ordersLoading } = useQuery({
        queryKey: ['adminDashboardOrders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-orders');
            return res.data;
        }
    });

    // Fetch all store products
    const { data: products = [], isPending: productsLoading } = useQuery({
        queryKey: ['adminDashboardProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-loans');
            return res.data;
        }
    });

    if (ordersLoading || productsLoading) return <Loading />;

    // Calculate real-time statistics
    const totalOrders = orders.length;
    const paidOrders = orders.filter(order => order.paymentStatus === 'paid');
    const pendingOrders = orders.filter(order => order.paymentStatus !== 'paid');
    const totalRevenue = paidOrders.reduce((acc, curr) => acc + (curr.totalAmount || (curr.loanAmount ? curr.loanAmount * 1200 : 0)), 0);
    const totalProducts = products.length;

    return (
        <div className="max-w-7xl mx-auto p-6 text-white">
            <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-1 block">
                    Management Portal
                </span>
                <h1 className="text-3xl font-bold tracking-tight">Admin & Manager Overview</h1>
                <p className="text-gray-400 text-sm mt-1">Monitor live platform statistics, product inventory, and customer transactions.</p>
            </div>

            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-xl flex items-center gap-4">
                    <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                        <ClipboardList className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs uppercase font-semibold">Total Orders</p>
                        <h3 className="text-3xl font-extrabold mt-1">{totalOrders}</h3>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-xl flex items-center gap-4">
                    <div className="p-4 bg-green-500/10 text-green-400 rounded-2xl">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs uppercase font-semibold">Paid / Completed</p>
                        <h3 className="text-3xl font-extrabold mt-1">{paidOrders.length}</h3>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-xl flex items-center gap-4">
                    <div className="p-4 bg-yellow-500/10 text-yellow-400 rounded-2xl">
                        <Clock className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs uppercase font-semibold">Pending Payments</p>
                        <h3 className="text-3xl font-extrabold mt-1">{pendingOrders.length}</h3>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-xl flex items-center gap-4">
                    <div className="p-4 bg-secondary/10 text-secondary rounded-2xl">
                        <DollarSign className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs uppercase font-semibold">Total Revenue</p>
                        <h3 className="text-3xl font-extrabold mt-1">${totalRevenue.toLocaleString()}</h3>
                    </div>
                </div>
            </div>

            {/* Quick Actions & Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Quick Management Actions</h2>
                        <span className="text-xs text-gray-400">{totalProducts} active products in store</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link to="/dashboard/add-loans" className="p-5 rounded-2xl bg-zinc-800 border border-white/5 hover:border-primary/50 transition-all flex items-center gap-4 group">
                            <div className="p-3 bg-primary text-white rounded-xl group-hover:scale-110 transition-transform">
                                <PackagePlus className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Add New Product</h4>
                                <p className="text-xs text-gray-400 mt-0.5">Upload flagship items to store</p>
                            </div>
                        </Link>

                        <Link to="/dashboard/manage-loans" className="p-5 rounded-2xl bg-zinc-800 border border-white/5 hover:border-secondary/50 transition-all flex items-center gap-4 group">
                            <div className="p-3 bg-secondary text-white rounded-xl group-hover:scale-110 transition-transform">
                                <ShoppingBag className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Manage / Delete Products</h4>
                                <p className="text-xs text-gray-400 mt-0.5">Edit or remove inventory</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recent Orders Preview Card */}
                <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                        <div className="space-y-3">
                            {orders.slice(0, 3).map(order => (
                                <div key={order._id} className="p-3 bg-zinc-800/60 rounded-2xl border border-white/5 flex justify-between items-center text-xs">
                                    <div>
                                        <p className="font-bold">{order.loanTitle || order.title || 'Product Order'}</p>
                                        <p className="text-gray-400">{order.email}</p>
                                    </div>
                                    <span className={`badge badge-sm ${order.paymentStatus === 'paid' ? 'badge-success text-white' : 'badge-warning'}`}>
                                        {order.paymentStatus || 'pending'}
                                    </span>
                                </div>
                            ))}
                            {orders.length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-6">No orders found yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;