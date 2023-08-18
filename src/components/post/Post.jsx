/* eslint-disable react/prop-types */
import "./post.scss"
import noavatar from "../../assets/person/noavatar.png"
import { MoreVert } from "@mui/icons-material"
import Like from "../../assets/like.png"
import Heart from "../../assets/heart.png"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const Post = ( { post } ) => {
    const [ user, setUser ] = useState( {} )
    const [ likes, setLike ] = useState( post.likes.length )
    const [ isLike, setIsLike ] = useState( false )
    const [ deleted, setDeleted ] = useState( false )
    const { user: currentUser } = useContext( AuthContext )

    // onload
    useEffect( () => {
        const fetchUser = async () => {
            const u = await axios.get( `http://localhost:8800/api/users?userId=${post.userId}` )
            setUser( u.data )
        }
        return () => {
            fetchUser()
        }
    }, [ post.userId ] )

    // check if user already liked this post
    useEffect( () => {
        setIsLike( post.likes.includes( currentUser._id ) )
    }, [ currentUser._id, post.likes ] )

    // handle clikc of like buttons for user
    const likeHandle = async () => {
        try {
            await axios.put( `http://localhost:8800/api/posts/${post._id}/like`, { userId: currentUser._id } )
            setLike( isLike ? ( prevState ) => prevState - 1 : ( prevState ) => prevState + 1 )
            setIsLike( !isLike )
        } catch ( error ) { console.log( error ) }

    }

    const handleDeletePost = async () => {
        console.log( post.userId === currentUser._id )
        try {
            await axios.delete( `http://localhost:8800/api/posts/${post._id}`, { data: { userId: user._id } } )
            location.reload()
        } catch ( error ) {
            console.error( error )
        }
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
                    { user.userName === currentUser.userName && <div className="topRight">
                        <MoreVert className="moreIcon" onClick={ () => setDeleted( !deleted ) } />
                        <span className={ `deletePost ${!deleted && "unactive"}` } onClick={ handleDeletePost }>Delete</span>
                    </div> }
                </div>
                <div className="center">
                    <span className="postText">{ post?.desc }</span>
                    <img src={ post?.img } alt="" className="postImg" />
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