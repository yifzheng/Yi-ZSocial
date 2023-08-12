import "./online.scss"
import Person3 from "../../assets/person/person3.jpg"

const Online = () => {
    return (
        <>
            <div className="imgContainer">
                <img src={ Person3 } alt="" className="profileImg" />
                <span className="online"></span>
            </div>
            <span className="userName">Jane Dowe</span>
        </>
    )
}

export default Online