import React, {Component} from 'react';
import {Tree} from 'antd';
const { TreeNode } = Tree;

class DepTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            dataSource: [{
                value: '总公司',
                defaultValue: 'Root',
                code: '0',
                parentCode: '-1',
                isSelect: false,
                children: []
            }]
        };
        this.getData = this.getData.bind(this)
        this.onSelect = this.onSelect.bind(this)

        this.onExpand = this.onExpand.bind(this)
        this.renderTreeNodes = this.renderTreeNodes.bind(this)
    }

    componentDidMount() {
        // Tip: Must have, or the parent node will not expand automatically when you first add a child node
        this.onExpand([]); // 手动触发，否则会遇到第一次添加子节点不展开的Bug
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.treeData !== nextProps.treeData) {
            this.getData(nextProps.treeData)
        }
    }

    render() {
        return (
            <Tree
                showLine
                onSelect={this.onSelect}
                expandedKeys={this.state.expandedKeys}
                selectedKeys={[]}
                onExpand={this.onExpand}
            >
                {this.renderTreeNodes(this.state.dataSource)}
            </Tree>
        )
    }
    /**
     * 获取数据渲染
     */
    getData = (res) => {
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
                    children: [],
                    parentname:'总公司'
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
                            children: [],
                            parentname:arrParent.name
                        });
                    }else{
                        parenObj['children'].push({
                            value: arr.name,
                            defaultValue: arr.name,
                            code: arr.code.toString(),
                            parentCode: arr.parentCode.toString(),
                            isSelect: false,
                            children: [],
                            parentname:arrParent.name,
                        });
                    }
                }
                dataSource[0].children.push(parenObj);
            }
            if (res[0] && res[0].son) {
                this.props.getRightData(res[0].son[0].code,1)
            }
            this.setState({
                dataSource: dataSource,
                expandedKeys: expandedKeys
            })
        }
    };

    onSelect = (selectedKeys) => {
        var dataSource = this.state.dataSource;
        this.props.handleSelect(selectedKeys[0],dataSource);
        this.props.getRightData(parseInt(selectedKeys[0]),'')
    }

    // 展开/收起节点时触发
    onExpand = (expandedKeys) => {
        this.expandedKeys = expandedKeys;
        this.setState({expandedKeys: expandedKeys})
    }

    // 展开树节点
    renderTreeNodes = (data) => {
        data.map((item) => {
            item.title = ( // 不处于编辑状态
                <div className={item.isSelect?"checkp-depTreeSelect":""}>
                <span>
                    {item.value}
                </span>
                </div>
            )
            // 如果存在子节点，则继续调用，直到无子节点，再下一个层次节点
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.code} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        })
    }
}

export default DepTree
