import React from 'react';
import { Outlet } from 'react-router';
import loginImg from '../assets/towfiqu-barbhuiya-nApaSgkzaxg-unsplash.jpg';

const AuthLayout = () => {
	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
			<div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
				<div className="grid grid-cols-1 md:grid-cols-2">
					{/* Left: Auth Content */}
					<div className="flex items-center justify-center p-8 md:p-12">
						<div className="w-full max-w-md">
							<Outlet />
						</div>
					</div>

					{/* Right: Image */}
					<div className="hidden md:block relative">
						<img
							src={loginImg}
							alt="Authentication"
							className="h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-black/20"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
