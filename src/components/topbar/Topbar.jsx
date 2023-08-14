import "./topbar.scss"
import { Chat, Notifications, Person, Search } from "@mui/icons-material"
import Person5 from "../../assets/person/person5.jpg"
import Logo from "../../assets/snap.png"
import { Link } from "react-router-dom"

const Topbar = () => {
    return (
        <div className="topbar">
            <div className="left">
                <img src={ Logo } alt="" className="logoIcon" />
                <Link to={"/"} className="logoLink">
                    <span className="logo">Yi-ZSocial</span>
                </Link>
            </div>
            <div className="center">
                <div className="searchBar">
                    <Search className="searchIcon" />
                    <input placeholder="Search for friend, post or video" className="searchInput" />
                </div>
            </div>
            <div className="right">
                <div className="links">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="iconItem">
                        <Person />
                        <span className="iconBadge">1</span>
                    </div>
                    <div className="iconItem">
                        <Chat />
                        <span className="iconBadge">2</span>
                    </div>
                    <div className="iconItem">
                        <Notifications />
                        <span className="iconBadge">1</span>
                    </div>
                </div>
                <img src={ Person5 } alt="" className="profile" />
            </div>
        </div>
    )
}

export default Topbar