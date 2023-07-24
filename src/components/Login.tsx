import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

interface UserData {
	fullName: string;
	email: string;
	mobileNumber: string;
	password: string;
}

const Login: React.FC = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [loggedIn, setLoggedIn] = useState(false);
	const [storedUserData, setStoredUserData] = useState<UserData | null>(null);

	const [isLoginEnabled, setIsLoginEnabled] = useState<boolean>(false);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem('user') || 'null');
		setStoredUserData(userData);
	}, []);

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}));

		setIsLoginEnabled(
			formData.email.trim().length > 0 && formData.password.trim().length > 0
		);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (
			formData.email.trim() === '' ||
			!/\S+@\S+\.\S+/.test(formData.email) ||
			formData.password.trim() === ''
		) {
			alert('Please enter valid email and password.');
			return;
		}

		if (
			storedUserData &&
			storedUserData.email === formData.email &&
			storedUserData.password === formData.password
		) {
			setLoggedIn(true);
			alert('Login successful!');
		} else {
			alert('Invalid email or password. Please try again.');
		}
	};

	if (loggedIn) {
		navigate('/home');
		return null;
	}

	return (
		<div className="px-5 md:px-0 md:max-w-[520px] w-full my-0 mx-auto flex flex-col justify-center py-32 md:py-20">
			<div className="w-[230px] h-[78px] mx-auto mt-0 mb-16">
				<img src={logo} alt="logo" className="w-full h-full object-contain" />
			</div>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col mb-9">
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="outline-none border-b border-black border-opacity-30 py-3 font-normal text-[20px] text-black text-opacity-40"
						placeholder="Email ID"
					/>
				</div>
				<div className="flex flex-col mb-5">
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="outline-none border-b border-black border-opacity-30 py-3 font-normal text-[20px] text-black text-opacity-40"
						placeholder="Password"
					/>
				</div>
				<div className="flex justify-end mb-10">
					<h4 className="text-[#FC055E] font-medium text-[18px]">
						Forgot Password?
					</h4>
				</div>
				<button
					type="submit"
					className={`w-full rounded-[7px] py-3 text-white text-[21px] font-semibold ${
						isLoginEnabled
							? 'bg-[#FF003D] drop-shadow-[0_5px_10px_rgba(255,150,175,0.6)]'
							: 'bg-[#DAD3D4] drop-shadow-[0_3px_5px_rgba(0,0,0,0.25)]'
					}`}
					disabled={!isLoginEnabled}
				>
					Login
				</button>
				<div className="mt-11 flex justify-center">
					<h5 className="font-medium text-[18px] text-[#C3C3C3]">
						Don't have an account?{' '}
						<Link to={'/register'} className="text-[#FC055E]">
							Register Now
						</Link>
					</h5>
				</div>
			</form>
		</div>
	);
};

export default Login;
