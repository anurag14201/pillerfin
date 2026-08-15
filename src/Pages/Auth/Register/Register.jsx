import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import Loading from '../../../Component/Loading/Loading';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { registerUser, updateUserProfile, loading, setLoading } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const axiosSecure = useAxiosSecure();

	const handleRegistration = data => {
		const profileImg = data.photo[0];

		registerUser(data.email, data.password)
			.then(() => {
				// here sweet alert section took place
				let timerInterval;
				Swal.fire({
					title: 'Account created',
					html: 'Please wait ! <b></b> Your data is being saved.',
					timer: 5000,
					timerProgressBar: true,
					didOpen: () => {
						Swal.showLoading();
						const timer = Swal.getPopup().querySelector('b');
						timerInterval = setInterval(() => {
							timer.textContent = `${Swal.getTimerLeft()}`;
						}, 100);
					},
					willClose: () => {
						clearInterval(timerInterval);
					},
				}).then(result => {
					if (result.dismiss === Swal.DismissReason.timer) {
						// console.log('I was closed by the timer');
					}
				});
				// ends here

				const formData = new FormData();
				formData.append('image', profileImg);

				const imageBB_API_URL = `https://api.imgbb.com/1/upload?key=${
					import.meta.env.VITE_image_host_Key
				}`;

				axios.post(imageBB_API_URL, formData).then(res => {
					const photoURL = res.data.data.url;
					const userProfile = {
						displayName: data.name,
						photoURL: photoURL,
					};

					const newUser = {
						displayName: data.name,
						email: data.email,
						photoURL: photoURL,
						userType: data.appliedRole,
						role: 'Borrower till approval',
					};

					axiosSecure.post('/users', newUser);				
					updateUserProfile(userProfile)
						.then(() => {
							Swal.fire({
								position: 'top-end',
								icon: 'success',
								title: 'Register Successful!',
								showConfirmButton: false,
								timer: 1000,
							});
							navigate('/');
						})
						.catch(() => {
							Swal.fire({
								icon: 'error',
								title: 'Oops...',
								text: 'Something went wrong!',
								footer: 'Please check you connection',
							});
						});
				});
			})
			.catch((error) => {
				setLoading(false);
				alert(error)
			});
	};

	if (loading) {
		return <Loading></Loading>;
	}
	return (
		<div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
			<p className="text-center text-3xl">Please Register to Continue</p>
			<form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
				<fieldset className="fieldset">
					{/* name field */}
					<label className="label">Name</label>
					<input
						type="text"
						{...register('name', { required: true })}
						className="input"
						placeholder="Your Name"
					/>
					{errors.name?.type === 'required' && (
						<p className="text-red-500">Name is required.</p>
					)}
					{/* email field */}

					<label className="label">Email</label>
					<input
						type="email"
						{...register('email', { required: true })}
						className="input"
						placeholder="Email"
					/>
					{errors.email?.type === 'required' && (
						<p className="text-red-500">Email is required.</p>
					)}
					{/* photo image field */}
					<label className="label">Photo</label>
					<input
						type="file"
						{...register('photo', { required: false })}
						className="file-input"
						placeholder="Your Photo"
					/>

					{/* Role */}
					<label className="label">Pick a role</label>
					<select
						{...register('appliedRole', { required: true })}
						defaultValue="Pick a Role"
						className="select"
					>
						<option disabled={true}>Role</option>
						<option>Borrower</option>
						<option>Manager</option>
					</select>

					{errors.appliedRole?.type === 'required' && (
						<p className="text-red-500">Role is required</p>
					)}

					{/* Password field */}

					<label className="label">Password</label>

					<input
						type="password"
						{...register('password', {
							required: true,
							minLength: 6,
							pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
						})}
						className="input"
						placeholder="Password"
					/>
					{errors.password?.type === 'required' && (
						<p className="text-red-500">Password is required.</p>
					)}
					{errors.password?.type === 'minLength' && (
						<p className="text-red-500">
							Password must be 6 characters or longer
						</p>
					)}
					{errors.password?.type === 'pattern' && (
						<p className="text-red-500">
							Password must have at least one uppercase, at least one lowercase,
							at least one number, and at least one special characters
						</p>
					)}
					<div>
						<a className="link link-hover">Forgot password?</a>
					</div>
					<button className="btn btn-primary mt-4">Register</button>
					<p className="text-center">Already have an account?</p>
					<Link
						to="/login"
						state={location.state}
						className="text-primary font-semibold text-center underline"
					>
						Login
					</Link>
				</fieldset>
			</form>
			<span className="text-center font-bold text-lg">Or</span>
			<SocialLogin></SocialLogin>
		</div>
	);
};

export default Register;
