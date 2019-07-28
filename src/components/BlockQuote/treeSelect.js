import {Card, message, Tree} from 'antd';
import React from 'react'
import "./blockquote.css"

class TreeCard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedKeys:[],
            expandedKeys:[],
            TreeData:[],
            defaultkey:[],
        }
        this.returnDepKey = this.returnDepKey.bind(this)
        this.props.getTreeData()
    }
    componentWillUnmount() {this.setState = () => {return;}}
    componentDidMount() {
        this.props.getTreeData();
        const params = this.props.defaultparams;
        this.props.getTableData(params);
    }
    componentWillReceiveProps(nextProps) {
        this.findExpandKeys();
    }
    findExpandKeys=()=>{
        var data=this.props.treeData;
        if(data.length!==0){
            console.log(data)
            var keys=[];
            var defaultkey=[];
            while(data[0].children.length!==0)
           {
               keys.push(data[0].key+'');
               data=data[0].children;
               defaultkey.push(data[0].key+'');
               if(defaultkey.length===2)
               defaultkey.shift();
           }
            this.setState({
                expandedKeys:keys,
                selectedKeys:defaultkey,
            },()=>{
                console.log('setde',this.state.selectedKeys)
                console.log('set',this.state.expandedKeys)
            });

        }
    }

    url = JSON.parse(localStorage.getItem('url'));
    onExpand = (expandedKeys) => {
        this.setState({expandedKeys: expandedKeys})
    }
    render() {
        console.log(this.state.selectedKeys)
        return(
            <Card
                style={{display:'inline-block',width: "100%"}}
                className='departmentCard'
                title={<p id='titledepartment1'><b fontSize="10px" id='titledepartmentselect'>{this.props.treeName}&nbsp;</b>(请选择)</p>} >
                <div style={{overflowX:'auto', height:'450px'}}>
                    <Tree
                        showLine={true}
                        expandedKeys={this.state.expandedKeys}
                        selectedKeys={this.state.selectedKeys}
                        treeData={this.props.treeData}
                        onSelect={this.returnDepKey}
                        onExpand={this.onExpand}
                    />
                </div>
            </Card>
        )
    }
    // 通过回调函数，更新表格中的数据
    returnDepKey = (selectedKeys,e) => {
        this.props.getParams(selectedKeys,e)
        this.setState({selectedKeys:selectedKeys})
        console.log("selectedKeys",selectedKeys)
        console.log("e",e)
    };
}
export default TreeCard
