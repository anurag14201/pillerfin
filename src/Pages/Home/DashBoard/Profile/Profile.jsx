import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../../Component/Loading/Loading';
import { Mail, Shield, UserCheck, Sparkles, LogOut } from 'lucide-react';

const Profile = () => {
    const { user, logOut } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isPending } = useQuery({
        queryKey: ['userProfile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        },
    });

    if (isPending) {
        return <Loading></Loading>;
    }

    const handleLogOut = () => {
        logOut()
            .then()
            .catch(() => {});
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 text-gray-900 dark:text-white transition-colors duration-300">
            {data?.map(d => (
                <div
                    key={d._id}
                    className="bg-white dark:bg-zinc-900 shadow-2xl max-w-3xl w-full p-8 sm:p-12 rounded-3xl border border-gray-200/60 dark:border-white/10 relative overflow-hidden"
                >
                    {/* Background Glow Accent */}
                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-10 relative z-10">
                        <div className="relative">
                            <img
                                src={d.photoURL || user?.photoURL}
                                alt={d.displayName || user?.displayName}
                                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-primary shadow-xl"
                            />
                            <span className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full shadow-md">
                                <Sparkles className="w-4 h-4" />
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight mt-6">
                            {d.displayName || user?.displayName}
                        </h2>
                        <span className="badge badge-primary badge-outline font-semibold px-4 py-2 mt-3">
                            Role: {d.role || d.userType || 'Customer'}
                        </span>
                    </div>

                    {/* Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-gray-200/40 dark:border-white/5 mb-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Email Address</p>
                                <p className="font-medium text-base truncate max-w-[220px] sm:max-w-xs">{d.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">User ID</p>
                                <p className="font-medium text-sm font-mono truncate max-w-[220px] sm:max-w-xs">{d._id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center relative z-10">
                        <button
                            onClick={handleLogOut}
                            className="btn btn-error text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" /> Log Out
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Profile;