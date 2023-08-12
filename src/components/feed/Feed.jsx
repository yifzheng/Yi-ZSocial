import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.scss"
import { Posts } from "../../dummyData"

const Feed = () => {
  return (
    <div className="feed">
      <div className="wrapper">
        <Share />
        { Posts.map( ( post ) => (
          <Post key={ post.id } post={ post } />
        ) ) }
      </div>
    </div>
  )
}

export default Feed