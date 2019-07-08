import React, {Component} from 'react';
import {Tree, Icon} from 'antd';
import styles from "./EditableTree.less";

const {TreeNode} = Tree;

class DepTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            data: [{
                value: 'Root',
                defaultValue: 'Root',
                key: '0',
                parentKey: '0',
                isEditable: false,
                children: []
            }]
        };
        this.getData = this.getData.bind(this)
    }

    componentDidMount() {
        // Tip: Must have, or the parent node will not expand automatically when you first add a child node
        this.onExpand([]); // 手动触发，否则会遇到第一次添加子节点不展开的Bug
        this.getData();
    }

    // data = [
    //     {
    //         value: 'Root',
    //         defaultValue: 'Root',
    //         key: '0-1',
    //         parentKey: '0',
    //         isEditable: false
    //     }
    // ]

    render() {
        return (
            <Tree
                showLine
                onSelect={this.onSelect}
                expandedKeys={this.state.expandedKeys}
                selectedKeys={[]}
                onExpand={this.onExpand}
            >
                {this.renderTreeNodes(this.state.data)}
            </Tree>
        )
    }

    /**
     * 获取数据渲染
     */
    getData = () => {
        var data = [{
            value: 'Root',
            defaultValue: 'Root',
            key: '0',
            parentKey: '0',
            isEditable: false,
            children: []
        }];
        // TODO: 调接口，获取数据
        // 父部门数据
        const apiData = [{
            parent: {
                name: '制造一、二部',
                parentCode: '',
                code: 1,
            },
            son: [{
                name: '锂电一车间',
                parentCode: 1,
                code: 2,
            }, {
                name: '锂电二车间',
                parentCode: 1,
                code: 3
            }, {
                name: '锂电三车间',
                parentCode: 1,
                code: 4
            }, {
                name: 'mvr',
                parentCode: 1,
                code: 5
            }]
        }, {
            parent: {
                name: '制造三、四部',
                parentCode: '',
                code: 6,
            },
            son: [{
                name: '锂电一车间',
                parentCode: 1,
                code: 7,
            }, {
                name: '锂电二车间',
                parentCode: 1,
                code: 8
            }]
        }, {
            parent: {
                name: '基建部',
                parentCode: '',
                code: 9,
            },
            son: []
        }, {
            parent: {
                name: '质量一部',
                parentCode: '',
                code: 10,
            },
            son: []
        }];
        for (let i = 0; i < apiData.length; i++) {
            const arrParent = apiData[i].parent;
            var parenObj = {
                value: arrParent.name,
                defaultValue: arrParent.name,
                key: arrParent.code,
                parentKey: '0',
                isEditable: false,
                children: []
            };
            const arrSon = apiData[i].son;
            for (let j = 0; j < arrSon.length; j++) {
                var arr = arrSon[j];
                parenObj['children'].push({
                    value: arr.name,
                    defaultValue: arr.name,
                    key: arr.code,
                    parentKey: arr.parentCode,
                    isEditable: false,
                    children: []
                });
            }
            data[0].children.push(parenObj);
        }
        this.setState({
            data:data
        })


    };




    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }
    // 展开/收起节点时触发
    onExpand = (expandedKeys) => {
        this.expandedKeys = expandedKeys;
        this.setState({expandedKeys: expandedKeys})
    }
    onAdd = (e) => {
        // 防止expandedKeys重复
        // Tip: Must have, expandedKeys should not be reduplicative
        if (this.state.expandedKeys.indexOf(e) === -1) {
            this.expandedKeys.push(e);
        }
        this.addNode(e, this.data);
        this.setState({
            expandedKeys: this.expandedKeys,
            data: this.data
        });
    }

    addNode = (key, data) => data.map((item) => {
        if (item.key === key) {
            var level = '0';
            switch (item.parentKey) {
                case '1':
                    level = '2';
                    break;
                case '2':
                    level = '2';
                    break;
                default:
                    level = '1';
            }
            if (item.children) {
                item
                    .children
                    .push({
                        value: 'default',
                        defaultValue: 'default',
                        key: key + Math.random(100), // 这个 key 应该是唯一的。 Tip: The key should be unique
                        // parentKey: key,
                        parentKey: level,
                        isEditable: false
                    });
            } else {
                item.children = [];
                item
                    .children
                    .push({
                        value: 'default',
                        defaultValue: 'default',
                        key: key + Math.random(100),
                        // parentKey: key,
                        parentKey: level,
                        isEditable: false
                    });
            }
            return;
        }
        if (item.children) {
            this.addNode(key, item.children)
        }
    })

    onDelete = (key) => {
        this.deleteNode(key, this.data);
        this.setState({
            data: this.data
        });
    }

    deleteNode = (key, data) => data.map((item, index) => {
        if (item.key === key) {
            data.splice(index, 1);
            return;
        } else {
            if (item.children) {
                this.deleteNode(key, item.children)
            }
        }
    })

    onEdit = (key) => {
        this.editNode(key, this.data);
        this.setState({
            data: this.data
        });
    }

    editNode = (key, data) => data.map((item) => {
        if (item.key === key) {
            item.isEditable = true;
        } else {
            item.isEditable = false;
        }
        //Tip: Must have, when a node is editable, and you click a button to make other node editable, the node which you don't save yet will be not editable, and its value should be defaultValue
        item.value = item.defaultValue; // 当某节点处于编辑状态，并改变数据，点击编辑其他节点时，此节点变成不可编辑状态，value 需要回退到 defaultvalue
        if (item.children) {
            this.editNode(key, item.children)
        }
    })

    onClose = (key, defaultValue) => {
        this.closeNode(key, defaultValue, this.data);
        this.setState({
            data: this.data
        });
    }

    closeNode = (key, defaultValue, data) => data.map((item) => {
        item.isEditable = false;
        if (item.key === key) {
            item.value = defaultValue;
        }
        if (item.children) {
            this.closeNode(key, defaultValue, item.children)
        }
    })

    onSave = (key) => {
        this.saveNode(key, this.data);
        this.setState({
            data: this.data
        });
    }

    saveNode = (key, data) => data.map((item) => {
        if (item.key === key) {
            item.defaultValue = item.value;
        }
        if (item.children) {
            this.saveNode(key, item.children)
        }
        item.isEditable = false;
    })

    onChange = (e, key) => {
        this.changeNode(key, e.target.value, this.data);
        this.setState({
            data: this.data
        });
    }

    changeNode = (key, value, data) => data.map((item) => {
        if (item.key === key) {
            item.value = value;
        }
        if (item.children) {
            this.changeNode(key, value, item.children)
        }
    })
    // 展开树节点
    renderTreeNodes = data => data.map((item) => {
        if (item.isEditable) {
            item.title = ( // 是否处于编辑状态
                <div>
                    <input
                        className={styles.inputField}
                        value={item.value}
                        onChange={(e) => this.onChange(e, item.key)}/>
                    <Icon type='close' style={{marginLeft: 10}}
                          onClick={() => this.onClose(item.key, item.defaultValue)}/>
                    <Icon type='check' style={{marginLeft: 10}} onClick={() => this.onSave(item.key)}/>
                </div>
            )
        } else {
            item.title = ( // 不处于编辑状态
                <div>
                    <span>
                        {item.value}
                    </span>
                    <span>
                        <Icon style={{marginLeft: 10}} type='edit' onClick={() => this.onEdit(item.key)}/>
                        {item.parentKey === '2' ? (
                            <Icon style={{marginLeft: 10, cursor: 'not-allowed'}} type='plus'/>) : (
                            <Icon style={{marginLeft: 10}} type='plus' onClick={() => this.onAdd(item.key)}/>)}
                        {item.parentKey === '0' ? null : (
                            <Icon style={{marginLeft: 10}} type='minus' onClick={() => this.onDelete(item.key)}/>)}
                    </span>
                </div>
            )
        }
        // 如果存在子节点，则继续调用，直到无子节点，再下一个层次节点
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode {...item} />;
    })
}

export default DepTree