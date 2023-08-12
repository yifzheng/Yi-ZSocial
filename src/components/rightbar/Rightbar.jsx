import "./rightbar.scss"
import Birthday from "../../assets/gift.png"
import Ad from "../../assets/ad.jpg"
import Person3 from "../../assets/person/person3.jpg"
import Online from "../online/Online"
import { Users } from "../../dummyData"

const Rightbar = () => {
    return (
        <div className="rightbar">
            <div className="wrapper">
                <div className="birthday">
                    <img src={ Birthday } alt="" className="birthdayImg" />
                    <span className="birthdayText"><b>Jane Foster</b> and <b>2 others</b> have a birthday today</span>
                </div>
                <img src={ Ad } alt="" className="ad" />
                <h4 className="title">Online Friends</h4>
                <ul className="friendList">
                    { Users.map( ( user ) => (
                        <Online key={ user.id } user={ user } />
                    ) ) }
                </ul>
            </div>
        </div>
    )
}

export default Rightbar