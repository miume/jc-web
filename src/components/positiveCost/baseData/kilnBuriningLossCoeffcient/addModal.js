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
            productiontypedata:[],
            name:undefined,
            productioncode:undefined
        };
        this.handleSave = this.handleSave.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
        this.getProductionType = this.getProductionType.bind(this);
        this.inputChange = this.inputChange.bind(this)
    }
    componentDidMount() {
        this.getProductionType();
    }

    render() {
        const { Option } = Select;
        let {visible,name,lossrate1,lossrate2,lossrate3,lossrate4,lossrate5,lossrate6,lossrate7,lossrate8,productiontypedata} = this.state, {title,flag} = this.props;
        return (
            <span className={flag ? '' : 'hide'}>
                { this.renderButton(title) }
                <Modal title={title} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={500}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}
                >
                    <div className={'check-item'}>
                        <Select placeholder={'请选择产品型号'} style={{width: 100+'%'}} onChange={this.selectChange} value={name} disabled={title==='编辑'?true:false}>
                             {
                                 productiontypedata.length ? productiontypedata.map(e => <Option key={e.code} productioncode={e.code} value={e.name} name={'name'}>{e.name}</Option>) : null
                             }
                        </Select>
                    </div>
                    <div className={'check-item'}>
                        <Input placeholder={'请输入1#窑炉'} name={'lossrate1'} value={lossrate1}  onChange={this.inputChange} style={{width: '100%',marginRight: 10}} />
                        <Input placeholder={'请输入2#窑炉'} name={'lossrate2'} value={lossrate2}  onChange={this.inputChange}/>
                    </div>
                    <div className={'check-item'}>
                    <Input placeholder={'请输入3#窑炉'} name={'lossrate3'} value={lossrate3}  onChange={this.inputChange} style={{width: '100%',marginRight: 10}} />
                        <Input placeholder={'请输入4#窑炉'} name={'lossrate4'} value={lossrate4}  onChange={this.inputChange}/>
                    </div>
                    <div className={'check-item'}>
                    <Input placeholder={'请输入5#窑炉'} name={'lossrate5'} value={lossrate5}  onChange={this.inputChange} style={{width: '100%',marginRight: 10}} />
                        <Input placeholder={'请输入6#窑炉'} name={'lossrate6'} value={lossrate6}  onChange={this.inputChange}/>
                    </div>
                    <div className={'check-item'}>
                    <Input placeholder={'请输入7#窑炉'} name={'lossrate7'} value={lossrate7}  onChange={this.inputChange} style={{width: '100%',marginRight: 10}} />
                        <Input placeholder={'请输入8#窑炉'} name={'lossrate8'} value={lossrate8}  onChange={this.inputChange}/>
                    </div>
                </Modal>
            </span>
        );
    }

    renderButton(title) {
        return (
            title === '新增'?
                <NewButton name='新增' className='fa fa-plus' handleClick={this.handleClick}/> :
                <span className={'blue'} onClick={this.handleClick}>编辑</span>
        )
    }

    /**点击新增或编辑事件,name是5506，code是数据库中该条记录的序号,productioncode是产品编号*/
    handleClick() {
        let {record} = this.props;
        if(record) {
            let {name,code,productionCode,lossrate1,lossrate2,lossrate3,lossrate4,lossrate5,lossrate6,lossrate7,lossrate8} = record,
            productioncode = productionCode;
            this.setState({
                name,code,productioncode,lossrate1,lossrate2,lossrate3,lossrate4,lossrate5,lossrate6,lossrate7,lossrate8
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
            name: undefined,
            lossrate1: undefined,
            lossrate2: undefined,
            lossrate3: undefined,
            lossrate4: undefined,
            lossrate5: undefined,
            lossrate6: undefined,
            lossrate7: undefined,
            lossrate8: undefined
        });
    }

    /**选择下拉框*/
    selectChange(value,e) {
        this.setState({
            name: value,
            productioncode: e.props.productioncode
        })
    }

    /**输入框*/
    inputChange(e){
        let value=e.target.value,name = e.target.name
        this.setState({
            [name]:parseFloat(value)
        })
    }

    handleSave() {
        let params = this.saveDataProcessing();
        if(params) {
            let {data,method,url} = params;
            axios({
                url: url,
                method: method,
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                data
            }).then((data) => {
                this.handleCancel();
                if(data.data.code===0){
                    message.info(data.data.message);
                    this.props.getTableParams();
                }
               else{
                message.info(data.data.message);
               }
            })
        }
    }

    /**需要修改url */
    saveDataProcessing() {
        let {name,code,productioncode,lossrate1,lossrate2,lossrate3,lossrate4,lossrate5,lossrate6,lossrate7,lossrate8} = this.state,
            productionCode = productioncode,
            data = {
                productionCode,
                lossrate1,lossrate2,lossrate3,lossrate4,lossrate5,lossrate6,lossrate7,lossrate8
            }, method = 'post', url = `${this.props.url.kilnBurning.add}`, flag;
        for(let i in data) {
            if (!data[i]) {
                flag = true
                break
            }
        }
        if(flag) {
            message.info('请填写完整！');
            return
        }
        if(code) {
            data['code'] = code;
            method = 'put';
            url = `${this.props.url.kilnBurning.update}`;
        }
        return {data,method,url};
    }
    getProductionType() {
        axios.get(`${this.props.url.positiveModel.all}`).then((data) => {
            let res = data.data.data;
            this.setState({
                productiontypedata: res
            })
        })
    }
}

export default AddModal;
