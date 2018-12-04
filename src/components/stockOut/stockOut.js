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
    componentDidMount(){
        this.fetch();
    }
    // componentWillUnmount(){
    //     this.setState=()=>{
    //         return;
    //     }
    // }
    constructor(props){
        super(props);
        this.state = {
            dataSource : [],
            type : 1
        }
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');
        this.handleChange = this.handleChange.bind(this);
    }
    fetch = (params = {}) => {
        axios({
          url: `${this.server}/jc/common/repoOutApply/getAllByNameLikeAndTypeByPage`,
          method: 'get',
          headers:{
          'Authorization': this.Authorization
        },
         params: {
             ...params,
             type:this.state.type,
         },
        }).then((data) => {
          const res = data.data.data;
        //   console.log(res.list)
          this.setState({
            dataSource: res.list,
          });
        });
      }
    /**监控切换面板的key */
    handleChange(key){
        const type = key.split('-')[1];
        console.log(type)
    }
    render(){
        return (
            <div>
                <BlockQuote name='出库管理' menu='智能仓库'></BlockQuote>
                <Tabs defaultActiveKey='1-1' onChange={this.handleChange}>
                <TabPane key='1-1' tab={<span><i className="fa fa-leaf" aria-hidden="true"></i> &nbsp;原材料出库申请</span>}><RawMaterialApplication dataSource={this.state.dataSource} /></TabPane>
                    <TabPane key='2-3' tab={<span><i className="fa fa-cube" aria-hidden="true"></i> &nbsp;产品出库申请</span>}><RawMaterialApplication dataSource={this.state.dataSource} /></TabPane>
                    <TabPane key='3-1' tab={<span><i className="fa fa-leaf" aria-hidden="true"></i> &nbsp;原材料出库记录</span>}><RawMaterialOut dataSource={this.state.dataSource}/></TabPane>
                    <TabPane key='4-3' tab={<span><i className="fa fa-cube" aria-hidden="true"></i> &nbsp;产品出库记录</span>}><RawMaterialOut dataSource={this.state.dataSource}/></TabPane>
                </Tabs>
                
            </div>
        );
    }
}
export default StockOut;