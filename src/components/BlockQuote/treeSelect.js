import {Card, message, Tree} from 'antd';
import React from 'react'
import "./blockquote.css"
class TreeCard extends React.Component{
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
    componentDidMount() {
        // Tip: Must have, or the parent node will not expand automatically when you first add a child node
        const params = this.props.defaultparams;
        this.props.getTableData(params);
    }
    url = JSON.parse(localStorage.getItem('url'));

    /*
    * 1.父组件必须传初始化的选择项，数据源，查询属性
    * dataSource,treeName,defaultparams,params,
    * */
    constructor(props) {
        super(props);
        this.returnDepKey = this.returnDepKey.bind(this)
    }

    render() {
        return(
                <Card
                    style={{display:'inline',width: "240px",overflowX:'auto', height:'520px'}}
                    className='departmentCard'
                    title={<p id='titledepartment1'><b fontSize="10px" id='titledepartmentselect'>{this.props.treeName}&nbsp;</b>(请选择)</p>} >
                    <div>
                        <Tree
                            showLine={true}
                            defaultExpandAll={true}
                            treeData={this.props.dataSource}
                            onSelect={this.returnDepKey}
                        />
                    </div>
                </Card>
            )
    }

    // 通过回调函数，更新表格中的数据
    returnDepKey = (selectedKeys,e) => {
        if(selectedKeys[0]){
            const params = this.props.params;
            console.log(params)
            this.props.getTableData(params)
        }
    };
}
export default TreeCard