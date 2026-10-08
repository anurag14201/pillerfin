import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import Loading from '../../../Component/Loading/Loading';
import Swal from 'sweetalert2';
import { Sparkles, Lock, Mail } from 'lucide-react';

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
                    title: 'Invalid Credential',
                    showConfirmButton: false,
                    timer: 2000,
                });
            });
    };

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center overflow-y-auto text-white p-4">
            {/* Fullscreen Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source
                    src="https://storage.googleapis.com/mannequin/blobs/6f21daaf-db65-4f44-aad9-8acf0da7052b.webm"
                    type="video/webm"
                />
                Your browser does not support the video tag.
            </video>

            {/* Dark Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10"></div>

            {/* Centered Login Card */}
            <div className="relative z-20 bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl max-w-md w-full p-8 sm:p-10 rounded-3xl my-auto">
                {/* Header */}
                <div className="text-center mb-6">
                    <span className="inline-flex p-3 bg-primary/20 text-primary rounded-2xl mb-3 shadow-sm border border-primary/30">
                        <Sparkles className="w-6 h-6" />
                    </span>
                    <h3 className="text-3xl font-extrabold tracking-tight text-white">Welcome back</h3>
                    <p className="text-gray-300 text-sm mt-1">Please sign in to your Aura account</p>
                </div>

                {/* Test Credentials Box */}
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl mb-6 text-sm">
                    <h4 className="font-semibold text-primary mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" /> Test Credentials
                    </h4>
                    <div className="space-y-1.5 text-gray-200 text-xs font-mono">
                        <p><span className="font-semibold text-white">Manager:</span> amimanager1@gmail.com / Amimanager1@gmail.com</p>
                        <p><span className="font-semibold text-white">Admin:</span> amiadmin1@gmail.com / Amiadmin1@gmail.com</p>
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
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
                            <p className="text-red-400 text-xs mt-1">Email is required</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                <Lock className="w-4 h-4" />
                            </span>
                            <input
                                type="password"
                                {...register('password', { required: true, minLength: 6 })}
                                className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm text-white placeholder-gray-400"
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password?.type === 'minLength' && (
                            <p className="text-red-400 text-xs mt-1">
                                Password must be 6 characters or longer
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <a className="text-xs font-medium text-primary hover:underline">Forgot password?</a>
                    </div>

                    <button className="btn btn-primary w-full rounded-xl py-3 font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition-all mt-2">
                        Sign In
                    </button>
                </form>

                <div className="divider my-6 text-xs text-gray-400 uppercase tracking-widest">Or</div>

                <SocialLogin></SocialLogin>

                <div className="text-center mt-6 text-sm text-gray-300">
                    New to Aura?{' '}
                    <Link
                        state={location.state}
                        className="text-primary font-semibold hover:underline"
                        to="/register"
                    >
                        Create an account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;