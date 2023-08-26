import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import snap from "../../assets/snap.png"
import "./editProfile.scss"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router"
import axios from "axios"

const EditProfile = () => {
    const { user } = useContext( AuthContext )
    const [ userName, setUserName ] = useState( user.userName )
    const [ firstName, setFirstName ] = useState( user.firstName )
    const [ lastName, setLastName ] = useState( user.lastName )
    const [ city, setCity ] = useState( user.city )
    const [ from, setFrom ] = useState( user.from )
    const [ relationship, setRelationship ] = useState( user.relationship )
    const [ desc, setDesc ] = useState( user.desc )
    const navigate = useNavigate();

    // handle saving the information in the save section
    const handleSaveNameSection = async () => {
        try {
            await axios.put( `http://localhost:8800/api/users/${user._id}`, { userId: user._id, firstName, lastName, userName } )
            // fetch user object from local storage and update context object
            const storedUser = JSON.parse( localStorage.getItem( "user" ) )
            storedUser.firstName = firstName
            storedUser.lastName = lastName
            storedUser.userName = userName
            localStorage.setItem( "user", JSON.stringify( storedUser ) )
            setTimeout( () => navigate( "/" ), 1000 )
        } catch ( error ) {
            console.log( error )
        }
    }

    // handle saving the information in the miscellaneous section
    const handleSaveMiscellaneous = async () => {
        const rel = parseInt( relationship )
        try {
            await axios.put( `http://localhost:8800/api/users/${user._id}`, { userId: user._id, city, from, relationship: rel } )
            // fetch user object from local storage and update context object
            const storedUser = JSON.parse( localStorage.getItem( "user" ) )
            storedUser.city = city
            storedUser.from = from
            storedUser.relationship = rel
            localStorage.setItem( "user", JSON.stringify( storedUser ) )
            setTimeout( () => navigate( `/profile/${user.userName}` ), 1000 )
        } catch ( error ) {
            console.log( error )
        }
    }
    const handleSaveDesc = async () => {
        try {
            await axios.put( `http://localhost:8800/api/users/${user._id}`, { userId: user._id, desc } )
            // fetch user object from local storage and update context object
            const storedUser = JSON.parse( localStorage.getItem( "user" ) )
            storedUser.desc = desc
            localStorage.setItem( "user", JSON.stringify( storedUser ) )
            setTimeout( () => navigate( `/profile/${user.userName}` ), 1000 )
        } catch ( error ) {
            console.log( error )
        }
    }

    const handleSaveAll = async () => {
        const rel = parseInt( relationship )
        try {
            await axios.put( `http://localhost:8800/api/users/${user._id}`, { userId: user._id, firstName, lastName, userName, city, from, relationship: rel, desc } )
            // fetch user object from local storage and update context object
            const storedUser = JSON.parse( localStorage.getItem( "user" ) )
            storedUser.firstName = firstName
            storedUser.lastName = lastName
            storedUser.userName = userName
            storedUser.city = city
            storedUser.from = from
            storedUser.relationship = rel
            storedUser.desc = desc
            localStorage.setItem( "user", JSON.stringify( storedUser ) )
            setTimeout( () => navigate( `/profile/${user.userName}` ), 1000 )
        } catch ( error ) {
            console.log( error )
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
                                <button className="save" onClick={ handleSaveNameSection }>Save Profile Info</button>
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
                                <button className="save" onClick={ handleSaveMiscellaneous }>Save Profile Info</button>
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
                            <textarea name="desc" id="desc" cols="50" rows="5" placeholder="What's your status?" maxLength={ 100 } value={ desc } onChange={ e => setDesc( e.target.value ) }></textarea>
                            <div className="buttons">
                                <button className="save" onClick={ handleSaveDesc }>Save Profile Info</button>
                                <button className="cancel" onClick={ () => navigate( "/" ) }>Cancel</button>
                            </div>
                        </div>
                    </div>
                    <hr className="lineBreak" />
                    <div className="saveAll">
                        <div className="left"><span className="title">Save All?</span></div>
                        <div className="right">
                            <div className="buttons">
                                <button className="save" onClick={ handleSaveAll }>Save Profile Info</button>
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