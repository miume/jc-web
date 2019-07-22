import React, {Component} from 'react';
import {Tree, Icon, Modal, Input, message} from 'antd';
import axios from "axios";
import CancleButton from "../../BlockQuote/cancleButton";
import NewButton from "../../BlockQuote/newButton";
import Home from "../../Home/home";


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
        const params = {
            deptId:2,
            statusId:1,
        }
        this.props.getTableData(params)
    }

    render() {
        return (
            <div>
                <Tree
                    showLine
                    defaultExpandAll
                    treeData={this.state.dataSource}
                    onSelect={this.returnDepKey}
               />
            </div>
        )
    }
    //通过回调函数，获得标签页表格中的数据
    returnDepKey = (selectedKeys) => {
        this.setState({depCode:selectedKeys[0]},()=>{
            console.log('this.state.depCode')
            console.log(this.state.depCode)
            console.log('selectedKeys[0]')
            console.log(selectedKeys[0])
            const params = {
                deptId:parseInt(this.state.depCode),
                statusId:1,
            }
            console.log('params')
            console.log(params)
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
                })
            } else {

            }
        });
    };
}

export default DepTree