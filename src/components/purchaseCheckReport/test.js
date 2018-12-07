import React from 'react';
import { Radio} from 'antd';
import '../Home/page.css';
import PurchaseModalColor from './purchaseModalColor';
import './pack.css';
import './purchaseModalTable.css';

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
const headData =[];
for (let i = 0; i < 20; i++) {
    headData.push({
        index: i,
        id:i,
        testItem: `C${i}`,
        itemUnit: '%',
        testResult: '20.00',
    });
}
const tbodyData = [];
for(let i=0; i<20; i++){
    tbodyData.push({
        index: i,
        id:i,
        a: 'ECT/12372',
        b: '启动',
        C0: '0',
        C1: '1',
        C2: '2',
        C3: '3',
        C4: '4',
        C5: '5',
        C6: '6',
        C7: '7',
        C8: '8',
        C9: '9',
        C10: '10',
        C11: '11',
        C12: '12',
        C13: '13',
        C14: '14',
        C15: '15',
        C16: '16',
        C17: '17',
        C18: '18',
        C19: '19',
    })
}
class PurchaseModal extends React.Component {
    Authorization;
    server;
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
            //用于自定义表
            colorStatueId: [], //用来存储已经变红的标签id--转换成这一行
            headColumns: headData ,
            tbodyData: tbodyData,
            hover: false,

        };
        // this.radioChange = this.radioChange.bind(this);
        this.modifyColorStatueId = this.modifyColorStatueId.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this)
    }

    render() {
        /**这是个令牌，每次调用接口都将其放在header里 */
        this.Authorization = localStorage.getItem('Authorization');
        /**这是服务器网址及端口 */
        this.server = localStorage.getItem('remote');
        /**动态表头数据获取与组装 */
        const dynHeadData = this.assembleDynamicData(this.getDynamicHeadData());
        const totalColumns = this.assembleTableHead(dynHeadData);

        /**---------------------- */
        this.columns = totalColumns;
        const handleRightClick = () => this.handleClick(1);
        const handleLeftClick = () => this.handleClick(-1);


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
                    <div id="modalTable" className={this.state.visible}>
                        <div id="thead">
                            <div id="theadLeft">
                                <div>
                                    <div className="leftThead">序号</div>
                                    <div className="leftThead">批号</div>
                                </div>
                            </div>
                            <div id="theadMiddle" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                                <div className={(this.state.hover? 'leftOnclick':'')} onClick={handleLeftClick}>
                                    <i className="fa fa-chevron-left fa-2x"></i>
                                </div>
                                <div className="middleThead" ref={(ref) => this.middleTheadRef = ref}>
                                    {
                                        this.state.headColumns.map((item,index) => {
                                            return (
                                                <div className="middleTheadDiv" ref={(ref) => this.middleTheadDivRef = ref} key={item.id}>
                                                    <div>{item.testItem}</div>
                                                    <div>{item.itemUnit}</div>
                                                    <div>{item.testResult}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className={(this.state.hover? 'rightOnclick':'')} onClick={handleRightClick}>
                                    <i className="fa fa-chevron-right fa-2x"></i>
                                </div>
                            </div>
                            <div id="theadRight">
                                判定
                            </div>
                        </div>
                        <div style={{clear: 'both'}}></div>
                        <div id="tbody">
                            <div id="tbodyLeft">
                                {
                                    this.state.tbodyData.map((item,index) => {
                                        return(
                                            <div key={'tbody'+index}>
                                                <div className="leftTbody" key={item.id}>{item.index}</div>
                                                <div className="leftTbody" key={'a'}>{item.a}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div id="tbodyArea" className={this.state.className}>
                                <div className="tbodyMiddle" ref={(ref) => this.tbodyMiddleRef = ref}>
                                    {
                                        this.state.tbodyData.map((item,index) => {
                                            const data = item;
                                            const tbodyRow = index;
                                            return(
                                                <div className="middleTbody"   key={'tbodyData'+index}>
                                                    {
                                                        this.state.headColumns.map((item,index) => {
                                                            return(
                                                                <div className='middleTbodyDiv' ref={`${tbodyRow}${index}`}  id={`${tbodyRow}${index}`} key={index} onClick={this.handleCellOnclick.bind(this)}>
                                                                    {data[item.testItem]}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            <div id="tbodyRight">
                                {
                                    this.state.tbodyData.map((item,index) => {
                                        return(
                                            <div key={`right${index}`}>
                                                <div id={`pass${index}`}>合格</div>
                                                <div id={`nopass${index}`}>不合格</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /**表格单元格按钮点击事件*/
    handleCellOnclick = (e) => {
        const id = e.target.id;
        //可以通过这种方式操作真实dom,但是要保证唯一
        // var backgroundColor = this.refs[id].style.background;
        // if(backgroundColor==='red'){
        //     this.refs[id].style.background = 'white';
        // }else{
        //     this.refs[id].style.background = 'red';
        // }
        // this.refs[id].style.background='red';
        var flag = -1;
        var colorStatueId = this.state.colorStatueId;
        for(var i=0; i<colorStatueId.length; i++) {
            if(id===colorStatueId[i]){
                flag = i;
            }
        }
        if(flag >= 0) {
            this.refs[id].style.background = 'white';
            colorStatueId.splice(flag,1);
            this.setState({
                colorStatueId:colorStatueId,
                purchaseStatus: '待定'
            })
        }else{
            this.refs[id].style.background = 'red';
            colorStatueId.push(id);
            this.setState({
                colorStatueId:colorStatueId,
                purchaseStatus: '不合格'
            })
        }
    };
    /**---------------------- */
    /**获取鼠标移进移出数据*/
    handleMouseOver = () => {
        this.setState({
            hover: true,
        })

    };
    handleMouseOut = () =>{
        this.setState({
            hover: false,
        })
    };
    /**---------------------- */
    /**获取表头左右图标点击效果*/
    handleClick(number) {
        if(number === 1) {
            console.log('>>>>>>>>>')
        }else {
            console.log('<<<<<<<<<')
        }

        var middle  = this.middleTheadRef;
        var middleItem = this.middleTheadDivRef;
        var tbodyMiddleRef = this.tbodyMiddleRef;
        let count = middleItem.offsetWidth * 7;
        let gap = (count / 100);
        gap = gap.toFixed(0);
        if(gap >= 1) {
            var interval = setInterval(function() {
                let pre = middle.scrollLeft;
                if(count < 5) {
                    count -= 1;
                    middle.scrollLeft += (number === 1 ? 1 : -1);
                    tbodyMiddleRef.scrollLeft += (number === 1 ? 1 : -1);
                }
                else {
                    count -= gap;
                    middle.scrollLeft += (number === 1 ? Number(gap) : -Number(gap));
                    tbodyMiddleRef.scrollLeft += (number === 1 ? Number(gap) : -Number(gap));
                }
                if(count <= 0 || pre === middle.scrollLeft) {
                    // console.log('clear')
                    clearInterval(interval);
                }
            },1)
        }else if(gap > 0){
            var interval2 = setInterval(function() {
                let pre = middle.scrollLeft;
                count -= 1;
                middle.scrollLeft += (number === 1 ? 1 : -1);
                tbodyMiddleRef.scrollLeft += (number === 1 ? 1 : -1);
                if(count <= 0|| pre === middle.scrollLeft) {
                    // console.log('clear')
                    clearInterval(interval2);
                }
            },1)
        }
    }

    /**修改已经选择的颜色的id*/
    modifyColorStatueId = (id) => {
        this.setState({colorStatueId:data});
    };

    /**---------------------- */
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
            width: 80,
            fixed: 'left',
            editable: true,
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
            key: 'judge',
            dataIndex: 'judge',
            align:'center',
            width: 100,
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
                radioDataArr[i].purchaseStmatus = radioState;
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