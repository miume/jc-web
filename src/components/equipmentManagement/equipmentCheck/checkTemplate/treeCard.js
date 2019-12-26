import React from "react";
import {Card, Tree} from 'antd';
import "../../../BlockQuote/blockquote.css";



class TreeCard extends React.Component{
    url
    constructor(props){
        super(props);
        this.state = {
            selectedKeys:[],
            expandedKeys:[],
            TreeData:[]
        }
        this.returnDepKey = this.returnDepKey.bind(this);
    }
    returnDepKey(){

    }
    componentDidMount(){

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
                style={{display:'inline-block',width: "100%"}}
                className='departmentCard'
                title={<p id='titledepartment1'><b fontSize="10px" id='titledepartmentselect'>{this.props.treeName}&nbsp;</b>(请选择)</p>}
            >
                <div style={{overflowX:'auto', height:'450px'}}>
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
