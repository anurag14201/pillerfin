import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../../Component/Loading/Loading';
import useAuth from '../../../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const AddLoans = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleAddLoan = async (data) => {
        setLoading(true);
        try {
            const profileImg = data.images[0];
            const formData = new FormData();
            formData.append('image', profileImg);
            const imageBB_API_URL = `https://api.imgbb.com/1/upload?key=${
                import.meta.env.VITE_image_host_Key
            }`;
            
            const imageRes = await axios.post(imageBB_API_URL, formData);
            const photoURL = imageRes.data.data.url;

            const payload = {
                ...data,
                requiredDocuments: data.requiredDocuments ? data.requiredDocuments.split(',').map(doc => doc.trim()) : ['NID', 'Photo'],
                emiPlans: `${data.emiMonths} months`,
                showOnHome: data.showOnHome === 'true',
                images: photoURL,
            };
            delete payload.emiMonths;

            await axiosSecure.post(`/all-loans?email=${user?.email}`, payload);
            
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Product Created Successfully!!!',
                showConfirmButton: false,
                timer: 1500,
            });

            navigate('/dashboard/manage-loans');
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while adding the product!',
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black py-12 px-4">
            <form
                onSubmit={handleSubmit(handleAddLoan)}
                className="w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 shadow-2xl rounded-3xl p-8"
            >
                <h2 className="text-3xl font-bold text-center mb-8">Add New Product / Loan</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Loan Title */}
                    <div className="form-control">
                        <label className="label font-medium">Title</label>
                        <input
                            type="text"
                            {...register('title', { required: true })}
                            className="input input-bordered w-full bg-zinc-800/50"
                            placeholder="Product / Loan Title"
                        />
                        {errors.title && <span className="text-red-500 text-sm mt-1">Title is required</span>}
                    </div>

                    {/* Category */}
                    <div className="form-control">
                        <label className="label font-medium">Category</label>
                        <input
                            type="text"
                            {...register('category', { required: true })}
                            className="input input-bordered w-full bg-zinc-800/50"
                            placeholder="Category"
                        />
                        {errors.category && <span className="text-red-500 text-sm mt-1">Category is required</span>}
                    </div>

                    {/* Interest Rate / Price */}
                    <div className="form-control">
                        <label className="label font-medium">Interest Rate / Price</label>
                        <input
                            type="text"
                            {...register('interestRate', { required: true })}
                            className="input input-bordered w-full bg-zinc-800/50"
                            placeholder="e.g. 12% or $299"
                        />
                        {errors.interestRate && <span className="text-red-500 text-sm mt-1">Interest rate/price is required</span>}
                    </div>

                    {/* Max Loan Limit / Stock */}
                    <div className="form-control">
                        <label className="label font-medium">Max Limit / Price Limit</label>
                        <input
                            type="text"
                            {...register('maxLimit', { required: true })}
                            className="input input-bordered w-full bg-zinc-800/50"
                            placeholder="Max limit amount"
                        />
                        {errors.maxLimit && <span className="text-red-500 text-sm mt-1">Max limit is required</span>}
                    </div>

                    {/* Required Documents */}
                    <div className="form-control">
                        <label className="label font-medium">Required Documents (comma separated)</label>
                        <input
                            type="text"
                            {...register('requiredDocuments')}
                            defaultValue="NID, Photo"
                            className="input input-bordered w-full bg-zinc-800/50"
                            placeholder="NID, Photo, Income Certificate"
                        />
                    </div>

                    {/* EMI Plans */}
                    <div className="form-control">
                        <label className="label font-medium">EMI Months</label>
                        <input
                            type="number"
                            {...register('emiMonths', { required: true })}
                            className="input input-bordered w-full bg-zinc-800/50"
                            placeholder="Enter number of months"
                        />
                        {errors.emiMonths && <span className="text-red-500 text-sm mt-1">EMI months required</span>}
                    </div>

                    {/* Photo Image Field */}
                    <div className="form-control">
                        <label className="label font-medium">Product Image</label>
                        <input
                            type="file"
                            {...register('images', { required: true })}
                            className="file-input file-input-bordered w-full bg-zinc-800/50"
                        />
                        {errors.images && <span className="text-red-500 text-sm mt-1">Image file is required</span>}
                    </div>

                    {/* Show On Home */}
                    <div className="form-control">
                        <label className="label font-medium">Show On Home</label>
                        <select
                            {...register('showOnHome', { required: true })}
                            className="select select-bordered w-full bg-zinc-800/50"
                        >
                            <option value="">Select visibility</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        {errors.showOnHome && <span className="text-red-500 text-sm mt-1">Selection required</span>}
                    </div>
                </div>

                {/* Description (Full Width) */}
                <div className="form-control mt-4">
                    <label className="label font-medium">Description</label>
                    <textarea
                        {...register('description', { required: true })}
                        className="textarea textarea-bordered h-24 w-full bg-zinc-800/50"
                        placeholder="Detailed description..."
                    ></textarea>
                    {errors.description && <span className="text-red-500 text-sm mt-1">Description is required</span>}
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        className="btn btn-primary px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddLoans;