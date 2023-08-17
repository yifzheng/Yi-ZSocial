import { useContext } from "react"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import "./home.scss"
import { AuthContext } from "../../context/AuthContext"

const Home = () => {
    const { user } = useContext( AuthContext )
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed userName={ user.userName } />
                <Rightbar />
            </div>

        </>
    )
}

export default Home