import { useEffect, useRef, useState, createContext, useContext, useCallback } from 'react';

import {
	createBrowserRouter,
	LoaderFunctionArgs,
	useNavigate,
	redirect,
} from "react-router-dom";
import { Home } from "../views/Home";
import { Login } from "../views/Login";

import axios from 'axios';
import Paraphrasing from '../views/Paraphrasing';
import Grammar from '../views/Grammar';
import Plagiarism from '../views/Plagiarism';
axios.defaults.withCredentials = true;

const serverUrl = process.env.REACT_APP_SERVER_URL;
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(null)
	const [user, setUser] = useState(null)

	const checkLoginState = useCallback(async () => {
		try {
			const {
				data: { loggedIn: logged_in, user },
			} = await axios.get(`${serverUrl}/auth/logged_in`)
			setLoggedIn(logged_in)
			user && setUser(user)
		} catch (err) {
			console.error(err)
		}
	}, [])

	useEffect(() => {
		checkLoginState()
	}, [checkLoginState])

	return <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>{children}</AuthContext.Provider>
}

const Callback = () => {
	const called = useRef(false);
	const { checkLoginState, loggedIn } = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		;(async () => {
			if (loggedIn === false) {
				try {
					if (called.current) return // prevent rerender caused by StrictMode
					called.current = true
					const res = await axios.get(`${serverUrl}/auth/token${window.location.search}`)
					console.log('response: ', res)
					checkLoginState()
					navigate('/')
				} catch (err) {
					console.error(err)
					navigate('/')
				}
			} else if (loggedIn === true) {
				navigate('/')
			}
		})()
	}, [checkLoginState, loggedIn, navigate]);
	return <></>
};

const Dashboard = () => {
	const { loggedIn } = useContext(AuthContext);
	console.log(loggedIn);
	if (loggedIn === true) return <Home />;
	if (loggedIn === false) return <Login />;
	return <></>;
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard />,
	},
	{
		path:"/Paraphrasing",
		element: <Paraphrasing/>
	},
	{
		path:"/Grammar",
		element: <Grammar/>
	},
	{
		path:"/Plagiarism",
		element: <Plagiarism/>
	},
	{
		path: '/auth/callback', // google will redirect here
		element: <Callback />,
	},
]);


export default router;
