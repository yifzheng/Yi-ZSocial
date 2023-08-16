import "./register.scss"
import Logo from "../../assets/snap.png"
import { useNavigate } from "react-router"
import { useContext, useRef, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const userNameRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const passwordAgainRef = useRef();
    const [ passwordNotEqual, setPasswordNotEqual ] = useState( false )


    // handle user registration on client side
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        const email = emailRef.current.value
        const userName = userNameRef.current.value
        const firstName = firstNameRef.current.value
        const lastName = lastNameRef.current.value
        const password = passwordRef.current.value
        const passwordAgain = passwordAgainRef.current.value
        if ( password === passwordAgain ) {
            const user = {
                userName, firstName, lastName, email, password
            }

            try {
                await axios.post( `http://localhost:8800/api/auth/register`, user )
                navigate( "/login" )
            }
            catch ( error ) {
                console.log( error )
            }
        }
        else {
            setPasswordNotEqual( true )
        }
    }

    return (
        <div className="register">
            <div className="wrapper">
                <div className="left">
                    <div className="registerLogo">
                        <img src={ Logo } alt="" className="icon" />
                        <h3 className="logo">Yi-ZSocial</h3>
                    </div>
                    <span className="desc">Connect with friends and the world around you on Yi-ZSocial.</span>
                </div>
                <div className="right">
                    <div className="registerBox">
                        <form onSubmit={ handleSubmit }>
                            <input
                                type="text"
                                className="registerInput"
                                placeholder="First Name"
                                required
                                ref={ firstNameRef }
                            />
                            <input
                                type="text"
                                className="registerInput"
                                placeholder="Last Name"
                                required
                                ref={ lastNameRef }
                            />
                            <input
                                type="text"
                                className="registerInput"
                                placeholder="User Name"
                                required
                                ref={ userNameRef }
                            />
                            <input
                                type="email"
                                className="registerInput"
                                placeholder="Email"
                                required
                                ref={ emailRef }
                            />
                            <input
                                type="password"
                                className="registerInput"
                                placeholder="Password"
                                required minLength={ 6 }
                                ref={ passwordRef } onChange={ () => setPasswordNotEqual( false ) }
                            />
                            <input
                                type="password"
                                className="registerInput"
                                placeholder="Password Again"
                                required minLength={ 6 }
                                ref={ passwordAgainRef } onChange={ () => setPasswordNotEqual( false ) }
                            />
                            <button type="submit" className="registerBtn">Register</button>
                            <button className="registerLoginBtn" onClick={ () => navigate( "/login" ) }>
                                Log into your Account
                            </button >
                            { passwordNotEqual && <span className="passwordError">Password not equal, try again</span> }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register