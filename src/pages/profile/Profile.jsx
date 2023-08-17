import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import Feed from '../../components/feed/Feed'
import './profile.scss'
import Rightbar from '../../components/rightbar/Rightbar'
import noavatar from "../../assets/person//noavatar.png"
import nocover from "../../assets/person/nocover.jpg"
import { useEffect, useState } from 'react'
import { useParams } from "react-router"
import axios from 'axios'

const Profile = () => {
    const [ user, setUser ] = useState( {} )
    const { userName } = useParams()

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
                        <Feed userName={ userName } />
                        <Rightbar user={ user && user } />
                    </div>

                </div>

            </div>

        </>
    )
}

export default Profile