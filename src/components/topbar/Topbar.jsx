import "./topbar.scss"
import { Chat, Notifications, Person, Search } from "@mui/icons-material"
import noavatar from "../../assets/person/noavatar.png"
import Logo from "../../assets/snap.png"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"

const Topbar = () => {
    const { user, dispatch } = useContext( AuthContext )
    const navigate = useNavigate()
    const [ menuOpen, setMenuOpen ] = useState( false )

    // navigate to profile page
    const handleProfileNavigation = () => {
        navigate( `/profile/${user.userName}` )
        location.reload()
    }

    // logout user and delete user object from local storage
    const handleLogout = () => {
        dispatch( { type: "LOGOUT" } )
        localStorage.removeItem( "user" )
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
                    <span className="topbarLink" onClick={ () => navigate( "/" ) }>Homepage</span>
                    <span className="topbarLink" onClick={ handleProfileNavigation }>Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="iconItem">
                        <Person />
                        <span className="iconBadge"></span>
                    </div>
                    <div className="iconItem">
                        <Chat />
                        <span className="iconBadge"></span>
                    </div>
                    <div className="iconItem">
                        <Notifications />
                        <span className="iconBadge"></span>
                    </div>
                </div>
                <img src={ user.profilePicture ? user.profilePicture : noavatar } alt="" className="profile" onClick={ () => setMenuOpen( !menuOpen ) } />
            </div>
            <div className={ `menuBar ${menuOpen && 'active'}` }>
                <span className="menuItem" onClick={ handleProfileNavigation }>Profile</span>
                <span className="menuItem">Edit Profile</span>
                <span className="menuItem" onClick={ handleLogout }>Logout</span>
            </div>
        </div>
    )
}

export default Topbar