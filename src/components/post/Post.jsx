import "./post.scss"
import Person5 from "../../assets/person/person5.jpg"
import Post4 from "../../assets/post/post4.jpg"
import { MoreVert } from "@mui/icons-material"
import Like from "../../assets/like.png"
import Heart from "../../assets/heart.png"

const Post = () => {
    return (
        <div className="post">
            <div className="wrapper">
                <div className="top">
                    <div className="topLeft">
                        <img src={ Person5 } alt="" className="profileImg" />
                        <span className="userName">Yifeng Zheng</span>
                        <span className="date">7 min ago</span>
                    </div>
                    <div className="topRight">
                        <MoreVert className="moreIcon" />
                    </div>
                </div>
                <div className="center">
                    <span className="postText">Hey! It&#39;s my first post</span>
                    <img src={ Post4 } alt="" className="postImg" />
                </div>
                <div className="bottom">
                    <div className="bottomLeft">
                        <img className="likeIcon" src={ Like } alt="" />
                        <img className="likeIcon" src={ Heart } alt="" />
                        <span className="likeCounter">32 people like it</span>
                    </div>
                    <div className="bottomRight">
                        <span className="commentText">9 comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post