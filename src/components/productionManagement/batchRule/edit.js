import React from "react";
import {message, Modal, Button} from 'antd';
import axios from 'axios';
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
import Tr from './tr';
import WhiteSpace from '../../BlockQuote/whiteSpace';
import "./tr.css"

class Edit extends React.Component {
    url

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dataSource: [],
        }
        this.deleteRow = this.deleteRow.bind(this)
    }

    //显示编辑页
    showModal = () => {
        this.fetch(this.props.code);
        this.setState({visible: true});
    };
    //通过code获取详情数据
    fetch = (id) => {
        axios({
            url: `${this.url.productionBatchRule.getDetail}`,
            method: "GET",
            params: {code: id},
            headers: {
                'Authorization': this.url.Authorization
            },
        }).then((data) => {
            var res = data.data.data;
            if (res) {
                this.setState({
                    dataSource: res,
                })
            }
        }).catch((err) => {
            message.error(err)
        })
    };
    //点击取消后的回调
    handleCancel = () => {
        this.props.getTableData();
        this.setState({visible: false});
    }
    //点击保存后的回电
    handleCreate = () => {

        const {dataSource} = this.state;
        var data = {};
        data.productionBatchRuleDetails = dataSource;
        data.ruleCode = this.props.code;
        axios({
            url: `${this.url.productionBatchRule.updateAll}`,
            method: "put",
            data: data,
            headers: {
                'Authorization': this.url.Authorization
            },
        }).then((data) => {
            if (data.data.code !== 0) {
                message.info(data.data.message);
            } else {
                message.info(data.data.message);
                this.props.getTableData()
                this.setState({visible: false});
            }
        })
    }
    //获取每个tr的值
    getData = (index, attr, value) => {
        var {dataSource} = this.state;
        dataSource[index][attr] = value;
        this.setState({
            dataSource: dataSource,
        })
    }
    getRadio = (index, check) => {
        var dataSource = this.state.dataSource;

        for (var i = 0; i < dataSource.length; i++) {
            if (i === index) {
                dataSource[i].defaultFlag = !check;
            } else {
                dataSource[i].defaultFlag = check;
            }

        }
        this.setState({
            dataSource: dataSource,
        })
    }
    //新增一条数据
    addData = () => {
        var {dataSource} = this.state;
        // TODO
        dataSource.push({
            code: null,
            ruleCode: "",
            ruleValue: "",
            ruleDesc: "",
            defaultFlag: true
        });


        this.setState({
            dataSource: dataSource,
        })
    }

    /**删除一条数据 不仅要删除渲染table的数据，还要删除实时存取table数据的数组中对应数据*/
    deleteRow = (index) => {
        var {dataSource} = this.state;
        dataSource.splice(index,1);
        this.setState({
            dataSource: dataSource,
        })
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <span>
                <span onClick={this.showModal} className="blue">编辑</span>
                <Modal
                    title='编辑' visible={this.state.visible}
                    closable={false} centered={true}
                    maskClosable={false}
                    width='500px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check'/>,
                    ]}
                >
                
                    <table className="batchTable">
                        <thead className="bactchHead">
                            <tr>
                                {/* <th>序号</th> */}
                                <th>规则代码</th>
                                <th>说明</th>
                                <th>是否默认</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.dataSource.length !== 0 ? this.state.dataSource.map((value, index) => {
                                    return (
                                        <Tr key={index} getRadio={this.getRadio}
                                            deleteRow={this.deleteRow} index={index} value={value} getData={this.getData}/>
                                    )
                                }) : null
                            }
                        </tbody>
                    </table>
                    <WhiteSpace/>
                    <Button type="primary" icon="plus" size='large' style={{width: '100%', fontSize: '15px'}}
                            onClick={this.addData}/>
                </Modal>
            </span>
        )
    }
}

export default Edit
