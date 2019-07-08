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
                        <DepTree/>
                    </div>
                    {/*右边页面部分*/}
                    <div className="eA-right">
                       <EARight/>
                    </div>
                </div>
            </div>
        )
    }
}

export default EquipmentArchive