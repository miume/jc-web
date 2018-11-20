import React from 'react';
import { Input,Button,Table,Radio } from 'antd';
import '../Home/page.css';

const data = [{
    index:'1',
    id: '32',
    a: 'a',
    Ca: '启动',
    Fe: 'c',
    Na: 'd',
    Si: 'e',
    Li: 'f',
    Al: '无',
    Mg: '无',
},{
    index:'2',
    id: '33',
    a: 'a',
    Ca: '启动',
    Fe: 'c',
    Na: 'd',
    Si: 'e',
    Li: 'f',
    Al: '无',
    Mg: '无',
},{
    index:'3',
    id: '34',
    a: 'a',
    Ca: '启动',
    Fe: 'c',
    Na: 'd',
    Si: 'e',
    Li: 'f',
    Al: '无',
    Mg: '无',
}];

class PurchaseModal extends React.Component {
    state = {
        columns: [],
        dataSource: data,
    };
    columns = [];
    render() {
        /**动态表头数据获取与组装 */
        const dynHeadData =this.assembleDynamicData(this.getDynamicHeadData());
        //获取滚动条的x轴大小
        const arrColumnslength = parseInt(dynHeadData.length*150 + 300);
        const totalColumns = this.assembleTableHead(dynHeadData);

        /**---------------------- */
        this.columns = totalColumns;

        const columns = this.columns.map((col) => {
            return {
                ...col,
                onCell: record => ({
                    record,
                    // editable: col.editable,
                    // dataIndex: col.dataIndex,
                    // title: col.title,
                    // handleSave: this.handleSave,
                }),
            };
        });
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
                <div style={{paddingTop:'80px'}}>
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.state.dataSource}
                        data
                        size="small"
                        bordered
                        pagination={{hideOnSinglePage:true,pageSize:1000}}
                        scroll={{ x:arrColumnslength, y: 240 }}
                    />
                </div>
            </div>
        )
    }
    /**动态表头数据获取与组装 */
    getDynamicHeadData = () => {
        const dyHead = [{
            name: 'Ca',
            symbol: '%',
            area: '>=20.00'
        },{
            name: 'Fe',
            symbol: '%',
            area: '>=20.00'
        },{
            name: 'Na',
            symbol: '%',
            area: '>=20.00'
        },{
            name: 'Si',
            symbol: '%',
            area: '>=20.00'
        },{
            name: 'Li',
            symbol: '%',
            area: '>=20.00'
        },{
            name: 'Al',
            symbol: '%',
            area: '>=20.00'
        },{
            name: 'Mg',
            symbol: '%',
            area: '>=20.00'
        }];
        return dyHead;
    };
    assembleDynamicData = (dataArr) => {
        const colums = [];
        const length = dataArr.length;
        for(var i=0; i<length-1; i++) {
            const headData = {
                title: '',
                align:'center',
                children: [{
                    title: '',
                    align:'center',
                    children: [{
                        title: '',
                        dataIndex: '',
                        key: '',
                        align:'center',
                        width: 150,
                    }]
                }]
            };
            headData.title = dataArr[i].name;
            headData.children[0].title = dataArr[i].symbol;
            headData.children[0].children[0].title = dataArr[i].area;
            headData.children[0].children[0].dataIndex = dataArr[i].name;
            headData.children[0].children[0].key = dataArr[i].name;
            colums.push(headData);
        }
        // 动态列的时候 动态中的最后一列不能设置width
        const endArrData = {
            title: dataArr[length-1].name,
            align:'center',
            children: [{
                title: dataArr[length-1].symbol,
                align:'center',
                children: [{
                    title: dataArr[length-1].area,
                    dataIndex: dataArr[length-1].name,
                    key: dataArr[length-1].name,
                    align:'center',
                }]
            }]
        };
        colums.push(endArrData);

        // for(var v of dataArr){
        //     console.log('v:',v);
        //     const headData = {
        //         title: '',
        //         align:'center',
        //         children: [{
        //             title: '',
        //             align:'center',
        //             children: [{
        //                 title: '',
        //                 dataIndex: '',
        //                 key: '',
        //                 align:'center',
        //                 width: '10%',
        //             }]
        //         }]
        //     };
        //     headData.title = v.name;
        //     headData.children[0].title = v.symbol;
        //     headData.children[0].children[0].title = v.area;
        //     headData.children[0].children[0].dataIndex = v.name;
        //     headData.children[0].children[0].key = v.name;
        //     colums.push(headData);
        // }
        // console.log('colums:',colums);
        return colums;
    };
    assembleTableHead = (dynColums) => {
        const firstColumns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'id',
            align:'center',
            width: 100,
            fixed: 'left',
        },{
            title: '批号',
            dataIndex: 'a',
            key: 'a',
            align:'center',
            width: 100,
            fixed: 'left',
        }];
        const endColumns = [{
            title: '判定',
            key: 'operation',
            align:'center',
            width: 100,
            fixed: 'right',
            render: (text,record) => {
                return (
                    <span>
                        <Radio.Group buttonStyle="solid" size="small" >
                            <Radio.Button value="pass" style={{border:0}}>合格</Radio.Button>
                            <Radio.Button value="nopass" style={{border:0}}>不合格</Radio.Button>
                        </Radio.Group>
                    </span>
                )
            }
        }];
        const columns = [...firstColumns,...dynColums,...endColumns];
        // console.log('table',columns);
        return columns;
    };
    /**---------------------- */
}

export default PurchaseModal;