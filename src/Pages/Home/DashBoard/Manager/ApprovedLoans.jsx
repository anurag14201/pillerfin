import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ApprovedLoans = () => {
    const axiosSecure = useAxiosSecure();
    const { data: approvedApps = [] } = useQuery({
			queryKey: ['approvedApps'],
			queryFn: async () => {
				const res = await axiosSecure.get(
					'/loan-applications?loanStatus=Approved'
				);
				return res.data;
			},
		});

        
    return (
			<div>
				<h1 className="text-3xl m-5 text-center">Approved Loan Application</h1>
				<div className="overflow-x-auto">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th></th>
								<th>Loan ID</th>
								<th>User Info</th>
								<th>Amount</th>
								<th>Approved Date</th>
								
							</tr>
						</thead>
						<tbody>
							{approvedApps.map((approvedApp, i) => (
								<tr key={approvedApp._id}>
									<th>{i + 1}</th>
									<td>{approvedApp.loanId}</td>
									<td>
										<div>{approvedApp.firstName}</div>
										<div>{approvedApp.email}</div>
									</td>
									<td>{approvedApp.loanAmount}</td>
									<td>{approvedApp.approvedAt}</td>
									
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
};

export default ApprovedLoans;