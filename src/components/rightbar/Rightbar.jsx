/* eslint-disable react/prop-types */
import "./rightbar.scss"
import Birthday from "../../assets/gift.png"
import Ad from "../../assets/ad.jpg"
import noavatar from "../../assets/person/noavatar.png"
import Online from "../online/Online"
import { Users } from "../../dummyData"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Rightbar = ( { user } ) => {
    const [ friends, setFriends ] = useState( [] )
    const navigate = useNavigate()
    console.log( "rightbar USER: ", user?._id )
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
            console.log( "user is not undefined,", user );
            fetchData();
        }

        // Return a cleanup function
        return () => {
            // You can optionally perform cleanup here
        };
    }, [ user ] );


    const handleProfileNavigation = ( friend ) => {
        navigate( `/profile/${friend.userName}` )
        location.reload()
    }

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthday">
                    <img src={ Birthday } alt="" className="birthdayImg" />
                    <span className="birthdayText"><b>Jane Foster</b> and <b>2 others</b> have a birthday today</span>
                </div>
                <img src={ Ad } alt="" className="ad" />
                <h4 className="title">Online Friends</h4>
                <ul className="friendList">
                    { Users.map( ( u ) => (
                        <Online key={ u.id } user={ u } />
                    ) ) }
                </ul>
            </>
        )
    }

    const ProfileRightBar = () => {
        return (
            <>
                <h4 className="userInfoTitle">User Information</h4>
                <div className="info">
                    <div className="infoItem">
                        <span className="infoKey">City:</span>
                        <span className="infoValue">{ user.city }</span>
                    </div>
                    <div className="infoItem">
                        <span className="infoKey">From:</span>
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