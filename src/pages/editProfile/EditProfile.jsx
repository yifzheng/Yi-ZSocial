import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import nocover from "../../assets/person/nocover.jpg"
import noavatar from "../../assets/person/noavatar.png"
import snap from "../../assets/snap.png"
import "./editProfile.scss"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router"

const EditProfile = () => {
    const { user } = useContext( AuthContext )
    const [ userName, setUserName ] = useState( user.userName )
    const [ firstName, setFirstName ] = useState( user.firstName )
    const [ lastName, setLastName ] = useState( user.lastName )
    const [ city, setCity ] = useState( user.city )
    const [ from, setFrom ] = useState( user.from )
    const [ relationship, setRelationship ] = useState( 0 )
    const [ desc, setDesc ] = useState( user.desc )
    const profileImgRef = useRef()
    const coverImgRef = useRef()
    const navigate = useNavigate();

    // set relationship type on load
    useEffect( () => {
        setRelationship( getRelationship( user.relationship ) )
    }, [ user.relationship ] )

    // return relationship type based on realtionship number
    const getRelationship = ( num ) => {
        switch ( num ) {
            case 1:
                return "Single"
            case 2:
                return "Married"
            case 3:
                return "Dating"
            default:
                return "Single"
        }
    }
    return (
        <>
            <Topbar />
            <div className="editProfile">
                <div className="left">
                    <Sidebar />
                </div>
                <div className="right">
                    <div className="header">
                        <img src={ snap } alt="" className="logo" />
                        <h3>Welcome to Yi-ZSocial, { user.firstName.charAt( 0 ).toUpperCase() + user.firstName.slice( 1 ) }</h3>
                    </div>
                    <hr className="lineBreak" />
                    <div className="generalInfo">
                        <div className="left">
                            <span className="title">Name</span>
                        </div>
                        <div className="right">
                            <div className="infoGroup">
                                <label htmlFor="">First</label>
                                <input type="text" name="firstName" id="firstName" placeholder="First Name" value={ firstName } onChange={ e => setFirstName( e.target.value ) } />
                                <span></span>
                            </div>
                            <div className="infoGroup">
                                <label htmlFor="">Last</label>
                                <input type="text" name="lastName" id="lastName" placeholder="Last Name" value={ lastName } onChange={ e => setLastName( e.target.value ) } />
                                <span></span>
                            </div>
                            <div className="infoGroup">
                                <label htmlFor="">User Name</label>
                                <input type="text" name="userName" id="userName" placeholder="User Name" value={ userName } onChange={ e => setUserName( e.target.value ) } />
                                <span></span>
                            </div>
                            <span>Please note that any name changes are case insensitive</span>
                            <div className="buttons">
                                <button className="save">Save Profile Info</button>
                                <button className="cancel" onClick={ () => navigate( "/" ) }>Cancel</button>
                            </div>
                        </div>
                    </div>
                    <hr className="lineBreak" />
                    <div className="generalInfo">
                        <div className="left">
                            <span className="title">Miscellaneous</span>
                        </div>
                        <div className="right">
                            <div className="infoGroup">
                                <label htmlFor="">City</label>
                                <input type="text" name="city" id="city" placeholder="City" value={ city } onChange={ e => setCity( e.target.value ) } />
                                <span></span>
                            </div>
                            <div className="infoGroup">
                                <label htmlFor="">Hometown</label>
                                <input type="text" name="hometown" id="hometown" placeholder="Hometown" value={ from } onChange={ e => setFrom( e.target.value ) } />
                                <span></span>
                            </div>
                            <div className="infoGroup">
                                <label htmlFor="">Realtionship</label>
                                <select name="realtionship" id="relationship" value={ relationship } onChange={ e => setRelationship( e.target.value ) }>
                                    <option value={ 1 }>Single</option>
                                    <option value={ 2 }>Married</option>
                                    <option value={ 3 }>Dating</option>
                                </select>
                                <span></span>
                            </div>
                            <span>Please note that any name changes are case insensitive</span>
                            <div className="buttons">
                                <button className="save">Save Profile Info</button>
                                <button className="cancel" onClick={ () => navigate( "/" ) }>Cancel</button>
                            </div>
                        </div>
                    </div>
                    <hr className="lineBreak" />
                    <div className="description">
                        <div className="left">
                            <span className="title">Desription</span>
                        </div>

                        <div className="right">
                            <textarea name="desc" id="desc" cols="50" rows="10" placeholder="What's your status?" value={ desc } onChange={ e => setDesc( e.target.value ) }></textarea>
                            <div className="buttons">
                                <button className="save">Save Profile Info</button>
                                <button className="cancel" onClick={ () => navigate( "/" ) }>Cancel</button>
                            </div>
                        </div>
                    </div>
                    <hr className="lineBreak" />
                    <div className="profilePicture">
                        <div className="left">
                            <span className="title">Profile Picture</span>

                        </div>
                        <div className="right">
                            <img src={ noavatar } alt="" />
                            <input type="file" name="picture" id="picture" style={ { display: 'none' } } ref={ profileImgRef } />
                            <button className="selectFile"><label htmlFor="picture">Upload from computer</label></button>
                            <br />
                            <div className="buttons">
                                <button className="save">Save Profile Info</button>
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
                            <img src={ nocover } />
                            <input type="file" name="picture" id="picture" style={ { display: 'none' } } ref={ coverImgRef } />
                            <button className="selectFile"><label htmlFor="picture">Upload from computer</label></button>
                            <br />
                            <div className="buttons">
                                <button className="save">Save Profile Info</button>
                                <button className="cancel" onClick={ () => navigate( "/" ) }>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile