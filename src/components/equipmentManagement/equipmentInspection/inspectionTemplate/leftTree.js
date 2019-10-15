import React from "react"
import {Card, Tree} from "antd";
import "./inspectionTemplate.css"
import axios from "axios";

class LeftTree extends React.Component{
    constructor(props){
        super(props)
        this.state={
            expendedKeys:[],
            addDeptVisable: false,
            dataSource: [{
                value: '总公司',
                defaultValue: 'Root',
                code: '0',
                parentCode: '-1',
                isSelect: false,
                children: []
            }],
        }


        this.getData = this.getData.bind(this)
        this.onSelect = this.onSelect.bind(this)

        this.onExpand = this.onExpand.bind(this)
        this.renderTreeNodes = this.renderTreeNodes.bind(this)
    }
    componentDidMount() {
        // Tip: Must have, or the parent node will not expand automatically when you first add a child node
        this.onExpand([]); // 手动触发，否则会遇到第一次添加子节点不展开的Bug
        this.getData();
    }
    render() {
        return (
            <div className="inspection-Tem-changetable">
            <Card
                title="部门选择"
                headStyle={{textAlign:'center',display:'block'}}
                style={{display:'inline-block',width: "100%"}}
            >
                <div className="inspection-tree" style={{display:'inline-block',overflowX:'auto', height:'450px'}}>
                    <Tree
                        showLine
                        onSelect={this.onSelect}
                        expandedKeys={this.state.expandedKeys}
                        onExpand={this.onExpand}
                    >
                        {this.renderTreeNodes(this.state.dataSource)}
                    </Tree>
                </div>
            </Card>
            </div>
        );
    }
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
                    this.props.getRightData(res[0].son[0].code,'')
                    this.props.firstname(res[0].parent.name)
                    this.props.name(res[0].son[0].name)
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


    onSelect = (selectedKeys, e) => {
        var dataSource = this.state.dataSource;
        this.props.handleSelect(selectedKeys[0],dataSource);
        this.props.getRightData(parseInt(selectedKeys[0]),'')
        this.props.name(e.node.props.dataRef.value)
    }


    onExpand = (expandedKeys) => {
        this.expandedKeys = expandedKeys;
        this.setState({expandedKeys: expandedKeys})
    }


    renderTreeNodes = data => data.map((item) => {
        item.title = ( // 不处于编辑状态
            <div className={item.isSelect?"inp-depTreeSelect":""}>
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

export default LeftTree