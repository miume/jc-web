import React from 'react';
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
const nopassRowNum = [];
for(let i=0; i<20; i++){
    tbodyData.push({
        index: i,
        id:i,
        a: 'ECT/12372',
        b: '启动',
        C0: {
            value: '0',
            isQualified: true  // 0代表不合格-变红，1代表合格-白
        },
        C1: {
            value: '1',
            isQualified: false
        },
        C2: {
            value: '2',
            isQualified: false
        },
        C3: {
            value: '3',
            isQualified: false
        },
        C4: {
            value: '4',
            isQualified: false
        },
        C5: {
            value: '5',
            isQualified: false
        },
        C6: {
            value: '6',
            isQualified: false
        },
        C7: {
            value: '7',
            isQualified: false
        },
        C8: {
            value: '8',
            isQualified: false
        },
        C9: {
            value: '9',
            isQualified: false
        },
        C10: {
            value: '10',
            isQualified: false
        },
        C11: {
            value: '11',
            isQualified: false
        },
        C12: {
            value: '12',
            isQualified: false
        },
        C13: {
            value: '13',
            isQualified: false
        },
        C14: {
            value: '14',
            isQualified: false
        },
        C15: {
            value: '15',
            isQualified: false
        },
        C16: {
            value: '16',
            isQualified: false
        },
        C17: {
            value: '17',
            isQualified: false
        },
        C18: {
            value: '18',
            isQualified: false
        },
        C19: {
            value: '19',
            isQualified: false
        },
    });
    nopassRowNum.push(0);
}
class PurchaseModal extends React.Component {
    Authorization;
    server;
    constructor(props){
        super(props);
        this.state = {
            columns: [],
            dataSource: data,
            purchaseStatus: '待定', //显示判定，合格，不合格
            //用于合格与非合格的数量
            nopassRowNum: [], //保存每一行红色（非合格）的数量 -下标代表row,值代表num
            nopassTotalNum: 0, //保存表格总红色（非合格）的数量
            passTotalNum: 0, //保存表格总绿色（合格）的数量
            // colorStatueId: [], //用来存储已经变红的标签id（唯一）
            // passColorIdNum: passColorIdNum,  //用于存储合格变色的标签id
            headColumns: headData ,
            tbodyData: tbodyData,
            //控制类的存在
            hover: false,
            color: false,  //当ture变为红， 当false为白

        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this)
    }

