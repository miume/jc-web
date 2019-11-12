import React, {Component} from 'react';
import {Tree} from 'antd';

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
        this.onSelect = this.onSelect.bind(this);
        this.onExpand = this.onExpand.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.treeData !== nextProps.treeData) {
            this.dataProcessing(nextProps.treeData)
        }
    }

    render() {
        return (
            <Tree
                showLine
                onSelect={this.onSelect}
                treeData={this.state.dataSource}
                expandedKeys={this.state.expandedKeys}
                selectedKeys={this.state.selectedKeys}
                onExpand={this.onExpand}
            >
            </Tree>
        )
    }
    /**
     * 获取数据渲染
     */
    /**对获取的部门数据进行处理*/
    dataProcessing = (res) => {
        let dataSource = [{
            title:'总公司',
            key:'0',
            children: []
        }];
        let depId = -1, depName = '',expandedKeys = ['0'],selectedKeys = [];
        for (let i = 0; i < res.length; i++) {
            const parent = res[i].parent;
            let parenObj = {
                title:parent.name,
                key:parent.code,
                children: [],
            };
            if(i === 0) {
                expandedKeys.push(parent.code.toString())
            }
            const son = res[i].son;
            for (let j = 0; j < son.length; j++) {
                let arr = son[j];
                if(i===0 && j===0) {
                    depId = arr.code;
                    depName = arr.name;
                    selectedKeys.push(arr.code.toString());
                }
                parenObj['children'].push({
                    children: [],
                    title:arr.name,
                    key:arr.code,
                });
            }
            dataSource[0].children.push(parenObj);
        }
        this.setState({
            dataSource: dataSource,
            selectedKeys: selectedKeys,
            expandedKeys: expandedKeys
        });
        this.props.getRightData(depId);
    }

    onSelect = (selectedKeys) => {
        var dataSource = this.state.dataSource;
        this.setState({
            selectedKeys: selectedKeys,
        });
        this.props.handleSelect(selectedKeys[0],dataSource);
        this.props.getRightData(parseInt(selectedKeys[0]),'')
    };

    // 展开/收起节点时触发
    onExpand = (expandedKeys) => {
        this.setState({expandedKeys: expandedKeys})
    };
}

export default DepTree
