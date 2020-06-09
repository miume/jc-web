import React,{Component} from 'react'
import {Table,Input} from 'antd'
import ReadRecipe from '../readRecipe'
import NewButton from '../../../../BlockQuote/newButton'
import SelectLine from '../selectProductline'
import axios from 'axios'
class SyntheticProcess extends Component{//合成工序
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:[],
            selectedRowKeys:[],
            selectValue:undefined,
            modelBtnId:1
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:"5%"
        },{
            title:'合成槽号',
            dataIndex:'materialName',
            key:'materialName',
            width:"13%",
        },{
            title:'重量(T)',
            dataIndex:'weight',
            key:'weight',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.weight} name={`${record.index}-${'weight'}`}  onChange={this.inputChange}/>
                )
            }
        },{
            title:'Ni(%)',
            dataIndex:'niPotency',
            key:'niPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.niPotency} name={`${record.index}-${'niPotency'}`}  onChange={this.inputChange}/>
                )
            }
        },{
            title:'Co(%)',
            dataIndex:'coPotency',
            key:'coPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.coPotency}  name={`${record.index}-${'coPotency'}`}  onChange={this.inputChange}/>
                )
            }
        },{
            title:'Mn(%)',
            dataIndex:'mnPotency',
            key:'mnPotency',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.mnPotency} name={`${record.index}-${'mnPotency'}`}  onChange={this.inputChange}/>
                )
            }
        }];
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.showModal=this.showModal.bind(this);
        this.getLastPotency=this.getLastPotency.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.getSy=this.getSy.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
        this.getName=this.getName.bind(this)
    }
    inputChange(e){
        this.props.getSynthesis(this.props.processId,e,'')
    }
    showModal(e){
        this.setState({
            visible:true,
            modelBtnId:e.target.id//获取选中按钮的id，绑定的是产线的code
        })
        let a=e.target.id
        this.getSy(a)
    }
      //实现checkbox选择
    onSelectChange(selectedRowKeys,value) {
        this.setState({ 
            selectedRowKeys:selectedRowKeys,
            selectValue:value 
        });
    }
    handleOk(){
        let {selectValue,modelBtnId}=this.state
        this.setState({
            visible:false,
        })
        let product_paramId=`${selectValue[0].product}-${selectValue[0].head.code}`
        let selectData=`${modelBtnId}-${product_paramId}`//按钮id以及选的产品型号
        this.props.getSynthesis(this.props.processId,'', selectData)
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
    getLastPotency() {//获取上期浓度
        this.props.getLastPotency(this.props.processId)
    }
    getSy(modelBtnId){ //合成获取配方,参数是被点击按钮的id，是为了后面用
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
        this.tableData = this.props.tagTableData&&this.props.tagTableData[2]&&this.props.tagTableData[2].materialDetails?this.props.tagTableData[2].materialDetails:[]
        if (this.tableData && this.tableData.length) {
            for (let i = 0; i < this .tableData.length; i++) {
                this.tableData[i]['index'] = i + 1
            }
        }
        this.header=this.props.tagTableData&&this.props.tagTableData[2]&&this.props.tagTableData[2].lineProDTOS?this.props.tagTableData[2].lineProDTOS:null
        const {selectedRowKeys}=this.state;
        const rowSelection = {//checkbox
            selectedRowKeys,
            onChange:this.onSelectChange,
            type:'radio'
        };
        return(
            <div>
                <NewButton name='上期浓度' handleClick={this.getLastPotency} flagConfirm={!this.props.flagConfirm}/>
                <span style={{float:'right'}}>
                    {
                        this.header?this.header.map((data,index)=>{
                            return(
                                <ReadRecipe key={data.line.code} buttonId={data.line.code} lineName={data.line.name} rowSelection={rowSelection} handleCancel={this.handleCancel} handleOk={this.handleOk}
                                 showModal={this.showModal} visible={this.state.visible} 
                                flagConfirm={!this.props.flagConfirm} data={this.state.data}
                                 name={this.getName(data.product)}/>
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
export default SyntheticProcess