import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Component/Loading/Loading';
import { MdOutlineViewAgenda } from 'react-icons/md';


const LoanApplicationAdmin = () => {
	const axiosSecure = useAxiosSecure();
	const [loanApplication, setLoanApplication]= useState(null)
	const [searchText, setSearchText] = useState('');
	const detailsModalRef =useRef();
	const { data: applications = [], isPending,isFetching } = useQuery({
		queryKey: ['application-admin', searchText],
		queryFn: async () => {
			const res = await axiosSecure.get(
				`/loan-applications?loanStatus=${searchText}`
			);
			return res.data;
		},
	});

	if (isPending || isFetching ) {
		return <Loading></Loading>;
	}

	const handleViewApplication = application => {
		setLoanApplication(application);
		detailsModalRef.current.showModal()
	};

	return (
		<div>
			<h1 className="text-3xl m-5 text-center">Loan Applications</h1>
			<span className="mx-2 text-xl">Filter Application By: </span>
			<select
				onChange={e => setSearchText(e.target.value)}
				value={searchText}
				className="select select-info"
			>
				<option value="">All</option>
				<option value="Pending">Pending</option>
				<option value="Approved">Approved</option>
				<option value="Rejected">Rejected</option>
			</select>
			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Loan ID</th>
							<th>User</th>
							<th>Loan Category</th>
							<th>Amount</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{applications.map((application, i) => (
							<tr key={application._id} className="hover:bg-base-300">
								<th>{i + 1}</th>
								<td>{application.loanId}</td>
								<td>
									<div>{application.email}</div>
									<div>{application.firstName}</div>
								</td>
								<td>{application.loanTitle}</td>
								<td>{application.loanAmount}</td>
								<td>{application.loanStatus}</td>
								<td
									onClick={() => handleViewApplication(application)}
									className="btn btn-secondary mt-3"
								>
									<MdOutlineViewAgenda />
									View
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* modal */}

			<dialog
				ref={detailsModalRef}
				className="modal modal-bottom sm:modal-middle"
			>
				<div className="modal-box">
					<form method="dialog">
						<div className="py-4">
							{loanApplication && (
								<div className="flex flex-col justify-center items-center">
									<p>
										<span className="font-bold text-secondary">Email:</span>
										{loanApplication.email}
									</p>
									<p>
										<span className="font-bold text-secondary">
											Loan Title:
										</span>{' '}
										{loanApplication.loanTitle}
									</p>
									<p>
										<span className="font-bold text-secondary">
											Interest Rate:
										</span>{' '}
										{loanApplication.interestRate}
									</p>
									<p>
										<span className="font-bold text-secondary">
											First Name:
										</span>{' '}
										{loanApplication.firstName}
									</p>
									<p>
										<span className="font-bold text-secondary">Last Name:</span>{' '}
										{loanApplication.lastName}
									</p>
									<p>
										<span className="font-bold text-secondary">Contact:</span>{' '}
										{loanApplication.contact}
									</p>
									<p>
										<span className="font-bold text-secondary">NID:</span>{' '}
										{loanApplication.nid}
									</p>
									<p>
										<span className="font-bold text-secondary">
											Income Source:
										</span>{' '}
										{loanApplication.incomeSource}
									</p>
									<p>
										<span className="font-bold text-secondary">
											Monthly Income :
										</span>{' '}
										{loanApplication.monthlyIncome}
									</p>
									<p>
										<span className="font-bold text-secondary">
											Loan Amount :
										</span>{' '}
										{loanApplication.loanAmount}
									</p>
									<p>
										<span className="font-bold text-secondary">
											Loan Reason :
										</span>{' '}
										{loanApplication.loanReason}
									</p>
									<p>
										<span className="font-bold text-secondary">Address :</span>{' '}
										{loanApplication.address}
									</p>
									<p>
										<span className="font-bold text-secondary">Notes :</span>{' '}
										{loanApplication.notes}
									</p>
									<p>
										<span className="font-bold text-secondary">Status :</span>{' '}
										{loanApplication.loanStatus}
									</p>
									<p>
										<span className="font-bold text-secondary">
											Payment Status :
										</span>{' '}
										{loanApplication.paymentStatus}
									</p>
									<p>
										<span className="font-bold text-secondary">Loan ID :</span>{' '}
										{loanApplication.loanId}
									</p>
									<p>
										<span className="font-bold text-secondary">
											Applied At:
										</span>{' '}
										{new Date(loanApplication.createdAt).toLocaleString()}
									</p>
									<p>
										<span className="font-bold text-secondary">Paid At:</span>{' '}
										{loanApplication.paidAt}
									</p>
									<p>
										<span className="font-bold text-secondary">
											Transaction ID:
										</span>{' '}
										{new Date(loanApplication.transactionId).toLocaleString}
									</p>

									{/* email "islam18@gmail.com" loanTitle "Home Furniture Loan"
									interestRate "10%" firstName "MD. Saymon" lastName "aseae"
									contact "saeae" nid "seaes" incomeSource "sae" monthlyIncome
									"aseae" loanAmount "se" loanReason "asease" address "Nitol
									Niloy Tower, Nikunja 2" notes "ase" loanStatus "Approved"
									loanDetailsId "69398c1cb27a498cbe4b052c" createdAt
									2025-12-16T18:19:06.848+00:00 loanId "LOAN-20251216-1B09C9"
									paymentStatus "paid" loanFee 10 paidAt
									2025-12-21T13:35:10.386+00:00 transactionId
									"pi_3SgmmxGZTTdeG8BZ1PIwpAPr" */}
								</div>
							)}
						</div>
						<button className="btn">Close</button>
					</form>
				</div>
			</dialog>
		</div>
	);
};

export default LoanApplicationAdmin;
