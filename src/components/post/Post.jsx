/* eslint-disable react/prop-types */
import "./post.scss"
import Person5 from "../../assets/person/person5.jpg"
import Post4 from "../../assets/post/post4.jpg"
import { MoreVert } from "@mui/icons-material"
import Like from "../../assets/like.png"
import Heart from "../../assets/heart.png"
import { Users } from "../../dummyData"
import { useEffect, useState } from "react"

const Post = ( { post } ) => {
    const [ user, setUser ] = useState( {} )
    const [ like, setLike ] = useState( post.like )
    const [ isLike, setIsLike ] = useState( false )

    useEffect( () => {
        const u = Users.filter( ( user ) => user.id === post.userId )
        setUser( u )
    }, [ post ] )

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
                        <img src={ user[ 0 ]?.profilePicture } alt="" className="profileImg" />
                        <span className="userName">{ user[ 0 ]?.userName }</span>
                        <span className="date">{ post.date }</span>
                    </div>
                    <div className="topRight">
                        <MoreVert className="moreIcon" />
                    </div>
                </div>
                <div className="center">
                    <span className="postText">{ post?.desc }</span>
                    <img src={ post.photo } alt="" className="postImg" />
                </div>
                <div className="bottom">
                    <div className="bottomLeft">
                        <img className="likeIcon" src={ Like } alt="" onClick={ likeHandle } />
                        <img className="likeIcon" src={ Heart } alt="" onClick={ likeHandle } />
                        <span className="likeCounter">{ like } people like it</span>
                    </div>
                    <div className="bottomRight">
                        <span className="commentText">{ post.comment } comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post