import React, {Component} from 'react';
import { Icon, Modal, Input, message} from 'antd';
import axios from "axios";
import CancleButton from "../../BlockQuote/cancleButton";
import NewButton from "../../BlockQuote/newButton";
import Home from "../../Home/home";
import "./completed.css"
import TreeCard from "../../BlockQuote/treeSelect"

var params = {
    deptId:'',
    statusId:3,
    startDate:'',
    endDate:''
}
class DepTree extends Component {
    url=JSON.parse(localStorage.getItem('url'));
    constructor(props) {
        super(props);
        this.state = {
            depCode:'2',
            dataSource: [{
                title:'总公司',
                key:0,
                children: [],
            }],
            key:'',
            name:''
        };
        this.getData = this.getData.bind(this)

    }
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }

    componentDidMount() {
        // Tip: Must have, or the parent node will not expand automatically when you first add a child node
     //   this.onExpand([]); // 手动触发，否则会遇到第一次添加子节点不展开的Bug

        this.getData();
        // const params = {
        //     deptId:2,
        //     statusId:1,
        // }
        // this.props.getTableData(params)
    }

    render() {
        return (
                <TreeCard
                    treeName="所属部门"
                    showLine
                    defaultExpandAll
                    treeData={this.state.dataSource}
                    getTableData={this.props.getTableData}
                    getTreeData={this.getData}
                    defaultparams={params}
                    getParams={this.returnDepKey}
               />
        )
    }
    //通过回调函数，获得标签页表格中的数据
    returnDepKey = (selectedKeys,e) => {
        const date = this.props.getLastMonthTime(1);
        this.setState({depCode:selectedKeys[0]},()=>{
             params = {
                deptId:parseInt(selectedKeys[0]),
                statusId:3,
                startDate:date.datastr,
                endDate:date.NowDate,
                name:e.node.props.value
            }
            console.log(e)
            console.log(e.node.props.value)
            this.props.getTableData(params)
        });
    };

    /**
     * 获取数据渲染
     */
    getData = () => {
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
                value:'总公司',
                key:0,
                children: [],
            }];
            if (res) {
                var expandedKeys = ["0"];
                for (let i = 0; i < res.length; i++) {
                    const arrParent = res[i].parent;
                    var parenObj = {
                        title:arrParent.name,
                        key:arrParent.code,
                        value:arrParent.name,
                        children: []
                    };
                    const arrSon = res[i].son;
                    for (let j = 0; j < arrSon.length; j++) {
                        var arr = arrSon[j];
                        if(i===0&&j===0){
                            parenObj['children'].push({
                                title:arr.name,
                                key:arr.code,
                                value:arr.name,
                                children: []
                            });
                        }else{
                            parenObj['children'].push({
                                title:arr.name,
                                key:arr.code,
                                value:arr.name,
                                children: []
                            });
                        }
                    }
                    dataSource[0].children.push(parenObj);
                }
                this.setState({
                    dataSource: dataSource,
                },()=>{
                    const depCode = dataSource[0].children[0].children[0]?dataSource[0].children[0].children[0].key:null
                    if(depCode){
                        const date = this.props.getLastMonthTime(1);
                         params = {
                            deptId:depCode,
                            statusId:3,
                            startDate:date.datastr,
                            endDate:date.NowDate
                        }
                        this.props.getTableData(params)

                    }
                })
            } else {

            }
        });
    };
}

export default DepTree