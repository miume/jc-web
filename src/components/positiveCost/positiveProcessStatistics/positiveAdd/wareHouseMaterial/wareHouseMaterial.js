/**仓库待处理物料*/
import React ,{Component}from 'react'
import {Table,Input} from 'antd'
class WareHouseMaterial extends Component{//预烧(窑炉)
    constructor(props){
        super(props)
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'物料类型',
            dataIndex:'materialType',
            key:'materialType'
        },{
            title:'产线',
            dataIndex:'produltLine',
            key:'produltLine'
        },{
            title:'进料量(kg)',
            dataIndex:'feed',
            key:'feed'
        },{
            title:'结存量(kg)',
            dataIndex:'balance',
            key:'balance'
        }]
    }
    render(){
        return(
            <div>
                <Table
                rowKey={record=>record.id}
                columns={this.columns}
                size='small'
                bordered/>
                <div style={{marginTop:'20px'}}>
                    1#粉碎正压输送次数: <Input placeholder='DCS数据' style={{width:'120px',marginRight:'10px'}}/>
                    2#粉碎正压输送次数: <Input placeholder='DCS数据' style={{width:'120px',marginRight:'10px'}}/>
                    3#混料次数: <Input placeholder='DCS数据' style={{width:'120px',marginRight:'10px'}}/>
                </div>
            </div>
        )
    }
}

export default WareHouseMaterial