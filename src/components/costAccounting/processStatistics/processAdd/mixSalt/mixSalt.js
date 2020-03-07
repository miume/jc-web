import React,{Component} from 'react'
import {Table,Input} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'
import SelectLine from '../selectProductline'
import ReadRecipe from '../readRecipe'
import axios from 'axios'
class MixSalt extends Component{//混合盐配置
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:[],
            selectedRowKeys:[],
            selectValue:undefined
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'8%'
        },{
            title:'溶液',
            dataIndex:'materialName',
            key:'materialName',
            width:'15%'
        },{
            title:'体积(m³)',
            dataIndex:'volume',
            key:'volume',
            width:'15%',
            render:(text,record)=>{
                if(record.dataType===1){//手工输入数据
                     return(
                         <Input value={record.volume} name={`${record.index}-${'volume'}`} onChange={this.inputChange}/>
                        )
                }
                else{
                    return(
                        <span>{record.volume}</span>
                    )
                }
            }
        },{
            title:'Ni(g/L)',
            dataIndex:'niPotency',
            key:'niPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <span>{record.niPotency} </span>
                )
            }
        },{
            title:'Co(g/L)',
            dataIndex:'coPotency',
            key:'coPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <span>{record.coPotency}</span> 
                )
            }
        },{
            title:'Mn(g/L)',
            dataIndex:'mnPotency',
            key:'mnPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <span>{record.mnPotency}</span> 
                )
            }
        }];
        this.handleSelect=this.handleSelect.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.showModal=this.showModal.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.getMixSalt=this.getMixSalt.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this)
        this.onSelectChange=this.onSelectChange.bind(this);
        this.getWeight=this.getWeight.bind(this);
    }
    handleSelect(value,name){//获取下拉框的id
        
        let selectKey=name.props.name;//监听是第几个下拉框change了
        let optionId=value;
        let selectData=`${selectKey}-${optionId}`
        this.props.getMix(this.props.processId,'',selectData)
    }
    // inputChange(e){
    //     let value=e.target.value //获取到输入框填的值
    //     let inputData=`${e.target.name}-${value}`
    //     this.props.getMix(this.props.processId,inputData,'')
    // }
    inputChange(e){
        this.props.getMix(this.props.processId,e,'')
    }
    showModal(){
        this.setState({
            visible:true
        })
        this.getMixSalt()
    }
    handleOk(){
        this.setState({
            visible:false,
            selectedRowKeys:[]
        })
        let {selectValue}=this.state
        this.props.alterData(this.props.processId,selectValue)
    }
    handleCancel(){
        this.setState({
            visible:false,
            selectedRowKeys:[]
        })
    }
    onSelectChange(selectedRowKeys,value) {//对应选择的这条这条记录
        this.setState({ 
            selectedRowKeys:selectedRowKeys,
            selectValue:value });
     }
    getMixSalt(){//混合盐读取配方
        axios({
            url:this.props.url.processParam.mixRecipe,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                for(let i=0;i<res.length;i++){
                    res[i]['id']=(i+1)
                }
                this.setState({
                    data:res
                })
            }
        })
    }
    getWeight(){//获取体积値}
        this.props.weightAlterData(this.props.processId,'volume')
    }
    handleTableChange(pagination){//读取配方的表格数据切换页

    }
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[1]&&this.props.tagTableData[1].materialDetails?this.props.tagTableData[1].materialDetails:[]
        if (this.tableData && this.tableData.length) {
            for (let i = 0; i < this .tableData.length; i++) {
                this.tableData[i]['index'] = i + 1
            }
        }
        this.header=this.props.tagTableData&&this.props.tagTableData[1]&&this.props.tagTableData[1].lineProDTOS?this.props.tagTableData[1].lineProDTOS:null
        const {selectedRowKeys}=this.state;
        const rowSelection = {//checkbox
            selectedRowKeys,
            onChange:this.onSelectChange,
            type:'radio'
        };
        return(
            <div>
                <NewButton name='获取体积値' flagConfirm={!this.props.flagConfirm} handleClick={this.getWeight}/>
                <ReadRecipe rowSelection={rowSelection} handleCancel={this.handleCancel} handleOk={this.handleOk} showModal={this.showModal} visible={this.state.visible} flagConfirm={!this.props.flagConfirm} data={this.state.data} handleTableChange={this.handleTableChange}/>
                <SelectLine headerData={this.header} handleSelect={this.handleSelect} />
                <div className='clear'></div>
                <div style={{display:'flex'}}> 
                    <Table 
                        dataSource={this.tableData}
                        rowKey={record=>record.code}
                        columns={this.columns}
                        pagination={false}
                        size='small' 
                        scroll={{y:'42vh'}}
                        style={{flex:'1',height:'60vh'}}
                        bordered
                    />
                </div>
            </div>
        );
    }
}
export default MixSalt



