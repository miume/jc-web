import React, {Component} from 'react';
import {Tree, Icon, Modal, Input, message} from 'antd';
import styles from "./EditableTree.less";
import axios from "axios";
import '../equipmentArchive.css'
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
                isEditable: false,
                children: []
            }],
            // 改变名称
            saveData: {
                name: '',
                parentCode: null
            }
        };
        this.handleModalCancel = this.handleModalCancel.bind(this)
        this.handleModalOk = this.handleModalOk.bind(this)
        this.changeAddDepData = this.changeAddDepData.bind(this)
        this.getData = this.getData.bind(this)
        this.onSelect = this.onSelect.bind(this)

        this.onExpand = this.onExpand.bind(this)
        this.onAdd = this.onAdd.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.editNode = this.editNode.bind(this)

        this.onClose = this.onClose.bind(this)
        this.closeNode = this.closeNode.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onChange = this.onChange.bind(this)
        this.renderTreeNodes = this.renderTreeNodes.bind(this)

        this.changeNode = this.changeNode.bind(this)
    }

    componentDidMount() {
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
                <Modal
                    title="新增部门"
                    visible={this.state.addDeptVisable}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="300px"
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleModalCancel}/>,
                        <NewButton key="submit" handleClick={this.handleModalOk} name='确定' style='button'
                                   className='fa fa-check'/>
                    ]}
                >
                    <Input placeholder="请输入部门名称" onChange={this.changeAddDepData}/>
                </Modal>
            </div>
        )
    }

    handleModalCancel = () => {
        this.setState({
            saveData: {
                name: '',
                parentCode: null
            },
            addDeptVisable: false
        })
    };
    handleModalOk = () => {
        const saveData = this.state.saveData;
        console.log(saveData)
        if (saveData.name !== '' && saveData.parentCode !== null && saveData) {
            axios({
                url: `${this.props.url.equipmentDept.dept}`,
                method: 'post',
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                data: saveData,
                type: 'json'
            }).then((data) => {
                message.info(data.data.message);
                this.getData()
            }).catch(() => {
                message.info('新增失败，请联系管理员！');
            });
        }
    };
    changeAddDepData = (e) => {
        var saveData = this.state.saveData;
        saveData.name = e.target.value;
        this.setState({
            saveData: saveData
        })
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
                value: '总公司',
                defaultValue: 'Root',
                code: '0',
                parentCode: '-1',
                isEditable: false,
                children: []
            }];
            if (res) {
                for (let i = 0; i < res.length; i++) {
                    const arrParent = res[i].parent;
                    var parenObj = {
                        value: arrParent.name,
                        defaultValue: arrParent.name,
                        code: arrParent.code.toString(),
                        parentCode: '0',
                        isEditable: false,
                        children: []
                    };
                    const arrSon = res[i].son;
                    for (let j = 0; j < arrSon.length; j++) {
                        var arr = arrSon[j];
                        parenObj['children'].push({
                            value: arr.name,
                            defaultValue: arr.name,
                            code: arr.code.toString(),
                            parentCode: arr.parentCode.toString(),
                            isEditable: false,
                            children: []
                        });
                    }
                    dataSource[0].children.push(parenObj);
                }
                if (res[0] && res[0].parent) {
                    this.props.getRightData(res[0].parent.code)
                }
                this.setState({
                    dataSource: dataSource
                })
            } else {

            }
        });
    };


    onSelect = (selectedKeys, info) => {
        this.props.getRightData(selectedKeys)

    }
    // 展开/收起节点时触发
    onExpand = (expandedKeys) => {
        this.expandedKeys = expandedKeys;
        this.setState({expandedKeys: expandedKeys})
    }
    // 新增部门
    onAdd = (parentCode) => {
        // 防止expandedKeys重复
        // Tip: Must have, expandedKeys should not be reduplicative
        if (this.state.expandedKeys.indexOf(parentCode) === -1) {
            this.expandedKeys.push(parentCode);
        }
        var saveData = this.state.saveData;
        saveData.parentCode = parentCode;
        this.setState({
            expandedKeys: this.expandedKeys,
            addDeptVisable: true,
            saveData: saveData
        });
    };

    // 删除部门
    onDelete = (code) => {
        axios({
            url:`${this.props.url.equipmentDept.dept}/${code}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
            this.getData()
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    };

    // 编辑作用：改变isEditable的状态
    onEdit = (code) => {
        var dataSource = this.state.dataSource;
        this.editNode(code, dataSource);
        this.setState({
            dataSource: dataSource
        });
    };
    editNode = (code, data) => data.map((item) => {
        if (item.code === code) {
            item.isEditable = true;
        } else {
            item.isEditable = false;
        }
        //Tip: Must have, when a node is editable, and you click a button to make other node editable, the node which you don't save yet will be not editable, and its value should be defaultValue
        item.value = item.defaultValue; // 当某节点处于编辑状态，并改变数据，点击编辑其他节点时，此节点变成不可编辑状态，value 需要回退到 defaultvalue
        if (item.children) {
            this.editNode(code, item.children)
        }
    });


    // 关闭：值变回默认值，改变改变isEditable的状态状态
    onClose = (code, defaultValue) => {
        var dataSource = this.state.dataSource;
        this.closeNode(code, defaultValue, dataSource);
        this.setState({
            dataSource: dataSource
        });
    };

    closeNode = (code, defaultValue, data) => data.map((item) => {
        item.isEditable = false;
        if (item.code === code) {
            item.value = defaultValue;
        }
        if (item.children) {
            this.closeNode(code, defaultValue, item.children)
        }
    });

    onSave = (code) => {
        const saveData = this.state.saveData;
        if(saveData&&saveData.code&&saveData.code===code){
            axios({
                url : `${this.props.url.equipmentDept.dept}`,
                method:'put',
                headers:{
                    'Authorization': this.props.url.Authorization
                },
                data: saveData,
                type:'json'
            }).then((data) => {
                message.info(data.data.message);
                this.getData()
            }).catch(function () {
                message.info('新增失败，请联系管理员！');
            });
        }
    };

    onChange = (e, code, parentCode) => {
        var saveData = this.state.saveData;
        saveData.code = code;
        saveData.name = e.target.value;
        saveData.parentCode = parentCode;
        this.changeNode(code, e.target.value, this.state.dataSource);

        this.setState({
            saveData: saveData
        });
    };
    changeNode = (code, value, data) => data.map((item) => {
        if (item.code === code) {
            item.value = value;
        }
        if (item.children) {
            this.changeNode(code, value, item.children)
        }
    })
    // 展开树节点
    renderTreeNodes = data => data.map((item) => {
        if (item.isEditable) {
            item.title = ( // 处于编辑状态
                <div>
                    <input
                        className="depTree-input"
                        value={item.value}
                        onChange={(e) => this.onChange(e, item.code, item.parentCode)}/>
                    <Icon type='close' style={{marginLeft: 10}}
                          onClick={() => this.onClose(item.code, item.defaultValue)}/>
                    <Icon type='check' style={{marginLeft: 10}} onClick={() => this.onSave(item.code)}/>
                </div>
            )
        } else {
            item.title = ( // 不处于编辑状态
                <div>
                    <span>
                        {item.value}
                    </span>
                    <span>
                        <Icon style={{marginLeft: 10}} type='edit' onClick={() => this.onEdit(item.code)}/>
                        {item.parentCode > '0' ? (
                            <Icon style={{marginLeft: 10, cursor: 'not-allowed'}} type='plus'/>) : (
                            <Icon style={{marginLeft: 10}} type='plus' onClick={() => this.onAdd(item.code)}/>
                        )}
                        {item.parentCode === '-1' ? null : (
                            <Icon style={{marginLeft: 10}} type='minus' onClick={() => this.onDelete(item.code)}/>)}
                    </span>
                </div>
            )
        }
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