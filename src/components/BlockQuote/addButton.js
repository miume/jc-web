import React from 'react';
import {Button} from 'antd';
class AddButton extends React.Component{
    render(){
        return (
            <Button onClick={this.props.handleAdd} className='button'><i className="fa fa-plus" aria-hidden="true" style={{color:'white'}}></i>&nbsp;新增</Button>
        )
    }
}
export default AddButton;