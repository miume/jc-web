import React from "react";
import {Card, Tree, Input} from 'antd';
import "../../../BlockQuote/blockquote.css";
const {Search} = Input;

class TreeCard extends React.Component{
    url
    constructor(props){
        super(props);
        this.state = {
            selectedKeys:[],
            expandedKeys:[],
            TreeData:[]
        }
    }

    componentWillUnmount() {
        this.setState = () => {
          return ;
        }
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <Card
                bordered={false}
                style={{width: "100%",height: '100%',display: 'inline-block'}}
                className='departmentCard'
                headStyle={{height:'10%'}}
                bodyStyle={{height:'65vh',padding: '6px 12px 0 12px',overflow:'auto'}}
                title={<p id='titledepartment1'><b fontSize="10px" id='titledepartmentselect'>{this.props.treeName}&nbsp;</b>(请选择)</p>}
            >
                <div className='equipment-tree'>
                <Search style={{ marginBottom: 8 }} placeholder="请输入名称" onChange={this.props.onChange}/>
                    <Tree
                        showLine={true}
                        selectedKeys={this.props.selectedKeys}
                        onSelect={this.props.onSelect}
                        onExpand={this.props.onExpand}
                        expandedKeys={this.props.expandedKeys}
                    >
                        {
                            this.props.TreeData.map((item)=>{
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
