import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Component/Loading/Loading';

const LoanApplicationForm = () => {
	const { id } = useParams();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const axiosSecure = useAxiosSecure();
	const navigate = useNavigate();
	const { user } = useAuth();

	const { data: loan = [], isPending } = useQuery({
		queryKey: [id],
		queryFn: async () => {
			const res = await axiosSecure.get(`/all-loans/${id}`);
			return res.data;
		},
	});

	if (isPending) {
		return <Loading></Loading>;
	}

	const handleLoanApplication = (data, e) => {
		e.preventDefault();
		data.loanDetailsId = loan._id;
		axiosSecure.post('/loan-application', data).then(res => {
			if (res.data.insertedId) {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Loan Application submitted',
					showConfirmButton: false,
					timer: 1500,
				});
				navigate('/dashboard/my-loans');
			}
		});
	};

	return (
		<div className="max-w-7xl mx-auto p-5">
			{/* loan application form */}
			<h4 className="text-2xl font-semibold my-5">
				Submit your loan application
			</h4>
			<form onSubmit={handleSubmit(handleLoanApplication)}>
				<div className=" grid grid-cols-1 md:grid-cols-2 items-center">
					<fieldset className="card-body">
						{/* user email */}
						<label className="label">User Email</label>
						<input
							type="email"
							{...register('email')}
							defaultValue={user?.email}
							className="input"
							placeholder="User Email"
						/>
						{/* Loan Title(get it from loan details) */}
						<label className="label">Loan title</label>
						<input
							type="text"
							{...register('loanTitle')}
							defaultValue={loan.title}
							className="input"
						/>
						{/* interest rate */}
						<label className="label">Interest rate</label>
						<input
							type="text"
							{...register('interestRate')}
							defaultValue={loan.interestRate}
							className="input"
						/>
						{/* First Name */}
						<label className="label">First Name</label>
						<input
							type="text"
							{...register('firstName', { required: true })}
							className="input"
							placeholder="First Name"
						/>
						{errors.firstName?.type === 'required' && (
							<p className="text-red-500">First Name is required</p>
						)}
						{/* Last Name */}
						<label className="label">Last Name</label>
						<input
							type="text"
							{...register('lastName', { required: true })}
							className="input"
							placeholder="Last Name"
						/>
						{errors.lastName?.type === 'required' && (
							<p className="text-red-500">Last Name is required</p>
						)}
						{/* Contact number */}
						<label className="label">Contact Number</label>
						<input
							type="text"
							{...register('contact', { required: true })}
							className="input"
							placeholder="Contact Number"
						/>
						{errors.contact?.type === 'required' && (
							<p className="text-red-500">Contact Number is required</p>
						)}
						{/* National ID / Passport Number */}
						<label className="label">National ID / Passport Number</label>
						<input
							type="text"
							{...register('nid', { required: true })}
							className="input"
							placeholder="NID / Passport"
						/>
						{errors.nid?.type === 'required' && (
							<p className="text-red-500">NID is required</p>
						)}
					</fieldset>

					<fieldset className="card-body">
						<label className="label">Income Source</label>
						<input
							type="text"
							{...register('incomeSource', { required: true })}
							className="input"
							placeholder="Income Source"
						/>
						{errors.incomeSource?.type === 'required' && (
							<p className="text-red-500">Income Source is required</p>
						)}
						<label className="label">Monthly Income </label>
						<input
							type="text"
							{...register('monthlyIncome', { required: true })}
							className="input"
							placeholder="Monthly Income"
						/>
						{errors.monthlyIncome?.type === 'required' && (
							<p className="text-red-500">Monthly Income is required</p>
						)}
						<label className="label">Loan Amount </label>
						<input
							type="text"
							{...register('loanAmount', { required: true })}
							className="input"
							placeholder="Loan Amount"
						/>
						{errors.loanAmount?.type === 'required' && (
							<p className="text-red-500">Loan Amount is required</p>
						)}
						<label className="label">Reason for Loan </label>
						<input
							type="text"
							{...register('loanReason', { required: true })}
							className="input"
							placeholder="Reason for Loan"
						/>
						{errors.loanReason?.type === 'required' && (
							<p className="text-red-500">Loan reason is required</p>
						)}
						<label className="label">Address</label>
						<input
							type="text"
							{...register('address', { required: true })}
							className="input"
							placeholder="Address"
						/>
						{errors.address?.type === 'required' && (
							<p className="text-red-500">Adress is required</p>
						)}
						<label className="label">Extra Notes</label>
						<input
							type="text"
							{...register('notes')}
							className="input"
							placeholder="Notes"
						/>

						<label className="label">Status</label>
						<input
							type="text"
							defaultValue="Pending"
							className="input"
							{...register('loanStatus')}
							disabled
						/>
						{errors?.type === 'required' && (
							<p className="text-red-500">is required</p>
						)}
					</fieldset>
				</div>
				<input
					className="btn btn-primary my-2 ml-5 "
					type="submit"
					value="Submit loan"
				/>
				<button className="btn btn-secondary ml-2" onClick={() => navigate(-1)}>
					Back to Loan Details
				</button>
			</form>
		</div>
	);
};

export default LoanApplicationForm;
