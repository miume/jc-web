import React from 'react';
import {Icon, Input, Select, Table} from "antd";
import Submit from "../../../BlockQuote/checkSubmit";
import NewButton from "../../../BlockQuote/newButton";

class Right extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.search = this.search.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.applySaveAndReview = this.applySaveAndReview.bind(this);

        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '9%'
        },{
            title: '分组号',
            key: 'groupNum',
            dataIndex: 'groupNum',
            width: '9%'
        },{
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '12%'
        },{
            title: '批号',
            key: 'batch',
            dataIndex: 'batch',
            width: '30%'
        },{
            title: '单位',
            key: 'unit',
            dataIndex: 'unit',
            width: '10%'
        },{
            title: '重量',
            key: 'weight',
            dataIndex: 'weight',
            width: '10%'
        },{
            title: '操作',
            key: 'id',
            dataIndex: 'id',
            width: '10%',
            render: (text) => {
                return <Icon type="close" className={'stock-out-icon'} onClick={() => this.props.delete(text)}/>
            }
        }]
    }

    render() {
        let {data} = this.props;
        return (
            <div style={{width: '50%'}}>
                <Table columns={this.columns} pagination={false} dataSource={data} className={'stock-out-right-table'}
                       bordered size={'small'} rowKey={record => record.id} scroll={{y:'52vh'}}/>
                <div style={{marginTop: 10}}>
                    <span>批次信息：</span>
                    <Input placeholder={'请输入批次信息'} style={{width: 200, marginRight: 10}} onChange={this.inputChange}/>
                    <NewButton name={'查询'} className={'fa fa-search'} handleClick={this.search}/>
                </div>
                <div className={'stock-out-flex'} style={{marginTop: 10}}>
                    <div>
                        <span>产线：</span>
                        <Select placeholder={'请选择产线'} style={{width: 110}} onChange={this.selectChange}></Select>
                    </div>
                    <div>
                        <span>出库点：</span>
                        <Select placeholder={'请选择出库点'} style={{width: 110}} onChange={this.selectChange}></Select>
                    </div>
                    <div>
                        <span>出库类别：</span>
                        <Select placeholder={'请选择出库类别'} style={{width: 110}} onChange={this.selectChange}></Select>
                    </div>
                    <Submit url={this.props.url} applySaveAndReview={this.applySaveAndReview}/>
                </div>
            </div>
        )
    }

    search() {

    }

    inputChange(e) {
        let tar = e.target, value = tar.value;
        this.setState({
            batch: value
        })
    }

    selectChange(value,option) {
        let name = option.props.name;
        this.setState({
            [name]: value
        })
    }

    /**送审*/
    applySaveAndReview(process,urgent) {
        console.log(process,urgent)
    }
}

export default Right;
