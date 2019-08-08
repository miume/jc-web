import React from "react";
import {Card, Tree} from 'antd';
import "../BlockQuote/blockquote.css";
import axios from 'axios';



class TreeCard extends React.Component{
    url
    constructor(props){
        super(props);
        this.state = {
            selectedKeys:[],
            expandedKeys:[],
            TreeData:[],
            // defaultkey:[],
        }
        this.returnDepKey = this.returnDepKey.bind(this);
        // this.getTreeData = this.getTreeData.bind(this);
        // this.onSelect = this.onSelect.bind(this);
    }
    returnDepKey(){

    }
    componentDidMount(){
        
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
      }
    // onExpand = (expandedKeys) => {
        
    //     this.setState({expandedKeys: expandedKeys})
    // }
    
    // getTreeData(){
    //     axios({
    //         url:`${this.url.deviceSpot.getAllDevices}`,
    //         method:"get",
    //         headers:{
    //             'Authorization':this.url.Authorization
    //         },
    //     }).then((data)=>{
    //         const res = data.data.data
    //         if(res.length !== 0){
    //             var defaultkey = [];
    //             defaultkey.push(res[0].basicInfoDept.code.toString());
    //             var selectedKey = [];
    //             selectedKey.push(res[0].basicInfoDept.code.toString()+"-"+0);
    //             this.setState({
    //                 TreeData:res,
    //                 expandedKeys:defaultkey,
    //                 selectedKeys:selectedKey
    //             })
    //         }
    //     })
    // }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <Card
                style={{display:'inline-block',width: "100%"}}
                className='departmentCard'
                title={<p id='titledepartment1'><b fontSize="10px" id='titledepartmentselect'>{this.props.treeName}&nbsp;</b>(请选择)</p>}
            >
                <div style={{overflowX:'auto', height:'450px'}}>
                    <Tree
                        showLine={true}
                        selectedKeys={this.props.selectedKeys}
                        // treeData={this.state.treeData}
                        onSelect={this.props.onSelect}
                        onExpand={this.props.onExpand}
                        expandedKeys={this.props.expandedKeys}
                    >
                        {
                            this.props.TreeData.map((item,value)=>{
                                const code = item.basicInfoDept.code
                                if(item.deviceName.length===0){
                                    return <Tree.TreeNode title={item.basicInfoDept.name} key={item.basicInfoDept.code} code={item.basicInfoDept.code}></Tree.TreeNode>
                                }else{
                                    return <Tree.TreeNode title={item.basicInfoDept.name} key={item.basicInfoDept.code} code={item.basicInfoDept.code}>
                                        {item.deviceName.map((items,value)=>{
                                            return <Tree.TreeNode title={items} key={item.basicInfoDept.code+"-"+value} fatherName={item.basicInfoDept.name} code={code}></Tree.TreeNode>
                                        })}
                                    </Tree.TreeNode>
                                }
                                
                            })
                        }
                    </Tree>
                </div>
            </Card>
        )
    }
}

export default TreeCard