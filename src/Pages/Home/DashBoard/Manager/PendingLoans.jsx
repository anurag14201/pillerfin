import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const PendingLoans = () => {
    const axiosSecure = useAxiosSecure();
    const {data: loanApplications = [],refetch} = useQuery({
        queryKey: ["pending-loans"],
        queryFn: async()=>{
            const res = await axiosSecure.get('/loan-applications?loanStatus=Pending');
            return res.data
        }
    })
   
	const updateLoanApplicationStatus =(id,loanStatus)=>{
		const updateStatus = { loanStatus: loanStatus };
		axiosSecure.patch(`/loan-applications/${id}`, updateStatus)
		.then(res=>{
			if(res.data.modifiedCount){
				refetch();				
			}
		})
		

	}

	const handleApprove=(id)=>{
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Proceed!',
		}).then(result => {
			if (result.isConfirmed) {
				updateLoanApplicationStatus(id, 'Approved');
				Swal.fire({
					title: 'Approved!',
					text: 'Your file has been deleted.',
					icon: 'success',
				});
			}
		});


		
	}
	const handleReject=(id)=>{
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Reject!',
		}).then(result => {
			if (result.isConfirmed) {
				updateLoanApplicationStatus(id, 'Rejected');
				Swal.fire({
					title: 'Approved!',
					text: 'Your file has been deleted.',
					icon: 'success',
				});
			}
		});
	}

    return (
			<div>
				<h1 className="text-3xl m-5 text-center">Pending Loan Application</h1>
				<div className="overflow-x-auto">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th></th>
								<th>Loan ID</th>
								<th>User Info</th>
								<th>Amount</th>
								<th>Date</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{loanApplications.map((loanApplication, i) => (
								<tr key={loanApplication._id}>
									<th>{i + 1}</th>
									<td>{loanApplication.loanId}</td>
									<td>
										<div>{loanApplication.firstName}</div>
										<div>{loanApplication.email}</div>
									</td>
									<td>{loanApplication.loanAmount}</td>
									<td>
										{new Date(loanApplication.createdAt).toLocaleString()}
									</td>
									<td className="flex gap-2">
										<button
											onClick={() => handleApprove(loanApplication._id)}
											className="btn btn-primary flex-1"
										>
											Approved
										</button>
										<button
											onClick={() => handleReject(loanApplication._id)}
											className="btn btn-warning flex-1"
										>
											Reject
										</button>
										<Link
											to={`/all-loans/${loanApplication.loanDetailsId}`}
											className="btn btn-secondary flex-1"
										>
											View
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
};

export default PendingLoans;