import {Card, Tree} from 'antd';
import React from 'react'
import "./blockquote.css"
/*
    * 1.父组件必须传初始化的选择项，数据源，查询属性
    * dataSource,treeName,defaultparams,params,
    * */
var defaultkey=[];

class TreeCard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedKeys:[],
            expandedKeys:[],
            TreeData:[],
            defaultkey:[],
            flag:false
        };
        this.returnDepKey = this.returnDepKey.bind(this)
        this.props.getTreeData()
    }
    componentDidMount() {
        this.props.getTreeData();
        const params = this.props.defaultparams;
        this.props.getTableData(params);
        this.setState({selectedKeys:defaultkey})
    }
    componentWillReceiveProps(nextProps) {
        this.findExpandKeys();
    }
    findExpandKeys=()=>{
        var data=this.props.treeData;
        if(!this.state.flag){
            if(data.length!==0){
                var keys=[];
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
                });
            }
        }
    }

    url = JSON.parse(localStorage.getItem('url'));
    render() {
        return(
            <Card
                bordered={false}
                style={{width: "100%",height: '100%',display: 'inline-block'}}
                className='departmentCard'
                headStyle={{height:'10%'}}
                bodyStyle={{height:'65vh',padding: '6px 12px 0 12px',overflow:'auto'}}
                title={`${this.props.treeName}(请选择)`}>
                <div>
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
    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys: expandedKeys,
            flag:true
        })
    }
    // 通过回调函数，更新表格中的数据
    returnDepKey = (selectedKeys,e) => {
        this.props.getParams(selectedKeys,e)
        this.setState({selectedKeys:selectedKeys})
    };
}
export default TreeCard

