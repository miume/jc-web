import React from 'react';
import axios from 'axios';
import {Modal, Button, message, Popover, Steps, Popconfirm, Divider} from 'antd';
import CancleButton from "../../../BlockQuote/cancleButton";
import WhiteSpace from "../../../BlockQuote/whiteSpace";

//用于编写弹出框的按钮应用
class Delete extends React.Component {
    constructor(props) {
        super(props);
        }
    render(){

        return(
            <div>
                <span >
                <Divider type="vertical" />
                <Popconfirm title="确认删除?" onConfirm={()=> this.props.handleDelete(this.props.record.code)} okText="确定" cancelText="取消" >
                    <span className='blue' >删除</span>
                </Popconfirm>
            </span>
            </div>
        )
    }

}

export default Delete