    render() {
        /**这是个令牌，每次调用接口都将其放在header里 */
        this.Authorization = localStorage.getItem('Authorization');
        /**这是服务器网址及端口 */
        this.server = localStorage.getItem('remote');
        /**动态表头数据获取与组装 */
        /**---------------------- */
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
                                                                <div
                                                                    className={(data[item.testItem].isQualified? 'middleTbodyDivRed':'middleTbodyDiv')}
                                                                    ref={`${tbodyRow}|${index}`}
                                                                    id={`${tbodyRow}|${item.testItem}|${index}`}
                                                                    key={index}
                                                                    onClick={this.handleCellOnclick.bind(this)}  //参数 行数和列对象的名字
                                                                >
                                                                    {data[item.testItem].value}
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
                                                <div ref={`pass${index}`}>合格</div>
                                                <div ref={`nopass${index}`}>不合格</div>
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
    cellIsQualifiedColor = (e) => {

    }
    /**表格单元格按钮点击事件*/
        //判断合格，根据passTotalNum的数量来判断，如果passTotalNum数量等于数据长度，则转换为合格，但是需要理清楚逻辑
    handleCellOnclick = (e) => {
        const id = e.target.id;
        // 当前单元格的行数
        const tbodyRow = id.split('|')[0];
        // 当前单元格的内容
        const testItem = id.split('|')[1];
        // 当前单元格的列数--在动态div内
        const index = id.split('|')[2];
        // 保存每一行红色（非合格）的数量-数组-下标代表row,值代表num
        var nopassRowNum = this.state.nopassRowNum;
        // 保存表格总红色（非合格）的数量
        var nopassTotalNum = this.state.nopassTotalNum;
        // 保存表格总绿色（合格）的数量
        var passTotalNum = this.state.passTotalNum;
        console.log(id)
        console.log(tbodyRow)
        console.log(testItem)
        console.log(index)
        const isQualified = tbodyData[tbodyRow][testItem].isQualified;
        if(isQualified===false){
            //  点击变红
            tbodyData[tbodyRow][testItem].isQualified = true;
            nopassRowNum[tbodyRow] += 1;
            if(nopassRowNum[tbodyRow] === 1){
                nopassTotalNum += 1;
                passTotalNum -= 1;
            }
            this.setState({
                tbodyData: tbodyData,
                nopassTotalNum: nopassTotalNum,
                passTotalNum: passTotalNum,
            })
        }else{
            // 点击变白
            tbodyData[tbodyRow][testItem].isQualified = false;
            nopassRowNum[tbodyRow] -= 1;
            if(nopassRowNum[tbodyRow] === 0){
                nopassTotalNum -= 1;
                passTotalNum += 1;
            }
            this.setState({
                tbodyData: tbodyData,
                nopassTotalNum: nopassTotalNum,
                passTotalNum: passTotalNum,
            })
        }




        // const id = e.target.id;
        // const nopassColorId = id.split('|')[0]; //行
        // const rowNopass = 'nopass'+id.split('|')[0];
        // const rowPass = 'pass'+id.split('|')[0];
        // // this.refs[row].style.background = 'green';
        // //可以通过这种方式操作真实dom,但是要保证唯一
        // // var backgroundColor = this.refs[id].style.background;
        // var flag = -1;
        // var colorStatueId = this.state.colorStatueId;
        // var passColorIdNum = this.state.passColorIdNum;
        // var nopassTotalNum = this.state.nopassTotalNum;
        // var passTotalNum = this.state.passTotalNum;
        // for(var i=0; i<colorStatueId.length; i++) {
        //     if(id===colorStatueId[i]){
        //         flag = i;   //用来存储已经变红的标签id（唯一）
        //     }
        // }
        // // 若点击部分已经变红，则需要将单元格变白
        // if(flag >= 0) {
        //     this.refs[id].style.background = 'white';
        //     colorStatueId.splice(flag,1); //从colorStatueId剔除此id
        //     passColorIdNum[nopassColorId] -= 1; //则该行单元格变红的个数减一
        //     nopassTotalNum -= 1; //不通过总数  有什么用？
        //     //针对一行数据，如果该行单元格变红个数为0，则将此行判定为合格，总合格数passTotalNum +1
        //     if(passColorIdNum[nopassColorId]===0){
        //         passTotalNum +=1;
        //         // console.log(passTotalNum)
        //         this.refs[rowNopass].style.background = '#999999';
        //         this.refs[rowPass].style.background = 'green';
        //     }
        //     // 如果不合格总数为0，则状态改为"待定"或者"合格"
        //     if(nopassTotalNum===0){
        //         //若合格总数达到tbodyData数据的长度，则状态改为"合格"
        //         if(passTotalNum===this.state.tbodyData.length){
        //             this.setState({
        //                 colorStatueId:colorStatueId,
        //                 passColorIdNum:passColorIdNum,
        //                 nopassTotalNum:nopassTotalNum,
        //                 passTotalNum:passTotalNum,
        //                 purchaseStatus: '合格',
        //             })
        //         }else{
        //             //若合格总数不达到tbodyData数据的长度，则状态改为"待定"
        //             this.setState({
        //                 colorStatueId:colorStatueId,
        //                 passColorIdNum:passColorIdNum,
        //                 nopassTotalNum:nopassTotalNum,
        //                 passTotalNum:passTotalNum,
        //                 purchaseStatus: '待定',
        //             })
        //         }
        //     }else{
        //         //如果不合格总数非0，则状态改为"不合格"
        //         this.setState({
        //             colorStatueId:colorStatueId,
        //             passColorIdNum:passColorIdNum,
        //             nopassTotalNum:nopassTotalNum,
        //             purchaseStatus: '不合格',
        //         })
        //     }
        // }else{
        //     // 若点击部分未变红，则将此部分变红
        //     this.refs[id].style.background = 'red';
        //     this.refs[rowNopass].style.background = 'red';
        //     this.refs[rowPass].style.background = '#999999';
        //     passColorIdNum[nopassColorId] += 1;
        //     nopassTotalNum +=1;
        //     // passTotalNum -=1;
        //     colorStatueId.push(id);
        //     //判断此时该行的合格数是否已经-1过，若减过，则不变。若未减，则-1，同时总合格数-1
        //     if(passColorIdNum[rowPass]===0){
        //         //若此行合格并未-1,则将合格总数-1
        //         passTotalNum -= 1;
        //         passColorIdNum[rowPass] -= 1;
        //     }
        //     this.setState({
        //         colorStatueId:colorStatueId,
        //         passColorIdNum:passColorIdNum,
        //         nopassTotalNum:nopassTotalNum,
        //         passTotalNum: passTotalNum,
        //         purchaseStatus: '不合格'
        //     })
        // }
        //问题：全合格后  再变红，再合格，则状态未变
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
                    clearInterval(interval2);
                }
            },1)
        }
    }

    /**修改已经选择的颜色的id*/

    /**---------------------- */
    /**动态表头数据获取与组装 */
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