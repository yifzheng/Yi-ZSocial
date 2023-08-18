import { useContext, useEffect, useState } from "react";
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.scss"
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feed = ( { userName, profile } ) => {
  const [ posts, setPosts ] = useState( [] );
  const { user } = useContext( AuthContext )

  useEffect( () => {
    const fetch = async () => {
      const res = profile
        ? await axios.get( `http://localhost:8800/api/posts/profile/${userName}` )
        : await axios.get( `http://localhost:8800/api/posts/timeline/${user._id}` )
      // set posts data from most recent post to oldest
      console.log(res.data)
      setPosts( res.data.sort( ( a, b ) => new Date( b.createdAt ) - new Date( a.createdAt ) ) )
    }
    return () => {
      fetch()
    }
  }, [userName, user._id, profile] )

  return (
    <div className="feed">
      <div className="wrapper">
        { userName === user.userName && <Share /> }
        { posts.map( ( post ) => (
          <Post key={ post._id } post={ post } />
        ) ) }
      </div>
    </div>
  )
}

export default Feed