import React from "react";
import TreeCard from "../BlockQuote/treeSelect"
import axios from "axios";
import {message} from "antd";
class CheckPlan extends React.Component{
    componentWillUnmount() {this.setState = () => {return;}}
    url= JSON.parse(localStorage.getItem('url'));
    constructor(props){
        super(props)
        this.state={
            departmentData:[],
            expandedKeys:[],
        }
    }
    onExpand = (expandedKeys) => {//展开的时候更新一下
        this.expandedKeys = expandedKeys;
        this.setState({expandedKeys: expandedKeys})
    }
    getTreeData = () => {
        // TODO: 调接口，获取数据
        axios({
            url: `${this.url.equipmentDept.dept}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
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
                    departmentData: dataSource,
                    expandedKeys: expandedKeys,
                })
                console.log(this.state.expandedKeys)
            } else {
                message.info('查询无结果,请联系管理员！')
            }
        });
    };
    getTableData=()=>{

    }
    render(){
        return (

            <div style={{padding:"15px"}}>
                <div style={{width:'20%'}}>
                   <TreeCard
                       treeData={this.state.departmentData}
                       getTableData={this.getTableData}
                       defaultparams={{}}
                       expandedKeys={this.state.expandedKeys}
                       defaultSelectedKeys={['2']}
                       params={{}}
                       onExpand={this.onExpand}
                       treeName={'所属部门'}
                       getTreeData={this.getTreeData}
                   />
                </div>
                <div style={{width:'80%'}}>
                </div>
            </div>
        )
    }
    componentDidMount() {
        const params = {
            deptId:this.state.depCode,
            page:1,
            statusId: -1,
            depName:this.props.depName,

        }
        this.getTableData(params);
    }
}

export default CheckPlan