import { FC, useState } from 'react';
import { AuthService } from '../services/auth.service';
import { toast } from 'react-toastify';
import { setTokenToLocalStorage } from '../helper/localstorage.helper';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/user/userSlice';

const Auth: FC = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const data = await AuthService.registration({ email, password });
			if (data) {
				toast.success('Account has been created.');
				setIsLogin(!isLogin);
			}
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error.toString());
		}
	};

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const data = await AuthService.login({ email, password });
			if (data) {
        setTokenToLocalStorage('token', data.token);
        dispatch(login(data));
        toast.success('You logged in.');
        navigate('/')
			}
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error.toString());
		}
	};

	return (
		<div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
			<h1 className="text-center text-xl mb-10">
				{isLogin ? 'Login' : 'Registartion'}
			</h1>

			<form
				className="mx-auto flex w-1/3 flex-col gap-5"
				onSubmit={isLogin ? loginHandler : registrationHandler}
			>
				<input
					type="text"
					className="input"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className="input"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className="btn btn-green mx-auto">Submit</button>
			</form>

			<div className="flex justify-center mt-5">
				{isLogin ? (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						You dono't have an account?
					</button>
				) : (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						Already have an account?
					</button>
				)}
			</div>
		</div>
	);
};

export default Auth;
