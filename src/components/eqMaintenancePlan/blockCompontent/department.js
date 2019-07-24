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
                key:'0',
                title:'总公司',
                children: [],
                value: '总公司',
            }],
        };
        this.returnDepKey = this.returnDepKey.bind(this)
    }
    componentDidMount() {
        // Tip: Must have, or the parent node will not expand automatically when you first add a child node
        this.getDepartmentData();
        const params = {
            deptId:this.state.depCode,
        }
        this.props.getTableData(params,this.state.depName);
    }
    ExpandedKeys=['0','1','2']
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
                        showLine={true}
                        defaultExpandAll={true}
                        treeData={this.state.dataSource}
                        onSelect={this.returnDepKey}
                        ExpandedKeys={this.ExpandedKeys}
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
                    statusId:-1,
                }
                console.log(params)
                this.props.getTableData(params,this.state.depName)
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
                for (let i = 0; i < res.length; i++) {
                    const arrParent = res[i].parent;
                    var parenObj = {
                        title:arrParent.name,
                        key:arrParent.code,
                        children: [],
                        value: arrParent.name,
                    };
                    const arrSon = res[i].son;
                    for (let j = 0; j < arrSon.length; j++) {
                        var arr = arrSon[j];
                        if(i===0&&j===0){
                            parenObj['children'].push({
                                title:arr.name.toString(),
                                key:arr.code,
                                value:  arrParent.name.toString()+'-'+arr.name.toString(),
                                children: []
                            });
                        }else{
                            parenObj['children'].push({
                                title:arr.name.toString(),
                                key:arr.code,
                                value: arrParent.name.toString()+'-'+arr.name.toString(),
                                children: []
                            });
                        }
                    }
                    dataSource[0].children.push(parenObj);
                }
                this.setState({
                    dataSource: dataSource,
                })
            } else {
                message.info('查询无结果,请联系管理员！')
            }
        });
    };
}
export default DepartmentCard