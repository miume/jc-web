import {Card, message} from 'antd';
import React from 'react'

import './style.css'
import DepartmentTree from '../miniCompontent/treeofdepartment'
import axios from "axios";

class DepartmentCard extends React.Component{
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <Card  style={{display:'inline',width: "240px",overflowX:'auto', height:'520px'}} className='departmentCard' title={<p id='titledepartment1'><b fontSize="10px" id='titledepartmentselect'>所属部门</b>（请选择）</p>} >
                <DepartmentTree url={this.url} getRightData={this.props.getRightData} />
            </Card>)
    }
}
export default DepartmentCard
