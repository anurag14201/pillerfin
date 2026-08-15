import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../../Component/Loading/Loading';
import useAuth from '../../../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const AddLoans = () => {
    const {user} = useAuth()
	const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState();
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleAddLoan = data => {
        setLoading(true)
		const profileImg = data.images[0];
		const formData = new FormData();
		formData.append('image', profileImg);
		const imageBB_API_URL = `https://api.imgbb.com/1/upload?key=${
			import.meta.env.VITE_image_host_Key
		}`;
		axios.post(imageBB_API_URL, formData).then(res => {
			const photoURL = res.data.data.url;

			const payload = {
				...data,
				requiredDocuments: ['NID', 'Photo'],
				emiPlans: `${data.emiMonths} months`,
				showOnHome: data.showOnHome === 'true',
				images: photoURL,
			};
			delete payload.emiMonths;

			axiosSecure.post(`/all-loans?email=${user.email}`, payload)
			.then(()=>{
                
				
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Loan Created Successfully!!!',
					showConfirmButton: false,
					timer: 1000,
				});

                setLoading(false);
				navigate('/dashboard/manage-loans');
            })			
		});

	};

    if(loading){
        return <Loading></Loading>
    }

	return (
		<div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
			<form
				onSubmit={handleSubmit(handleAddLoan)}
				className="w-full max-w-4xl bg-base-100 shadow-xl rounded-2xl"
			>
				<h2 className="text-2xl font-bold text-center pt-6">Add New Loan</h2>
				<div className=" grid grid-cols-1 md:grid-cols-2 items-center">
					<fieldset className="card-body grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Loan title */}
						<label className="label">Loan Title</label>
						<input
							type="text"
							{...register('title', { required: true })}
							className="input"
							placeholder="Loan Title"
						/>
						{errors.title?.type === 'required' && (
							<span className="text-red-500">is required</span>
						)}

						{/* description */}
						<label className="label">Description</label>
						<input
							{...register('description', { required: true })}
							type="text"
							className="input"
							placeholder="Description"
						/>
						{errors.description?.type === 'required' && (
							<span className="text-red-500">Description is required</span>
						)}
						{/* Category */}
						<label className="label">Category</label>
						<input
							type="text"
							{...register('category', { required: true })}
							className="input"
							placeholder="Category"
						/>
						{errors.category?.type === 'required' && (
							<span className="text-red-500">Category is required</span>
						)}
						{/* interest rate */}
						<label className="label">interest rate</label>
						<input
							type="text"
							{...register('interestRate', { required: true })}
							className="input"
							placeholder="interest rate"
						/>
						{errors.interestRate?.type === 'required' && (
							<span className="text-red-500">Interest Rate is required</span>
						)}

						{/* max loan limit */}
						<label className="label">Max loan limit</label>
						<input
							type="text"
							{...register('maxLimit', { required: true })}
							className="input"
							placeholder="Max loan limit"
						/>
						{errors.maxLimit?.type === 'required' && (
							<span className="text-red-500">Max limit is required</span>
						)}

						{/* required documents */}
						<label className="label">Required documents</label>
						<input
							type="text"
							{...register('requiredDocuments', { required: true })}
							value="NID, Photo"
							className="input"
							placeholder="Contact Number"
						/>

						{/* EMI plans */}
						<label className="label">EMI plans</label>
						<input
							type="number"
							{...register('emiMonths', { required: true })}
							className="input"
							placeholder="Enter number of months"
						/>
						{errors.emiMonths?.type === 'required' && (
							<span className="text-red-500">EMI is required</span>
						)}

						{/* photo image field */}
						<label className="label">Photo</label>
						<input
							type="file"
							{...register('images', { required: true })}
							className="file-input"
							placeholder="Your Photo"
						/>
						{errors.images?.type === 'required' && (
							<span className="text-red-500">Images is required</span>
						)}
						{/* showOnHome */}
						<label className="label">Show On Home</label>
						<select
							{...register('showOnHome', { required: true })}
							className="select"
						>
							<option value="">Select</option>
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>
						{errors.showOnHome?.type === 'required' && (
							<span className="text-red-500">Show On Home is required</span>
						)}
					</fieldset>
				</div>

				<div className="flex justify-center pb-6">
					<input
						className="btn btn-primary my-2 ml-5"
						type="submit"
						value={loading ? 'submitting' : 'Submit Loan'}
						disabled={loading}
					/>
				</div>
			</form>
		</div>
	);
};

export default AddLoans;
