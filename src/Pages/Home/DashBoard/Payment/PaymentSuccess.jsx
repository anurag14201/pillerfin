import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

const PaymentSuccess = () => {
	const [searchParams] = useSearchParams();
	const sessionId = searchParams.get("session_id");
	const [paymentInfo, setPaymentInfo] = useState([])
	const axiosSecure = useAxiosSecure();
	
    useEffect(() => {
			if (sessionId) {
				axiosSecure
					.patch(`/verified-payment-success?session_id=${sessionId}`)
					.then(res => {
						setPaymentInfo(res.data)
					});
			}
		}, [sessionId, axiosSecure]);

	
	return (
		<div className='p-5'>
			<p className='text-4xl'>Payment Successful!</p>
			<p>
				<span className='font-bold'>Transaction id</span>: {paymentInfo.transactionId}
			</p>
			<Link to='/dashboard/my-loans' className='btn btn-primary'>My Products</Link>
		</div>
	);
};

export default PaymentSuccess;
