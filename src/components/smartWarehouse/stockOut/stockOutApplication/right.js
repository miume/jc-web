import React from 'react';
import {Icon, Table} from "antd";
import FirePart from "./firePart";
import WetPart from "./wetPart";
import axios from 'axios';

class Right extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressData: [],
            outTypeData: []
        };
        this.search = this.search.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.getDeviceDept = this.getDeviceDept.bind(this);
        this.getOutTypeData = this.getOutTypeData.bind(this);
        this.getAddressData = this.getAddressData.bind(this);

        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '8%'
        },{
            title: '组号',
            key: 'groupNum',
            dataIndex: 'groupNum',
            width: '8%'
        },{
            title: '物料名称',
            key: 'matName',
            dataIndex: 'matName',
            width: '17%'
        },{
            title: '批号',
            key: 'metBatch',
            dataIndex: 'metBatch',
            width: '40%'
        },{
            title: '单位',
            key: 'measureUnit',
            dataIndex: 'measureUnit',
            width: '9%'
        },{
            title: '重量',
            key: 'weight',
            dataIndex: 'weight',
            width: '9%'
        },{
            title: '操作',
            key: 'id',
            dataIndex: 'id',
            width: '9%',
            render: (text) => {
                return <Icon type="close" className={'stock-out-icon'} onClick={() => this.props.delete(text)}/>
            }
        }]
    }

    render() {
        let {data,type,url} = this.props, {addressData,outTypeData,userId,deptCode,deptName} = this.state;
        return (
            <div style={{width: '50%',border: '1px solid #ccc',padding: 2}}>
                <Table columns={this.columns} pagination={false} dataSource={data} className={ type === 'fire' ? 'stock-out-fire-right-table' : 'stock-out-wet-right-table'}
                       bordered size={'small'} rowKey={record => record.id}/>
                <div className={'stock-out-right-apply'}>
                    {
                        type === 'fire' ?
                            <FirePart url={url} data={data} addressData={addressData} outTypeData={outTypeData} userId={userId} deptCode={deptCode} deptName={deptName}/> :
                            <WetPart url={url} data={data} addressData={addressData} outTypeData={outTypeData} userId={userId} deptCode={deptCode} deptName={deptName}/>
                    }
                </div>
            </div>
        )
    }

    componentDidMount() {
        const userId = JSON.parse(localStorage.getItem('menuList')) ? JSON.parse(localStorage.getItem('menuList')).userId : null;
        this.getDeviceDept(userId);
        this.getOutTypeData();
        this.getAddressData();
    }

    /**根据用户id获取部门*/
    getDeviceDept(userId) {
        axios.post(`${this.props.url.getDeviceDept}?userId=${userId}`).then((data) => {
            let res = data.data.data;
            this.setState({
                deptCode: res.code,
                deptName: res.name,
                userId
            })
        })
    }

    /**获取出库类别数据*/
    getOutTypeData() {
        axios.get(`${this.props.url.swmsBasicDeliveryTypeInfo}/getAll`).then((data) => {
            let res = data.data.data;
            this.setState({
                outTypeData: res
            })
        })
    }

    /**获取出库点数据*/
    getAddressData() {
        axios.get(`${this.props.url.swmsBasicDeliveryAddressInfo}/getAll`).then((data) => {
            let res = data.data.data;
            this.setState({
                addressData: res
            })
        })
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
}

export default Right;
