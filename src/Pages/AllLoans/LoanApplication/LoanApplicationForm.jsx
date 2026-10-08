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
                    title: 'Device order placed successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/dashboard/my-loans');
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto p-5 pt-28">
            <h4 className="text-3xl font-bold my-5 tracking-tight">
                Secure Device Checkout
            </h4>
            <form onSubmit={handleSubmit(handleLoanApplication)}>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <fieldset className="card-body">
                        {/* user email */}
                        <label className="label">User Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            defaultValue={user?.email}
                            className="input input-bordered"
                            placeholder="User Email"
                        />
                        {/* Loan Title -> Product Title */}
                        <label className="label">Selected Device</label>
                        <input
                            type="text"
                            {...register('loanTitle')}
                            defaultValue={loan.title}
                            className="input input-bordered"
                        />
                        {/* interest rate -> Price */}
                        <label className="label">Device Price ($)</label>
                        <input
                            type="text"
                            {...register('interestRate')}
                            defaultValue={loan.interestRate || loan.price}
                            className="input input-bordered"
                        />
                        {/* First Name */}
                        <label className="label">First Name</label>
                        <input
                            type="text"
                            {...register('firstName', { required: true })}
                            className="input input-bordered"
                            placeholder="First Name"
                        />
                        {errors.firstName?.type === 'required' && (
                            <p className="text-red-500 text-xs mt-1">First Name is required</p>
                        )}
                        {/* Last Name */}
                        <label className="label">Last Name</label>
                        <input
                            type="text"
                            {...register('lastName', { required: true })}
                            className="input input-bordered"
                            placeholder="Last Name"
                        />
                        {errors.lastName?.type === 'required' && (
                            <p className="text-red-500 text-xs mt-1">Last Name is required</p>
                        )}
                        {/* Contact number */}
                        <label className="label">Contact Number</label>
                        <input
                            type="text"
                            {...register('contact', { required: true })}
                            className="input input-bordered"
                            placeholder="Contact Number"
                        />
                        {errors.contact?.type === 'required' && (
                            <p className="text-red-500 text-xs mt-1">Contact Number is required</p>
                        )}
                        {/* National ID -> Govt ID / Order Verification */}
                        <label className="label">Govt ID / Passport Verification</label>
                        <input
                            type="text"
                            {...register('nid', { required: true })}
                            className="input input-bordered"
                            placeholder="NID / Passport Number"
                        />
                        {errors.nid?.type === 'required' && (
                            <p className="text-red-500 text-xs mt-1">Verification ID is required</p>
                        )}
                    </fieldset>

                    <fieldset className="card-body">
                        {/* Replaced Income Source -> Device Storage Edition */}
                        <label className="label">Storage & RAM Configuration</label>
                        <input
                            type="text"
                            {...register('incomeSource', { required: true })}
                            className="input input-bordered"
                            placeholder="e.g. 512GB / 1TB Titanium Edition"
                        />
                        {errors.incomeSource?.type === 'required' && (
                            <p className="text-red-500 text-xs mt-1">Storage selection is required</p>
                        )}

                        {/* Replaced Monthly Income -> Preferred Color */}
                        <label className="label">Device Color / Finish</label>
                        <input
                            type="text"
                            {...register('monthlyIncome', { required: true })}
                            className="input input-bordered"
                            placeholder="e.g. Natural Titanium / Deep Blue"
                        />
                        {errors.monthlyIncome?.type === 'required' && (
                            <p className="text-red-500 text-xs mt-1">Color selection is required</p>
                        )}

                        {/* Replaced Loan Amount -> Order Quantity */}
                        <label className="label">Order Quantity</label>
                        <input
                            type="text"
                            {...register('loanAmount', { required: true })}
                            className="input input-bordered"
                            placeholder="1"
                        />
                        {errors.loanAmount?.type === 'required' && (
                            <p className="text-red-500 text-xs mt-1">Quantity is required</p>
                        )}

                        {/* Replaced Reason for Loan -> Shipping Speed */}
                        <label className="label">Shipping Speed / Courier Preference</label>
                        <input
                            type="text"
                            {...register('loanReason', { required: true })}
                            className="input input-bordered"
                            placeholder="e.g. Insured Express Priority Delivery"
                        />
                        {errors.loanReason?.type === 'required' && (
                            <p className="text-red-500 text-xs mt-1">Shipping option is required</p>
                        )}

                        {/* Address */}
                        <label className="label">Shipping Address</label>
                        <input
                            type="text"
                            {...register('address', { required: true })}
                            className="input input-bordered"
                            placeholder="Street, City, Postal Code"
                        />
                        {errors.address?.type === 'required' && (
                            <p className="text-red-500 text-xs mt-1">Address is required</p>
                        )}

                        {/* Extra Notes */}
                        <label className="label">Delivery Instructions</label>
                        <input
                            type="text"
                            {...register('notes')}
                            className="input input-bordered"
                            placeholder="Special notes for delivery courier"
                        />

                        {/* Status */}
                        <label className="label">Order Status</label>
                        <input
                            type="text"
                            defaultValue="Pending"
                            className="input input-bordered"
                            {...register('loanStatus')}
                            disabled
                        />
                    </fieldset>
                </div>

                <div className="flex gap-2 ml-5 my-4">
                    <input
                        className="btn btn-primary"
                        type="submit"
                        value="Place Order"
                    />
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                        Back to Product Details
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoanApplicationForm;