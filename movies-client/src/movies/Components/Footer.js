import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCopyright} from '@fortawesome/free-solid-svg-icons'


function Footer(){
    return <>
        <div className="footer">
            <FontAwesomeIcon icon={faCopyright} className="icon-footer" size="1x"/>
            <h6>Neria Sivan</h6>
        </div>
    </>
}

export default Footer
