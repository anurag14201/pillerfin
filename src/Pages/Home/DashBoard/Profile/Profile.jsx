import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../../Component/Loading/Loading';

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
			.catch(() => {
				
			});
	};
	return (
		<div className="min-h-[80vh] flex items-center justify-center px-4">
			{data.map(d => (
				<div
					key={d._id}
					className="card bg-base-100 shadow-2xl max-w-4xl w-full p-10"
				>
					{/* Header */}
					<div className="flex flex-col items-center text-center mb-10">
						<img
							src={d.photoURL}
							alt={d.displayName}
							className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow-md"
						/>
						<h2 className="text-3xl font-bold mt-4">{d.displayName}</h2>
						<span className="badge badge-primary badge-lg mt-2">
							{d.userType}
						</span>
					</div>

					{/* Info Section */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
						<div className="space-y-2">
							<p className="font-semibold text-gray-500">Email</p>
							<p className="font-medium">{d.email}</p>
						</div>

						<div className="space-y-2">
							<p className="font-semibold text-gray-500">User ID</p>
							<p className="font-medium break-all">{d._id}</p>
						</div>
					</div>

					{/* Actions */}
					<div className="flex justify-center gap-6 mt-12">
						
						<button onClick={handleLogOut} className="btn btn-warning text-black btn-lg">
							Log Out
						</button>
					</div>
				</div>
			))}
		</div>
	);


};

export default Profile;
