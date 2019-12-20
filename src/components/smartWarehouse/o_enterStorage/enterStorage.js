import React from 'react';
import {Tabs} from 'antd';
import BlockQuote from '../../BlockQuote/blockquote';
import  RowMaterialStorage from './rowMaterialStorage/rowMaterialStorage';
import ProductInStorage from './productInStorge/productInStorage';
import axios from "axios";
const TabPane=Tabs.TabPane;
class EnterStorage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    render(){
        this.url=JSON.parse(localStorage.getItem('url'));
        let {loading,dataSource} = this.state;
        return(
           <div>
                <BlockQuote name='入库管理' menu='智能仓库'/>
                <Tabs defaultActiveKey='1' onChange={this.handleChange}>
                 {/* //tab是选项卡头显示文字,key是对应activekey，activekey是当前激活 tab 面板的 key */}
                 <TabPane tab={<span><i className='fa fa-tint'></i>&nbsp; 原材料入库</span>} key='1'>
                    <RowMaterialStorage type={1} dataSource={dataSource}
                                        getTableData={this.getTableData} loading={loading}/>
                 </TabPane>
                 <TabPane tab={<span><i className='fa fa-industry'></i>&nbsp; 成品入库</span>} key='2'>
                     <RowMaterialStorage type={3} dataSource={dataSource}  loading={loading}
                                         getTableData={this.getTableData}/>
                 </TabPane>
               </Tabs>
            </div>

        );
    }

    componentDidMount() {
        this.getTableData()
    }

    /**切换tabs*/
    handleChange(key){
        this.setState({
            outType: key
        });
        if(parseInt(key) ===1) {
            //原材料入库记录
            this.getTableData({
                outType: key
            });
        } else {
            //成品入库记录
            this.getTableData({
                outType: key
            });
        }
    }

    /**获取表格数据*/
    getTableData(params = {}) {
        params['orderBy'] = 'id';
        params['orderType'] = 'DESC';
        params['outType'] = params['outType'] ? params['outType'] : this.state.outType;
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.enterStorage.enterStorage}`,
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
                    dataSource: res.records
                })
            }
            this.setState({
                loading: false
            })
        })
    }

    componentWillUnmount() {
        this.setState(() =>{
            return;
        })
    }
}
export default  EnterStorage;
