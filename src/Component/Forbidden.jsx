import React from 'react';
import errorImg from '../assets/forbidden.jpg';
import { Link } from 'react-router';

const Forbidden = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
			<div className="bg-base-100 shadow-xl rounded-2xl p-6 max-w-xl w-full text-center">
				<img
					src={errorImg}
					alt="Access Forbidden"
					className="mx-auto w-80 max-w-full rounded-lg"
				/>

				<h1 className="text-2xl font-bold mt-6 text-error">Access Forbidden</h1>

				<p className="mt-2 text-gray-500">
					You do not have permission to view this page.
				</p>
				<Link to='/' className='btn btn-primary mt-5'>Go back to Home</Link>
			</div>
		</div>
	);
};

export default Forbidden;
