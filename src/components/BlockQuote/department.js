import React from 'react';
import {Card, Spin, Tree} from 'antd';
import axios from "axios";

class DepTree extends React.Component{
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props){
        super(props);
        this.state={
            deptId:'',      //存储点击部门code
            treeData:[],    //存储部门数据
            loading: true, //存储加载状态
            selectedKeys: [], //存储选中的树节点
            expandedKeys: []  //存储展开指定的树节点
        };
        this.onSelect = this.onSelect.bind(this);
        this.onExpand = this.onExpand.bind(this);
        this.getTreeData=this.getTreeData.bind(this);
    }

    /**组件退出后销毁组件，避免控制台抱错*/
    componentWillUnmount() {
        this.setState = () => {
            return ;
        }
    }
    componentDidMount() {
        this.getTreeData();
    }

    render() {
        return(
            <Spin spinning={this.state.loading} wrapperClassName='equipment-left'>
                <Card
                    bordered={false}
                    style={{width: "100%",height: '100%',display: 'inline-block'}}
                    className='departmentCard'
                    headStyle={{height:'10%'}}
                    bodyStyle={{height:'90%',padding: '6px 12px 0 12px',overflow:'auto'}}
                    title={`${this.props.treeName}(请选择)`}>
                    <div>
                        <Tree
                            showLine={true}
                            expandedKeys={this.state.expandedKeys}
                            selectedKeys={this.state.selectedKeys}
                            treeData={this.state.treeData}
                            onSelect={this.onSelect}
                            onExpand={this.onExpand}
                        />
                    </div>
                </Card>
            </Spin>
        )
    }

    /**获取树的数据*/
    getTreeData = () => {
        axios({
            url: `${this.props.url.equipmentDept.dept}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if (res) {
                this.dataProcessing(res);
            }
        });
    }

    /**对获取的部门数据进行处理*/
    dataProcessing(res) {
        let dataSource = [{
            title:'总公司',
            key:'0',
            children: []
        }];
        let depId = -1, depName = '',expandedKeys = ['0'],selectedKeys = [];
        for (let i = 0; i < res.length; i++) {
            const parent = res[i].parent;
            let parenObj = {
                title:parent.name,
                key:parent.code,
                children: [],
            };
            if(i === 0) {
                expandedKeys.push(parent.code.toString())
            }
            const son = res[i].son;
            for (let j = 0; j < son.length; j++) {
                let arr = son[j];
                if(i===0 && j===0) {
                    depId = arr.code;
                    depName = arr.name;
                    selectedKeys.push(arr.code.toString());
                }
                parenObj['children'].push({
                    children: [],
                    title:arr.name,
                    key:arr.code,
                });
            }
            dataSource[0].children.push(parenObj);
        }
        this.setState({
            treeData: dataSource,
            loading: false,
            selectedKeys: selectedKeys,
            expandedKeys: expandedKeys
        });
        this.props.getTableData({
            deptId: depId,
            depName: depName
        })
    }

    onSelect(selectedKeys,e) {
        let depName = e.node.props.title;
        this.setState({
            selectedKeys: selectedKeys,
            depName: depName
        });
        this.props.getTableData({
            deptId: parseInt(selectedKeys[0]),
            depName: depName,
        });
    }

    onExpand(expandedKeys) {
        this.setState({expandedKeys: expandedKeys});
    }
}

export default DepTree