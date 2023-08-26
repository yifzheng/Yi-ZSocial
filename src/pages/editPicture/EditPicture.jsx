import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import snap from "../../assets/snap.png"
import noavatar from "../../assets/person/noavatar.png"
import nocover from "../../assets/person/nocover.jpg"
import "./editPicture.scss"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../../firebase"
import axios from "axios"

const EditPicture = () => {
    const [ profileURL, setProfileURL ] = useState( null )
    const [ coverURL, setCoverURL ] = useState( null )
    const [ error, setError ] = useState( false )
    const { user } = useContext( AuthContext )
    const navigate = useNavigate()
    const profileImgRef = useRef()
    const coverImgRef = useRef()

    const uploadFileToStorage = async ( file, type ) => {
        try {
            const fileUUID = uuid()
            const storageRef = ref( storage, type + "/" + user._id + fileUUID + file.name.replace( /\s+/g, '' ) ) // trim any empty spacing in file name
            await uploadBytes( storageRef, file )
            const downloadURL = await getDownloadURL( storageRef )
            return downloadURL
        } catch ( error ) {
            console.log( error )
        }
    }

    //handle image select 
    // creates a URL that displays the image on screen
    const handleImageSelect = ( type ) => {
        const selectedImg = type === "profile" ? profileImgRef.current : coverImgRef.current;
        // if the selected image exists
        if ( selectedImg && selectedImg.files.length > 0 ) {
            const selectedFile = selectedImg.files[ 0 ]
            const selectedFileURL = URL.createObjectURL( selectedFile )
            type === "profile" ? setProfileURL( selectedFileURL ) : setCoverURL( selectedFileURL )
        }
    }

    // upload image to firbase and update user on MongoDB and website
    const handleUpload = async ( type ) => {
        const image = type === 'profile' ? profileImgRef.current.files[ 0 ] : coverImgRef.current.files[ 0 ];
        if ( image !== undefined ) {
            try {
                if ( type === "profile" ) {
                    const profileURL = await uploadFileToStorage( image, "profile" )
                    await axios.put( `http://localhost:8800/api/users/${user._id}`, { userId: user._id, profilePicture: profileURL } )
                    // fetch user object from local storage and update context object
                    const storedUser = JSON.parse( localStorage.getItem( "user" ) )
                    storedUser.profilePicture = profileURL
                    localStorage.setItem( "user", JSON.stringify( storedUser ) )
                    setTimeout( () => navigate( `/profile/${user.userName}` ), 1000 )
                }
                else {
                    const coverURL = await uploadFileToStorage( image, "cover" )
                    await axios.put( `http://localhost:8800/api/users/${user._id}`, { userId: user._id, coverPicture: coverURL } )
                    // fetch user object from local storage and update context object
                    const storedUser = JSON.parse( localStorage.getItem( "user" ) )
                    storedUser.coverPicture = coverURL
                    localStorage.setItem( "user", JSON.stringify( storedUser ) )
                    setTimeout( () => navigate( `/profile/${user.userName}` ), 1000 )
                }
            } catch ( error ) {
                console.log( error )
            }
        }
    }

    // upload for both pictures
    const handleUploadAll = async () => {
        const profileImg = profileImgRef.current.files[ 0 ]
        const coverImg = coverImgRef.current.files[ 0 ]
        if ( profileImg !== undefined && coverImg !== undefined ) {
            const profileURL = await uploadFileToStorage( profileImg, "profile" )
            const coverURL = await uploadFileToStorage( coverImg, "cover" )
            await axios.put( `http://localhost:8800/api/users/${user._id}`, { userId: user._id, profilePicture: profileURL, coverPicture: coverURL } )
            // fetch user object from local storage and update context object
            const storedUser = JSON.parse( localStorage.getItem( "user" ) )
            storedUser.profilePicture = profileURL
            storedUser.coverPicture = coverURL
            localStorage.setItem( "user", JSON.stringify( storedUser ) )
            setTimeout( () => navigate( `/profile/${user.userName}` ), 1000 )
        }
        else {
            setError( true )
            window.scrollTo( {
                top: document.body.scrollHeight,
                behavior: 'smooth',
            } );
        }
    }

    return (
        <>
            <Topbar />
            <div className="editPicture">
                <div className="left">
                    <Sidebar />
                </div>
                <div className="right">
                    <div className="header">
                        <img src={ snap } alt="" className="logo" />
                        <h3>Welcome to Yi-ZSocial, { user.firstName.charAt( 0 ).toUpperCase() + user.firstName.slice( 1 ) }</h3>
                    </div>
                    <hr className="lineBreak" />
                    <div className="profilePicture">
                        <div className="left">
                            <span className="title">Profile Picture</span>
                        </div>
                        <div className="right">
                            <img src={ profileURL ? profileURL : noavatar } alt="" />
                            <input
                                type="file"
                                name="picture"
                                id="picture"
                                style={ { display: 'none' } }
                                ref={ profileImgRef }
                                onChange={ () => handleImageSelect( "profile" ) }
                            />
                            <button className="selectFile"><label htmlFor="picture">Upload from computer</label></button>
                            <div className="buttons">
                                <button className="save" onClick={ () => handleUpload( "profile" ) }>Save Image</button>
                                <button className="cancel" onClick={ () => navigate( "/" ) }>Cancel</button>
                            </div>
                        </div>
                    </div>
                    <hr className="lineBreak" />
                    <div className="profilePicture">
                        <div className="left">
                            <span className="title">Cover Picture</span>
                        </div>
                        <div className="right">
                            <img src={ coverURL ? coverURL : nocover } />
                            <input
                                type="file"
                                name="cover"
                                id="cover"
                                style={ { display: 'none' } }
                                ref={ coverImgRef }
                                onChange={ () => handleImageSelect( "cover" ) }
                            />
                            <button className="selectFile"><label htmlFor="cover">Upload from computer</label></button>
                            <div className="buttons">
                                <button className="save" onClick={ () => handleUpload( "cover" ) }>Save Image</button>
                                <button className="cancel" onClick={ () => navigate( "/" ) }>Cancel</button>
                            </div>
                        </div>
                    </div>
                    <hr className="lineBreak" />
                    { error && <div className="errorMessage">
                        <span className="error">Please upload a profile picture and a cover picture</span>
                    </div> }
                    <div className="saveAll">
                        <div className="left"><span className="title">Save All?</span></div>
                        <div className="right">
                            <div className="buttons">
                                <button className="save" onClick={ handleUploadAll }>Save Profile</button>
                                <button className="cancel" onClick={ () => navigate( "/" ) }>Cancel</button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default EditPicture