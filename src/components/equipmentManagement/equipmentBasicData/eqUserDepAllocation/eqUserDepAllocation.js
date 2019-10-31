import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";
import {message, Transfer} from "antd";
import axios from "axios";
import DepTree from "../../../BlockQuote/department";
import './eqUserDepAllocation.css'
class EqUserDepAllocation extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            mockData: [],
            targetKeys: [],
            depId:-1,
            transferLoading: true
        }
    }
    componentWillUnmount() {
        this.setState = () => {
            return ;
        }
    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        return (
            <div>
                <Blockquote menu={current.menuParent} name="设备部门用户分配" menu2='返回' returnDataEntry={this.returnDataEntry}
                            flag={1}/>
                <div className='equipment'>
                    <DepTree
                        key="depTree"
                        treeName={'所属部门'}
                        url={this.url}
                        getTableData={this.getTableData}
                    />
                    <div className='equipment-right'>
                        <Transfer
                            rowKey={record => record.userId}
                            style={{
                                height: '100%',
                            }}
                            listStyle={{
                                width: '45%',
                                height: '100%',
                                overflow: 'auto'
                            }}
                            dataSource={this.state.mockData}
                            showSearch
                            filterOption={this.filterOption}
                            targetKeys={this.state.targetKeys}
                            onChange={this.handleChange}
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

    /**获得表格数据*/
    getTableData = (params) => {
        if(params === undefined) {
            this.setState({
                loading: false
            })
        } else {
            const depId = params && params.deptId ? parseInt(params.deptId) : -1
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
                if (res && res.length) {
                    for(var i=0; i<res.length; i++){
                        res[i]['description'] = res[i].username
                        if(res[i].chosen){
                            targetKeys.push(res[i].userId)
                        }
                        mockData.push(res[i]);
                    }
                }
                this.setState({
                    mockData: mockData,
                    targetKeys: targetKeys,
                    depId:depId,
                    transferLoading: false
                });
            }).catch(() => {
                message.info('查询失败，请刷新下页面！')
            });
        }
    }
    /**返回数据录入页面 */
    returnDataEntry = () => {
        this.props.history.push({pathname: '/equipmentBasicData'});
    }
}
export default EqUserDepAllocation
