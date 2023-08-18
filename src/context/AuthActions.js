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

export const LOGOUT = () => ({
	type: "LOGOUT",
});

export const FOLLOW = (userId) => ({
	type: "FOLLOW",
	payload: userId,
});
export const UNFOLLOW = (userId) => ({
	type: "UNFOLLOW",
	payload: userId,
});
