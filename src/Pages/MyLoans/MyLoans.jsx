import React, { useRef, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Loading from '../../Component/Loading/Loading';
import Swal from 'sweetalert2';
import { FcViewDetails } from 'react-icons/fc';

const MyLoans = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const loanModalRef = useRef();
    const [loanDetailsId, setLoanDetailsId] = useState(null);

    const {
        data: loanApplications = [],
        isPending,
        refetch,
    } = useQuery({
        queryKey: ['loanApplications', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/orders?email=${user.email}`
            );
            return res.data;
        },
    });

    const openLoanModal = loanApplication => {
        const targetId = loanApplication.loanDetailsId || loanApplication.productId || loanApplication.loanId || loanApplication.itemId || loanApplication._id;
        setLoanDetailsId(targetId);
        loanModalRef.current.showModal();
    };

    const { data } = useQuery({
        queryKey: ['loan-Details', loanDetailsId],
        enabled: !!loanDetailsId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-loans/${loanDetailsId}`);
            return res.data;
        },
    });

    if (isPending) {
        return <Loading></Loading>;
    }

    const handlePayment = async loanApplication => {
        try {
            const unitPrice = data?.price || data?.maxLimit || loanApplication.price || 1200;
            const quantity = parseInt(loanApplication.loanAmount || loanApplication.quantity) || 1;
            const calculatedTotal = unitPrice * quantity;

            const result = await Swal.fire({
                title: 'Proceed to Payment',
                text: `You will be charged $${calculatedTotal} (${quantity} item(s) @ $${unitPrice} each)!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, proceed!',
            });

            if (!result.isConfirmed) return;

            const paymentInfo = {
                orderId: loanApplication._id,
                orderTrackingId: loanApplication.orderTrackingId,
                productTitle: loanApplication.loanTitle || loanApplication.title,
                totalAmount: calculatedTotal,
                email: loanApplication.email,
            };

            const res = await axiosSecure.post(
                '/create-checkout-session',
                paymentInfo
            );

            if (res.data.url) {
                window.location.assign(res.data.url);
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: 'Please try again later',
            });
        }
    };

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/loan-application/${id}/delete`).then(res => {
                    if (res.data.deletedCount) {
                        refetch();
                    }
                });
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your order has been deleted.',
                    icon: 'success',
                });
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto p-4 text-gray-900 dark:text-white">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">My Orders</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-xl p-3 sm:p-5">
                {loanApplications.length === 0 ? (
                    <p className="font-semibold text-xl sm:text-2xl text-center py-12 text-gray-500">
                        No orders placed yet.
                    </p>
                ) : (
                    <table className="table w-full text-xs sm:text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300">
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Product Info</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loanApplications.map((loanApplication, i) => (
                                <tr key={loanApplication._id} className="border-b border-gray-100 dark:border-white/5 align-middle">
                                    <th>{i + 1}</th>
                                    <td className="font-mono text-[10px] sm:text-xs opacity-80 max-w-[100px] sm:max-w-none truncate">
                                        {loanApplication.orderTrackingId || loanApplication.loanId || 'AURA-ORDER'}
                                    </td>
                                    <td>
                                        <div className="font-bold text-sm sm:text-base">{loanApplication.loanTitle || loanApplication.title}</div>
                                        <div className="text-[11px] text-gray-400">Qty: {loanApplication.loanAmount || loanApplication.quantity || 1}</div>
                                    </td>
                                    <td className="font-semibold text-primary whitespace-nowrap">
                                        ${loanApplication.totalAmount || (loanApplication.loanAmount ? loanApplication.loanAmount * 1200 : 'N/A')}
                                    </td>
                                    <td>
                                        <span className={`badge badge-sm sm:badge-md ${loanApplication.paymentStatus === 'paid' ? 'badge-success text-white' : 'badge-warning font-medium'}`}>
                                            {loanApplication.paymentStatus === 'paid' ? 'Paid' : (loanApplication.loanStatus || 'Pending')}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center justify-start sm:justify-center">
                                            {loanApplication.paymentStatus === 'paid' ? (
                                                <span className="text-green-600 font-bold px-2 py-1 text-xs">
                                                    Paid
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handlePayment(loanApplication)}
                                                    className="btn btn-secondary text-white btn-xs sm:btn-sm rounded-full px-3"
                                                >
                                                    Pay
                                                </button>
                                            )}

                                            {loanApplication.loanStatus === 'Pending' && loanApplication.paymentStatus !== 'paid' ? (
                                                <button
                                                    onClick={() => handleDelete(loanApplication._id)}
                                                    className="btn btn-xs sm:btn-sm btn-ghost hover:btn-error rounded-full"
                                                    title="Delete Order"
                                                >
                                                    <RiDeleteBin6Line className="text-base sm:text-lg" />
                                                </button>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="btn btn-xs sm:btn-sm btn-ghost opacity-40 cursor-not-allowed rounded-full"
                                                >
                                                    <RiDeleteBin6Line className="text-base sm:text-lg" />
                                                </button>
                                            )}

                                            <button
                                                onClick={() => openLoanModal(loanApplication)}
                                                className="btn btn-xs sm:btn-sm btn-outline rounded-full"
                                                title="View Details"
                                            >
                                                <FcViewDetails className="text-base sm:text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* view details modal */}
            <dialog ref={loanModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box w-full max-w-md bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-white/10">
                    <h3 className="font-bold text-xl mb-4 text-center">Product Details</h3>

                    {data ? (
                        <div className="card bg-gray-50 dark:bg-zinc-800 shadow-inner border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
                            <figure className="px-4 pt-4 overflow-hidden rounded-t-2xl w-full flex justify-center bg-black">
                                <img
                                    src={data.images || data.image}
                                    alt={data.title}
                                    className="rounded-xl max-h-48 object-cover w-full"
                                />
                            </figure>

                            <div className="p-4 flex flex-wrap justify-center gap-2 text-center">
                                <div className="badge badge-outline border-primary text-primary">
                                    Category: {data.category}
                                </div>
                                <div className="badge badge-outline border-secondary text-secondary">
                                    Price: ${data.price || data.maxLimit}
                                </div>
                                <div className="badge badge-outline border-accent text-accent">
                                    Stock: {data.stock || 'Available'}
                                </div>
                            </div>

                            <div className="card-body items-center text-center px-4 pb-6">
                                <h2 className="text-2xl font-bold">
                                    {data.title}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-300 text-sm mt-2 leading-relaxed">
                                    {data.description}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="py-12"><Loading></Loading></div>
                    )}

                    <div className="modal-action mt-6 justify-center">
                        <form method="dialog">
                            <button className="btn btn-primary rounded-full px-6">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyLoans;