import React,{Component} from 'react'
import {Table,Input} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'
import SelectLine from '../selectProductline'
import ReadRecipe from '../readRecipe'
class MixSalt extends Component{//混合盐配置
    constructor(props){
        super(props);
        this.state={
            visible:false
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
            title:'体积',
            dataIndex:'volume',
            key:'volume',
            width:'15%',
            render:(text,record)=>{
                if(record.dataType===1){
                    return(
                        <Input name={`${record.code}-${'volume'}`} onChange={this.inputChange}/>
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
                    <Input name={`${record.code}-${'niPotency'}`} onChange={this.inputChange}/>
                )
            }
        },{
            title:'Co(g/L)',
            dataIndex:'coPotency',
            key:'coPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input name={`${record.code}-${'coPotency'}`} onChange={this.inputChange}/>
                )
            }
        },{
            title:'Mn(g/L)',
            dataIndex:'mnPotency',
            key:'mnPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input name={`${record.code}-${'mnPotency'}`} onChange={this.inputChange}/>
                )
            }
        }];
        this.handleSelect=this.handleSelect.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.showModal=this.showModal.bind(this);
        this.inputChange=this.inputChange.bind(this);
    }
    handleSelect(value,name){//获取下拉框的id
        let selectKey=name.key;//监听是第几个下拉框change了
        let optionId=value;
        let selectData=`${selectKey}-${optionId}`
        this.props.getMix(this.props.processId,'',selectData)

    }
    inputChange(e){
        let value=e.target.value //获取到输入框填的值
        let inputData=`${e.target.name}-${value}`
        this.props.getMix(this.props.processId,inputData,'')
    }
    showModal(){
        this.setState({
            visible:true
        })
    }
    handleOk(){
        this.setState({
            visible:false
        })
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
  
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[1]&&this.props.tagTableData[1].materialDetails?this.props.tagTableData[1].materialDetails:[]
        if (this.tableData && this.tableData.length) {
            for (let i = 0; i < this .tableData.length; i++) {
                this.tableData[i]['index'] = i + 1
            }
        }
        this.header=this.props.tagTableData&&this.props.tagTableData[1]&&this.props.tagTableData[1].lineProDTOS?this.props.tagTableData[1].lineProDTOS:null
        
        return(
            <div>
                <NewButton name='获取体积値'/>
                <ReadRecipe  handleCancel={this.handleCancel} handleOk={this.handleOk} showModal={this.showModal} visible={this.state.visible}/>
                <SelectLine headerData={this.header} handleSelect={this.handleSelect} />
                <Table 
                dataSource={this.tableData}
                rowKey={record=>record.code}
                columns={this.columns}
                pagination={false}
                size='small' 
                bordered/>
            </div>
        );
    }
}
export default MixSalt



