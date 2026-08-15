import React, { useRef, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Loading from '../../Component/Loading/Loading';
import Swal from 'sweetalert2';
import { FcViewDetails } from 'react-icons/fc';

const MyLoans = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const loanModalRef = useRef();
	const [loanDetailsId, setLoanDetailsId] = useState(null)


	const {
		data: loanApplications = [],
		isPending,
		refetch,
	} = useQuery({
		queryKey: ['loanApplications', user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const res = await axiosSecure.get(
				`/loan-application?email=${user.email}`
			);
			return res.data;
			
		},
	});

	const openLoanModal = loanApplication => {
		setLoanDetailsId(loanApplication.loanDetailsId);
		loanModalRef.current.showModal();
	};

	const { data } = useQuery({
		queryKey: ['loan-Details', loanDetailsId],
		enabled: !!loanDetailsId,
		queryFn: async () => {
			const res = await axiosSecure.get(`/all-loans/${loanDetailsId}`);
			return res.data;
		},
	});

	
	
	if (isPending) {
		return <Loading></Loading>;
	}

	

	// const openLoanModal = (loanApplication) => {
	// 	setLoanDetailsId(loanApplication.loanDetailsId);
	// 	loanModalRef.current.showModal();
	// };

	const handlePayment = async loanApplication => {
		try {
			const result = await Swal.fire({
				title: 'Are you sure?',
				text: 'You will be charget $10 for ths!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, proceed!',
			});

			if (!result.isConfirmed) return;

			const paymentInfo = {
				loanFee: loanApplication.loanFee,
				loanId: loanApplication._id,
				loan_Id: loanApplication.loanId,
				email: loanApplication.email,
				loanTitle: loanApplication.loanTitle,
			};

			const res = await axiosSecure.post(
				'/create-checkout-session',
				paymentInfo
			);

			window.location.assign(res.data.url);
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: 'error',
				title: 'Something went wrong!',
				text: 'Please try again later',
			});
		}
	};

	const handleDelete = id => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then(result => {
			if (result.isConfirmed) {
				axiosSecure.delete(`/loan-application/${id}/delete`).then(res => {
					if (res.data.deletedCount) {
						refetch();
					}
				});
				Swal.fire({
					title: 'Deleted!',
					text: 'Your file has been deleted.',
					icon: 'success',
				});
			}
		});
	};

	return (
		<div>
			<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
				{loanApplications.length === 0 ? (
					<p className="font-semibold text-2xl text-center mt-5">
						NO application yet
					</p>
				) : (
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th></th>
								<th>Loan ID</th>
								<th>Loan Info</th>
								<th>Amount</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{loanApplications.map((loanApplication, i) => (
								<tr key={loanApplication._id}>
									<th>{i + 1}</th>
									<td>{loanApplication.loanId}</td>
									<td>{loanApplication.loanTitle}</td>
									<td>{loanApplication.loanAmount}</td>
									<td>{loanApplication.loanStatus}</td>
									<td className=" flex gap-1">
										<div className="flex justify-center items-center">
											{loanApplication.paymentStatus === 'paid' ? (
												<p className=" text-center text-green-800 font-bold mr-2 p-2">
													Paid
												</p>
											) : (
												<button
													onClick={() => handlePayment(loanApplication)}
													className="btn btn-secondary text-white"
												>
													Pay
												</button>
											)}
										</div>

										{loanApplication.loanStatus == 'Pending' ? (
											<button
												onClick={() => handleDelete(loanApplication._id)}
												className="btn hover:btn-warning"
											>
												<RiDeleteBin6Line />
											</button>
										) : (
											<button
												disabled
												onClick={() => handleDelete(loanApplication._id)}
												className="btn hover:btn-warning"
											>
												<RiDeleteBin6Line />
											</button>
										)}

										<button
											onClick={() => openLoanModal(loanApplication)}
											className="btn"
										>
											<FcViewDetails />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			{/* view details modal */}
			<dialog ref={loanModalRef} className="modal modal-bottom sm:modal-middle">
				<div className="modal-box w-full max-w-md overflow-auto">
					<h3 className="font-bold text-lg mb-4 text-center">Loan Details</h3>

					{data ? (
						<div className="card bg-base-100 shadow-md border border-gray-100 rounded-xl">
							<figure className="px-4 pt-4 overflow-hidden rounded-t-xl w-full flex justify-center">
								<img
									src={data.images}
									alt={data.title}
									className="rounded-xl max-h-48 object-cover"
								/>
							</figure>

							<div className="p-4 flex flex-wrap justify-center gap-2 text-center">
								<div className="badge badge-outline border-blue-500 text-blue-600">
									Category: {data.category}
								</div>
								<div className="badge badge-outline border-teal-500 text-teal-600">
									Interest: {data.interestRate}
								</div>
								<div className="badge badge-outline border-blue-400 text-blue-500">
									Limit: ${data.maxLimit}
								</div>
								<div className="badge badge-outline border-blue-400 text-blue-500">
									EMI: {data.emiPlans}
								</div>
							</div>

							<div className="card-body items-center text-center px-4 pb-4">
								<h2 className="text-2xl font-bold text-blue-700">
									{data.title}
								</h2>
								<p className="text-gray-600 text-base mt-2">
									{data.description}
								</p>
							</div>
						</div>
					) : (
						<div><Loading></Loading></div>
					)}

					<div className="modal-action mt-2 justify-center">
						<form method="dialog">
							<button className="btn btn-primary">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
};

export default MyLoans;
