import React from 'react';
import axios from 'axios';
import Block from './block';
class SelectModal extends React.Component{
    componentDidMount(){
        this.getAllSelectModal({
            parentId:-1
        });
    }
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
        this.blockClick = this.blockClick.bind(this);
        this.getAllSelectModal = this.getAllSelectModal.bind(this);
    }
    blockClick(e){
        const id = e.target.id;
        // const parentNode = e.target.parentNode;
        // parentNode.style.backgroundColor = '#0091ff';
        // console.log(e.target.parentNode.className)
    }
    /**获取所有选择型号 */
    getAllSelectModal(params){
        axios.get(`${this.props.url.productStandard.getAll}`,{},{
            headers:{
                Authorization:this.props.url.Authorization
            },
            params:params
        }).then((data)=>{
            const res = data.data.data;
            console.log(res)
            if(res){
                this.setState({
                    data:res
                })
            }
        })
    }
    render(){
        return (
            <div className='product-standrad-bottom'>
                <div className='product-modal'>
                    <div className='product-modal-1'><i className='fa fa-2x fa-caret-left'></i></div>
                    <div className='product-modal-2'>
                        <div className='product-modal-2-scroll'></div>
                    </div>
                    <div className='product-modal-1'><i className='fa fa-2x fa-caret-right'></i></div>
                </div>
                <div className='product-modal-middle'>
                {
                    this.state.data.map(e=>{
                        return (
                            <Block key={e.id} name={e.name} id={e.id} onBlockChange={this.blockClick} />
                        );
                    })
                }
                    <Block flag={1} name='新增' onBlockChange={this.blockClick} add={this.props.add} clickI={this.props.clickI}/>
                </div>
            </div>
        );
    }
}
export default SelectModal;