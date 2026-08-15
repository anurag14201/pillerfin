
import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../../Component/Loading/Loading';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const LoanUpdate = () => {
    const[loading, setLoading] =useState(false)
	const { id } = useParams();
	const navigate = useNavigate();
	const axiosSecure = useAxiosSecure();

	const { register, handleSubmit, reset } = useForm();

	
	const { data: loan, isPending } = useQuery({
		queryKey: ['single-loan', id],
		queryFn: async () => {
			const res = await axiosSecure.get(`/all-loans/${id}`);
			return res.data;
		},
	});

	
	useEffect(() => {
		if (loan) {
			reset({
				title: loan.title,
				description: loan.description,
				interestRate: loan.interestRate,
				category: loan.category,
				maxLimit: loan.maxLimit,
				emiPlans: loan.emiPlans,
				showOnHome: loan.showOnHome.toString(),
			});
		}
	}, [loan, reset]);

	// 🔹 Submit update
	const onSubmit = async data => {
        setLoading(true)
		let imageUrl = loan.images; 

		
		if (data.images && data.images.length > 0) {
			const formData = new FormData();
			formData.append('image', data.images[0]);

			const imageBB_API_URL = `https://api.imgbb.com/1/upload?key=${
				import.meta.env.VITE_image_host_Key
			}`;

			const imgRes = await axios.post(imageBB_API_URL, formData);
			imageUrl = imgRes.data.data.url;
		}

		const updatedLoan = {
			title: data.title,
			description: data.description,
			interestRate: data.interestRate,
			category: data.category,
			maxLimit: data.maxLimit,
			emiPlans: data.emiPlans,
			showOnHome: data.showOnHome === 'true',
			images: imageUrl, 
		};

		await axiosSecure.patch(`/all-loans/${id}`, updatedLoan);

		Swal.fire({
			icon: 'success',
			title: 'Updated!',
			text: 'Loan updated successfully',
		});

        if(isPending){
            return <Loading></Loading>
        }
        setLoading(false);
		navigate(-1);
	};


	if (isPending|| loading) return <Loading />;

	return (
		<div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-3xl bg-base-100 shadow-xl rounded-2xl p-6"
			>
				<h2 className="text-2xl font-bold text-center mb-6">Update Loan</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* current image */}
					{loan?.images && (
						<div className="md:col-span-2 mb-4">
							<label className="label">Current Image</label>
							<img
								src={loan.images}
								alt="Current loan"
								className="w-96 h-52 object-cover rounded"
							/>
						</div>
					)}

					{/* Title */}
					<div>
						<label className="label">Loan Title</label>
						<input
							{...register('title', { required: true })}
							className="input input-bordered w-full"
						/>
					</div>

					{/* Category */}
					<div>
						<label className="label">Category</label>
						<input
							{...register('category', { required: true })}
							className="input input-bordered w-full"
						/>
					</div>

					{/* Interest Rate */}
					<div>
						<label className="label">Interest Rate</label>
						<input
							{...register('interestRate', { required: true })}
							className="input input-bordered w-full"
						/>
					</div>

					{/* Max Limit */}
					<div>
						<label className="label">Max Loan Limit</label>
						<input
							{...register('maxLimit', { required: true })}
							className="input input-bordered w-full"
						/>
					</div>

					{/* EMI Plans */}
					<div>
						<label className="label">EMI Plans</label>
						<input
							{...register('emiPlans', { required: true })}
							className="input input-bordered w-full"
						/>
					</div>

					{/* Show on Home */}
					<div>
						<label className="label">Show On Home</label>
						<select
							{...register('showOnHome', { required: true })}
							className="select select-bordered w-full"
						>
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>
					</div>
					{/* image */}
					<div className="md:col-span-2">
						<label className="label">Upload New Image</label>
						<input
							type="file"
							accept="image/*"
							{...register('images')}
							className="file-input file-input-bordered w-full"
						/>
					</div>

					{/* Description */}
					<div className="md:col-span-2">
						<label className="label">Description</label>
						<textarea
							{...register('description', { required: true })}
							className="textarea textarea-bordered w-full"
						/>
					</div>
				</div>

				<div className="flex justify-center mt-6 gap-4">
					<button type="submit" className="btn btn-primary">
						Update Loan
					</button>

					<button
						type="button"
						onClick={() => navigate(-1)}
						className="btn btn-outline"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoanUpdate;
