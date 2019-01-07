import React from 'react';
import axios from 'axios';
import Block from './block';
import {message} from 'antd';
import Line from '../todolist/line';
class SelectModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            add:0,         //add为0显示型号显示 为1表示新增显示
            visible:false,  //控制新增型号 气泡框弹出
            isLeaf:0,       //是否为叶子节点
            modalName:''    //用来监控新增型号的名称
        }
        this.clickI = this.clickI.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addModal = this.addModal.bind(this);
        this.blockClick = this.blockClick.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.getSonModal = this.getSonModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    /**点击型号的block */
    blockClick(e){
        const id = e.target.id;
        var ids = id.split('-');
        if(id==='-1'){
            this.setState({
                add:1
            })
        }else if(ids[2]){
            this.props.getAllModal({
                parentId:ids[0]
            },ids)
        }else{
            this.props.getAllProductStandard({
                classId:parseInt(ids[0]) 
            })
        }
        // const parentNode = e.target.parentNode;
        // parentNode.style.backgroundColor = '#0091ff';
        // console.log(e.target.parentNode.className)
    }
    /**根据父亲型号 查询其所有子型号 */
    getSonModal(ids){
        
    }
    /**点击型号新增 */
    clickI(e){
        /**通过点击新增确定 找到input value值 */
        const value = e.target.parentNode.parentNode.firstElementChild.value;
        if(value===''){
            message.info('请输入型号名称！');
            return
        }
        else{
            this.setState({
                visible:true,
                modalName:value
            })
        }
    }
    /**新增新型号 */
    addModal(params){
        axios.post(`${this.props.url.productStandard.addNewClass}`,{
            isLeaf:params.isLeaf,
            name:params.name,
            parent:-1
        },{
            headers:{
                Authorization:this.props.url.Authorization
            }
        }).then((data)=>{
            message.info(data.data.message);
            if(data.data.code===0){
                this.props.getAllModal({
                    parentId:-1
                });
            }
        }).catch(()=>{
            message.info('新增失败，请联系管理员！')
        })
    }
    /**监控新增型号 判断是否有子型号 */
    onChange(value){
        var flag = 0;
        if(value) flag = 1;
        this.setState({
            isLeaf:flag
        })
    }
    /**新增型号弹出气泡 取消按钮 变成新增按钮 */
    handleCancel(){
        this.setState({
            visible:false,
            add:0,
        })
    }
    /**新增型号弹出气泡 确定按钮 */
    handleOk(){
        this.setState({
            visible:false
        })
        const {isLeaf,modalName} = this.state;
        this.addModal({
            isLeaf:isLeaf,
            name:modalName,
        })
    }
    /**popover气泡自带的监控visible变化的函数 */
    // visibleChange(value){
    //     console.log(value)
    //     this.setState({
    //         visible:value
    //     })
    // }
    render(){
        const count = this.props.modalArr?this.props.modalArr.length:0;
        return (
            <div className='modal-standrad-bottom'>
                <div className='product-modal'>
                    <div className='product-modal-1'><i className='fa fa-2x fa-caret-left'></i></div>
                    <div className='product-modal-2'>
                        <div className='product-modal-2-scroll'>
                        {
                            this.props.modalArr?
                            this.props.modalArr.map((e,index)=>{
                                return (
                                    <div key={`${e.id}`} className='product-modal-2-div'>
                                        <div style={{display:'flex'}}>
                                            <div className='product-modal-2-circle'>{index+1}</div>
                                            <div>{e.name}</div>
                                        </div>
                                        <Line index={index+1} count={count}/>
                                    </div>)
                            }): null
                        }
                        </div>
                    </div>
                    <div className='product-modal-1'><i className='fa fa-2x fa-caret-right'></i></div>
                </div>
                <div className='product-modal-middle'>
                {
                    this.props.data?this.props.data.map(e=>{
                        return (
                            <Block key={e.id} name={e.name} id={`${e.id}-${e.name}`} onBlockChange={this.blockClick} isLeaf={!e.isLeaf} />
                        );
                    }):null
                }
                    <Block flag={1} name='新增型号' onBlockChange={this.blockClick} add={this.state.add} clickI={this.clickI} id={-1} visible={this.state.visible} onChange={this.onChange}
                    handleCancel={this.handleCancel} handleOk={this.handleOk}
                    />
                </div>
            </div>
        );
    }
}
export default SelectModal;