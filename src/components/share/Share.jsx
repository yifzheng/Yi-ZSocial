import "./share.scss"
import noavatar from "../../assets/person/noavatar.png"
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const Share = () => {
    const { user } = useContext( AuthContext )
    return (
        <div className='share'>
            <div className="wrapper">
                <div className="top">
                    <img className="profileImg" src={ user.profilePicture ? user.profilePicture : noavatar } alt="" />
                    <input type="text" placeholder="What's on your mind?" className="input" />
                </div>
                <hr className="shareHR" />
                <div className="bottom">
                    <div className="options">
                        <div className="option">
                            <PermMedia className="icon" htmlColor="tomato" />
                            <span className="text">Photo/Video</span>
                        </div>
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
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    )
}

export default Share