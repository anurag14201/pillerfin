import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Component/Loading/Loading';
import { BiShow, BiSolidHide } from 'react-icons/bi';
import { MdEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const AllLoansAdmin = () => {
	const axiosSecure = useAxiosSecure();
	const {
		data: allLoansAdmin = [],
		isPending,
		refetch,
	} = useQuery({
		queryKey: ['allLoanAdmin'],
		queryFn: async () => {
			const res = await axiosSecure.get('/all-loans-admin');
			return res.data;
		},
	});

	if (isPending) {
		return <Loading></Loading>;
	}

	
	const handleDelete = loan => {
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
				await axiosSecure.delete(`/all-loans/${loan._id}`);
				refetch();
				Swal.fire({
					title: 'Deleted!',
					text: 'Your file has been deleted.',
					icon: 'success',
				});
			}
		});
	};

	const toggleShowOnHome = loan => {
		const newValue = !loan.showOnHome;

		Swal.fire({
			title: 'Are you sure?',
			text: `This loan will be ${newValue ? 'shown on' : 'hidden from'} Home`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, proceed!',
		}).then(async result => {
			if (result.isConfirmed) {
				const res = await axiosSecure.patch(`/all-loans/${loan._id}`, {
					showOnHome: newValue,
				});

				if (res.data.modifiedCount) {
					refetch();
					Swal.fire({
						icon: 'success',
						title: 'Updated!',
						text: `Loan is now ${newValue ? 'visible' : 'hidden'} on Home`,
					});
				}
			}
		});
	};


	return (
		<div className="overflow-x-auto">
			<h1 className="text-3xl m-5 text-center">
				All Loans({allLoansAdmin.length})
			</h1>
			<table className="table xs">
				{/* head */}
				<thead>
					<tr>
						<th></th>
						{/* <th>image</th> */}
						<th>Title</th>
						<th>Interest</th>
						<th>Category</th>
						<th className="hidden lg:table">Created By</th>
						<th>Show on Home</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{allLoansAdmin.map((loan, i) => (
						<tr key={loan._id}>
							<th>{i + 1}</th>

							{/* <td>
								<div className="flex items-center gap-3">
									<div className="avatar">
										<div className="mask mask-squircle h-12 w-12">
											<img
												src={loan.images}
												alt="Avatar Tailwind CSS Component"
											/>
										</div>
									</div>
								</div>
							</td> */}
							<td>{loan.title}</td>
							<td>{loan.interestRate}</td>
							<td>{loan.category}</td>
							<td className="hidden lg:table">{loan.createdBy}</td>
							<td>
								{loan.showOnHome === true ? (
									<span>Visible</span>
								) : (
									<span>Hidden</span>
								)}
							</td>
							<td className="flex flex-col md:flex-row  gap-2 items-center">
								<Link
									to={`/dashboard/update-loans/${loan._id}`}
									className="btn btn-primary"
								>
									<MdEdit />
								</Link>

								<button
									onClick={() => handleDelete(loan)}
									className="btn btn-error"
								>
									<AiFillDelete />
								</button>

								{loan.showOnHome ? (
									<button
										onClick={() => toggleShowOnHome(loan)}
										className="btn btn-warning"
										title="Hide from Home"
									>
										<BiSolidHide />
									</button>
								) : (
									<button
										onClick={() => toggleShowOnHome(loan)}
										className="btn btn-secondary"
										title="Show on Home"
									>
										<BiShow />
									</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AllLoansAdmin;
