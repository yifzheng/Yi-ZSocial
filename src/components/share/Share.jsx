import "./share.scss"
import noavatar from "../../assets/person/noavatar.png"
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"

const Share = () => {
    const { user } = useContext( AuthContext )
    const desc = useRef()
    const [ file, setFile ] = useState( null )

    const handleSubmit = async ( e ) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
            img: file
        }
        try {
            await axios.post( "http://localhost:8800/api/posts", newPost )
        } catch ( error ) {
            console.log( error )
        }
    }

    return (
        <div className='share'>
            <div className="wrapper">
                <div className="top">
                    <img className="profileImg" src={ user.profilePicture ? user.profilePicture : noavatar } alt="" />
                    <input
                        type="text"
                        placeholder={ `What's on your mind ${user.firstName.charAt( 0 ).toUpperCase() + user.firstName.slice( 1 )}?` }
                        className="input"
                        ref={ desc }
                    />
                </div>
                <hr className="shareHR" />
                <form className="bottom" onSubmit={ handleSubmit }>
                    <div className="options">
                        <label htmlFor="file" className="option">
                            <PermMedia className="icon" htmlColor="tomato" />
                            <span className="text">Photo/Video</span>
                            <input type="file" name="file" id="file" accept=".png,.jpeg,.jpg" onChange={ e => setFile( e.target.files[ 0 ] ) } style={ { display: "none" } } />
                        </label>
                        <div className="option" >
                            <Label className="icon" htmlColor="indigo" />
                            <span className="text">Tag</span>
                        </div>
                        <div className="option">
                            <Room className="icon" htmlColor="forestGreen" />
                            <span className="text">Location</span>
                        </div>
                        <div className="option">
                            <EmojiEmotions className="icon" htmlColor="gold" />
                            <span className="text">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share