import React from 'react';
import {Button} from 'antd';
class SaveButton extends React.Component{
    render(){
        return (
            <Button onClick={this.props.handleSave} className='green-button'><i className="fa fa-floppy-o" aria-hidden="true" style={{color:'white'}}></i>&nbsp;&nbsp;保存</Button>
        )
    }
}
export default SaveButton;