import React from 'react';
import { Input,Button,Table,Radio } from 'antd';
import '../Home/page.css';

class CheckEditModal extends React.Component {
    state = {
        topData : [],
    };
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        align:'center',
    },{
        title: '批号',
        dataIndex: 'a',
        key: 'a',
        align:'center',
    }];
    render() {
        return(
            <div style={{paddingTop:'10px'}}>
                <div>
                    <table style={{float:'left',align:'center'}} border="1">
                        <thead>
                            <tr>
                                <th>原材料</th>
                                <th>规格</th>
                                <th>数量</th>
                                <th>到货日期</th>
                                <th>生产厂家</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/*<td><Input size="small" placeholder="small size" style={{ width: 100,border:0 }} /></td>*/}
                                <td><input placeholder="原材料名称" style={{ width: 130,border:0 }}></input></td>
                                <td><input placeholder="请输入规格" style={{ width: 130,border:0 }}></input></td>
                                <td><input placeholder="请输入数量" style={{ width: 130,border:0 }}></input></td>
                                <td><input placeholder="请输入到货日期" style={{ width: 130,border:0 }}></input></td>
                                <td><input placeholder="请输入生产厂家" style={{ width: 130,border:0 }}></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <Button size="large" style={{float:'left',marginLeft:20}}>待定</Button>
                    <table style={{float:'right',marginTop:'20px'}} >
                        <tbody>
                            <tr>
                                <td>检验人:</td>
                                <td>周小伟</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{paddingTop:'50px'}}>
                    <Table

                    />
                </div>
            </div>
        )
    }
}

export default CheckEditModal;