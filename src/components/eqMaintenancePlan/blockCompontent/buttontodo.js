import React, {Component} from 'react'
import Addmaintenance from '../miniCompontent/addmaintenancebutton'
import Searchpart from '../miniCompontent/searchpart'
import './style.css'
class ButtonToDd extends Component {
        render(){
        return(
            <div className='Buttontodo'style={{display:'flex'}}>
                <Addmaintenance />
                <Searchpart id='searchpart' />
            </div>
        )
    }
}
export default ButtonToDd