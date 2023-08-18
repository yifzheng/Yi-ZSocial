/* eslint-disable react-hooks/exhaustive-deps */
import "./login.scss"
import Logo from "../../assets/snap.png"
import { useContext, useEffect, useRef } from "react"
import { loginCall } from "../../api"
import { AuthContext } from "../../../src/context/AuthContext"
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router"

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef()
    const passwordRef = useRef()
    const { isFetching, error, dispatch } = useContext( AuthContext )

    // check if there is a user on localstorage and set to context
    useEffect( () => {
        const storedUser = localStorage.getItem( "user" )
        if ( storedUser ) {
            dispatch( { type: "LOGIN_SUCCESS", payload: JSON.parse(storedUser) } )
        }
    }, [] )

    const handleSubmit = ( e ) => {
        e.preventDefault();
        loginCall( { email: emailRef.current.value, password: passwordRef.current.value }, dispatch )
    }


    return (
        <div className="login">
            <div className="wrapper">
                <div className="left">
                    <div className="loginLogo">
                        <img src={ Logo } alt="" className="icon" />
                        <h3 className="logo">Yi-ZSocial</h3>
                    </div>
                    <span className="desc">Connect with friends and the world around you on Yi-ZSocial.</span>
                </div>
                <div className="right">
                    <div className="loginBox">
                        <form onSubmit={ handleSubmit }>
                            <input type="email" className="loginInput" placeholder="Email" required ref={ emailRef } />
                            <input type="password" className="loginInput" placeholder="Password" required minLength={ 6 } ref={ passwordRef } />
                            <button type="submit" className="loginBtn" disabled={ isFetching }>{ isFetching && !error ? <CircularProgress color="inherit" size={ "25px" } /> : "Log In" }</button>
                            <span className="loginForgot">Forgot Password?</span>
                            <button className="loginRegBtn" disabled={ isFetching } onClick={ () => navigate( "/register" ) }>
                                { isFetching && !error ? <CircularProgress color="inherit" size={ "25px" } /> : "Create a New Account" }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login