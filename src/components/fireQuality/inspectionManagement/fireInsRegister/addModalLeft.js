import React from 'react';
import NewButton from "../../../BlockQuote/newButton";
import {Icon, Table, Input, Modal, Popconfirm, Select} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import moment from "moment";

import "../fireInsRegister/fireInsRegister.css"




class AddModalLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        this.columns = [{
            title:'序号',
            key:'col1',
            dataIndex:'col1',
            width: '10%'
        },{
            title:'批号',
            key:'col2',
            dataIndex:'col2',
            width: '60%'
        },{
            title:'是否重复',
            key:'col3',
            dataIndex:'col3',
            width: '20%',
            render:((text,record) => {
                if (text === 1){
                    return <span>是</span>
                } else{
                    return <span>否</span>
                }
            })
        },{
            title:'操作',
            key:'col4',
            dataIndex:'col4',
            width: '10%',
            render:((text,record) => {
                if (text === 1){
                    return <span><Icon style={{fontSize:"20px",color:"green"}} type="check" /></span>
                } else{
                    return <span><Icon style={{fontSize:"20px",color:"red"}} type="close" /></span>
                }
            })
        }]

    }

    render() {
        return (
            <div className="addModalLeft_scala">
                <Table
                    columns={this.columns}
                    dataSource={this.props.leftDataSource}
                    bordered
                    size={'small'}
                    pagination={false}
                />
            </div>
        );
    }


}

export default AddModalLeft;
