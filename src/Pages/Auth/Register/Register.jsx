import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import Loading from '../../../Component/Loading/Loading';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Sparkles, Lock, Mail, User, Shield } from 'lucide-react';

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
                });

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
                                footer: 'Please check your connection',
                            });
                        });
                });
            })
            .catch((error) => {
                setLoading(false);
                alert(error);
            });
    };

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center overflow-y-auto text-white p-4 py-12">
            {/* Fullscreen Apple Watch Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source
                    src="https://storage.googleapis.com/mannequin/blobs/e235082e-7249-441e-9d01-6ee995b5ba91.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>

            {/* Dark Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10"></div>

            {/* Centered Registration Card */}
            <div className="relative z-20 bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl max-w-md w-full p-8 sm:p-10 rounded-3xl my-auto">
                {/* Header */}
                <div className="text-center mb-6">
                    <span className="inline-flex p-3 bg-primary/20 text-primary rounded-2xl mb-3 shadow-sm border border-primary/30">
                        <Sparkles className="w-6 h-6" />
                    </span>
                    <h3 className="text-3xl font-extrabold tracking-tight text-white">Create Account</h3>
                    <p className="text-gray-300 text-sm mt-1">Please register to continue with Aura</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(handleRegistration)}>
                    {/* Name field */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Name</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                <User className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm text-white placeholder-gray-400"
                                placeholder="Your Name"
                            />
                        </div>
                        {errors.name?.type === 'required' && (
                            <p className="text-red-400 text-xs mt-1">Name is required.</p>
                        )}
                    </div>

                    {/* Email field */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Email</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                <Mail className="w-4 h-4" />
                            </span>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm text-white placeholder-gray-400"
                                placeholder="name@example.com"
                            />
                        </div>
                        {errors.email?.type === 'required' && (
                            <p className="text-red-400 text-xs mt-1">Email is required.</p>
                        )}
                    </div>

                    {/* Photo image field */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Photo</label>
                        <input
                            type="file"
                            {...register('photo', { required: false })}
                            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl cursor-pointer"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Pick a Role</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
                                <Shield className="w-4 h-4" />
                            </span>
                            <select
                                {...register('appliedRole', { required: true })}
                                defaultValue="Role"
                                className="w-full pl-11 pr-4 py-3 bg-zinc-900 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm text-white"
                            >
                                <option disabled={true} value="Role">Role</option>
                                <option className="bg-zinc-900 text-white">Borrower</option>
                                <option className="bg-zinc-900 text-white">Manager</option>
                            </select>
                        </div>
                        {errors.appliedRole?.type === 'required' && (
                            <p className="text-red-400 text-xs mt-1">Role is required</p>
                        )}
                    </div>

                    {/* Password field */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                <Lock className="w-4 h-4" />
                            </span>
                            <input
                                type="password"
                                {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                                })}
                                className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm text-white placeholder-gray-400"
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password?.type === 'required' && (
                            <p className="text-red-400 text-xs mt-1">Password is required.</p>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <p className="text-red-400 text-xs mt-1">
                                Password must be 6 characters or longer
                            </p>
                        )}
                        {errors.password?.type === 'pattern' && (
                            <p className="text-red-400 text-xs mt-1">
                                Password must have uppercase, lowercase, number, and special character.
                            </p>
                        )}
                    </div>

                    <button className="btn btn-primary w-full rounded-xl py-3 font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition-all mt-2">
                        Register
                    </button>
                </form>

                <div className="divider my-6 text-xs text-gray-400 uppercase tracking-widest">Or</div>

                <SocialLogin></SocialLogin>

                <div className="text-center mt-6 text-sm text-gray-300">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        state={location.state}
                        className="text-primary font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;