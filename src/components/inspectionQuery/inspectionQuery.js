import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import axios from "axios";
import {message,Tabs,Table} from "antd";
import SearchPart from "./searchPart"
import TreeCard from "../BlockQuote/treeSelect"
import "./inspectionQuery.css"
import { column1,column2,column3}from "./columns"
import {datasource} from "./dataSource";
var recordq={};
var vis=false;
class InspectionQuery extends React.Component{
    constructor(props){
        super(props)
        this.detailVisible=false;
        this.state={
            doingStatus:'1',
            TreeData:[
                {
                    title:"root" ,
                    key:"root",
                    value:"root",
                    children:[
                        {
                            title:"1" ,
                            key:"1",
                            value:"1",children:[]
                        },
                        {title:"2" ,key:"2",value:"2",children:[]},
                        {title:"3" ,key:"3",value:"3",children:[]},
                        {title:"4" ,key:"4",value:"4",children:[]},{
                            title:"5" ,
                            key:"5",
                            value:"1",children:[]
                        },
                        {title:"2" ,key:"6",value:"2",children:[]},
                        {title:"3" ,key:"7",value:"3",children:[]},
                        {title:"4" ,key:"8",value:"4",children:[]},
                        {
                            title:"1" ,
                            key:"9",
                            value:"1",children:[]
                        },
                        {title:"2" ,key:"10",value:"2",children:[]},
                        {title:"3" ,key:"11",value:"3",children:[]},
                        {title:"4" ,key:"12",value:"4",children:[]},
                        {
                            title:"1" ,
                            key:"13",
                            value:"1",children:[]
                        },
                        {title:"2" ,key:"14",value:"2",children:[]},
                        {title:"3" ,key:"15",value:"3",children:[]},
                        {title:"4" ,key:"16",value:"4",children:[]}
                        ]
                }],
            RightTableData:[],
        }
        this.returnDataEntry = this.returnDataEntry.bind(this)
    }
    componentDidMount() {
        recordq.index=1;
        console.log(recordq)

    }

    handleClick=()=>{

    }
    render(){
        this.handleInspectionDetailClick();
        console.log(this.detailVisible)
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;

        return (
            <div>
                <Blockquote menu={current.menuParent} name="巡检查询"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div style={{padding: '15px',width:"100%"}}>
                    <Tabs onChange={this.returnEquKey} >
                        <Tabs.TabPane key={1} tab={(<b>待巡检</b>)}>
                            <div className="inspectionQueryTree" >
                                <TreeCard
                                    style={{height:"150px"}}
                                    treeName="所属部门"
                                    treeData={this.state.TreeData}
                                    getTreeData={this.getTreeData}
                                    getTableData={this.getTableData}
                                    getParams={this.getParams}
                                />

                            </div>
                            <SearchPart/>

                            <div className="inspectionQueryTable">
                                <Table
                                    bordered
                                    size={"small"}
                                    columns={column1}
                                    scroll={{y: 360}}
                                    dataSource={datasource}
                                />
                            </div>

                        </Tabs.TabPane>
                        <Tabs.TabPane key={2} tab={(<b>已接单</b>)}>
                            <div className="inspectionQueryTree" >
                                <TreeCard
                                    treeName="所属部门"
                                    treeData={this.state.TreeData}
                                    getTreeData={this.getTreeData}
                                    getTableData={this.getTableData}
                                    getParams={this.getParams}
                                />

                            </div>
                            <SearchPart/>
                            <div className="inspectionQueryTable">
                                <Table
                                    bordered
                                    size={"small"}
                                    columns={column2}
                                    dataSource={datasource}
                                    scroll={{y: 360}}
                                />
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane key={3} tab={(<b>已完成</b>)}>
                            <div className="inspectionQueryTree">
                                <TreeCard
                                    treeName="所属部门"
                                    treeData={this.state.TreeData}
                                    getTreeData={this.getTreeData}
                                    getTableData={this.getTableData}
                                    getParams={this.getParams}
                                />

                            </div>
                            <SearchPart/>
                            <div className="inspectionQueryTable">
                                <Table
                                    bordered
                                    size={"small"}
                                    columns={column3}
                                    dataSource={datasource}
                                    scroll={{y: 360}}
                                />
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
    returnEquKey = key => {
        if(key==='1'||key==='2'||key==='3'){
            console.log(key)
            console.log(this.detailVisible)
            this.setState({doingStatus:key})
        }
    };
    getTreeData=()=>{

    }
    getTableData=()=>{

    }
    getParams=()=>{

    }
    handleInspectionDetailClick=()=>{

    }

    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/equipmentInspection'});
    }
}
export default InspectionQuery

export var HandleInspectionClick = function  (record) {
    recordq=record;
    vis=true;
    console.log(recordq);
}