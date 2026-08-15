import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Component/Loading/Loading';

const AllLoans = () => {
	const axiosSecure = useAxiosSecure();

	const { data: loans = [], isPending } = useQuery({
		queryKey: ['allLoans'],
		queryFn: async () => {
			const res = await axiosSecure.get('/all-loans');
			return res.data;
		},
	});
	if (isPending) {
		return <Loading></Loading>;
	}
	return (
		<div className="max-w-7xl mx-auto p-5">
			<h2 className="my-5 text-3xl font-semibold text-center">
				Available Loans ({loans.length})
			</h2>
			{/* loan details */}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
				{loans.map(loan => (
					<div
						key={loan._id}
						className="card bg-base-100 shadow-md border border-gray-100 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-400 "
					>
						<figure className="px-6 pt-6 overflow-hidden rounded-t-xl">
							<img
								src={loan.images}
								alt={loan.title}
								loading="lazy"
								className="rounded-xl transition-transform duration-300 hover:scale-105"
							/>
						</figure>

						<div className="flex p-5 gap-1 flex-col items-end">
							<div className="badge badge-outline border-blue-500 text-blue-600">
								Category: {loan.category}
							</div>
							<div className="badge badge-outline border-teal-500 text-teal-600">
								Interest: {loan.interestRate}
							</div>
							<div className="badge badge-outline border-blue-400 text-blue-500">
								Limit: ${loan.maxLimit}
							</div>
						</div>

						<div className="card-body items-center text-center">
							<h2 className="card-title text-blue-700">{loan.title}</h2>
							<p className="text-gray-600">{loan.description}</p>

							<div className="card-actions mt-3">
								<Link
									to={`/all-loans/${loan._id}`}
									className="btn px-6 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
								>
									View Details
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AllLoans;
