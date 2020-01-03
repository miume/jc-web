import React from 'react';
import axios from 'axios';
import {Button, Input, message, Modal, Select, Table} from 'antd';
import CancleButton from '../../../BlockQuote/cancleButton';
import SaveButton from '../../../BlockQuote/saveButton';
import NewButton from "../../../BlockQuote/newButton";

const {Option} = Select;

class Check extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            dataSource:[],
            checkStatus:0
        };

    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    render() {
        return (
            <span>
                {
                    this.props.flag===0?
                        <NewButton name='检验' className='fa fa-plus' handleClick={this.handleClick}/>
                        :<span className="blue" onClick={this.handleClick}>检验</span>
                }
                <Modal
                    title={this.props.flag===0?"批量检验":"检验"}
                    visible={this.state.visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="200px"
                    footer={[
                        <CancleButton key='back' handleCancel={this.cancel}/>,
                        <SaveButton key="define" handleSave={this.save} className='fa fa-check' />,
                    ]}
                >
                    <div>
                        <Select
                            className="repoQueryOutDaily_search_select"
                            onChange={this.selectChange}
                            value={this.state.checkStatus}
                        >
                            {
                                this.state.dataSource?this.state.dataSource.map(item => {
                                    return (
                                        <Option
                                            key={item.code} value={item.code}
                                        >
                                            {item.name}
                                        </Option>
                                    )
                                }):null
                            }
                        </Select>
                    </div>
                </Modal>
            </span>
        )
    }


    selectChange = (value,option) => {
        this.setState({
            checkStatus:value
        })
    }
    save = () => {
        if (this.props.flag===0){
            console.log(this.props.selectedRowKeys)
        }else{
            console.log(this.props.record.code)
        }
        this.props.getTableParams(undefined,this.props.tabKey)
        this.setState({
            visible:false
        })

    }
    cancel = () => {
        this.setState({
            visible:false
        })
    }
    /**通过id查询备注信息 */
    handleClick = () => {
        const dataSource = [{
            code:0,
            name:'待检'
        },{
            code:1,
            name:'合格'
        },{
            code:2,
            name:'不合格'
        },{
            code:3,
            name:'让步接收'
        }];

        this.setState({
            visible:true,
            dataSource:dataSource
        })
    }


}

export default Check;
