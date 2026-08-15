import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../../Component/Loading/Loading';

import { Link } from 'react-router';

const ManageUsers = () => {
	const axiosSecure = useAxiosSecure();
	const [roleText,setRoleText] = useState('');
	const[searchText,setSearchText] = useState('');

	const { data: users = [], isPending,isFetching } = useQuery({
		queryKey: ['users', roleText, searchText],
		queryFn: async () => {
			const res = await axiosSecure.get(
				`/users?role=${roleText}&searchText=${searchText}`
			);
			return res.data;
		},
	});
	if (isPending || isFetching) {
		return <Loading></Loading>;
	}

	return (
		<div>
			<h1 className="text-3xl m-5 text-center">Manage users</h1>
			<div className="flex justify-center py-5">
				<select
					onChange={e => setRoleText(e.target.value)}
					value={roleText}
					className="select select-info"
				>
					<option value="">All</option>
					<option value="Borrower">Borrower</option>
					<option value="Manager">Manager</option>
					<option value="Admin">Admin</option>
				</select>
				<label className="input">
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
						placeholder="Search by name, title or role"
					/>
				</label>
			</div>
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
						{users.map((user, i) => (
							<tr key={user._id} className="hover:bg-base-300">
								<th>{i + 1}</th>
								<td>{user.displayName}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
								<td className="flex gap-2">
									<Link
										to={`/dashboard/manage-user-role/${user._id}`}
										
										className="btn hover:btn-secondary"
									>
										Update Role
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

export default ManageUsers;
