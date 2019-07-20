import React from 'react';
import axios from 'axios';
import {Modal, Button, message, Popover, Steps} from 'antd';
import CancleButton from "../../../BlockQuote/cancleButton";
import WhiteSpace from "../../../BlockQuote/whiteSpace";

//用于编写弹出框的按钮应用
class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete=this.handleDelete.bind(this)
        }


    render(){

        return(
            <div>
                <span className="blue" onClick={this.handleDelete}>删除</span>
            </div>
        )
    }

    handleDelete(){

    }
}

export default Delete