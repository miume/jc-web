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
        }
    }

    componentDidMount() {
        //this.fetch()
        this.getMock();
    }

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
                            rowKey={record => record.code}
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
                            render={item => item.name}
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
    getMock = () => {
        const targetKeys = [];
        const mockData = [];
        var data = [];
        for (let i = 0; i < 20; i++) {
            data.push({
                code: i,
                name: `content${i}`,
                description: `content${i}`,
                chosen: (i)%2===0?1:0,
            })
        }
        for (var i=0;i<data.length;i++){
            if(data[i].chosen===1){
                targetKeys.push(data[i].code)
            }
            mockData.push(data[i]);
        }

        this.setState({ mockData, targetKeys });
    };
    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

    handleChange = targetKeys => {
        this.setState({ targetKeys });
        console.log(targetKeys)
        console.log('abc')
    };

    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };

    /**获得表格数据*/
    getTableData = (params) => {
        console.log(params)

    }
    /**返回数据录入页面 */
    returnDataEntry = () => {
        this.props.history.push({pathname: '/equipmentBasicData'});
    }
}
export default EqUserDepAllocation