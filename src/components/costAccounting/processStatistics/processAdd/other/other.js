import React,{Component} from 'react'
import {Table,Select,Input,Popconfirm} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'

const {Option}=Select;

class Other extends Component{//烘干工序
    constructor(props){
        super(props);
        this.state={
           
            selectName:1,
            weight:'',
            Ni:'',
            Co:'',
            Mn:'',
            params:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'名称',
            dataIndex:'name',
            key:'name',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Select placeholder='请选择' onChange={this.selectChange} defaultValue={record.name} style={{width:'158px'}}>
                        <Option value={1}>合成</Option>
                        <Option value={2}>烘干</Option>
                    </Select>
                )
            }
        },{
            title:'重量(T)',
            dataIndex:'weight',
            key:'weight',
            width:'15%',
            render:(text,record)=>{
                if(record.dataType===1){
                    let weight=record.weight
                    return(
                        <Input placeholder='请输入'  name={`${record.index}-${'weight'}`} defaultValue={weight} onChange={this.inputChange}/>
                    )
                }
               
            }
        },{
            title:'Ni(%)',
            dataIndex:'niPotency',
            key:'niPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input placeholder='请输入' name={`${record.index}-${'niPotency'}`} defaultValue={record.Ni} onChange={this.inputChange}/>
                )
            }
        },{
            title:'Co(%)',
            dataIndex:'coPotency',
            key:'coPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input placeholder='请输入' name={`${record.index}-${'coPotency'}`} defaultValue={record.Co} onChange={this.inputChange}/>
                )
            }
        },{
            title:'Mn(%)',
            dataIndex:'mnPotency',
            key:'mnPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input placeholder='请输入' name={`${record.code}-${'mnPotency'}`} defaultValue={record.Mn} onChange={this.inputChange}/>
                )
            }
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
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
    inputChange(e){//监听表格里面的输入框变化,name是个变量，有好几个
        let name=e.target.name,value=e.target.value
        this.setState({
            [name]:value
        })
    }
    selectChange(value){//监听表格里面的下拉框变化，下拉框只有一个，在state写好名字，change改变value值就行
        this.setState({
            selectName:value
        })
    }
    handleOk(){
        let {data,weight,Ni,Co,Mn,selectName,params}=this.state;
        data.push({
            id:data.length+1,
            name:'',
            weight:'',
            Ni:'',
            Co:'',
            Mn:''
        })
        params.push({//将新增传的值给后台
            selectName:selectName,
            weight:weight,
            Ni:Ni,
            CO:Co,
            Mn:Mn
        })
       this.setState({
           data:data,
           params:params
       })

    }
    handleDelete(id){

    }
    judgeOperation(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length?true:false
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null
        this.tableData = this.props.tagTableData&&this.props.tagTableData[5]&&this.props.tagTableData[5].materialDetails?this.props.tagTableData[5].materialDetails:[]
        //console.log(this.props.tagTableData,this.props.tagTableData[5])
        if (this.tableData && this.tableData.length) {
            for (let i = 0; i < this .tableData.length; i++) {
                this.tableData[i]['index'] = i + 1
            }
        }
        return(
            <div>
                <NewButton name='新增' className='fa fa-plus' handleClick={this.handleOk}/>
                <Table 
                dataSource={this.tableData}
                rowKey={record=>record.id}
                columns={this.columns}
                size='small' 
                pagination={false}
                bordered/>
            </div>
        );
    }
}
export default Other