import React,{Component} from 'react'
import {Table,Input} from 'antd'
import SelectLine from '../selectProductline'
import NewButton from '../../../../BlockQuote/newButton'
class DryProcess extends Component{//烘干工序
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'5%'
        },{
            title:'物料点',
            dataIndex:'materialName',
            key:'materialName',
            width:'13%'
        },{
            title:'重量(T)',
            dataIndex:'weight',
            key:'weight',
            width:'15%',
            render:(text,record)=>{
                if(record.dataType===1){
                     return(
                         <Input value={record.weight} name={`${record.index}-${'weight'}`} onChange={this.inputChange}/>
                     )
                }
                else{
                    return(
                        <span>{record.weight}</span>
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
                    <Input value={record.niPotency} name={`${record.index}-${'niPotency'}`} onChange={this.inputChange}/>
                )
            }
        },{
            title:'Co(g/L)',
            dataIndex:'coPotency',
            key:'coPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.coPotency} name={`${record.index}-${'coPotency'}`} onChange={this.inputChange}/>
                )
            }
        },{
            title:'Mn(g/L)',
            dataIndex:'mnPotency',
            key:'mnPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.mnPotency} name={`${record.index}-${'mnPotency'}`} onChange={this.inputChange}/>
                )
            }
        }];
        this.handleSelect=this.handleSelect.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.showModal=this.showModal.bind(this);
        this.getLastPotency=this.getLastPotency.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.getWeight=this.getWeight.bind(this)
    }
    handleSelect(value,name){//获取下拉框的id
        let selectKey=name.props.name;//监听是第几个下拉框change了
        let optionId=value;
        let selectData=`${selectKey}-${optionId}`
        this.props.getDry(this.props.processId,'',selectData)

    }
    inputChange(e){
        this.props.getDry(this.props.processId,e,'')
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
    getLastPotency() {//获取上期浓度
        this.props.getLastPotency(this.props.processId)
    }
    getWeight(){
        this.props.weightAlterData(this.props.processId,'weight')
    }
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[4]&&this.props.tagTableData[4].materialDetails?this.props.tagTableData[4].materialDetails:[]
        if (this.tableData && this.tableData.length) {
            for (let i = 0; i < this .tableData.length; i++) {
                this.tableData[i]['index'] = i + 1
            }
        }
        this.header=this.props.tagTableData&&this.props.tagTableData[4]&&this.props.tagTableData[4].lineProDTOS?this.props.tagTableData[4].lineProDTOS:null

        return(
            <div>
                <NewButton name='获取重量値' flagConfirm={!this.props.flagConfirm}  handleClick={this.getWeight}/>
                <NewButton name='上期浓度' handleClick={this.getLastPotency} flagConfirm={!this.props.flagConfirm}/>
                <SelectLine handleSelect={this.handleSelect} headerData={this.header}/>
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
export default DryProcess