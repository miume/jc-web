import React from 'react';
import axios from 'axios';
import {Modal, Button} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
import FittingModal from "../modal/fittingModal";


class Fittings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: [],
            saveData: []
        };
        this.handleFitting = this.handleFitting.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.addRowFun = this.addRowFun.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.addSaveFun = this.addSaveFun.bind(this);
        this.deleteSaveFun = this.deleteSaveFun.bind(this);
    }

    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleFitting}>配件</span>
                <Modal
                    title="配件"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton
                            handleCancel={this.handleCancel}
                            flag={true}
                            key="back"
                        />,
                        <SaveButton
                            key="save"
                            handleSave={this.handleSave}

                        />
                    ]}
                >
                    <div style={{height:'500px'}}>
                        <FittingModal
                            data = {this.state.data}
                            addSaveFun = {this.addSaveFun}
                            deleteSaveFun={this.deleteSaveFun}
                        />
                        <Button type="primary" icon="plus" size='large' style={{width:'450px',fontSize:'15px'}} onClick={this.addRowFun}/>
                    </div>
                </Modal>
            </span>
        )

    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleFitting = () => {
        // TODO 获取数据
        const data = [{
            name:'法兰片',
            specification:'DN50',
            counts:10,
            code:1
        },{
            name:'垫片',
            specification:'DN50',
            counts:15,
            code:2
        }];
        this.setState({
            visible: true,
            data: data
        })
    };
    handleSave = () => {
        this.setState({
            visible: false,
        })
    };
    addRowFun = () => {
        const {data} = this.state;
        const code = data[data.length-1].code;
        data.push({
            name:'',
            specification:'',
            counts:0,
            code:code+1
        });
        this.setState({
            data: data
        })
    };
    addSaveFun = (item,index) => {
        const {saveData,data} = this.state;
        // saveData.push({
        //     name:item.name,
        //     specification:item.specification,
        //     counts:item.counts,
        //     code: item.code
        // });
        data[index].name=item.name;
        data[index].specification=item.specification;
        data[index].counts=parseInt(item.counts);
        this.setState({
            data: data,
            // saveData: saveData
        })
    }
    deleteSaveFun = (code) => {
        const data = this.state.data;
        const index = data.findIndex(item => code === item.code);
        // TODO 直接调用删除接口，改变数据
        // if (index > -1) {
        //     data.splice(index, 1);
        //
        //     this.setState({ data: data });
        // } else {
        //     this.setState({ editingKey: data });
        // }
    }
}

export default Fittings