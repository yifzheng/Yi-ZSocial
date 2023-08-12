import "./rightbar.scss"
import Birthday from "../../assets/gift.png"
import Ad from "../../assets/ad.jpg"
import Person3 from "../../assets/person/person3.jpg"
import Online from "../online/Online"

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
                    <li className="friend">
                        <Online />
                    </li>
                    <li className="friend">
                        <Online />
                    </li>
                    <li className="friend">
                        <Online />
                    </li>
                    <li className="friend">
                        <Online />
                    </li>
                    <li className="friend">
                        <Online />
                    </li>
                    <li className="friend">
                        <Online />
                    </li>
                    <li className="friend">
                        <Online />
                    </li>
                    <li className="friend">
                        <Online />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Rightbar