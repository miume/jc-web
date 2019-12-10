import React from "react";
import { Modal,Select,message } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";

class AddModal extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            visible:false,
            materialPonit:[],
            plcAddress:[],
            materialCode:undefined,
            plcCode:undefined
        }
        this.getMaterialPoint=this.getMaterialPoint.bind(this);
        this.getPlcAddress=this.getPlcAddress.bind(this);
    }
    componentWillUnmount(){
        this.setState = () => {
            return ;
          }
    }
    componentDidMount(){
        this.getMaterialPoint()
        this.getPlcAddress()
    }
    getMaterialPoint(){
        axios({
            url:`${this.url.precursorMaterialDetails.all}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res=data.data.data
        if(res){
            this.setState({
                materialPonit:res
            })
        }
        });
    }
    getPlcAddress(){
        axios({
            url:`${this.url.plcAddress.plcAddress}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data.list;
            this.setState({
                plcAddress:res
            })
        })
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () =>{
        this.setState({
            visible:false,
            materialPonit:[],
            plcAddress:[],
            materialCode:undefined,
            plcCode:undefined
        })
    }
    handleCreate = () =>{
        let {materialCode,plcCode}=this.state
        if(materialCode===''||plcCode===''){
            message.info('信息填写不完整!')
            return
        }

        var data = {materialCode:materialCode,plcCode:plcCode};
        axios({
            url:`${this.url.matPlcMap.matPlcMap}`,
            method:"post",
            headers:{
                'Authorization':this.url.Authorization
            },
            data:data
        }).then((data)=>{

            if(data.data.code===0){
                message.info("新增成功");
                this.props.fetch();
            }
            this.handleCancel()
        })

    }
    materialChange = (data)=>{
        this.setState({
            materialCode:data
        })
    }
    plcChange = (data)=>{
        this.setState({
            plcCode:data
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <span>
                <AddButton handleClick={this.showModal} name='新增' className='fa fa-plus' />
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="新增"
                    width='500px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="define" handleClick={this.handleCreate} className='fa fa-check' name='确定'/>,
                    ]}
                >
                    物料点：<Select id="material" style={{width:"85%"}} onChange={this.materialChange} value={this.state.materialCode} placeholder="请选择物料点">
                        {
                            this.state.materialPonit?this.state.materialPonit.map((item)=>{
                                return(
                                    <Select.Option key={item.code} value={item.code}>{item.materialName}</Select.Option>
                                )
                            }):null
                        }
                    </Select>
                    <br /><br />
                    plc地址：<Select id="plcAddress" style={{width:"84%"}} onChange={this.plcChange} value={this.state.plcCode} placeholder="请选择plc地址">
                        {
                            this.state.plcAddress?this.state.plcAddress.map((item)=>{
                                return(
                                    <Select.Option key={item.code} value={item.code}>{item.address}</Select.Option>
                                )
                            }):null
                        }
                    </Select>
                </Modal>
            </span>
        )
    }
}

export default AddModal
