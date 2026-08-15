import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';
import Loading from '../../../../Component/Loading/Loading';

const ManagerProfile = () => {
	const { user, logOut } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { data: managers = [], isPending } = useQuery({
		queryKey: ['managerProfile', user?.email],
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
		<div className="min-h-[80vh] flex items-center justify-center px-4">
			{managers.map(manager => (
				<div
					key={manager._id}
					className="card bg-base-100 shadow-2xl max-w-4xl w-full p-10"
				>
					{/* Header */}
					<div className="flex flex-col items-center text-center mb-10">
						<img
							src={manager.photoURL}
							alt={manager.displayName}
							className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow-md"
						/>
						<h2 className="text-3xl font-bold mt-4">{manager.displayName}</h2>
						<span className="badge badge-primary badge-lg mt-2">
							{manager.role}
						</span>
					</div>

					{/* Info Section */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
						<div className="space-y-2">
							<p className="font-semibold text-gray-500">Email</p>
							<p className="font-medium">{manager.email}</p>
						</div>

						<div className="space-y-2">
							<p className="font-semibold text-gray-500">User ID</p>
							<p className="font-medium break-all">{manager._id}</p>
						</div>
					</div>

					{/* Actions */}
					<div className="flex justify-center gap-6 mt-12">
						<button
							onClick={handleLogOut}
							className="btn btn-warning text-black btn-lg"
						>
							Log Out
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default ManagerProfile;
