import "./topbar.scss"
import { Chat, Notifications, Person, Search } from "@mui/icons-material"
import noavatar from "../../assets/person/noavatar.png"
import Logo from "../../assets/snap.png"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const Topbar = () => {
    const { user } = useContext( AuthContext )
    const navigate = useNavigate()

    const handleProfileNavigation = () => {
        navigate( `/profile/${user.userName}` )
        location.reload()
    }

    return (
        <div className="topbar">
            <div className="left">
                <img src={ Logo } alt="" className="logoIcon" />
                <span className="logo" onClick={ () => navigate( "/" ) }>Yi-ZSocial</span>
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
                <img src={ user.profilePicture ? user.profilePicture : noavatar } alt="" className="profile" onClick={ handleProfileNavigation } />
            </div>
        </div>
    )
}

export default Topbar