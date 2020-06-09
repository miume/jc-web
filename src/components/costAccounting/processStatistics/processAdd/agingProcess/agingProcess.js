import React,{Component} from 'react'
import {Table,Input} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'
import ReadRecipe from '../readRecipe'
import SelectLine from '../selectProductline'
import axios from 'axios'
class AgingProcess extends Component{//陈化工序
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:[],
            selectedRowKeys:[],
            selectValue:undefined,
            modelBtnId:1,
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'5%'
        },{
            title:'物料点名称',
            dataIndex:'materialName',
            key:'materialName',
            width:'13%'
        },{
            title:'体积(m³)/重量(T)',
            dataIndex:'weiOrVol',
            key:'weiOrVol',
            width:'15%',
            render:(text,record)=>{
                if(record.dataType===1){//手工输入数据
                     return(
                         <Input value={record.weiOrVol} name={`${record.index}-${'weiOrVol'}`} onChange={this.inputChange}/>
                        )
                }
                else{
                    return(
                        <span>{record.weiOrVol}</span>
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
        },{
            title:'含固量(g/L)',
            dataIndex:'solidContent',
            key:'solidContent',
            width:'10%',
            render:(text,record)=>{
                return(
                    <Input value={record.solidContent} name={`${record.index}-${'solidContent'}`} onChange={this.inputChange}/>
                )
            }       
        }]
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.showModal=this.showModal.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.getSy=this.getSy.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
        this.getWeight=this.getWeight.bind(this);
        this.getName=this.getName.bind(this)
    }

    inputChange(e){
        this.props.getAge(this.props.processId,e,'')
    }
    showModal(e){
        this.setState({
            visible:true,
            modelBtnId:e.target.id//获取选中按钮的id，绑定的是产线的code
        })
        // let a=e.target.id
        // this.getSy(a);
        this.getSy(e.target.id);
    }
    onSelectChange(selectedRowKeys,value) {
        this.setState({ 
            selectedRowKeys:selectedRowKeys,
            selectValue:value ,
        });
    }
    handleOk(){
        let {selectValue,modelBtnId}=this.state
        this.setState({
            visible:false,
        })
        let product_paramId=`${selectValue[0].product}-${selectValue[0].head.code}`
        let selectData=`${modelBtnId}-${product_paramId}`//按钮id以及选的产品型号
        this.props.getAge(this.props.processId,'', selectData)
        axios({
            url:this.props.url.precursorGoodIn.getByLineByProcess,
            method:'post',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                lineCode:modelBtnId,
                processCode:this.props.processId,
                paramId:selectValue[0].paramId,
            },
            data:this.tableData
        }).then(data=>{
            this.props.alterData(this.props.processId,data.data.data)
        })
    }
    handleCancel(){
        this.setState({
            visible:false,
        })
    }
    getSy(modelBtnId){ //获取陈化配方
        let lineParamId=this.header&&this.header[modelBtnId-1]&&this.header[modelBtnId-1].product
        &&this.header[modelBtnId-1].product.includes('-')?this.header[modelBtnId-1].product.split('-')[1]
        :this.header[modelBtnId-1].product
        axios({
            url:this.props.url.processParam.recipe,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                for(let i=0;i<res.length;i++){
                    res[i]['id']=(i+1)
                    if(res[i].head.code===parseInt(lineParamId)){
                        let a=[parseInt(lineParamId)]
                        this.setState({
                            selectedRowKeys:a,
                            selectValue:[res[i]]
                        })
                    }
                }
                if(lineParamId===null){//说明此时未选择产品型号
                    this.setState({
                        selectedRowKeys:[]
                    })
                }
                this.setState({
                    data:res
                })
            }
        })
    }
    getWeight(){
        this.props.weightAlterData(this.props.processId,'weiOrVol')
    }
    getName(product){
        if(product===null||product===undefined){
            return '产品型号'
        }
        else if(product.includes('-')){//判断product是否为拼接的产品型号-paramId形式
            return product.split('-')[0]
        }
        else {
            return product
        }
    }
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[3]&&this.props.tagTableData[3].materialDetails?this.props.tagTableData[3].materialDetails:[]
        if (this.tableData && this.tableData.length) {
            for (let i = 0; i < this .tableData.length; i++) {
                this.tableData[i]['index'] = i + 1
            }
        }
        this.header=this.props.tagTableData&&this.props.tagTableData[3]&&this.props.tagTableData[3].lineProDTOS?this.props.tagTableData[3].lineProDTOS:null
        const {selectedRowKeys}=this.state;
        const rowSelection = {//checkbox
            selectedRowKeys,
            onChange:this.onSelectChange,
            type:'radio'
        };
        return(
            <div>
                <NewButton name='获取体积値' flagConfirm={!this.props.flagConfirm}  handleClick={this.getWeight}/>
                <span style={{float:'right'}}>
                    {
                        this.header?this.header.map((data,index)=>{
                            return(
                                    <ReadRecipe key={data.line.code} buttonId={data.line.code} lineName={data.line.name} rowSelection={rowSelection} handleCancel={this.handleCancel} handleOk={this.handleOk}
                                     showModal={this.showModal} visible={this.state.visible} 
                                    flagConfirm={!this.props.flagConfirm} data={this.state.data}
                                     name={this.getName(data.product)} flag={true}/>
                            )
                        }):null
                    }
                </span>
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
export default AgingProcess