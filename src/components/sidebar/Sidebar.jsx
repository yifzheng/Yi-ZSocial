import "./sidebar.scss"
import { RssFeed, Chat, PlayCircle, Group, Bookmark, Help, Work, Event, School } from "@mui/icons-material"
import Person1 from "../../assets/person/person1.jpg"
import Person2 from "../../assets/person/person2.jpg"
import Person3 from "../../assets/person/person3.jpg"
import Person4 from "../../assets/person/person4.jpg"

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="wrapper">
                <ul className="list">
                    <li className="item">
                        <RssFeed className="icon" />
                        <span className="itemText">Feed</span>
                    </li>
                    <li className="item">
                        <Chat className="icon" />
                        <span className="itemText">Chats</span>
                    </li>
                    <li className="item">
                        <PlayCircle className="icon" />
                        <span className="itemText">Videos</span>
                    </li>
                    <li className="item">
                        <Group className="icon" />
                        <span className="itemText">Groups</span>
                    </li>
                    <li className="item">
                        <Bookmark className="icon" />
                        <span className="itemText">Bookmarks</span>
                    </li>
                    <li className="item">
                        <Help className="icon" />
                        <span className="itemText">Questions</span>
                    </li>
                    <li className="item">
                        <Work className="icon" />
                        <span className="itemText">Jobs</span>
                    </li>
                    <li className="item">
                        <Event className="icon" />
                        <span className="itemText">Events</span>
                    </li>
                    <li className="item">
                        <School className="icon" />
                        <span className="itemText">Courses</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHR" />
                <ul className="friendList">
                    <li className="friend">
                        <img src={ Person1 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person2 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person3 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person4 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person1 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person2 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person3 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person4 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person1 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person2 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person3 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person4 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person1 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person2 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person3 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                    <li className="friend">
                        <img src={ Person4 } alt="" className="friendImg" />
                        <span className="friendName">Jane Doe</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar