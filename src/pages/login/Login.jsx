import "./login.scss"
import Logo from "../../assets/snap.png"

const Login = () => {
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
                        <form>
                            <input type="email" className="loginInput" placeholder="Email" required />
                            <input type="password" className="loginInput" placeholder="Password" required minLength={ 3 } />
                            <button type="submit" className="loginBtn">Log in</button>
                            <span className="loginForgot">Forgot Password?</span>
                            <button className="loginRegBtn">
                                Create a New Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login