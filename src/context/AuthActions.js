export const LOGINSTART = (userCredentials) => ({
	type: "LOGIN_START",
});

export const LOGINSUCCESS = (user) => ({
	type: "LOGIN_SUCCESS",
	payload: user,
});

export const LOGINFAILURE = (error) => ({
	type: "LOGIN_FAILURE",
	payload: error,
});

export const REGISTERSTART = (user) => ({
	type: "REGISTER_START",
});

export const REGISTERSUCCESS = (user) => ({
	type: "REGISTER_SUCCESS",
	payload: user,
});

export const REGISTERFAILURE = (error) => ({
	type: "REGISTER_FAILURE",
	payload: error,
});