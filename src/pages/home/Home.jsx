/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import "./home.scss"
import { AuthContext } from "../../context/AuthContext"

const Home = () => {
    const { user, dispatch } = useContext( AuthContext )

    // check if there is a user on localstorage and set to context
    useEffect( () => {
        const storedUser = localStorage.getItem( "user" )
        if ( storedUser ) {
            dispatch( { type: "LOGIN_SUCCESS", payload: JSON.parse(storedUser) } )
        }
    }, [] )

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