import React, {Component} from 'react';
import {Tree, Icon, Modal, Input, message} from 'antd';
import axios from "axios";
import TreeCard from "../../BlockQuote/treeSelect";


class DepTree extends React.Component{

    constructor(props){
        super(props);
        this.state={
            depName:'',
            deptId:'',
            treeData:[],
        };

        this.getTreeData=this.getTreeData.bind(this)
        this.getParams=this.getParams.bind(this)
    }
    render() {
        console.log(this.state.treeData)
        return(
            <div>
                <TreeCard
                    getParams={this.getParams}
                    getTableData={this.props.getTableData}
                    defaultparams={{
                        secondDeptId:2,
                        repairStatus:1,
                        deptName:'锂电一',}}
                    treeName={'所属部门'}
                    getTreeData={this.getTreeData}
                    treeData={this.state.treeData}
                />
            </div>
        )
    }
    /**获取参数*/
    getParams=(selectedkeys,e)=>{
        this.setState({
            deptId:selectedkeys[0],
            depName:e.node.props.value,
        },()=>{
            if(selectedkeys[0]){
                const params = {
                    secondDeptId:this.state.deptId,
                    repairStatus:1,
                    deptName:this.state.depName,
                };
                console.log(params)
                this.props.getTableData(params)
            }
            else{
                const params = {
                    secondDeptId:2,
                    repairStatus:1,
                    deptName:this.state.depName,
                };
                console.log(params)
                this.props.getTableData(params)
            }
        })
    }
    /**获取树的数据*/
    getTreeData = () => {
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

                title:'总公司',
                key:0,
                value: '总公司',
                children: []
            }];
            if (res) {
                var expandedKeys=['0'];
                for (let i = 0; i < res.length; i++) {
                    const arrParent = res[i].parent;
                    var parenObj = {
                        title:arrParent.name,
                        value: arrParent.name,
                        key:arrParent.code,
                        children: [],
                    };
                    const arrSon = res[i].son;

                    for (let j = 0; j < arrSon.length; j++) {
                        var arr = arrSon[j];
                        if(i===0&&j===0){
                            parenObj['children'].push({
                                value: arr.name,
                                children:[],
                                title:arr.name,
                                key:arr.code,
                            });
                        }else{
                            parenObj['children'].push({
                                value: arr.name,
                                children: [],
                                title:arr.name,
                                key:arr.code,

                            });
                        }
                    }
                    dataSource[0].children.push(parenObj);
                }
                console.log(dataSource)
                this.setState({
                    treeData: dataSource,
                },()=>{

                })
            } else {
                message.info('没有获取到数据')
            }
        });
    };
}

export default DepTree