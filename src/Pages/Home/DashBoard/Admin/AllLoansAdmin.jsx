import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Component/Loading/Loading';
import { BiShow, BiSolidHide } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
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
            const res = await axiosSecure.get('/all-loans-admin'); // Fixed endpoint without filtering out user email query
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
                    text: 'Your product has been deleted.',
                    icon: 'success',
                });
            }
        });
    };

    const toggleShowOnHome = loan => {
        const newValue = !loan.showOnHome;

        Swal.fire({
            title: 'Are you sure?',
            text: `This product will be ${newValue ? 'shown on' : 'hidden from'} Home`,
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
                        text: `Product is now ${newValue ? 'visible' : 'hidden'} on Home`,
                    });
                }
            }
        });
    };

    return (
        <div className="overflow-x-auto p-6 text-white max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">
                All Products ({allLoansAdmin.length})
            </h1>
            <table className="table w-full bg-zinc-900 rounded-2xl overflow-hidden border border-white/10">
                {/* head */}
                <thead className="bg-zinc-800 text-gray-300">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Price / Limit</th>
                        <th>Category</th>
                        <th className="hidden lg:table">Created By</th>
                        <th>Show on Home</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allLoansAdmin.map((loan, i) => (
                        <tr key={loan._id} className="border-b border-white/5 hover:bg-zinc-800/50">
                            <th>{i + 1}</th>
                            <td className="font-semibold">{loan.title || loan.loanTitle}</td>
                            <td>${loan.price || loan.maxLimit}</td>
                            <td>{loan.category}</td>
                            <td className="hidden lg:table text-gray-400">{loan.createdBy || 'Admin'}</td>
                            <td>
                                {loan.showOnHome === true ? (
                                    <span className="badge badge-success text-white">Visible</span>
                                ) : (
                                    <span className="badge badge-ghost">Hidden</span>
                                )}
                            </td>
                            <td className="flex flex-col sm:flex-row gap-2 items-center">
                                <Link
                                    to={`/dashboard/update-loans/${loan._id}`}
                                    className="btn btn-primary btn-sm"
                                >
                                    <MdEdit />
                                </Link>

                                <button
                                    onClick={() => handleDelete(loan)}
                                    className="btn btn-error btn-sm text-white"
                                >
                                    <AiFillDelete />
                                </button>

                                {loan.showOnHome ? (
                                    <button
                                        onClick={() => toggleShowOnHome(loan)}
                                        className="btn btn-warning btn-sm"
                                        title="Hide from Home"
                                    >
                                        <BiSolidHide className="text-lg" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => toggleShowOnHome(loan)}
                                        className="btn btn-secondary btn-sm"
                                        title="Show on Home"
                                    >
                                        <BiShow className="text-lg" />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {allLoansAdmin.length === 0 && (
                        <tr>
                            <td colSpan="7" className="text-center py-8 text-gray-400">
                                No products found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllLoansAdmin;