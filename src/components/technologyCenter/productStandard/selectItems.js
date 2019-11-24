import React from 'react';
import {Checkbox, Col, Modal} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import NewButton from "../../BlockQuote/newButton";
import AddModal from './addModal';
import axios from "axios";

class SelectItems extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            selectAllItems: [],
            allTestItem: [],
            testItems: [],
            // checkAll: true
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.selectTestItem = this.selectTestItem.bind(this);
        this.getAllTestItem = this.getAllTestItem.bind(this);
        this.dataProcessing = this.dataProcessing.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
        this.onCheckAllChange = this.onCheckAllChange.bind(this);
    }

    render(){
        let {selectTestItems,allTestItem,visible,selectAllItems} = this.state, {data,url,type} = this.props;
        return (
            <span>
                {this.renderButton(type)}
            <Modal
                title="选择检测项目" visible={visible} closable={false} centered={true}
                maskClosable={false}
                footer={this.renderFooter(type,url,data)}
            >
                <div>
                    <Checkbox onChange={this.onCheckAllChange} checked={!selectTestItems || selectTestItems.length === selectAllItems.length ? true : false}>全选</Checkbox>
                    <br />
                    <Checkbox.Group style={{width: "100%"}} value = {selectTestItems} onChange={this.checkboxChange}>
                        {
                            allTestItem ? allTestItem.map(p =>
                                <Col key={p.id} span={8}>
                                    <Checkbox value={p.form}>{p.name}</Checkbox>
                                </Col>):null
                        }
                    </Checkbox.Group>
                </div>
            </Modal>
            </span>
        )
    }

    renderButton(type) {
        if(type === 'reSelect') {
            return <NewButton name={'重新选择'}  handleClick={this.handleAdd}/>
        }
        return <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus'/>
    }

    handleAdd() {
        this.getAllTestItem();
        this.setState({
            visible: true
        })
    }

    /**获取所有项目*/
    getAllTestItem() {
        axios({
            url: `${this.props.url.testItems.testItems}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            const res = data.data.data;
            if (res) {
                this.dataProcessing(res);
            }
        })
    }

    /**对数据进行处理 */
    dataProcessing(data) {
        let option = [],{selectTestItems} = this.props;
        for (let i = 0; i < data.length; i++) {
            data[i]['value'] = '';
            data[i]['form'] = data[i].id + '-' + data[i].name + '-' + data[i].unit + '-' + data[i].value;
            data[i]['check'] = true;
            option.push(data[i]['form'])
        }
        this.setState({
            selectAllItems: option,
            allTestItem: data,
            selectTestItems: selectTestItems ? selectTestItems : option
        })
    }

    checkboxChange(value) {
        this.setState({
            selectTestItems: value
        })
    }

    /**全选或全不选*/
    onCheckAllChange(e) {
        let target = e.target;
        this.setState({
            checkAll: target.checked,
            selectTestItems: target.checked ? this.state.selectAllItems : []
        })
    }

    handleCancel() {
        this.setState({
            visible: false
        })
    }

    selectTestItem() {
        this.setState({
            visible: false
        });
        let {selectTestItems} = this.state,{testItems} = this.props;
        if(!testItems) {
            testItems = []
            for (let i = 0; i < selectTestItems.length; i++) {
                let form = selectTestItems[i].split('-');
                testItems.push({
                    id: parseInt(form[0]),
                    name: form[1],
                    unit: form[2],
                    count: form[3],
                    index: i + 1
                })
            }
            return {testItems,selectTestItems};
        } else {
            let temp = [];
            for (let i = 0; i < selectTestItems.length; i++) {
                let form = selectTestItems[i].split('-'),
                    filterItems = testItems.filter(e => e.id === parseInt(form[0]));
                if(filterItems.length) {
                    temp.push(filterItems[0])
                } else {
                    temp.push({
                        id: parseInt(form[0]),
                        name: form[1],
                        unit: form[2],
                        count: form[3]
                    })
                }
                for(let i = 0; i < temp.length; i++) {
                    temp[i]['index'] = i + 1;
                }
                this.props.reSelectItems(temp,selectTestItems)
            }
    }}

    renderFooter(type,url,data) {
        if(type === 'reSelect') {
            return [
                <CancleButton key='cancle' handleCancel={this.handleCancel} flag={1}/>,
                <NewButton key='submit' handleClick={this.selectTestItem} name={'选择'} className='fa fa-level-up'/>
            ]
        }
        return [
            <CancleButton key='cancle' handleCancel={this.handleCancel} flag={1}/>,
            <AddModal key='submit' selectTestItem={this.selectTestItem} url={url} data={data} getAllProductStandard={this.props.getAllProductStandard}/>
        ]
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}
export default SelectItems;
