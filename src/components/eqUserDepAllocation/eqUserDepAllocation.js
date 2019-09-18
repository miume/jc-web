import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import {Col, message, Row,Transfer} from "antd";
import axios from "axios";
import DepTree from "./depTree";
import './eqUserDepAllocation.css'
class EqUserDepAllocation extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            mockData: [],
            targetKeys: [],
            depId:-1
        }
    }

    // componentDidMount() {
    //     //this.fetch()
    //     //this.getMock();
    // }

    render() {

        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        const menus = JSON.parse(localStorage.getItem('menus'))

        return (

            <div>
                <Blockquote menu={current.menuParent} name="设备工序分配" menu2='返回' returnDataEntry={this.returnDataEntry}
                            flag={1}/>
                <div  style={{padding: '15px',display:"flex"}}>
                    <div className="eqUserDep-left">
                        <DepTree
                            key="depTree"
                            url={this.url}
                            getTableData={this.getTableData}
                        />
                    </div>
                    <div style={{width:'25px'}}>

                    </div>
                    <div className="eqUserDep-right">
                        <Transfer
                            rowKey={record => record.userId}
                            listStyle={{
                                width: '38%',
                                height: 505,
                            }}
                            dataSource={this.state.mockData}
                            showSearch
                            filterOption={this.filterOption}
                            targetKeys={this.state.targetKeys}
                            onChange={this.handleChange}
                            onSearch={this.handleSearch}
                            render={item => item.username}
                            titles={['未被分配用户','已被分配用户']}
                            locale={{
                                itemUnit: '项', itemsUnit: '项', searchPlaceholder: '请输入搜索内容'
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

    handleChange = targetKeys => {
        axios({
            type:'json',
            url: `${this.url.appUserAuth.assign}`,
            method: 'put',
            headers: {
                'Authorization':this.url.Authorization
            },
            params: {
                deptCode:this.state.depId
            },
            data:targetKeys
        }).then((data) => {
            if (data.data.code===0) {
                this.setState({
                    targetKeys: targetKeys
                },()=>{
                    message.info('分配成功！')
                });
            } else {
                message.info('分配失败')
            }
        })

    };

    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };

    /**获得表格数据*/
    getTableData = (params) => {
        console.log(params)
        const depId = parseInt(params.secondDeptId)
        console.log(depId)
        axios({
            url: `${this.url.appUserAuth.getUser}`,
            method: 'get',
            headers: {
                'Authorization':this.url.Authorization
            },
            params: {
                deptCode:depId
            },
        }).then((data) => {
            var res = data.data.data ? data.data.data : [];
            const targetKeys = [];
            const mockData = [];
            if (res) {
                console.log(res)
                for(var i=0; i<res.length; i++){
                    res[i]['description'] = res[i].username
                    if(res[i].chosen){
                        targetKeys.push(res[i].userId)
                    }
                    mockData.push(res[i]);
                }
                this.setState({
                    mockData: mockData,
                    targetKeys: targetKeys,
                    depId:depId
                },()=>{
                    message.info('查询成功！')
                });
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    mockData: [],
                    targetKeys: [],
                    depId:depId
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });

    }
    /**返回数据录入页面 */
    returnDataEntry = () => {
        this.props.history.push({pathname: '/equipmentBasicData'});
    }
}
export default EqUserDepAllocation