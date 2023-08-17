import "./share.scss"
import noavatar from "../../assets/person/noavatar.png"
import cancel from "../../assets/cancel.png"
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../firebase"
import { v4 as uuid } from "uuid"

const Share = () => {
    const { user } = useContext( AuthContext )
    const desc = useRef()
    const imageRef = useRef()
    const [ file, setFile ] = useState( null )

    // submit the post to database
    const handleSubmit = async () => {
        const selectedImg = imageRef.current
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        }
        try {
            // if we have selected an image we upload the image and return the url
            if ( selectedImg && selectedImg.files.length > 0 ) {
                const selectedFile = selectedImg.files[ 0 ]
                const fileUUID = uuid()
                const storageRef = ref( storage, "posts/" + user._id + fileUUID + selectedFile.name.replace( /\s+/g, '' ) ) // trim any empty spacing in file name
                const uploadTask = uploadBytesResumable( storageRef, selectedFile )
                uploadTask.on( 'state_changed',
                    ( snapshot ) => {
                        const progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
                        console.log( 'Upload is ' + progress + '% done' );
                        switch ( snapshot.state ) {
                            case 'paused':
                                console.log( 'Upload is paused' );
                                break;
                            case 'running':
                                console.log( 'Upload is running' );
                                break;
                        }
                    }, ( error ) => {
                        console.error( error )
                    }, () => {
                        getDownloadURL( uploadTask.snapshot.ref ).then( async ( downloadURL ) => {
                            newPost.img = downloadURL // add image to new post
                            await axios.post( "http://localhost:8800/api/posts", newPost ) // upload post
                            setFile( null )
                        } )
                    } )

            }
            else {
                await axios.post( "http://localhost:8800/api/posts", newPost ) // upload as is
                setFile( null )
            }
        } catch ( error ) {
            console.log( error )
        }
    }


    //handle image select 
    // creates a URL that displays the image on screen
    const handleImageSelect = () => {
        const selectedImg = imageRef.current;
        // if the selected image exists
        if ( selectedImg && selectedImg.files.length > 0 ) {
            const selectedFile = selectedImg.files[ 0 ]
            const selectedFileURL = URL.createObjectURL( selectedFile )
            setFile( selectedFileURL )
        }
    }

    return (
        <div className='share'>
            <div className="wrapper">
                <div className="top">
                    <img className="profileImg" src={ user.profilePicture ? user.profilePicture : noavatar } alt="" />
                    <textarea
                        type="text"
                        placeholder={ `What's on your mind ${user.firstName.charAt( 0 ).toUpperCase() + user.firstName.slice( 1 )}?` }
                        className="input"
                        ref={ desc }
                        rows={3}
                    />
                    { file !== null && <img src={ cancel } alt="" className="cancelImgBtn" onClick={ () => setFile( null ) } /> }
                </div>
                <div className="imageContainer">
                    <img src={ file } alt="" />
                </div>
                <hr className="shareHR" />
                <form className="bottom" onSubmit={ handleSubmit }>
                    <div className="options">
                        <label htmlFor="file" className="option">
                            <PermMedia className="icon" htmlColor="tomato" />
                            <span className="text">Photo/Video</span>
                            <input type="file" name="file" id="file" accept=".png,.jpeg,.jpg" onChange={ handleImageSelect } style={ { display: "none" } } ref={ imageRef } />
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