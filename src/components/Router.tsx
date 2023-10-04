import {createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import {PostDetail, PostEdit, PostList, PostNew} from '../pages/home/posts';
import { Login } from "../pages/login";
import { Profile } from "../pages/profile";
import { Signup } from "../pages/signup";
import { Home } from '../pages/home';

export default createBrowserRouter([
	{
		path: "/",
		element: <App/>,
		children: [
			{ path: "", element: <Home/> },
			{
				path: "posts",
				element: <PostList/>,
				children: [
					{ path: ":id", element: <PostDetail/> },
					{ path: "new", element: <PostNew/> },
					{ path: "edit/:id", element: <PostEdit/> },
				]
			},
			{ path: "profile", element: <Profile/> },
			{ path: "login", element: <Login/> },
			{ path: "signup", element: <Signup/> },
		]
	},
	{ path: "*", element: <Navigate replace to="/"/> },
]);