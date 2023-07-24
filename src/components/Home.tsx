import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const loggedIn = JSON.parse(localStorage.getItem('user') || 'null');
		if (!loggedIn) {
			navigate('/');
		}
	}, [navigate]);

	const handleLogout = () => {
		localStorage.removeItem('user');
		navigate('/');
	};

	return (
		<div className="md:max-w-[520px] px-5 md:px-0 w-full my-0 mx-auto flex flex-col justify-center py-60 md:py-20">
			<h2 className="text-center font-semibold text-[33px] mb-9">
				You are now Home
			</h2>
			<span className="font-medium text-[20px] text-center text-black text-opacity-40">
				All you can do here is get out
			</span>

			<div className="mt-36">
				<button
					onClick={handleLogout}
					className="w-full rounded-[7px] py-3 text-white text-[21px] font-semibold bg-[#FF003D] drop-shadow-[0_5px_10px_rgba(255,150,175,0.6)]"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Home;
