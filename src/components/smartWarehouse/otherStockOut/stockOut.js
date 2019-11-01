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
    url
    componentDidMount(){
        this.apply(1);
    }
    componentWillUnmount(){
        this.setState=()=>{
            return;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            applyDataSource : [],
            type:1,
            recordDataSource:[],
            loading: true
        }
        this.url = JSON.parse(localStorage.getItem('url'));
        this.handleChange = this.handleChange.bind(this);
        this.apply = this.apply.bind(this);
        this.outCheck = this.outCheck.bind(this);
    }
    handleChange(key){
        const outClass = key.split('-')[0];
        const type = key.split('-')[1];
        this.setState({
            type:type
        },()=>{
            if(parseInt(outClass) ===1){
                this.apply();    //出库申请
            }else{
                this.outCheck(); //出库记录
            }
        })
    }
    /**申请出库 */
    apply(params){
        axios({
            url: `${this.url.stockOut.getAllStockByPage}`,
            method: 'get',
            headers:{
            'Authorization': this.url.Authorization
          },
           params: {
               ...params,
               materialClass:this.state.type,
           },
          }).then((data) => {
            const res = data.data.data;
            if(res){
                for(var i = 1; i<=res.length; i++){
                    var li = res[i-1];
                    li['index'] = i;
                }
                res['total'] = res.total;
            }
            this.setState({
                applyDataSource: data1,
                loading: false
            });
          });
    }
    /**出库记录 */
    outCheck(params){
        axios({
            url:`${this.url.stockOut.repoOutApply}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                ...params,
                type:this.state.type,
            }
        }).then((data)=>{
            const res = data.data.data;
            var out = [],selectedRowKeys=[];
            if(res&&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    var li = res.list[i-1];
                    var status = li.commonBatchNumber.status,id = li.commonBatchNumber.id;
                    out.push({
                        id:id,
                        index:res.prePage*10+i,
                        batchNumber:li.commonBatchNumber.batchNumber,
                        createPersonName:li.createPersonName,
                        createTime:li.commonBatchNumber.createTime,
                        status:status,
                        isUrgent:li.commonBatchNumber.isUrgent,
                    })
                    if(status===2||status===3) selectedRowKeys.push(id);
                }
            }
            this.setState({
                recordDataSource: out,
                selectedRowKeys:selectedRowKeys,
                loading: false
            });
        })
    }
    render(){
        const current = JSON.parse(localStorage.getItem('current'));
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <Tabs defaultActiveKey='1-1' onChange={this.handleChange} >
                    <TabPane key='1-1' tab={<span><i className="fa fa-leaf" aria-hidden="true"></i> &nbsp;原材料出库申请</span>}>
                        <RawMaterialApplication index={1} url={this.url} data={this.state.applyDataSource} fetch={this.apply} loading={this.state.loading}/>
                    </TabPane>
                    <TabPane key='1-3' tab={<span><i className="fa fa-cube" aria-hidden="true"></i> &nbsp;成品出库申请</span>}>
                        <RawMaterialApplication index={2} url={this.url}  data={this.state.applyDataSource} fetch={this.apply} loading={this.state.loading}/>
                    </TabPane>
                    <TabPane key='2-1' tab={<span><i className="fa fa-leaf" aria-hidden="true"></i> &nbsp;原材料出库记录</span>}>
                        <RawMaterialOut index={3} url={this.url} data={this.state.recordDataSource} fetch={this.outCheck} keys={this.state.selectedRowKeys} loading={this.state.loading}/>
                    </TabPane>
                    <TabPane key='2-3' tab={<span><i className="fa fa-cube" aria-hidden="true"></i> &nbsp;成品出库记录</span>}>
                        <RawMaterialOut index={4} url={this.url} data={this.state.recordDataSource} fetch={this.outCheck} keys={this.state.selectedRowKeys} loading={this.state.loading}/>
                     </TabPane>
                </Tabs>

            </div>
        );
    }
}
export default OtherStockOut;
