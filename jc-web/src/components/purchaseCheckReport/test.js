import React from 'react';
import { Input,Button,Table,Radio,Form,Popconfirm } from 'antd';
import '../Home/page.css';
import PurchaseModalColor from './purchaseModalColor';
import QualifiedJudge from './qualifiedJudge';
import './pack.css';
const data =[];
for (let i = 0; i < 5; i++) {
    data.push({
        index: i,
        id:i,
        a: 'a',
        Ca: '启动',
        Fe: 'c',
        Na: 'd',
        Si: 'e',
        Li: 'f',
        Al: '无',
        Mg: '无',
    });
}
class PurchaseModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            columns: [],
            dataSource: data,
            radioDataArr: [],  //id , purchaseStatus 构成数组 传给后台
            radioTrueArr: [],   //合格的数组--
            purchaseStatus: '待定', //显示判定，合格，不合格
            radioTrueNum: 0,
            radioFalseNum: 0,
            colorStatueId: [], //用来存储已经变红的标签id--转换成这一行

        };
        // this.radioChange = this.radioChange.bind(this);
    }

    render() {
        /**动态表头数据获取与组装 */
        const dynHeadData = this.assembleDynamicData(this.getDynamicHeadData());
        //获取滚动条的x轴大小
        const arrColumnslength = parseInt(dynHeadData.length*100 + 280);
        const totalColumns = this.assembleTableHead(dynHeadData);

        /**---------------------- */
        this.columns = totalColumns;
        //就没有获取到动态数据里的内容
        const columns = this.columns.map((col) => {
            return {
                ...col, //展开的，无前两级Ca,%的表头title
                onCell: record => ({
                    record,
                }),
            };
        });
        return(
            <div style={{paddingTop:'10px'}}>
                <div>
                    <table style={{float:'left',textAlign:'center',border:"1px solid gray",borderCollapse:'collapse',marginRight:'20px',marginTop:'5px'}} >
                        <thead>
                        <tr>
                            <th style={{background:'#0079FE', color:'white' ,fontSize:'14px' }}>原材料</th>
                            <th style={{background:'#0079FE', color:'white' ,fontSize:'14px' }}>规格</th>
                            <th style={{background:'#0079FE', color:'white' ,fontSize:'14px' }}>数量</th>
                            <th style={{background:'#0079FE', color:'white' ,fontSize:'14px' }}>到货日期</th>
                            <th style={{background:'#0079FE', color:'white' ,fontSize:'14px' }}>生产厂家</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="placeholder">
                            <td><input placeholder="原材料名称" style={{ width: 130,border:0}}></input></td>
                            <td><input placeholder="请输入规格" style={{ width: 130,border:0}}></input></td>
                            <td><input placeholder="请输入数量" style={{ width: 130,border:0}}></input></td>
                            <td><input placeholder="请输入到货日期" style={{ width: 130,border:0}}></input></td>
                            <td><input placeholder="请输入生产厂家" style={{ width: 130,border:0}}></input></td>
                        </tr>
                        </tbody>
                    </table>
                    <PurchaseModalColor
                        purchaseStatus={this.state.purchaseStatus}
                    />
                    <table style={{float:'right',marginTop:'40px'}} >
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
                        className="purchaseTable"
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.state.dataSource}
                        data
                        size="small"
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
            area: '>=20.00',
        },{
            name: 'Fe',
            symbol: '%',
            area: '>=20.00',
        },{
            name: 'Na',
            symbol: '%',
            area: '>=20.00',
        },{
            name: 'Si',
            symbol: '%',
            area: '>=20.00',
        },{
            name: 'Li',
            symbol: '%',
            area: '>=20.00',
        },{
            name: 'Al',
            symbol: '%',
            area: '>=20.00',
        },{
            name: 'Mg',
            symbol: '%',
            area: '>=20.00',
        }];
        return dyHead;
    };
    cellChange = (e) => {
        const id = e.target.id;
        var flag = -1;
        var tdId = document.getElementById(id).parentNode;
        var colorStatueId = this.state.colorStatueId;
        for(var i=0; i<colorStatueId.length; i++){
            if(id===colorStatueId[i]){
                flag = i;
            }
        }
        if(flag>=0){
            tdId.style.background = 'white';
            colorStatueId.splice(flag,1);
            console.log('---',colorStatueId)
            this.setState({
                colorStatueId:colorStatueId,
                purchaseStatus: '待定'
            })
        }else{
            tdId.style.background = 'red';
            console.log('++++',colorStatueId)
            colorStatueId.push(id);
            this.setState({
                colorStatueId:colorStatueId,
                purchaseStatus: '不合格'
            })
        }
    };
    assembleDynamicData = (dataArr) => {
        const colums = [];
        const length = dataArr.length;
        for(var i=0; i<length-1; i++) {
            const headData = {
                title: '',
                align:'center',
                key: '',
                children: [{
                    title: '',
                    align:'center',
                    children: [{
                        title: '',
                        dataIndex: '',
                        align:'center',
                        width: 100,
                        render: (text,record,index) => {
                            const idTd = index+text;
                            return (
                                <div id={idTd}  onClick={this.cellChange} >{text}</div>
                            )
                        },
                    }],
                }],
            };
            headData.title = dataArr[i].name;
            headData.key = dataArr[i].name;
            headData.children[0].title = dataArr[i].symbol;
            headData.children[0].children[0].title = dataArr[i].area;
            headData.children[0].children[0].dataIndex = dataArr[i].name;
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
                    // editable: true,
                }]
            }],
        };
        colums.push(endArrData);
        // console.log('columssss',colums)
        return colums;
    };
    assembleTableHead = (dynColums) => {
        const firstColumns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'id',
            align:'center',
            width: '8%',
            fixed: 'left',
            editable: true,
        },{
            title: '批号',
            dataIndex: 'a',
            key: 'a',
            align:'center',
            width: '10%',
            fixed: 'left',
        }];
        const endColumns = [{
            title: '判定',
            key: 'judge',
            dataIndex: 'judge',
            align:'center',
            width: '10%',
            fixed: 'right',
            render : (text,record) => {
                const recordId = record.id;
                return (
                    <div>
                        <span>
                            <Radio.Group buttonStyle="solid" size="small"  onChange = {this.radioChange.bind(this,recordId)}>
                                <Radio.Button value='pass'  style={{border:0}}>合格</Radio.Button>
                                <Radio.Button value="nopass" style={{border:0}}>不合格</Radio.Button>
                            </Radio.Group>
                        </span>
                    </div>
                )
            }
        }];
        const columns = [...firstColumns,...dynColums,...endColumns];
        return columns;
    };
    /**---------------------- */


    /**表格判定的结果获取 */
    radioChange = (recordId,e) => {
        //获取下标，将下标进行排序或许与数据进行组合，传给数据库
        // 或者 单独将id和value构成一个新的数据传给后台
        const radioState = e.target.value;
        const radioData = {
            id: recordId,
            purchaseStatus: radioState,
        };
        var flag = false;
        var radioDataArr = this.state.radioDataArr;
        const radioArrLength = this.state.radioDataArr.length;
        var radioTrueNum = this.state.radioTrueNum;
        var radioFalseNum = this.state.radioFalseNum;
        for(var i=0;i<radioDataArr.length;i++){
            if(radioDataArr[i].id===recordId){
                radioDataArr[i].purchaseStatus = radioState;
                if(radioDataArr[i].purchaseStatus === 'pass'){
                    radioTrueNum = radioTrueNum + 1;
                    radioFalseNum = radioFalseNum - 1;
                }
                if(radioDataArr[i].purchaseStatus === 'nopass'){
                    radioFalseNum = radioFalseNum + 1;
                    radioTrueNum = radioTrueNum - 1;
                }
                flag = true;
            }
        }
        if(flag === false){
            // this.setState({
            //     radioDataArr: [...this.state.radioDataArr,radioData]
            // });
            if(radioData.purchaseStatus === 'pass'){
                radioTrueNum = radioTrueNum + 1;
            }
            if(radioData.purchaseStatus === 'nopass'){
                radioFalseNum = radioFalseNum + 1;
            }
            radioDataArr.push(radioData);
        }
        this.setState({
            radioTrueNum: radioTrueNum,
            radioFalseNum: radioFalseNum,
            radioDataArr: radioDataArr
        },() => {
            if(radioArrLength<this.state.dataSource.length){
                this.setState({
                    purchaseStatus: '待定'
                })
            }
            if(radioFalseNum > 0){
                this.setState({
                    purchaseStatus: '不合格'
                })
            }
            if(radioTrueNum === this.state.dataSource.length){
                this.setState({
                    purchaseStatus: '合格'
                })
            }
        });
    };
    /**--------------------- */
    /**根据判定结果返回div-style颜色*/


    /**---------------------- */
}

export default PurchaseModal;