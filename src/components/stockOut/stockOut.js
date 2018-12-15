import React from 'react';
import {Tabs} from 'antd';
import axios from 'axios';
import BlockQuote from '../BlockQuote/blockquote';
import RawMaterialApplication from './rawMaterialApplication/rawMaterialApplication';
import RawMaterialOut from './rawMaterialApplication/rawMaterialOut';
const TabPane = Tabs.TabPane;
class StockOut extends React.Component{
    Authorization
    server
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
            recordDataSource:[]
        }
        this.url = JSON.parse(localStorage.getItem('url')); 
        this.server = localStorage.getItem('remote');
        this.Authorization = localStorage.getItem('Authorization');
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
            'Authorization': this.Authorization
          },
           params: {
               ...params,
               materialClass:this.state.type,
           },
          }).then((data) => {
            const res = data.data.data;
            console.log(res)
            if(res&&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    var li = res.list[i-1];
                    li['index'] = res.prePage*10+i
                }
                res.list['total'] = res.total;
                // console.log(res.list)
                this.setState({
                    applyDataSource: res.list,
                });
            }
          });
    }
    /**出库记录 */
    outCheck(params){
        axios({
            url:`${this.url.stockOut.repoOutApply}`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                ...params,
                type:this.state.type,
            }
        }).then((data)=>{
            const res = data.data.data;
            var out = []
            if(res&&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    var li = res.list[i-1];
                    out.push({
                        id:li.commonBatchNumber.id,
                        index:res.prePage*10+i,
                        batchNumber:li.commonBatchNumber.batchNumber,
                        createPersonName:li.createPersonName,
                        createTime:li.commonBatchNumber.createTime,
                        status:li.commonBatchNumber.status,
                        isUrgent:li.commonBatchNumber.isUrgent,
                    })
                }
                res.list['total'] = res.total;
            }
            this.setState({
                recordDataSource: out,
            });
        })
    }
    render(){
        const current = JSON.parse(localStorage.getItem('current'));
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <Tabs defaultActiveKey='1-1' onChange={this.handleChange} >
                    <TabPane key='1-1' tab={<span><i className="fa fa-leaf" aria-hidden="true"></i> &nbsp;原材料出库申请</span>}><RawMaterialApplication index={1} url={this.url} data={this.state.applyDataSource} Authorization={this.Authorization} server={this.server} fetch={this.apply}/></TabPane>
                    <TabPane key='1-3' tab={<span><i className="fa fa-cube" aria-hidden="true"></i> &nbsp;产品出库申请</span>}><RawMaterialApplication index={2} url={this.url}  data={this.state.applyDataSource} fetch={this.apply} Authorization={this.Authorization} server={this.server} /></TabPane>
                    <TabPane key='2-1' tab={<span><i className="fa fa-leaf" aria-hidden="true"></i> &nbsp;原材料出库记录</span>}><RawMaterialOut index={3} url={this.url} data={this.state.recordDataSource} Authorization={this.Authorization} server={this.server} fetch={this.outCheck}/></TabPane>
                    <TabPane key='2-3' tab={<span><i className="fa fa-cube" aria-hidden="true"></i> &nbsp;产品出库记录</span>}><RawMaterialOut index={4} url={this.url} data={this.state.recordDataSource} Authorization={this.Authorization} server={this.server} fetch={this.outCheck}/></TabPane>
                </Tabs>
                
            </div>
        );
    }
}
export default StockOut;