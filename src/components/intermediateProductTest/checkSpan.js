import React from 'react';
import {Modal, Button, Popconfirm, Popover, Select, Switch} from 'antd';
import CheckSpanModal from './checkSpanModal';

const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        index:i,
        id: i,
        testItem: `测试`,
        testResult: '0.001',
        itemUnit: `kg`,
    });
}

class CheckSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            checkSelectData:true,
            checkSwitchData:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.hide = this.hide.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    render() {
        const { visible } = this.state;
        const Option = Select.Option;
        return (
            <span type="primary" onClick={this.showModal} size="small"    >
                <Modal
                    title="数据录检"
                    style={{ top: 20 }}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="500px"
                    footer={[
                        <Button key="back" style={{right:'265px'}}  onClick={this.handleCancel}>返回</Button>,
                        <Button key="keep" style={{left:'10px',background:'#4BD863',color:'white'}}  onClick={this.handleKeep}>保存</Button>,
                        <Popover
                            key="popover"
                            // content={<a onClick={this.hide}>Close</a>}
                            content = {
                                <div style={{width:300}}>
                                    <div >
                                        <Select placeholder="选择送审流程" style={{ width: 250 }} onChange={this.handleChange}>
                                            <Option value="a">a</Option>
                                            <Option value="b">b</Option>
                                            <Option value="c">c</Option>
                                        </Select>
                                    </div>
                                    <div style={{paddingTop:'15px'}}>
                                        <span style={{marginRight:'10px'}}>是否紧急</span><Switch onChange={this.urgentChange} style={{width:'70px'}}/>
                                    </div>
                                    <div style={{paddingTop:'20px'}}>
                                        <Button onClick={this.hide} size="small" style={{left:'200px'}}>取消</Button>
                                        <Button disabled={this.state.checkSelectData} size="small" style={{left:'200px',marginLeft:'5px'}}>确认</Button>
                                    </div>
                                </div>
                            }
                            title="设置审批细节"
                            trigger="click"
                            visible={this.state.subVisible}
                            onVisibleChange={this.handleVisibleChange}
                            placement="topRight"
                        >
                            <Button key="submit" style={{left:'10px',background:'#0079FE',color:'white'}} >送审</Button>
                        </Popover>
                    ]}
                >
                    <div style={{height:550}}>
                        <CheckSpanModal
                            data={data}
                            record={this.props.record}
                        />
                    </div>
                </Modal>
                <a  href ="#" disabled={this.props.disabled}>录检</a>
            </span>
        )
    }
    /**实现Button返回，保存,送审功能 */
    handleKeep = () => {

    };
    handleSubmit = () => {

    };
    handleCancel = (e) => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    /**送审提交框所需要的函数 */
    // 提交Modal中是否紧急
    urgentChange(checked) {
        console.log(`switch to ${checked}`);
        this.setState({
            checkSwitchData:checked
        })
    }
    // 获取下拉框的内容
    handleChange(value) {
        console.log(value.length);
        if(value.length>0){
            this.setState({
                checkSelectData:false
            })
        }
    }
    handleVisibleChange = (subVisible) => {
        this.setState({ subVisible });
    };
    hide = () => {
        this.setState({
            subVisible: false,
        });
    };
    /**---------------------- */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */

}

export default CheckSpan;