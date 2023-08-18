/* eslint-disable react-hooks/exhaustive-deps */
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import Feed from '../../components/feed/Feed'
import './profile.scss'
import Rightbar from '../../components/rightbar/Rightbar'
import noavatar from "../../assets/person//noavatar.png"
import nocover from "../../assets/person/nocover.jpg"
import { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router"
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

const Profile = () => {
    const [ user, setUser ] = useState( {} )
    const { userName } = useParams()
    const { dispatch } = useContext( AuthContext )
    
    // check if there is a user on localstorage and set to context
    useEffect( () => {
        const storedUser = localStorage.getItem( "user" )
        if ( storedUser ) {
            dispatch( { type: "LOGIN_SUCCESS", payload: JSON.parse( storedUser ) } )
        }
    }, [] )

    useEffect( () => {
        window.scrollTo( 0, 0 )
        const fetchUser = async () => {
            const u = await axios.get( `http://localhost:8800/api/users?userName=${userName}` )
            setUser( u.data )
        }
        return async () => {
            await fetchUser()
        }
    }, [ userName ] )

    return (
        <>
            <Topbar />
            <div className="profileContainer">
                <Sidebar />
                <div className="right">
                    <div className="rightTop">
                        <div className="profileCover">
                            <img src={ user.coverPicture ? user.coverPicture : nocover } alt="" className='coverImg' />
                            <img src={ user.profilePicture ? user.profilePicture : noavatar } alt="" className='avatar' />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{ user.userName }</h4>
                            <span className="profileInfoDesc">{ user.desc }</span>
                        </div>
                    </div>
                    <div className="rightBottom">
                        <Feed userName={ userName } profile/>
                        <Rightbar user={ user && user } />
                    </div>

                </div>

            </div>

        </>
    )
}

export default Profile