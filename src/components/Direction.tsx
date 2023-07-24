import React from 'react';
import { Link } from 'react-router-dom';

export const Direction = () => {
	return (
		<div className="w-fit px-5 rounded-[7px] absolute top-[50%] left-[50%] translate-x-[-50%] py-3 text-white text-[21px] font-semibold bg-[#FF003D] drop-shadow-[0_5px_10px_rgba(255,150,175,0.6)]">
			<Link to={'/login'}>Go To Login</Link>
		</div>
	);
};
