import React from 'react';
import WhiteSpace from '../BlockQuote/whiteSpace';
import AddButton from '../BlockQuote/newButton'
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import { Button, Modal, Form, Input,message,DatePicker } from 'antd';
import Tr from './tr';
import './equiptment.css'

class AddModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            count: 1,
            data : [1],
        }
        this.addData = this.addData.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.showModal = this.showModal.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    /**新增一条数据 */
    addData = ()=>{
        const {count,data} = this.state;
        this.setState({
            count: count+1,
            data: [...data, count+1],
        })
    }

    /**删除一条数据 */
    deleteRow = (value)=>{
        const {count,data} = this.state;
        this.setState({
            count:count-1,
            data:data.filter(d=>d.toString()!==value),
        })
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    onCancel=()=>{
        this.setState({
            visible:false
        })
    }

    onCreate=()=>{
        this.setState({
            visible:false
        })
    }

    onSubmit=()=>{
        this.setState({
            visible:false
        })
    }

    render(){
        return(
            <span>
                <AddButton handleClick={this.showModal}  name='新增' className='fa fa-plus' />
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="新增"
                    footer={[
                        <CancleButton key='back' handleCancel={this.onCancel}/>,
                        <SaveButton key="define" handleSave={this.onCreate} className='fa fa-check' />,
                        <AddButton key="submit" handleClick={this.onSubmit} name='提交' className='fa fa-check' />
                      ]}
                >
                      <div style={{height:'400px'}}>
                            <Input style={{width:"32%"}} placeholder='请输入指导书名称'/>
                            <Input style={{width:"32%",marginLeft:'2%'}} placeholder='请输入编号'/>
                            <Input style={{width:"32%",marginLeft:'2%'}} placeholder='请输入版次'/>
                            <Input style={{width:'49%',marginTop:'10px'}} placeholder='请输入页次'/>
                            <DatePicker style={{width:'49%',marginLeft:'2%',marginTop:'10px'}} placeholder='请选择生效日期' />
                            <WhiteSpace />
                            <table className='equip-Table'>
                                <thead className='equip-Head'>
                                    <tr>
                                        <td>点检内容</td>
                                        <td>检查标准</td>
                                        <td>频次</td>
                                        <td>图片</td>
                                        <td>操作</td>
                                    </tr>
                                </thead>
                                <tbody id="equpi-Tbody">
                                    {
                                        this.state.data.map((m)=>{return <Tr key={m.toString()} deleteRow={this.deleteRow} value={m.toString()}/>})
                                    }
                                </tbody>
                            </table>
                            <WhiteSpace />
                            <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.addData}/>
                      </div>
                </Modal>
            </span>
        )
    }
}

export default AddModal