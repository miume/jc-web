import {Card, message, Tree} from 'antd';
import React from 'react'
import "./blockquote.css"
/*
    * 1.父组件必须传初始化的选择项，数据源，查询属性
    * dataSource,treeName,defaultparams,params,
    *
    *
    *
    *
    *
    * */
class TreeCard extends React.Component{
    componentWillUnmount() {this.setState = () => {return;}}
    componentDidMount() {
        this.props.getTreeData();
        const params = this.props.defaultparams;
        this.props.getTableData(params);
    }
    url = JSON.parse(localStorage.getItem('url'));
    constructor(props) {
        super(props);
        this.returnDepKey = this.returnDepKey.bind(this)
    }

    render() {
        return(
                <Card
                    style={{display:'inline-block',width: "100%"}}
                    className='departmentCard'
                    title={<p id='titledepartment1'><b fontSize="10px" id='titledepartmentselect'>{this.props.treeName}&nbsp;</b>(请选择)</p>} >
                    <div style={{overflowX:'auto', height:'450px'}}>
                        <Tree
                            showLine={true}
                            expandedKeys={this.props.expandedKeys}
                            treeData={this.props.treeData}
                            onSelect={this.returnDepKey}
                            onExpand={this.props.onExpand}
                            defaultSelectedKeys={this.props.defaultSelectedKeys}
                        />
                    </div>
                </Card>
            )
    }
    // 通过回调函数，更新表格中的数据
    returnDepKey = (selectedKeys,e) => {
        this.props.getParams(selectedKeys,e)
    };
}
export default TreeCard