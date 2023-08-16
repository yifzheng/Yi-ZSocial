/* eslint-disable react/prop-types */
import "./post.scss"
import noavatar from "../../assets/person/noavatar.png"
import { MoreVert } from "@mui/icons-material"
import Like from "../../assets/like.png"
import Heart from "../../assets/heart.png"
import { useEffect, useState } from "react"
import axios from "axios"
import { format } from "timeago.js"
import { Link } from "react-router-dom"

const Post = ( { post } ) => {
    const [ user, setUser ] = useState( {} )
    const [ likes, setLike ] = useState( post.likes.length )
    const [ isLike, setIsLike ] = useState( false )

    useEffect( () => {
        const fetchUser = async () => {
            const u = await axios.get( `http://localhost:8800/api/users?userId=${post.userId}` )
            setUser( u.data )
        }
        return () => {
            fetchUser()
        }
    }, [ post.userId ] )

    // handle clikc of like buttons for user
    const likeHandle = () => {
        setLike( isLike ? ( prevState ) => prevState - 1 : ( prevState ) => prevState + 1 )
        setIsLike( !isLike )
    }

    return (
        <div className="post">
            <div className="wrapper">
                <div className="top">
                    <div className="topLeft">
                        <Link to={ `/profile/${user.userName}` }><img src={ user?.profilePicture ? user?.profilePicture : noavatar } alt="" className="profileImg" /></Link>
                        <span className="userName">{ user?.userName }</span>
                        <span className="date">{ format( post.createdAt ) }</span>
                    </div>
                    <div className="topRight">
                        <MoreVert className="moreIcon" />
                    </div>
                </div>
                <div className="center">
                    <span className="postText">{ post?.desc }</span>
                    <img src={ "/src/assets/post/" + post?.img } alt="" className="postImg" />
                </div>
                <div className="bottom">
                    <div className="bottomLeft">
                        <img className="likeIcon" src={ Like } alt="" onClick={ likeHandle } />
                        <img className="likeIcon" src={ Heart } alt="" onClick={ likeHandle } />
                        <span className="likeCounter">{ likes } people like it</span>
                    </div>
                    <div className="bottomRight">
                        <span className="commentText">{ post.comment ? post.comment.length : 0 } comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post