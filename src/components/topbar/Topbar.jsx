import "./topbar.scss"
import { Chat, Notifications, Person, Search } from "@mui/icons-material"
import noavatar from "../../assets/person/noavatar.png"
import Logo from "../../assets/snap.png"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { debounce } from "lodash"
import axios from "axios"

const Topbar = () => {
    const { user, dispatch } = useContext( AuthContext )
    const navigate = useNavigate()
    const [ menuOpen, setMenuOpen ] = useState( false )
    const [ searchOpen, setSearchOpen ] = useState( false )
    const [ searchTerm, setSearchTerm ] = useState( "" )
    const [ searchResults, setSearchResults ] = useState( [] )

    // navigate to profile page
    const handleProfileNavigation = () => {
        navigate( `/profile/${user.userName}` )
        location.reload()
    }

    const handleSearchProfileNavigation = ( searchedUser ) => {
        navigate( `/profile/${searchedUser.userName}` )
        location.reload()
    }

    // logout user and delete user object from local storage
    const handleLogout = () => {
        dispatch( { type: "LOGOUT" } )
        localStorage.removeItem( "user" )
    }

    // Debounce the search function to execute after user stops typing for 2 seconds
    const debouncedSearch = debounce( async ( query ) => {
        try {
            if ( query ) {
                const response = await axios.get( `http://localhost:8800/api/users/search?query=${query}` )
                setSearchResults( response.data )
            }
            else {
                setSearchResults( [] )
            }
        } catch ( error ) {
            console.error( error )
        }
    }, 2000 )

    // handle search change
    const handleSearchChange = ( e ) => {
        const value = e.target.value
        setSearchTerm( value )
        debouncedSearch( value )
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
                    <input
                        placeholder="Search for friend, post or video"
                        className="searchInput"
                        onFocus={ () => setSearchOpen( true ) }
                        value={ searchTerm }
                        onChange={ handleSearchChange }
                    />
                    <span className={ `cancelSearch ${!searchOpen && "deactive"}` } onClick={ () => setSearchOpen( false ) }>Cancel</span>
                </div>
                <div className={ `searchResults ${!searchOpen && "deactive"}` }>
                    { searchResults.length > 0 && searchResults.map( ( user ) => (
                        <div className="searchItem" key={ user._id } onClick={ () => handleSearchProfileNavigation( user ) }>
                            <img src={ user.profilePicture ? user.profilePicture : noavatar } alt="" />
                            <span>{ user.userName }</span>
                        </div>
                    ) ) }

                </div>
            </div>
            <div className="right">
                <div className="links">
                    <span className="topbarLink" onClick={ () => navigate( "/" ) }>Homepage</span>
                    <span className="topbarLink" onClick={ handleProfileNavigation }>Timeline</span>
                </div>
                <div className="topbarIcons">
                    {/* <div className="iconItem">
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
                    </div> */}
                    <span className="userName">{ user.userName }</span>

                </div>
                <img src={ user.profilePicture ? user.profilePicture : noavatar } alt="" className="profile" onClick={ () => setMenuOpen( !menuOpen ) } />
            </div>
            <div className={ `menuBar ${menuOpen && 'active'}` }>
                <span className="menuItem" onClick={ handleProfileNavigation }>Profile</span>
                <hr />
                <span className="menuItem" onClick={ () => navigate( "/edit_profile" ) }>Edit Profile</span>
                <hr />
                <span className="menuItem" onClick={ handleLogout }>Logout</span>
            </div>
        </div>
    )
}

export default Topbar