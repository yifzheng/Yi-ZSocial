import "./register.scss"
import Logo from "../../assets/snap.png"

const Register = () => {
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
                        <form>
                            <input type="text" className="registerInput" placeholder="First Name" required />
                            <input type="text" className="registerInput" placeholder="Last Name" required />
                            <input type="text" className="registerInput" placeholder="User Name" required />
                            <input type="email" className="registerInput" placeholder="Email" required />
                            <input type="password" className="registerInput" placeholder="Password" required minLength={ 3 } />
                            <input type="password" className="registerInput" placeholder="Password Again" required minLength={ 3 } />
                            <button type="submit" className="registerBtn">Register</button>
                            <button className="registerLoginBtn">
                                Log into your Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register