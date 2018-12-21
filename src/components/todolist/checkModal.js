import React from 'react';
import {Modal} from 'antd';
import NewButton from '../BlockQuote/newButton';
class CheckModal extends React.Component{
    render(){
        return (
            <span>
                <NewButton name='审核' className='fa fa-check' onClick={this.handleCheck} ></NewButton>
                <Modal>

                </Modal>
            </span>
        );
    }
}
export default CheckModal;