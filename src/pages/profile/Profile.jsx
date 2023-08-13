import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import Feed from '../../components/feed/Feed'
import './profile.scss'
import Rightbar from '../../components/rightbar/Rightbar'
import Person5 from "../../assets/person/person5.jpg"
import Post3 from "../../assets/post/post3.jpg"

const Profile = () => {
    return (
        <>
            <Topbar />
            <div className="profileContainer">
                <Sidebar />
                <div className="right">
                    <div className="rightTop">
                        <div className="profileCover">
                            <img src={ Post3 } alt="" className='coverImg' />
                            <img src={ Person5 } alt="" className='avatar' />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>Yifeng Zheng</h4>
                            <span className="profileInfoDesc">Hello, my friends</span>
                        </div>
                    </div>
                    <div className="rightBottom">
                        <Feed />
                        <Rightbar profile/>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Profile