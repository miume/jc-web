import React ,{Component}from 'react'
import {Table,Input} from 'antd'
class Crush extends Component{//预烧(窑炉)
    constructor(props){
        super(props)
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index'
        },{
            title:'物料类型',
            dataIndex:'materialName',
            key:'materialName'
        },{
            title:'产线',
            dataIndex:'produltLine',
            key:'produltLine'
        },{
            title:'进料量(kg)',
            dataIndex:'inMat',
            key:'inMat'
        },{
            title:'结存量(kg)',
            dataIndex:'balance',
            key:'balance'
        }]
    }
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[4]&&this.props.tagTableData[4].materials?this.props.tagTableData[4].materials:[]
        if (this.tableData && this.tableData.length) {
            for (let i = 0; i < this .tableData.length; i++) {
                this.tableData[i]['index'] = i + 1
                this.tableData[i]['productLine']=this.props.productLine
            }
        }
        return(
            <div>
                <Table
                dataSource={this.tableData}
                rowKey={record=>record.code}
                columns={this.columns}
                size='small'
                bordered/>
                <div style={{marginTop:'20px'}}>
                    1#预烧正压输送次数: <Input placeholder='DCS数据' style={{width:'120px',marginRight:'10px'}}/>
                    2#预烧正压输送次数: <Input placeholder='DCS数据' style={{width:'120px',marginRight:'10px'}}/>
                    3#预烧正压输送次数: <Input placeholder='DCS数据' style={{width:'120px',marginRight:'10px'}}/>
                </div>
            </div>
        )
    }
}

export default Crush