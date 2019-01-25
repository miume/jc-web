import React from 'react';
import axios from 'axios';
import Block from './block';
import {message} from 'antd';
class SelectModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            add:0,           //add为0显示型号显示 为1表示新增显示
            visible:false,   //控制新增型号 气泡框弹出
            isLeaf:0,        //是否为叶子节点
            modalName:'',    //用来监控新增型号的名称
            curParentId:-1   //用来存取当前父型号id
        }
        this.move = this.move.bind(this);
        this.clickI = this.clickI.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addModal = this.addModal.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.blockClick = this.blockClick.bind(this);
        this.handleOk = this.handleOk.bind(this);
        // this.getSonModal = this.getSonModal.bind(this);
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
            this.setState({
                add : 0,
                curParentId:ids[0],
            })
            this.props.getAllModal({
                parentId:ids[0]
            },ids)
        }else{
            this.props.getAllProductStandard({
                classId:parseInt(ids[0]) 
            },ids)
        }
        // const parentNode = e.target.parentNode;
        // parentNode.style.backgroundColor = '#0091ff';
        // console.log(e.target.parentNode.className)
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
        const {curParentId} = this.state;
        //console.log(curParentId)
        axios.post(`${this.props.url.productStandard.addNewClass}`,{
            isLeaf:params.isLeaf,
            name:params.name,
            parent:curParentId
        },{
            headers:{
                Authorization:this.props.url.Authorization
            }
        }).then((data)=>{
            message.info(data.data.message);
            if(data.data.code===0){
                this.setState({
                    add:0
                })
                this.props.getAllModal({
                    parentId:curParentId
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
    /**移动事件 */
    move(number){
        const middle = document.getElementsByClassName('product-modal-2')[0];
        var count = 225;
        var gap = count/100;
        gap = gap.toFixed(0);
        /**当最后还有移动距离<225时，停止移动 */
        if(middle.scrollLeft+1>1125&&number===1) {}
        else{
            if(gap >= 1) {
                var interval = setInterval(function() {
                    let pre = middle.scrollLeft;
                    if(count < 5) {
                        count -= 1;
                        middle.scrollLeft += (number === 1 ? 1 : -1);    
                    }
                    else {
                        count -= gap;
                        middle.scrollLeft += (number === 1 ? Number(gap) : -Number(gap));
                    }
                    
                    if(count <= 0 || pre === middle.scrollLeft) {
                        // console.log(`middle.scrollLeft=${middle.scrollLeft}-pre=${pre}`)
                        clearInterval(interval);
                    }
                },1)
            }else if(gap > 0){
                var interval2 = setInterval(function() {
                    let pre = middle.scrollLeft;
                    count -= 1;
                    middle.scrollLeft += (number === 1 ? 1 : -1);
                    if(count <= 0|| pre === middle.scrollLeft) {
                        clearInterval(interval2);
                    }
                },1)
            }
    }
    }
    /**点击左边箭头 */
    moveLeft(){
        this.move(-1);
    }
    /**点击右边箭头 */
     moveRight(){
        this.move(1);
    }
    render(){
        const count = this.props.modalArr?this.props.modalArr.length:0;
        /**测试数据 用来测试左右移动 
        var modalArr = [];
        for(var i = 0; i < 10; i++ )
            modalArr.push({
                id:`${i+1}`,
                name:`基本型号${i+1}`
            })
        */
        return (
            <div className='modal-standrad-bottom'>
                <div className='product-modal'>
                    <div className='product-modal-1' onClick={this.moveLeft}><i className='fa fa-2x fa-caret-left'></i></div>
                    <div className='product-modal-2'>
                        <div className='product-modal-2-scroll'>
                        {
                            this.props.modalArr?
                            this.props.modalArr.map((e,index)=>{
                                return (
                                    <div key={`${e.id}`} className='product-modal-2-div'>
                                        <div className='product-modal-2-div-part'>
                                            <div className='product-modal-2-div-part1-circle'><div className='product-modal-2-circle'>{index+1}</div></div>
                                            <div className='product-modal-2-div-part1'>{e.name}</div>
                                            <div className={count===index+1?'hide':'product-modal-2-div-part11'}></div>
                                        </div>
                                    </div>)
                            }): null
                        }
                        </div>
                    </div>
                    <div className='product-modal-1' onClick={this.moveRight}><i className='fa fa-2x fa-caret-right'></i></div>
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