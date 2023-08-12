import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.scss"

const Feed = () => {
  return (
    <div className="feed">
        <div className="wrapper">
            <Share />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    </div>
  )
}

export default Feed