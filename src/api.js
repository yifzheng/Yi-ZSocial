import axios from "axios";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "./firebase";

export const loginCall = async (userCredentials, dispatch) => {
	dispatch({ type: "LOGIN_START" });
	try {
		signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
		const res = await axios.post(
			"http://localhost:8800/api/auth/login",
			userCredentials
		);
		dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
		localStorage.setItem("user", JSON.stringify(res.data));
	} catch (error) {
		dispatch({ type: "LOGIN_FAILURE", payload: error });
	}
};
