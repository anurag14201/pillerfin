import React from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Component/Loading/Loading';
import useRole from '../../Hooks/useRole';

const LoanDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { role } = useRole();
	const axiosSecure = useAxiosSecure();
	const { data: loan = [], isPending } = useQuery({
		queryKey: ['loan', id],
		queryFn: async () => {
			const res = await axiosSecure.get(`/all-loans/${id}`);
			return res.data;
		},
	});
	if (isPending) {
		return <Loading></Loading>;
	}

	return (
		<div>
			<h2 className="text-3xl mt-5 font-semibold">{loan.title} Details:</h2>

			<div className=" mx-auto card bg-base-100 shadow-md border border-gray-100 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-400 w-200 my-5">
				<figure className="px-6 pt-6 overflow-hidden rounded-t-xl">
					<img
						src={loan.images}
						alt={loan.title}
						className="rounded-xl transition-transform duration-300 hover:scale-105"
					/>
				</figure>

				<div className="flex p-5 gap-1 justify-center">
					<div className="text-lg badge badge-outline border-blue-500 text-blue-600">
						Category: {loan.category}
					</div>
					<div className="text-lg badge badge-outline border-teal-500 text-teal-600">
						Interest: {loan.interestRate}
					</div>
					<div className="text-lg badge badge-outline border-blue-400 text-blue-500">
						Limit: ${loan.maxLimit}
					</div>
					<div className="text-lg badge badge-outline border-blue-400 text-blue-500">
						EMI: {loan.emiPlans}
					</div>
				</div>

				<div className="card-body items-center text-center">
					<h2 className=" text-3xl card-title text-blue-700">{loan.title}</h2>
					<p className="text-gray-600 text-2xl">{loan.description}</p>

					<div className="card-actions mt-3">
						<div className="card-actions">
							{role === 'Borrower' ? (
								<Link
									to={`/loan-application/${loan._id}`}
									className="btn btn-primary"
								>
									Apply Now
								</Link>
							) : (
								<button
									disabled
									to={`/loan-application/${loan._id}`}
									className="btn btn-primary "
								>
									Apply Now
								</button>
							)}

							<button
								onClick={() => navigate(-1)}
								className="btn btn-secondary"
							>
								Go Back
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoanDetails;
