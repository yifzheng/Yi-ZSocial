/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
	user: {
		"_id": "64d684a6f994b9d75d9e4d1d",
		"userName": "asura",
		"firstName": "yifeng",
		"lastName": "zheng",
		"email": "asura@duck.com",
		"password": "$2b$10$ZX7Jix7wj3jTGl3htKq.vuO1zmUsFB2F/QM8/oJSrS9ZSaKSy1cg.",
		"profilePicture": "",
		"coverPicture": "",
		"followers": [],
		"following": [
			"64d681b3885f0ed06ddf31d7"
		],
		"isAdmin": false,
		"desc": "Hi, I'm Asura",
		"city": "Narnia",
		"from": "Ares",
		"relationship": 1,
		"createdAt": "2023-08-11T18:57:42.859Z",
		"updatedAt": "2023-08-11T20:00:27.944Z",
		"__v": 0
	},
	isFetching: false,
	error: false,
};

export const AuthContext = createContext( INITIAL_STATE ); // create an auth context

export const AuthContextProvider = ( { children } ) => {
	const [ state, dispatch ] = useReducer( AuthReducer, INITIAL_STATE );

	return (
		<AuthContext.Provider
			value={ {
				user: state.user,
				isFetching: state.isFetching,
				error: state.error,
				dispatch,
			} }
		>
			{ children }
		</AuthContext.Provider>
	);
};
