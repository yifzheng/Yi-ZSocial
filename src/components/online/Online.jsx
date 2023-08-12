/* eslint-disable react/prop-types */
import "./online.scss"

const Online = ( { user } ) => {

    return (
        <>
            <li className="friend">
                <div className="imgContainer">
                    <img src={ user.profilePicture } alt="" className="profileImg" />
                    <span className="online"></span>
                </div>
                <span className="userName">{ user.userName }</span>
            </li >
        </>
    )
}

export default Online