import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';

interface UserData {
	fullName: string;
	email: string;
	mobileNumber: string;
	password: string;
	confirmPassword: string;
}

const Register: React.FC = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<UserData>({
		fullName: '',
		email: '',
		mobileNumber: '',
		password: '',
		confirmPassword: '',
	});

	const [passwordStrength, setPasswordStrength] = useState<number>(0);
	const [isRegisterEnabled, setIsRegisterEnabled] = useState<boolean>(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}));

		setIsRegisterEnabled(
			formData.fullName.trim().length > 0 &&
				formData.email.trim().length > 0 &&
				formData.mobileNumber.trim().length > 0 &&
				formData.password.trim().length >= 9 &&
				formData.confirmPassword.trim().length >= 9
		);
	};

	console.log(formData.password, formData.confirmPassword);

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (
			formData.fullName.trim() === '' ||
			!/^[a-zA-Z ]+$/.test(formData.fullName) ||
			formData.email.trim() === '' ||
			!/\S+@\S+\.\S+/.test(formData.email) ||
			formData.mobileNumber.trim() === '' ||
			!/^\d{9,}$/.test(formData.mobileNumber) ||
			formData.password.trim().length < 9 ||
			formData.password !== formData.confirmPassword
		) {
			alert('Please fill in all fields correctly.');
			return;
		}

		localStorage.setItem('user', JSON.stringify(formData));

		alert('Registration successful!');
		navigate('/home');
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { value } = e.target;
		const passwordScore = zxcvbn(value).score;
		setPasswordStrength(passwordScore);
	};

	return (
		<div className="px-5 md:px-0 md:max-w-[520px] w-full my-0 mx-auto flex flex-col justify-center py-20">
			<div className="mb-12">
				<h2 className="text-[36px] font-semibold">Register to Stree</h2>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col mb-9">
					<input
						type="text"
						id="fullName"
						name="fullName"
						value={formData.fullName}
						onChange={handleChange}
						className="outline-none border-b border-black border-opacity-30 py-3 font-normal text-[20px] text-black text-opacity-40 w-full"
						placeholder="Full Name"
					/>
				</div>
				<div className="flex flex-col mb-9">
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="outline-none border-b border-black border-opacity-30 py-3 font-normal text-[20px] text-black text-opacity-40 w-full"
						placeholder="Email"
					/>
				</div>
				<div className="flex flex-col mb-9">
					<input
						type="text"
						id="mobileNumber"
						name="mobileNumber"
						value={formData.mobileNumber}
						onChange={handleChange}
						className="outline-none border-b border-black border-opacity-30 py-3 font-normal text-[20px] text-black text-opacity-40 w-full"
						placeholder="Mobile Number"
					/>
				</div>
				<div className="flex flex-col mb-3">
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={e => {
							handleChange(e);
							handlePasswordChange(e);
						}}
						className="outline-none border-b border-black border-opacity-30 py-3 font-normal text-[20px] text-black text-opacity-40 w-full"
						placeholder="Password"
					/>
				</div>
				<div className="flex flex-col mb-8">
					<div className="flex justify-between">
						<div>
							<div
								style={{
									height: '8px',
									width: '80px',
									backgroundColor: passwordStrength >= 1 ? 'red' : '#CCCCCC',
								}}
							/>
						</div>
						<div>
							<div
								style={{
									height: '8px',
									width: '80px',
									backgroundColor: passwordStrength >= 2 ? 'orange' : '#CCCCCC',
								}}
							/>
						</div>
						<div>
							<div
								style={{
									height: '8px',
									width: '80px',
									backgroundColor: passwordStrength >= 3 ? 'yellow' : '#CCCCCC',
								}}
							/>
						</div>
						<div>
							<div
								style={{
									height: '8px',
									width: '80px',
									backgroundColor: passwordStrength >= 4 ? 'green' : '#CCCCCC',
								}}
							/>
						</div>
					</div>
				</div>

				<div className="flex flex-col mb-9">
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						className="outline-none border-b border-black border-opacity-30 py-3 font-normal text-[20px] text-black text-opacity-40 w-full"
						placeholder="Confirm Password"
					/>
				</div>
				<button
					type="submit"
					className={`w-full rounded-[7px] py-3 text-white text-[21px] font-semibold ${
						isRegisterEnabled
							? 'bg-[#FF003D] drop-shadow-[0_5px_10px_rgba(255,150,175,0.6)]'
							: 'bg-[#DAD3D4] drop-shadow-[0_3px_5px_rgba(0,0,0,0.25)]'
					}`}
					disabled={!isRegisterEnabled}
				>
					Register
				</button>
				<div className="mt-11 flex justify-center">
					<h5 className="font-medium text-[18px] text-[#C3C3C3] text-center">
						By registering you agree to{' '}
						<span className="text-[#FC055E]">Terms & Conditions</span> and
						<span className="text-[#FC055E]"> Privacy Policy</span> of Stree
					</h5>
				</div>
			</form>
		</div>
	);
};

export default Register;
