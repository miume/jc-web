import React,{Component} from 'react'
import {Table,Select,Input,Popconfirm} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'

const {Option}=Select;
const data=[{
    id:'1',
    name:'合成',
    weight:'12',
    Ni:'12',
    Co:'13',
    Mn:'14'
}]
class Other extends Component{//烘干工序
    constructor(props){
        super(props);
        this.state={
            data:data,
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
                
                let weight=record.weight
                return(
                    <Input placeholder='请输入'  name='weight' defaultValue={weight} onChange={this.inputChange}/>
                )
            }
        },{
            title:'Ni(%)',
            dataIndex:'Ni',
            key:'Ni',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input placeholder='请输入' name='Ni' defaultValue={record.Ni} onChange={this.inputChange}/>
                )
            }
        },{
            title:'Co(%)',
            dataIndex:'Co',
            key:'Co',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input placeholder='请输入' name='Co' defaultValue={record.Co} onChange={this.inputChange}/>
                )
            }
        },{
            title:'Mn(%)',
            dataIndex:'Mn',
            key:'Mn',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input placeholder='请输入' name='Mn' defaultValue={record.Mn} onChange={this.inputChange}/>
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
        return(
            <div>
                <NewButton name='新增' className='fa fa-plus' handleClick={this.handleOk}/>
                <Table 
                dataSource={this.state.data}
                rowKey={record=>record.id}
                columns={this.columns}
                size='small' 
                bordered/>
            </div>
        );
    }
}
export default Other