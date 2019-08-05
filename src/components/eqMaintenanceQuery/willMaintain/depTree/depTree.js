import React, {Component} from 'react';
import {message, Tree} from 'antd';
import axios from "axios";
import '../../../equipmentArchiveManager/equipmentArchiveManager.css'

class DepTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTree:'',
            dataSource: [{
                key:0,
                title:'总公司',
                value:'总公司',
                children: []
            }],
        };
    }

    componentDidMount() {
        const params={
            deptId:2,
            statusId:1,
            depName:'锂电一',
        }
        this.props.getTableData(params);
        // Tip: Must have, or the parent node will not expand automatically when you first add a child node
        this.getData();}


    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <div>
                <Tree
                    defaultExpandAll
                    showLine
                    treeData={this.state.dataSource}
                    onSelect={this.getReturn}
                >
                </Tree>
            </div>
        )
    }

    //通过回调函数获取数据
    getReturn=(selectedKeys,e)=>{
        console.log(e)
        console.log(selectedKeys)
        console.log(selectedKeys[0])
        this.setState({
            selectedTree:selectedKeys[0]
        },()=>{
            const params = {
                deptId:parseInt(this.state.selectedTree),
                statusId:1,
                depName:e.node.props.value,
            }
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
                key:0,
                value: '总公司',
                children: []
            }];
            if (res) {
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
                this.setState({
                    dataSource: dataSource
                })
            } else {
                message.info('没有获取到数据')
            }
        });
    };


}

export default DepTree