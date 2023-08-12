/* eslint-disable react/prop-types */
import "./closefriend.scss"

const CloseFriend = ( { user } ) => {
    return (
        <li className="friend">
            <img src={ user.profilePicture } alt="" className="friendImg" />
            <span className="friendName">{ user.userName }</span>
        </li>
    )
}

export default CloseFriend