import React, {Component} from 'react';
import {Divider} from 'antd';
import DepTree from './depTree/depTree';
import Blockquote from '../BlockQuote/blockquote';
import './equipmentArchive.css'
import EARight from './right/eARight'


/**
 * 模块名称：设备管理-设备档案
 * 创建人：方乐
 * 时间：2019-7-2
 */
class EquipmentArchive extends Component {
    // 结构化，获取传入的参数
    constructor(props) {
        super(props);
        this.state = {
            rightTopData: [],
            rightTableData: [],
            depKey: 0
        };
        this.getRightData = this.getRightData.bind(this);
        this.getTableData = this.getTableData.bind(this)

    }

    // 页面渲染
    render() {
        const current = JSON.parse(localStorage.getItem('current'));
        // 页面UI架构
        return (
            <div>
                <Blockquote menu={current.menuParent} name={current.menuName}/>
                <div style={{padding: '15px'}} className="eA">
                    {/*左边树结构部分*/}
                    <div className="eA-left">
                        <DepTree
                            getDepKey={this.getRightData}
                        />
                    </div>
                    {/*右边页面部分*/}
                    <div className="eA-right">
                        <EARight
                            depKey={this.state.depKey}
                            rightTopData={this.state.rightTopData}
                            rightTableData={this.state.rightTableData}
                            getTableData={this.getTableData}
                        />
                    </div>
                </div>
            </div>
        )
    }

    getRightData = (key) => {
        // TODO 根据部门的key，调用接口，获得右边数据
        const rightTopData = [
            {
                key: 1,
                name: "反应弧",
                count: 11
            }, {
                key: 2,
                name: "计量类",
                count: 30
            }
        ];
        // TODO 同时获取第一个key的数据
        this.getTableData(key, rightTopData ? rightTopData[0].key : null);
        this.setState({
            rightTopData: rightTopData,
            depKey: key
        })
    };

    getTableData = (depKey, key) => {
        console.log(key)
        if (key && depKey) {
            // TODO 调用接口，获得表格数据
            const rightTableData = [{
                code: 3,
                fixedassetsCode: '10102133',
                deviceName: '反应弧2',
                specification: 'ABC-1231',
                startdate: '2019/6/14',
                statusCode: 0
            }, {
                code: 4,
                fixedassetsCode: '10102155',
                deviceName: '计量勒22',
                specification: 'ABC-1232',
                startdate: '2019/6/14',
                statusCode: 1
            }];
            this.setState({
                rightTableData: rightTableData,
            })
        } else {
            this.setState({
                rightTableData: [],
            })
        }
    }
}

export default EquipmentArchive