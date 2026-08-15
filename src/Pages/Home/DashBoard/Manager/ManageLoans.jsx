import React, { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../Hooks/useAuth';
import Loading from '../../../../Component/Loading/Loading';
import Swal from 'sweetalert2';
import { Link } from 'react-router'; 

const ManageLoans = () => {
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const [searchText, setSearchText] = useState('');

	const {
		data: managerCreatedLoans = [],
		isPending,
		isFetching,
		refetch
	} = useQuery({
		queryKey: ['loan-created-by-manager', user?.email, searchText],
		queryFn: async () => {
			const res = await axiosSecure.get(
				`/all-loans-admin?email=${user?.email}&searchText=${searchText}`
			);
			return res.data;
		},
		enabled: !!user?.email,
	});

	
	if (isPending || isFetching) {
		return <Loading />;
	}

	const handleDelete = async managerCreatedLoan => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then(async result => {
			if (result.isConfirmed) {
				await axiosSecure.delete(`/all-loans/${managerCreatedLoan._id}`);
				Swal.fire({
					title: 'Deleted!',
					text: 'Your loan has been deleted.',
					icon: 'success',
				});
				
			}
		 refetch();

		});
	};

	return (
		<div className="overflow-x-auto">
			<h1 className="text-3xl m-5 text-center">
				Loans Created By Me ({managerCreatedLoans.length})
			</h1>

			
			<div className="flex justify-center my-5">
				<label className="input w-full max-w-md">
					<svg
						className="h-[1em] opacity-50"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<g
							strokeLinejoin="round"
							strokeLinecap="round"
							strokeWidth="2.5"
							fill="none"
							stroke="currentColor"
						>
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.3-4.3"></path>
						</g>
					</svg>
					<input
						type="search"
						className="grow"
						value={searchText} 
						onChange={e => setSearchText(e.target.value)}
						placeholder="Search by title or category"
					/>
				</label>
			</div>

			
			<table className="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Image</th>
						<th>Title</th>
						<th>Interest</th>
						<th>Category</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{managerCreatedLoans.length === 0 ? (
						<tr>
							<td
								colSpan="6"
								className="text-center py-12 text-gray-500 text-lg"
							>
								No loans found matching your search.
							</td>
						</tr>
					) : (
						managerCreatedLoans.map((managerCreatedLoan, i) => (
							<tr key={managerCreatedLoan._id} className="hover:bg-base-300">
								<th>{i + 1}</th>
								<td>
									<div className="flex items-center gap-3">
										<div className="avatar">
											<div className="mask mask-squircle h-12 w-12">
												<img
													src={managerCreatedLoan.images || '/placeholder.jpg'}
													alt={managerCreatedLoan.title}
												/>
											</div>
										</div>
									</div>
								</td>
								<td>{managerCreatedLoan.title}</td>
								<td>{managerCreatedLoan.interestRate}</td>
								<td>{managerCreatedLoan.category}</td>
								<td className="flex gap-2">
									<Link
										to={`/dashboard/update-loans/${managerCreatedLoan._id}`}
										className="btn btn-primary btn-sm"
									>
										Update
									</Link>
									<button
										onClick={() => handleDelete(managerCreatedLoan)}
										className="btn btn-warning btn-sm"
									>
										Delete
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default ManageLoans;