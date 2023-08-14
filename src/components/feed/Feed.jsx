import { useEffect, useState } from "react";
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.scss"
import axios from "axios";

const Feed = () => {
  const [ posts, setPosts ] = useState( [] );

  useEffect( () => {
    const fetch = async () => {
      const res = await axios.get( "http://localhost:8800/api/posts/timeline/64d684a6f994b9d75d9e4d1d" )
      // set posts data from most recent post to oldest
      setPosts( res.data.sort( ( a, b ) => b.createdAt.localeCompare( a.createdAt ) ) )
    }
    return () => {
      fetch()
    }
  }, [] )


  return (
    <div className="feed">
      <div className="wrapper">
        <Share />
        { posts.map( ( post ) => (
          <Post key={ post._id } post={ post } />
        ) ) }
      </div>
    </div>
  )
}

export default Feed