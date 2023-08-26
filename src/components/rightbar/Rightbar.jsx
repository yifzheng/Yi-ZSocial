/* eslint-disable react/prop-types */
import "./rightbar.scss"
import Birthday from "../../assets/gift.png"
import Ad from "../../assets/ad.jpg"
import noavatar from "../../assets/person/noavatar.png"
import Online from "../online/Online"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { Add, Remove } from "@mui/icons-material"

const Rightbar = ( { user } ) => {
    const [ friends, setFriends ] = useState( [] )
    const [ isFollowing, setIsFollowing ] = useState( false )
    const navigate = useNavigate()
    const { user: currentUser, dispatch } = useContext( AuthContext )

    useEffect( () => {
        if ( user?._id && Object.keys( user ).length > 0 ) {
            setIsFollowing( currentUser.following.includes( user?._id ) )
        }

    }, [ currentUser, user ] )

    // fetch friends of user
    useEffect( () => {
        // Define an async function inside the useEffect
        const fetchData = async () => {
            try {
                const friendList = await axios.get( `http://localhost:8800/api/users/friends/${user?._id}` );
                setFriends( friendList.data );
            } catch ( error ) {
                console.log( error );
            }
        };

        // Check if user is defined and not empty before calling the fetchData function
        if ( user?._id && Object.keys( user ).length > 0 ) {
            fetchData();
        }

        // Return a cleanup function
        return () => {
        };
    }, [ user ] );


    const handleProfileNavigation = ( friend ) => {
        navigate( `/profile/${friend.userName}` )
        navigate( 0 )
    }

    const followUser = async () => {
        try {
            // if we are currently following this user, unfollow. Else, we follow the user
            if ( isFollowing ) {
                await axios.put( `http://localhost:8800/api/users/${user._id}/unfollow`, { userId: currentUser._id } )
                dispatch( { type: "UNFOLLOW", payload: user._id } ) // update user object in context
                // fetch item from local storage and update as with context object
                const storedUser = JSON.parse( localStorage.getItem( "user" ) )
                storedUser.following = storedUser.following.filter( ( id ) => id !== user._id )
                localStorage.setItem( "user", JSON.stringify( storedUser ) )
            }
            else {
                await axios.put( `http://localhost:8800/api/users/${user._id}/follow`, { userId: currentUser._id } )
                dispatch( { type: "FOLLOW", payload: user._id } ) // update user object in context
                // fetch item from local storage and update as with context object
                const storedUser = JSON.parse( localStorage.getItem( "user" ) )
                storedUser.following.push( user._id )
                localStorage.setItem( "user", JSON.stringify( storedUser ) )
            }
        } catch ( error ) {
            console.log( error )
        }
        setIsFollowing( !isFollowing )
    }

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthday">
                    <img src={ Birthday } alt="" className="birthdayImg" />
                    <span className="birthdayText"><b>0</b> people have a birthday today</span>
                </div>
                <img src={ Ad } alt="" className="ad" />
                {/* <h4 className="title">Online Friends</h4> */}
                {/* <ul className="friendList">
                    { Users.map( ( u ) => (
                        <Online key={ u.id } user={ u } />
                    ) ) }
                </ul> */}
            </>
        )
    }

    const ProfileRightBar = () => {
        return (
            <>
                { user.userName !== currentUser.userName && (
                    <button className={ `followBtn ${isFollowing ? "unfollow" : "follow"}` } onClick={ followUser }>
                        { isFollowing ? <>Unfollow<Remove /></> : <>Follow<Add /></> }
                    </button>
                ) }
                <h4 className="userInfoTitle">User Information</h4>
                <div className="info">
                    <div className="infoItem">
                        <span className="infoKey">City:</span>
                        <span className="infoValue">{ user.city }</span>
                    </div>
                    <div className="infoItem">
                        <span className="infoKey">Hometown:</span>
                        <span className="infoValue">{ user.from }</span>
                    </div>
                    <div className="infoItem">
                        <span className="infoKey">Relationship:</span>
                        <span className="infoValue">{ user.relationship === 1 ? "Single"
                            : ( user.relationship === 2 ? "Married" : "Private" ) }</span>
                    </div>
                </div>
                <h4 className="userInfoTitle">User Friends</h4>
                <div className="followings">
                    { friends.map( friend => (
                        <div className="following" key={ friend._id } onClick={ () => handleProfileNavigation( friend ) }>
                            <img src={ friend.profilePicture ? friend.profilePicture : noavatar } alt="" className="followingImg" />
                            <span className="userName">{ friend.userName }</span>
                        </div>
                    ) ) }
                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="wrapper">
                { user ? <ProfileRightBar /> : <HomeRightbar /> }
            </div>
        </div>
    )
}

export default Rightbar