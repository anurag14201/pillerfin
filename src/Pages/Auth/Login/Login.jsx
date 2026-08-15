import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import Loading from '../../../Component/Loading/Loading';
import Swal from 'sweetalert2';

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { signInUser, loading, setLoading } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const handleLogin = data => {
		signInUser(data.email, data.password)
			.then(() => {
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Login Successful',
					showConfirmButton: false,
					timer: 1000,
				});
				navigate(location?.state || '/');
			})
			.catch(() => {
				
				setLoading(false);
				Swal.fire({
					position: 'top-end',
					icon: 'warning',
					title: "Invalid Credential",
					showConfirmButton: false,
					timer: 2000,
				});
			});
	};

	if (loading) {
		return <Loading></Loading>;
	}

	return (
		<div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
			<h3 className="text-3xl text-center">Welcome back</h3>
			<p className="text-center">Please Login</p>

			<div className="bg-blue-50 border border-blue-200 p-4 rounded mb-6">
				<h4 className="font-semibold text-blue-700 mb-2">Test Credentials</h4>
				<p className="text-gray-700 text-sm">
					<span className="font-semibold">Manager:</span>  <br />
					E: amimanager1@gmail.com
					<br />
					P: Amimanager1@gmail.com
				</p>
				<p className="text-gray-700 text-sm">
					<span className="font-semibold">Admin: <br /></span>E: amiadmin1@gmail.com
					<br />
					P: Amiadmin1@gmail.com
				</p>
			</div>
			<form className="card-body" onSubmit={handleSubmit(handleLogin)}>
				<fieldset className="fieldset">
					{/* email field */}
					<label className="label">Email</label>
					<input
						type="email"
						{...register('email', { required: true })}
						className="input"
						placeholder="Email"
					/>
					{errors.email?.type === 'required' && (
						<p className="text-red-500">Email is required</p>
					)}

					{/* password field */}
					<label className="label">Password</label>
					<input
						type="password"
						{...register('password', { required: true, minLength: 6 })}
						className="input"
						placeholder="Password"
					/>
					{errors.password?.type === 'minLength' && (
						<p className="text-red-500">
							Password must be 6 characters or longer{' '}
						</p>
					)}

					<div>
						<a className="link link-hover">Forgot password?</a>
					</div>
					<button className="btn btn-primary mt-4">Login</button>
					<p className="text-center">New to Pillar Finance? </p>
					<Link
						state={location.state}
						className="text-center text-primary font-semibold underline"
						to="/register"
					>
						Register
					</Link>
				</fieldset>
			</form>
			<span className="text-center font-bold text-lg">Or</span>
			<SocialLogin></SocialLogin>
		</div>
	);
};

export default Login;
