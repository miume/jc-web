import React from 'react';
import {Tabs} from 'antd';
import axios from 'axios';
import BlockQuote from '../../BlockQuote/blockquote';
import RawMaterialApplication from './rawMaterialApplication/rawMaterialApplication';
import RawMaterialOut from './rawMaterialApplication/rawMaterialOut';
import './stockOut.css';

const TabPane = Tabs.TabPane;
const data1 = [{
    index: 1,
    materialClass: 1,
    materialName: "Fe",
    realWeight: null,
    serialNumber: "MC/BN180808-WS001-RAW(TS)-Fe-0101-QDBX-60KG",
    weight: 90,
},{
    index: 2,
    materialClass: 1,
    materialName: "锂",
    realWeight: null,
    serialNumber: "MC/BN190801-WS001-RAW(YS)-锂-0102-QDBX-60KG",
    weight: 90
},{
    index: 3,
    materialClass: 1,
    materialName: "K",
    realWeight: null,
    serialNumber: "MC/BN180808-WS001-RAW(TS)-K-0102-QDBX-60KG",
    weight: 90
}, {
    index: 4,
    materialClass: 1,
    materialName: "Fe2",
    realWeight: null,
    serialNumber: "MC/BN180808-WS001-RAW(YS)-Fe2-0103-QDBX-60KG",
    weight: 90
},{
    index: 5,
    materialClass: 1,
    materialName: "SO4",
    realWeight: null,
    serialNumber: "MC/BN190801-WS001-RAW(YS)-SO4-0102-QDBX-60KG",
    weight: 90
},{
    index: 6,
    materialClass: 1,
    materialName: "H2",
    realWeight: null,
    serialNumber: "MC/BN180808-WS001-RAW(TS)-H2-0102-QDBX-60KG",
    weight: 90
}, {
    index: 7,
    materialClass: 1,
    materialName: "O2",
    realWeight: null,
    serialNumber: "MC/BN180808-WS001-RAW(YS)-O2-0103-QDBX-60KG",
    weight: 90
}];
class OtherStockOut extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            dataSource : [],
            outType: 1,
            recordDataSource:[],
            loading: true
        };
        this.url = JSON.parse(localStorage.getItem('url'));
        this.handleChange = this.handleChange.bind(this);
        this.getApplyTableData = this.getApplyTableData.bind(this);
        this.getStockOutData = this.getStockOutData.bind(this);
    }

    render(){
        const current = JSON.parse(localStorage.getItem('current'));
        let {outType,dataSource,loading,recordDataSource,selectedRowKeys} = this.state;
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <Tabs defaultActiveKey='1-1' onChange={this.handleChange} >
                    <TabPane key='1-1' tab={<span><i className="fa fa-leaf" aria-hidden="true"></i> &nbsp;原材料出库申请</span>}>
                        <RawMaterialApplication index={1} url={this.url} data={dataSource} fetch={this.getApplyTableData}
                                                loading={loading} outType={outType}/>
                    </TabPane>
                    <TabPane key='1-3' tab={<span><i className="fa fa-cube" aria-hidden="true"></i> &nbsp;成品出库申请</span>}>
                        <RawMaterialApplication index={2} url={this.url} data={dataSource} fetch={this.getApplyTableData}
                                                loading={loading} outType={outType}/>
                    </TabPane>
                    <TabPane key='2-1' tab={<span><i className="fa fa-leaf" aria-hidden="true"></i> &nbsp;原材料出库记录</span>}>
                        <RawMaterialOut index={3} url={this.url} data={recordDataSource} fetch={this.getStockOutData} keys={selectedRowKeys} loading={loading}/>
                    </TabPane>
                    <TabPane key='2-3' tab={<span><i className="fa fa-cube" aria-hidden="true"></i> &nbsp;成品出库记录</span>}>
                        <RawMaterialOut index={4} url={this.url} data={recordDataSource} fetch={this.getStockOutData} keys={selectedRowKeys} loading={loading}/>
                     </TabPane>
                </Tabs>
            </div>
        );
    }

    componentDidMount() {
        //获取原材料库存数据
        this.getApplyTableData();
    }

    /**切换tabs*/
    handleChange(key){
        const outClass = key.split('-')[0], outType = key.split('-')[1];
        this.setState({
            outType: outType
        });
        if(parseInt(outClass) ===1) {
            //出库申请
            this.getApplyTableData({
                outType: outType
            });
        } else {
            //出库记录
            this.getStockOutData({
                outType: outType
            });
        }
    }

    /**获取表格数据*/
    getApplyTableData(params = {}) {
        params['orderBy'] = 'id';
        params['orderType'] = 'DESC';
        params['status'] = 1;
        params['outType'] = params['outType'] ? params['outType'] : this.state.outType;
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.inventorManage.inventorManage}`,
            method: 'post',
            headers: {
                "Authorization": this.url.Authorization
            },
            data: params
        }).then(data => {
            let res = data.data;
            if(res && res.data) {
                for(let i = 0; i < res.data.length; i++) {
                    res.data[i]['index'] =  i + 1;
                }
                this.setState({
                    dataSource: res.data
                })
            }
            this.setState({
                loading: false
            })
        })
    }

    /**获取原材料或成品出库记录*/
    getStockOutData(params = {}) {
        params['orderBy'] = 'id';
        params['orderType'] = 'DESC';
        params['outType'] = params['outType'] ? params['outType'] : this.state.outType;
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.stockOut.pages}`,
            method: 'post',
            headers: {
                "Authorization": this.url.Authorization
            },
            data: params
        }).then(data => {
            let res = data.data.data;
            if(res && res.records) {
                for(let i = 0; i < res.records.length; i++) {
                    res.records[i]['index'] = (res.current - 1) * 10 + i + 1;
                }
                res.records['total'] = res.total;
                this.setState({
                    recordDataSource: res.records
                })
            }
            this.setState({
                loading: false
            })
        })
    }

    componentWillUnmount() {
        this.setState=()=>{
            return;
        }
    };
}
export default OtherStockOut;
