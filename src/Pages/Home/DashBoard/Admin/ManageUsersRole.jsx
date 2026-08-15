import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../../Component/Loading/Loading';
import Swal from 'sweetalert2';

const ManageUsersRole = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const axiosSecure = useAxiosSecure();
	const {
		data: user = [],
		isPending,
		refetch,
	} = useQuery({
		queryKey: ['user', id],
		queryFn: async () => {
			const res = await axiosSecure.get(`/users/${id}`);
			return res.data;
		},
	});
	if (isPending) {
		return <Loading></Loading>;
	}

	const updateUserRole = (id, role) => {
		const updateRole = { role: role };
		Swal.fire({
			title: 'Are you sure?',
			text: `User's role will be set to ${role}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, proceed!',
		}).then(result => {
			if (result.isConfirmed) {
				axiosSecure.patch(`/users/${id}`, updateRole).then(res => {
					if (res.data.modifiedCount) {
						refetch();
					}
				});

				Swal.fire({
					title: 'Modified!',
					text: 'User role updated.',
					icon: 'success',
				});
			}
		});
	};

	const handleAdmin = id => {
		updateUserRole(id, 'Admin');
	};
	const handleManager = id => {
		updateUserRole(id, 'Manager');
	};
	const handleBorrower = id => {
		updateUserRole(id, 'Borrower');
	};

	return (
		<div>
			<h1 className="text-3xl m-5 text-center">Update Role</h1>
			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{user.map((u, i) => (
							<tr key={u._id} className="hover:bg-base-300">
								<th>{i + 1}</th>
								<td>{u.displayName}</td>
								<td>{u.email}</td>
								<td>{u.role}</td>
								<td className="flex gap-2">
									<button
										onClick={() => handleAdmin(u._id)}
										className="btn hover:btn-secondary"
									>
										Admin
									</button>
									<button
										onClick={() => handleManager(u._id)}
										className="btn hover:btn-secondary"
									>
										Manager
									</button>
									<button
										onClick={() => handleBorrower(u._id)}
										className="btn hover:btn-secondary"
									>
										Borrower
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex justify-center mt-5">
				<button onClick={() => navigate(-1)} className="btn btn-secondary">
					Go back
				</button>
			</div>
		</div>
	);
};

export default ManageUsersRole;
