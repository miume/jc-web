import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import axios from "axios";
import { Tooltip, Button,Row,Col} from 'antd';
import LeftLayout from"./leftLayout"
import "./eqMaintenanceDataEntry.css"
class Eqblock extends React.Component{
constructor(props){
    super(props)
    this.state={
        deviceName:this.props.deviceName
    }
    this.handleClick=this.handleClick.bind(this)
}
handleClick=()=>{
    console.log('传送点击的eqname获取表格数据')
    console.log(this.state.deviceName)
    {this.props.changeeqname(this.state.deviceName)}
}
    render() {
        return (
            <div>
                <Row>
                    <Col span={21} type="flex" justify="start">
                    <Button block='true'  onClick={this.handleClick}>
                        {this.state.deviceName}
                    </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Eqblock