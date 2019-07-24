import {Card, message, Tree} from 'antd';
import React from 'react'

import './style.css'
import '../../equipmentArchive/equipmentArchive.css'
import axios from "axios";

class DepartmentCard extends React.Component{
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            depCode:2,
            depName:'铜官制造一、二部-锂电一',
            dataSource: [{
                title: '总公司',
                key:'0',
                children: [],
                value:'总公司',
            }],
            expandedKeys:'',
        };
        this.returnDepKey = this.returnDepKey.bind(this)
    }
    onExpand = (expandedKeys) => {
        this.expandedKeys = expandedKeys;
        this.setState({expandedKeys: expandedKeys})
    }
    componentDidMount() {
        // Tip: Must have, or the parent node will not expand automatically when you first add a child node
        this.getDepartmentData();
        const params = {
            deptId:this.state.depCode,
            page:1,
            statusId: -1,
            depName:this.props.depName,

        }
        this.onExpand([]);
        this.props.getTableData(params);
    }
    render() {
        return(
            <Card
                style={{display:'inline',width: "240px",overflowX:'auto', height:'520px'}}
                className='departmentCard'
                title={
                    <p id='titledepartment1'><b fontSize="10px" id='titledepartmentselect'>所属部门&nbsp;</b>(请选择)</p>
                } >
                <div>
                    <Tree
                        expandedKeys={this.state.expandedKeys}
                        showLine={true}
                        treeData={this.state.dataSource}
                        onSelect={this.returnDepKey}
                        onExpand={this.onExpand}
                        defaultSelectedKeys={['2']}
                    />
                </div>
            </Card>)
    }

    // 通过回调函数，更新表格中的数据
    returnDepKey = (selectedKeys,e) => {
        if(selectedKeys[0]){
            this.setState({
                depCode:selectedKeys[0],
                depName:e.node.props.value,
            },()=>{
                const params = {
                    deptId:this.state.depCode,
                    statusId:this.props.statusId,
                    depName:this.state.depName,
                    page:1,
                    size:this.props.size,
                }
                console.log(params)
                this.props.getTableData(params)
            });
        }
    };

    // 获取部门树
    getDepartmentData = () => {
        // TODO: 调接口，获取数据
        axios({
            url: `${this.props.url.equipmentDept.dept}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            var dataSource = [{
                title: '总公司',
                key:'0',
                children: [],
                value:'总公司',
            }];
            if (res) {
                var expandedKeys = ["0"];
                for (let i = 0; i < res.length; i++) {
                    const arrParent = res[i].parent;
                    var parenObj = {
                        title:arrParent.name,
                        key:arrParent.code,
                        children: [],
                        value: arrParent.name,
                    };
                    if(i === 0){
                        expandedKeys.push(arrParent.code.toString())
                    }
                    const arrSon = res[i].son;
                    for (let j = 0; j < arrSon.length; j++) {
                        var arr = arrSon[j];
                            parenObj['children'].push({
                                title:arr.name.toString(),
                                key:arr.code,
                                value:  arrParent.name.toString()+'-'+arr.name.toString(),
                                children: []
                            });
                    }
                    dataSource[0].children.push(parenObj);
                }
                console.log(dataSource)
                this.setState({
                    dataSource: dataSource,
                    expandedKeys: expandedKeys,
                })
            } else {
                message.info('查询无结果,请联系管理员！')
            }
        });
    };
}
export default DepartmentCard