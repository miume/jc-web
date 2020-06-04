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
        this.getOutTypeData = this.getOutTypeData.bind(this);
        this.getAddressData = this.getAddressData.bind(this);

        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '7%'
        },{
            title: '组号',
            key: 'group',
            dataIndex: 'group',
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
            width: '42%'
        },{
            title: '单位',
            key: 'measureUnit',
            dataIndex: 'measureUnit',
            width: '8%'
        },{
            title: '重量',
            key: 'weight',
            dataIndex: 'weight',
            width: '10%'
        },{
            title: '操作',
            key: 'id',
            dataIndex: 'id',
            width: '8%',
            render: (text) => {
                return <Icon type="close" className={'stock-out-icon'} onClick={() => this.props.delete(text)}/>
            }
        }]
        this.columns1 = this.columns.slice(0,1).concat(this.columns.slice(2))
    }

    render() {
        let {data,type,url,reset} = this.props, {addressData,outTypeData,userId,deptCode,deptName} = this.state;
        let columns = type === 'fire' ? this.columns : this.columns1;
        return (
            <div style={{width: '50%',border: '1px solid #ccc',padding: 2}}>
                <Table columns={columns} pagination={false} dataSource={data} className={ type === 'fire' ? 'stock-out-fire-right-table' : 'stock-out-wet-right-table'}
                       bordered size={'small'} rowKey={record => record.id}/>
                <div className={'stock-out-right-apply'}>
                    {
                        type === 'fire' ?
                            <FirePart url={url} data={data} addressData={addressData} outTypeData={outTypeData} userId={userId} deptCode={deptCode} deptName={deptName} reset={reset}/> :
                            <WetPart url={url} data={data} addressData={addressData} outTypeData={outTypeData} userId={userId} deptCode={deptCode} deptName={deptName} reset={reset}/>
                    }
                </div>
            </div>
        )
    }

    componentDidMount() {
        const menuList = JSON.parse(localStorage.getItem('menuList')), userId = menuList.userId ? menuList.userId : null,
            deptId = menuList.deptId ? menuList.deptId : null, deptName = menuList.detpName ? menuList.detpName : '';
        this.setState({
            deptCode: deptId,
            deptName: deptName,
            userId
        });
        this.getOutTypeData();
        this.getAddressData();
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

    /**根据火法1或湿法0获取出库点数据*/
    getAddressData() {
        let type = this.props.type === 'fire' ? 1 : 0;
        axios.get(`${this.props.url.swmsBasicDeliveryAddressInfo}/getByType?type=${type}`).then((data) => {
            let res = data.data.data;
            this.setState({
                addressData: res
            })
        })
    }
}

export default Right;
