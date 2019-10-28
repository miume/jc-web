import React,{Component} from 'react'
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'
import {Modal} from 'antd'
import AddModal from './addModal'
class PLCAddressAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
        this.showModal=this.showModal.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.handleAddCancel=this.handleAddCancel.bind(this);
    }
    showModal(){
        this.setState({
            visible:true
        })
    }
    handleAdd(){
        this.setState({
            visible:false
        })
    }
    handleAddCancel(){
        this.setState({
            visible:false
        })
    }
    render(){
        
        return(
            <span>
                {this.props.editflag?<span className='blue' onClick={this.showModal}>编辑</span>
                :<NewButton name='新增' className='fa fa-plus' handleClick={this.showModal}/>}
                <Modal
                    title={this.props.editflag?'编辑':'新增'}
                    visible={this.state.visible}
                    closable={false}
                    maskClosable={false}
                    width='450px'
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleAddCancel}/>,
                        <NewButton key='ok' handleClick={this.handleAdd} className='fa fa-check' name='确定'/>
                    ]}
                >
                    <AddModal record={this.props.record} editflag={this.props.editflag}/>
                </Modal>
            </span>
        );
    }
}
export default PLCAddressAdd