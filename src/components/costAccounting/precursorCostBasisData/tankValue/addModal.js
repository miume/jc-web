import React from "react";
import {Modal, Input,message,Select,Checkbox } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";
import './tank.css'
const {Option}=Select
class AddModal extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            data:null,
            productLine:undefined,
            tank:undefined,
            valueVolume:undefined,
            materialName:undefined,
            lineData:[],
            tankData:[]
        }
        this.getLine=this.getLine.bind(this);
        this.editData=this.editData.bind(this);
    }
    componentDidMount(){
        this.getLine()
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    getLine(){
        axios({
            url:`${this.props.url.precursorProductionLine.all}`,
            method:"get",
            headers:{
                'Authorization':this.props.url.Authorization,
            },
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                lineData:res
            });
        })
    }
    // getHC(){//合成槽号(合成工序下的物料点名称)
    //     axios({
    //         url:`${this.props.url.precursorCompoundCellVolumes.getHC}`,
    //         method:"get",
    //         headers:{
    //             'Authorization':this.props.url.Authorization,
    //         },
    //     }).then((data)=>{
    //         const res = data.data.data;
    //         this.setState({
    //             tankData:res
    //         });
    //     })
    // }
    editData(){
        axios({
            url:this.props.url.precursorCompoundCellVolumes.getRecordById,
            method:"get",
            headers:{
                'Authorization':this.props.url.Authorization,
            },
            params:{
                id:this.props.code
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    productLine:res.lineCode,
                    tank:res.materialCode,
                    valueVolume:res.volumesValue
                })
            }
        })
    }
    showModal = () => {
        this.setState({ visible: true });
        if(this.props.editFlag){
            this.editData()
          }
    };
    handleCancel = () =>{
        this.setState({
            productLine:undefined,
            tank:undefined,
            valueVolume:undefined,
            visible:false
        })
    }
    handleCreate = () =>{
        let {productLine,tank,valueVolume,materialName}=this.state
        if(productLine===''||tank===''||valueVolume===''){
            message.error('信息填写不完整!')
            return
        }
        let data={
            code:this.props.editFlag?this.props.code:'',
            lineCode: productLine,
            materialCode: tank,
            volumesValue: valueVolume,
            materialName:materialName
        }
        axios({
            url:this.props.editFlag?this.props.url.precursorCompoundCellVolumes.update:this.props.url.precursorCompoundCellVolumes.add,
            method:this.props.editFlag?'put':'post',
            headers:{
                'Authorization':this.props.url.Authorization,
            },
            data:data
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.props.fetch()
            }
            else{
                message.error(data.data.message)
            }
        }).catch(error=>{
            message.error('操作失败，请联系管理员!')
        })
        this.handleCancel()
    }
    change = (data)=>{//生产线
        this.setState({
            productLine:data,
            tank:undefined
        })
        axios({
            url:this.props.url. techLineCellMap.byIds,
            method:"post",
            headers:{
                'Authorization':this.props.url.Authorization,
            },
            data:[data]
        }).then(data=>{
            let res=data.data.data
            if(res&&res[0].materialDTOS){
                this.setState({
                    tankData:res[0].materialDTOS
                })
            }
        })
    }
    onChange = (data,name)=>{//合成槽号
        this.setState({
            tank:data,
            materialName:name.props.children
        })
    }
    valueChange = (data)=>{//体积値
        this.setState({
            valueVolume:data.target.value
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        let {editFlag}=this.props
        return(
            <span>
               {this.props.editFlag? <span className='blue' onClick={this.showModal}>编辑</span>
               :<AddButton handleClick={this.showModal} name='新增' className='fa fa-plus' />}
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title={this.props.editFlag?"编辑":"新增"}
                    width='400px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="define" handleClick={this.handleCreate} className='fa fa-check' name='确定'/>,
                    ]}
                >
                   <span className='tank-add-span'> 生产线：</span><Select onChange={this.change} value={this.state.productLine} placeholder="请选择生产线" style={{width:"250px"}} disabled={editFlag?true:false}>
                       {
                           this.state.lineData?this.state.lineData.map(data=>{
                               return(
                                    <Option key={data.code} value={data.code}>{data.name}</Option>
                               )
                           }):null
                       }

                    </Select>
                    <br /><br />
                    <span className='tank-add-span'>合成槽号：</span><Select onChange={this.onChange} value={this.state.tank} placeholder="合成槽号" style={{width:"250px"}} disabled={editFlag?true:false}>
                        {
                            this.state.tankData?this.state.tankData.map(data=>{
                                return(
                                    <Option key={data.materialCode} value={data.materialCode}>{data.materialName}</Option>
                                )
                            }):null
                        }
                    </Select>
                    <br /><br />
                    <span className='tank-add-span'>初始体积値：</span><Input value={this.state.valueVolume} placeholder="请输入初始体积値" onChange={this.valueChange} style={{width:"250px"}} suffix="m³"/>
                </Modal>
            </span>
        )
    }
}

export default AddModal