import React, {Component} from 'react';
import {Tree, Icon, Modal, Input, message} from 'antd';
import styles from "./EditableTree.less";
import axios from "axios";
import '../equipmentArchiveManager.css'
import CancleButton from "../../BlockQuote/cancleButton";
import NewButton from "../../BlockQuote/newButton";


class DepTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            addDeptVisable: false,
            dataSource: [{
                value: '总公司',
                defaultValue: 'Root',
                code: '0',
                parentCode: '-1',
                isSelect: false,
                children: []
            }],
            // 改变名称
            saveData: {
                code: null,
                name: '',
                parentCode: null
            }
        };
        this.getData = this.getData.bind(this)
        this.onSelect = this.onSelect.bind(this)

        this.onExpand = this.onExpand.bind(this)
        this.renderTreeNodes = this.renderTreeNodes.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    componentDidMount() {
        const params={
            deptId:2,
            statusId:1,
        }
        // Tip: Must have, or the parent node will not expand automatically when you first add a child node
        this.onExpand([]); // 手动触发，否则会遇到第一次添加子节点不展开的Bug
        this.getData();
    }

    render() {
        return (
            <div>
                <Tree
                    showLine
                    onSelect={this.onSelect}
                    expandedKeys={this.state.expandedKeys}
                    selectedKeys={[]}
                    onExpand={this.onExpand}
                >
                    {this.renderTreeNodes(this.state.dataSource)}
                </Tree>
            </div>
        )
    }
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
                value: '总公司',
                defaultValue: 'Root',
                code: '0',
                parentCode: '-1',
                isEditable: false,
                children: []
            }];
            if (res) {
                var expandedKeys = ["0"];
                for (let i = 0; i < res.length; i++) {
                    const arrParent = res[i].parent;
                    var parenObj = {
                        value: arrParent.name,
                        defaultValue: arrParent.name,
                        code: arrParent.code.toString(),
                        parentCode: '0',
                        isSelect: false,
                        children: []
                    };
                    if(i === 0){
                        expandedKeys.push(arrParent.code.toString())
                    }
                    const arrSon = res[i].son;
                    for (let j = 0; j < arrSon.length; j++) {
                        var arr = arrSon[j];
                        if(i===0&&j===0){
                            parenObj['children'].push({
                                value: arr.name,
                                defaultValue: arr.name,
                                code: arr.code.toString(),
                                parentCode: arr.parentCode.toString(),
                                isSelect: true,
                                children: []
                            });
                        }else{
                            parenObj['children'].push({
                                value: arr.name,
                                defaultValue: arr.name,
                                code: arr.code.toString(),
                                parentCode: arr.parentCode.toString(),
                                isSelect: false,
                                children: []
                            });
                        }
                    }
                    dataSource[0].children.push(parenObj);
                }
                if (res[0] && res[0].son) {
                    this.props.getRightData(res[0].son[0].code,'')
                }
                this.setState({
                    dataSource: dataSource,
                    addDeptVisable: false,
                    expandedKeys: expandedKeys,
                    saveData: {
                        code: null,
                        name: '',
                        parentCode: null
                    },
                })
            } else {

            }
        });
    };


    onSelect = (selectedKeys, info) => {
        var dataSource = this.state.dataSource;
        this.handleSelect(selectedKeys[0],dataSource);
        this.props.getRightData(parseInt(selectedKeys[0]),'')
    }
    handleSelect = (code, data) => data.map((item) => {
        if (item.code === code) {
            item.isSelect = true;
        } else {
            item.isSelect = false;
        }
        //Tip: Must have, when a node is editable, and you click a button to make other node editable, the node which you don't save yet will be not editable, and its value should be defaultValue
        // item.isSelect = false;
        if (item.children) {
            this.handleSelect(code, item.children)
        }
    });

    // 展开/收起节点时触发
    onExpand = (expandedKeys) => {
        this.expandedKeys = expandedKeys;
        this.setState({expandedKeys: expandedKeys})
    }
    // 展开树节点
    renderTreeNodes = data => data.map((item) => {
        item.title = ( // 不处于编辑状态
            <div className={item.isSelect?"depTreeSelect":""}>
                <span>
                    {item.value}
                </span>
            </div>
        )
        // 如果存在子节点，则继续调用，直到无子节点，再下一个层次节点
        if (item.children) {
            return (
                <Tree.TreeNode title={item.title} key={item.code} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </Tree.TreeNode>
            );
        }
        return <Tree.TreeNode {...item} />;
    })
}

export default DepTree