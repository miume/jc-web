import React,{Component} from 'react'
import {Table,Select,Input,Popconfirm} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'

const {Option}=Select;

class Other extends Component{//其他工序
    constructor(props){
        super(props);
        this.state={
            selectName:1,
            materialData:[],
            materialCode:undefined,
            data:this.props.otherData&&this.props.otherData.length!==0?this.props.otherData:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id',
            width:'5%'
        },{
            title:'名称',
            dataIndex:'materialName',
            key:'materialName',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Select placeholder='请选择' onChange={this.selectChange} value={this.props.otherData&&this.props.otherData[record.id-1].code?this.props.otherData[record.id-1].code:undefined} style={{width:'158px'}}>
                        {
                            this.props.otherMaterial?this.props.otherMaterial.map(item=>{
                                return(
                                    <Option key={item.code} value={item.code} name={record.id}>{item.materialName}</Option>
                                )
                            }):null
                        }
                    </Select>
                )
            }
        },{
            title:'重量(T)',
            dataIndex:'weight',
            key:'weight',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input placeholder='请输入'  name={`${record.id}-${'weight'}`} defaultValue={record.weight} onChange={this.inputChange}/>
                )
               
            }
        },{
            title:'Ni(%)',
            dataIndex:'niPotency',
            key:'niPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input placeholder='请输入' name={`${record.id}-${'niPotency'}`} defaultValue={record.niPotency} onChange={this.inputChange}/>
                )
            }
        },{
            title:'Co(%)',
            dataIndex:'coPotency',
            key:'coPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input placeholder='请输入' name={`${record.id}-${'coPotency'}`} defaultValue={record.coPotency} onChange={this.inputChange}/>
                )
            }
        },{
            title:'Mn(%)',
            dataIndex:'mnPotency',
            key:'mnPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input placeholder='请输入' name={`${record.id}-${'mnPotency'}`} defaultValue={record.mnPotency} onChange={this.inputChange}/>
                )
            }
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'10%',
            render:(text,record)=>{
                return(
                    <span className={this.judgeOperation(this.operation,'DELETE')?'':'hide'}>
                        <Popconfirm title='确定删除?' onConfirm={()=>this.handleDelete(record.id)} okText='确定' cancelText='再想想'>
                            <span className='blue'>删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        }]
        this.handleOk=this.handleOk.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.judgeOperation=this.judgeOperation.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.selectChange=this.selectChange.bind(this);
    }
    componentDidMount(){
        this.setState({
            materialData:this.tableData
        })
    }
    inputChange(e){//监听表格里面的输入框变化
        this.props.getOther(this.props.processId,e,'')
    }
    selectChange(value,name){
        this.setState({
            materialCode:value
        })
        this.props.otherSelectChange(this.props.processId,name,value)
    }
    handleOk(){//在父组件处理新增
        let {data}=this.state
        data.push({
            id:data.length+1,
            alkPotency: 0,
            alkValue: 0,
            alkaliFlag: 0,
            ammPotency: 0,
            ammValue: 0,
            ammoniaFlag: 0,
            co: 1,
            coPotency: 0,
            code: 0,
            dataType: 1,
            materialName: '',
            mn: 1,
            mnPotency: 0,
            monPotency: 0,
            ni: 1,
            niPotency: 0,
            processCode: 6,
            solidContent: 0,
            types: 0,
            valueType: 0,
            volume: 0,
            weiOrVol: 0,
            weight: 0
        })
        this.setState({
            data:data
        })
        this.props.handleOtherAdd(data)
    }
    handleDelete(id){
       let {data}=this.state
       data=data.filter(item=>item.id!==id)
       this.setState({
           data:data
       })
    }
    judgeOperation(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length?true:false
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null
        this.tableData = this.props.tagTableData&&this.props.tagTableData[5]&&this.props.tagTableData[5].materialDetails?this.props.tagTableData[5].materialDetails:[]
        // if (this.tableData && this.tableData.length) {
        //     for (let i = 0; i < this .tableData.length; i++) {
        //         this.tableData[i]['index'] = i + 1
        //     }
        // }
        return(
            <div>
                <NewButton name='新增' className='fa fa-plus' handleClick={this.handleOk} flagConfirm={!this.props.flagConfirm}/>
                <Table 
                dataSource={this.state.data}
                rowKey={record=>record.id}
                columns={this.columns}
                size='small' 
                pagination={false}
                scroll={{y:'42vh'}}
                style={{flex:'1',height:'60vh'}}
                bordered/>
            </div>
        );
    }
}
export default Other