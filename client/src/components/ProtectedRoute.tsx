import { FC } from 'react';
import { useAuth } from '../hooks/useAuth';
import img from '../assets/page-404-error.jpg';

interface Props {
	children: JSX.Element;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
	const isAuth = useAuth();
	return (
		<>
			{isAuth ? (
				children
			) : (
				<div className="flex flex-col justify-center items-center mt-20 gap-10">
					<h1 className="text-2-xl">
						To view this page you must be logged in.
					</h1>
					<img src={img} alt="img" className="w-1/3" />
				</div>
			)}
		</>
	);
};
