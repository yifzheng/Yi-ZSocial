/* eslint-disable react/prop-types */
import "./rightbar.scss"
import Birthday from "../../assets/gift.png"
import Ad from "../../assets/ad.jpg"
import Person1 from "../../assets/person/person1.jpg"
import Person2 from "../../assets/person/person2.jpg"
import Person3 from "../../assets/person/person3.jpg"
import Online from "../online/Online"
import { Users } from "../../dummyData"

const Rightbar = ( { user } ) => {

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
                        <span className="infoKey">City: </span>
                        <span className="infoValue">{ user.city }</span>
                    </div>
                    <div className="infoItem">
                        <span className="infoKey">From: </span>
                        <span className="infoValue">{ user.from }</span>
                    </div>
                    <div className="infoItem">
                        <span className="infoKey">Relationship: </span>
                        <span className="infoValue">{ user.relationship === 1 ? "Single"
                            : ( user.relationship === 2 ? "Married" : "Private" ) }</span>
                    </div>
                </div>
                <h4 className="userInfoTitle">User Friends</h4>
                <div className="followings">
                    <div className="following">
                        <img src={ Person1 } alt="" className="followingImg" />
                        <span className="userName">Jayne Li</span>
                    </div>
                    <div className="following">
                        <img src={ Person2 } alt="" className="followingImg" />
                        <span className="userName">Jayne Li</span>
                    </div>
                    <div className="following">
                        <img src={ Person3 } alt="" className="followingImg" />
                        <span className="userName">Jayne Li</span>
                    </div>
                    <div className="following">
                        <img src={ Person1 } alt="" className="followingImg" />
                        <span className="userName">Jayne Li</span>
                    </div>
                    <div className="following">
                        <img src={ Person2 } alt="" className="followingImg" />
                        <span className="userName">Jayne Li</span>
                    </div>
                    <div className="following">
                        <img src={ Person3 } alt="" className="followingImg" />
                        <span className="userName">Jayne Li</span>
                    </div>
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