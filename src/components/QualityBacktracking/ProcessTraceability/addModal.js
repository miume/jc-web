import React from 'react';
import axios from 'axios';
import NewButton from "../../BlockQuote/newButton";
import {Input, Modal, message} from "antd";
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        this.handleSave = this.handleSave.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
    }

    render() {
        let {visible,singletracecode,quality,positiveandnegativepowderbatchnumber,solutionbatchnumber} = this.state, {title,flag} = this.props;

        return (
            <span className={flag ? '' : 'hide'}>
                { this.renderButton(title) }
                <Modal title={title} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={400}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}
                >
                    <div className={'check-item'}>
                        <Input placeholder={'单体溯源码'} name={'singletracecode'} value={singletracecode} onChange={this.inputChange}/>
                    </div>
                    <div className={'check-item'}>
                        <Input placeholder={'质量'} name={'quality'} value={quality} onChange={this.inputChange}/>
                    </div>
					<div className={'check-item'}>
                        <Input placeholder={'正负极粉批号'} name={'positiveandnegativepowderbatchnumber'} value={positiveandnegativepowderbatchnumber} onChange={this.inputChange}/>
                    </div>
                    <div className={'check-item'}>
                        <Input placeholder={'溶液批号'} name={'solutionbatchnumber'} value={solutionbatchnumber} onChange={this.inputChange}/>
                    </div>
                </Modal>
            </span>
        );
    }

    renderButton(title) {
        debugger
        return (
            title === '新增'?
                <NewButton name='新增' className='fa fa-plus' handleClick={this.handleClick}/> :
                <span className={'blue'} onClick={this.handleClick}>编辑</span>
        )
    }

    /**点击新增事件*/
    handleClick() {
        debugger

        let {record} = this.props;

        if(record) {
            let {singletracecode,quality,positiveandnegativepowderbatchnumber,solutionbatchnumber,id} = record;
            this.setState({
                singletracecode,
                quality,
                positiveandnegativepowderbatchnumber,
                solutionbatchnumber,
				id
            });
        }
        this.setState({
            visible: true
        });
    }

    /**取消事件*/
    handleCancel() {
        this.setState({
            singletracecode:null,
            quality:null,
            positiveandnegativepowderbatchnumber:null,
            solutionbatchnumber:null,
            id:null,
            visible: false
        });
    }

    inputChange(e) {
        let tar = e.target, name = tar.name, value = tar.value;
        this.setState({
            [name]: value
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
                debugger
                if(data.data.code === 0) {
                    message.info(data.data.message);
                    this.props.getTableParams();
                } else {
                    message.info(data.data.data);
                }
            })
        }
    }

    saveDataProcessing() {
        let {singletracecode,quality,positiveandnegativepowderbatchnumber,solutionbatchnumber,id} = this.state, {title,flag} = this.props;
        let data,method,url;
        data = {
            "singletracecode": singletracecode,
            "id": id,
            "quality": quality,
            "positiveandnegativepowderbatchnumber": positiveandnegativepowderbatchnumber,
            "solutionbatchnumber": solutionbatchnumber
        }
        debugger
        if(title === '新增')
        {
            method = 'post';
            url = this.props.url.ProcessTraceability.add;
        }
        else
        {
            method = 'put';
            url = this.props.url.ProcessTraceability.update;
        }

        if(!singletracecode) {
            message.info('请将单体溯源码填写完整！');
            return false
        }

        return {data,method,url};
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default AddModal;
