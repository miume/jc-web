import React from 'react';
import axios from 'axios';
import NewButton from "../../../BlockQuote/newButton";
import {Input, Modal, message,Select} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            line:[],
            name : undefined,
            code : undefined,
            description : undefined

        };
        this.showModal=this.showModal.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderButton = this.renderButton.bind(this);
    }

    render() {
        let {visible,name,description,code} = this.state, {title,flag} = this.props;
        return (
            <span className={flag ? '' : 'hide'}>
                { this.renderButton(title) }
                <Modal title={title} 
                       visible={visible}
                       maskClosable={false}
                       closable={false}
                       centered={true}
                       width={400}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                        //    <SaveButton key={'save'} handleSave={this.handleSave}className='fa fa-check' name='确定'/>
                        <NewButton key='ok' handleClick={this.handleAdd} className='fa fa-check' name='确定'/>

                       ]}
                >
                    <div className={'check-item'}>
                        <Input placeholder={'请输入产品型号'} name={'name'} value={name}  onChange={this.inputChange} disabled={code ? true : false}/>
                    </div>
                    <div className={'check-item'}>
                        <Input placeholder={'请输入产品的描述信息'} name={'description'} value={description}  onChange={this.inputChange}/>
                    </div>
                </Modal>
            </span>
        );
    }

    renderButton(title) {
        return (
            title === '新增'?
                <NewButton name='新增' className='fa fa-plus' handleClick={this.showModal}/> :
                <span className={'blue'} onClick={this.handleClick}>编辑</span>
        )
    }
    showModal(){
        
        this.setState({
            visible:true
        })
    }

    

    handleAdd(){
        let {name,code,line,description} = this.state
        if(name ===undefined ||description===undefined){
            message.error('信息填写不完整!')
            return
        }
        let data={
            name : name,
            code : code,
            description : description
            
        }
        axios({
            url:this.props.title==='编辑'?this.props.url.positiveModel.update:this.props.url.positiveModel.add,
            method:this.props.title==='编辑'? "put":"post",
            headers:{
                'Authorization':this.props.url.Authorization,
            },
            data:data
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.props.getTableData()
            }
            else{

                message.error(data.data.message)
            }
        }).catch(error=>{
            message.error('操作失败，请联系管理员!')
        })
       this.handleCancel()
    }
    
    /**点击新增事件*/
    handleClick() {
        let {record} = this.props;
        if(record) {
            let {name,code,description} = record;
            this.setState({
                name : name,
                code : code,
                description : description,
                line:this.props.line,

            });
        }
        this.setState({
            visible: true
        });
    }

    /**取消事件*/
    handleCancel() {
        this.setState({
            visible: false,
            name:undefined,
            description: undefined
        });
    }

    inputChange(e){
        let name=e.target.name,
            value=e.target.value
        this.setState({
            [name]:value
        })
    }

}

export default AddModal;
