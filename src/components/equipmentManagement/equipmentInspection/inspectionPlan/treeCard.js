import React from "react";
import {Card, Tree} from 'antd';
import "../../../BlockQuote/blockquote.css";

class TreeCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){

    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
    }
    render(){
        const TreeData = this.props.TreeData?this.props.TreeData:[];
        return (
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
                            TreeData.map((item,value)=>{
                                const code = item.parent.code
                                if(item.son.length===0){
                                    return <Tree.TreeNode title={item.parent.name} key={item.parent.code} code={item.parent.code}></Tree.TreeNode>
                                }else{
                                    return <Tree.TreeNode title={item.parent.name} key={item.parent.code} code={item.parent.code}>
                                        {item.son.map((items,value)=>{
                                            return <Tree.TreeNode title={items.name} key={item.parent.code+"-"+items.code} fatherName={item.parent.name} code={code}></Tree.TreeNode>
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
