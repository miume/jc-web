import React from "react";
import DepTree from './depTree/depTree';
import Blockquote from "../BlockQuote/blockquote";
import axios from "axios";
import {message} from "antd";
import './departmentStruct.css'


class DepartmentStruct extends React.Component{
    constructor(props){
        super(props)
        this.returnDataEntry = this.returnDataEntry.bind(this)
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;

        return (
            <div>
                <Blockquote menu={current.menuParent} name="部门结构"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div style={{padding: '15px'}} className="depStructTree">
                    <DepTree
                        depFlag = {true}
                        url={this.url}
                        operation={this.operation}
                    />
                </div>
            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/equipmentBasicData'});
    }
}

export default DepartmentStruct