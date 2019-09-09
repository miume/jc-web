import React from "react";
import {Button, Col, Row} from 'antd';

class Eqblock extends React.Component{
constructor(props){
    super(props)
    this.handleClick=this.handleClick.bind(this)
}
handleClick=()=>{
    // console.log('传送点击的eqname获取表格数据')
    {this.props.changeeqname(this.props.deviceName)}
}
    render() {
        return (
            <div >
                <Row>
                    <Col span={21} type="flex" justify="start">
                    <Button className={this.props.colorFlag} block='true'  onClick={this.handleClick}>
                        {this.props.deviceName}
                    </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Eqblock