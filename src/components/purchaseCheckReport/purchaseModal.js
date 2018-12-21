import React from 'react';
import '../Home/page.css';
import PurchaseModalColor from './purchaseModalColor';
import './purchaseCheckReport.css';

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
const headBorder = [];
for (let i = 0; i < 17; i++) {
    headData.push({
        index: i,
        id:i,
        testItem: `C${i}`,
        itemUnit: '%',
        testResult: '20.00',
    });
    headBorder.push(false);
}
const tbodyData = [];
const nopassRowNum = [];
const passRowNum = [];
for(let i=0; i<15; i++){
    tbodyData.push({
        index: i,
        id:i,
        a: 'ECT/12372',
        b: '启动',
        C0: {
            value: '0',
            isQualified: false  // 0代表不合格-变红，1代表合格-白
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
        pass: false,
        nopass: false,
    });
    nopassRowNum.push(0);
    passRowNum.push(0);
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
            nopassRowNum: nopassRowNum, //保存每一行红色（非合格）的数量 -下标代表row,值代表num
            nopassTotalNum: 0, //保存表格总红色（非合格）的数量
            passRowNum: passRowNum ,//保存每一行绿色（合格）的数量
            passTotalNum: 0, //保存表格总绿色（合格）的数量
            headBorder: headBorder, //保存需要消除border的哪一列下标
            headColumns: headData ,
            tbodyData: tbodyData,
            //控制类的存在
            hover: false,
            color: false,  //当ture变为红， 当false为白
            //判断是否可以点击数据
            // clickState:0, //0可以点击，1为不可以点击

        };

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
        // 控制动态数据的长度headColumns--默认小于7
        var headColumnsLength = false;
        if(this.state.headColumns.length>7){
            headColumnsLength = true;
        }
        const unqualifiedType = this.props.unqualifiedType?this.props.unqualifiedType:false;
        return(
            <div style={{paddingTop:'10px'}}>
                <div>
                    <table className="purchaseTopTable">
                        <thead className="purchaseTopThead">
                        <tr>
                            <th>原材料</th>
                            <th>规格</th>
                            <th>数量</th>
                            <th>到货日期</th>
                            <th>生产厂家</th>
                        </tr>
                        </thead>
                        <tbody className="purchaseTopTbody">
                        <tr>
                            <td><input placeholder="原材料名称"></input></td>
                            <td><input placeholder="请输入规格"></input></td>
                            <td><input placeholder="请输入数量"></input></td>
                            <td><input placeholder="请输入到货日期"></input></td>
                            <td><input placeholder="请输入生产厂家"></input></td>
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
                    <div id={unqualifiedType?'unqualfiedModalTable':'modalTable'}>
                        <div className="purchaseThead">
                            <div className="theadLeft">
                                <div className="leftThead borderRadius">序号</div>
                                <div className="leftThead">批号</div>
                                <div className="leftOnclick" onClick={handleLeftClick}>
                                    <i className="fa fa-caret-left"></i>
                                </div>
                            </div>
                            <div className="theadMiddle">
                                <div className="middleThead" ref={(ref) => this.middleTheadRef = ref} >
                                    {
                                        this.state.headColumns.map((item,index) => {
                                            return (
                                                <div
                                                    className={(headColumnsLength?'middleTheadDiv':'middleTheadDivLength')}
                                                    ref={(ref) => this.middleTheadDivRef = ref}
                                                    key={item.id}
                                                >
                                                    <div>{item.testItem}</div>
                                                    <div>{item.itemUnit}</div>
                                                    <div>{item.testResult}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div id="theadRight">
                                <div className="rightOnclick" onClick={handleRightClick}>
                                    <i className="fa fa-caret-right"></i>
                                </div>
                                <div>判定</div>
                            </div>
                        </div>
                        <div style={{clear: 'both'}}></div>
                        <div className="purchaseTbody">
                            <div className="tbodyLeft" >
                                {
                                    this.state.tbodyData.map((item,index) => {
                                        if(index === this.state.tbodyData.length-1){
                                            return(
                                                <div className="leftTbody" key={'tbody'+index}>
                                                    <div className="leftBorderRadius" key={item.id}>{item.index}</div>
                                                    <div key={'a'}>{item.a}</div>
                                                </div>
                                            )
                                        }else{
                                            return(
                                                <div className="leftTbody" key={'tbody'+index}>
                                                    <div key={item.id}>{item.index}</div>
                                                    <div key={'a'}>{item.a}</div>
                                                </div>
                                            )
                                        }

                                    })
                                }
                            </div>
                            <div className="tbodyMiddle" >
                                <div className="middleTbody" ref={(ref) => this.middleTbody = ref}>
                                    {
                                        this.state.tbodyData.map((item,index) => {
                                            //  每一行数据
                                            const data = item;
                                            const tbodyRow = index;
                                            return(
                                                <div
                                                    className="middleTbodyDiv"
                                                    key={index}
                                                >
                                                    {
                                                        this.state.headColumns.map((item,index) => {
                                                            if(headColumnsLength === false){
                                                                // 数据长度小于7
                                                                if(this.props.clickState === 0){
                                                                    return(
                                                                        <div
                                                                            className={(data[item.testItem].isQualified? 'middleTbodyDivRedLength cursorPointer':'middleTbodyDivWhiteLength cursorPointer')}
                                                                            ref={`${tbodyRow}|${index}`}
                                                                            id={`${tbodyRow}|${item.testItem}`}
                                                                            key={index}
                                                                            onClick={this.handleCellOnclick.bind(this)}
                                                                        >
                                                                            {data[item.testItem].value}
                                                                        </div>
                                                                    )
                                                                }else{
                                                                    return(
                                                                        <div
                                                                            className={(data[item.testItem].isQualified? 'middleTbodyDivRed cursorDefault':'middleTbodyDivWhite cursorDefault')}
                                                                            ref={`${tbodyRow}|${index}`}
                                                                            id={`${tbodyRow}|${item.testItem}`}
                                                                            key={index}
                                                                        >
                                                                            {data[item.testItem].value}
                                                                        </div>
                                                                    )
                                                                }

                                                            }else{
                                                                if(this.props.clickState === 0){
                                                                    return(
                                                                        <div
                                                                            className={(data[item.testItem].isQualified? 'middleTbodyDivRed cursorPointer':'middleTbodyDivWhite cursorPointer')}
                                                                            ref={`${tbodyRow}|${index}`}
                                                                            id={`${tbodyRow}|${item.testItem}`}
                                                                            key={index}
                                                                            onClick={this.handleCellOnclick.bind(this)}
                                                                        >
                                                                            {data[item.testItem].value}
                                                                        </div>
                                                                    )
                                                                }else{
                                                                    return(
                                                                        <div
                                                                            className={(data[item.testItem].isQualified? 'middleTbodyDivRed cursorDefault':'middleTbodyDivWhite cursorDefault')}
                                                                            ref={`${tbodyRow}|${index}`}
                                                                            id={`${tbodyRow}|${item.testItem}`}
                                                                            key={index}
                                                                        >
                                                                            {data[item.testItem].value}
                                                                        </div>
                                                                    )
                                                                }
                                                            }
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="tbodyRight">
                                {
                                    this.state.tbodyData.map((item,index) => {
                                        if(index == this.state.tbodyData.length-1){
                                            if(this.props.clickState === 0){
                                                return(
                                                    <div className="rightTbody" key={`right${index}`}>
                                                        <div
                                                            className={(item.pass? 'passJudge cursorPointer': 'isQualified cursorPointer')}
                                                            ref={`pass${index}`}
                                                            onClick={this.handleJudgePass.bind(this,index)}
                                                        >合格</div>
                                                        <div
                                                            className={(item.nopass? 'nopassJudge leftBorderRadius cursorDefault': 'isQualified leftBorderRadius cursorDefault')}
                                                            ref={`nopass${index}`}
                                                        >不合格</div>
                                                    </div>
                                                )
                                            }else{
                                                return(
                                                    <div className="rightTbody" key={`right${index}`}>
                                                        <div
                                                            className={(item.pass? 'passJudge cursorDefault': 'isQualified cursorDefault')}
                                                            ref={`pass${index}`}
                                                        >合格</div>
                                                        <div
                                                            className={(item.nopass? 'nopassJudge leftBorderRadius cursorDefault': 'isQualified leftBorderRadius cursorDefault')}
                                                            ref={`nopass${index}`}
                                                        >不合格</div>
                                                    </div>
                                                )
                                            }
                                        }else{
                                            if(this.props.clickState === 0){
                                                return(
                                                    <div className="rightTbody" key={`right${index}`}>
                                                        <div
                                                            className={(item.pass? 'passJudge cursorPointer': 'isQualified cursorPointer')}
                                                            ref={`pass${index}`}
                                                            onClick={this.handleJudgePass.bind(this,index)}
                                                        >合格</div>
                                                        <div
                                                            className={(item.nopass? 'nopassJudge cursorDefault': 'isQualified cursorDefault')}
                                                            ref={`nopass${index}`}
                                                        >不合格</div>
                                                    </div>
                                                )
                                            }else{
                                                return(
                                                    <div className="rightTbody" key={`right${index}`}>
                                                        <div
                                                            className={(item.pass? 'passJudge cursorDefault': 'isQualified cursorDefault')}
                                                            ref={`pass${index}`}
                                                        >合格</div>
                                                        <div
                                                            className={(item.nopass? 'nopassJudge cursorDefault': 'isQualified cursorDefault')}
                                                            ref={`nopass${index}`}
                                                        >不合格</div>
                                                    </div>
                                                )
                                            }

                                        }

                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    /**表格合格判定点击事件*/
    handleJudgePass = (index) => {
        // 保存每一行绿色（合格）的数量
        var passRowNum = this.state.passRowNum;
        passRowNum[index] = 1;
        // 保存表格总绿色（合格）的数量
        var passTotalNum = this.state.passTotalNum;
        passTotalNum += 1;
        // 该行的红色数量为0
        const nopassRowNum = this.state.nopassRowNum;
        nopassRowNum[index] = 0;
        const tbodyData = this.state.tbodyData;
        const headColumns = this.state.headColumns;
        tbodyData[index].pass = true;
        tbodyData[index].nopass = false;
        headColumns.map((item) => {
            tbodyData[index][item.testItem].isQualified = false;
        });
        if(passTotalNum === tbodyData.length){
            this.setState({
                tbodyData: tbodyData,
                passRowNum: passRowNum,
                passTotalNum: passTotalNum,
                purchaseStatus: '合格',
            })
        }else{
            this.setState({
                tbodyData: tbodyData,
                passRowNum: passRowNum,
                passTotalNum: passTotalNum,
                purchaseStatus: '待定',
            })
        }

    };
    /**---------------------- */
    /**表格单元格按钮点击事件*/
    handleCellOnclick = (e) => {
        const id = e.target.id;
        const tbodyData = this.state.tbodyData;
        // 当前单元格的行数
        const tbodyRow = id.split('|')[0];
        // 当前单元格的内容
        const testItem = id.split('|')[1];

        // 保存每一行红色（非合格）的数量-数组-下标代表row,值代表num
        var nopassRowNum = this.state.nopassRowNum;
        // 保存表格总红色（非合格）的数量
        var nopassTotalNum = this.state.nopassTotalNum;
        // 保存每一行绿色（合格）的数量
        var passRowNum = this.state.passRowNum;
        // 保存表格总绿色（合格）的数量
        var passTotalNum = this.state.passTotalNum;
        const isQualified = tbodyData[tbodyRow][testItem].isQualified;
        if(isQualified===false){
            //  点击单元格变红
            tbodyData[tbodyRow][testItem].isQualified = true;
            //  点击判定为不合格--（变红）
            tbodyData[tbodyRow].pass = false;
            tbodyData[tbodyRow].nopass = true;
            nopassRowNum[tbodyRow] += 1;
            if(nopassRowNum[tbodyRow] === 1){
                nopassTotalNum += 1;
                if(passRowNum[tbodyRow] === 1){
                    passRowNum[tbodyRow] = 0;
                    passTotalNum -= 1;
                }
            }
            this.setState({
                tbodyData: tbodyData,
                nopassTotalNum: nopassTotalNum,
                passTotalNum: passTotalNum,
                purchaseStatus: '不合格',
                passRowNum: passRowNum,
            })
        }else{
            // 点击变白
            tbodyData[tbodyRow][testItem].isQualified = false;
            //  点击判定为不合格--（变红）
            nopassRowNum[tbodyRow] -= 1;
            if(nopassRowNum[tbodyRow] === 0){
                nopassTotalNum -= 1;
                tbodyData[tbodyRow].pass = true;
                tbodyData[tbodyRow].nopass = false;
                if(passRowNum[tbodyRow] === 0){
                    passRowNum[tbodyRow] = 1;
                    passTotalNum += 1;
                }
            }else{
                tbodyData[tbodyRow].pass = false;
                tbodyData[tbodyRow].nopass = true;
            }
            // 如果不合格总数变为0，则状态为"待定"、"合格"
            if(nopassTotalNum === 0){
                // 如果状态为"合格",即合格数达到表格数据总长度
                if(passTotalNum === this.state.tbodyData.length){
                    this.setState({
                        tbodyData: tbodyData,
                        nopassTotalNum: nopassTotalNum,
                        passTotalNum: passTotalNum,
                        purchaseStatus: '合格',
                        passRowNum: passRowNum,
                    })
                }else{
                    // 状态为"待定"
                    this.setState({
                        tbodyData: tbodyData,
                        nopassTotalNum: nopassTotalNum,
                        passTotalNum: passTotalNum,
                        purchaseStatus: '待定',
                        passRowNum: passRowNum,
                    })
                }
            }else{
                this.setState({
                    tbodyData: tbodyData,
                    nopassTotalNum: nopassTotalNum,
                    passTotalNum: passTotalNum,
                    purchaseStatus: '不合格',
                    passRowNum: passRowNum,
                })
            }
        }
    };
    /**---------------------- */
    /**获取表头左右图标点击效果*/
    handleClick(number) {
        var middle  = this.middleTheadRef;         
        var middleItem = this.middleTheadDivRef;
        var middleTbody = this.middleTbody;
        let count = middleItem.offsetWidth * 7;
        let gap = (count / 100);
        gap = gap.toFixed(0);
        if(gap >= 1) {
            var interval = setInterval(function() {
                let pre = middle.scrollLeft;
                if(count < 5) {
                    count -= 1;
                    middle.scrollLeft += (number === 1 ? 1 : -1);
                    middleTbody.scrollLeft += (number === 1 ? 1 : -1);
                }
                else {
                    count -= gap;
                    middle.scrollLeft += (number === 1 ? Number(gap) : -Number(gap));
                    middleTbody.scrollLeft += (number === 1 ? Number(gap) : -Number(gap));
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
                middleTbody.scrollLeft += (number === 1 ? 1 : -1);
                if(count <= 0|| pre === middle.scrollLeft) {
                    clearInterval(interval2);
                }
            },1)
        }
    }

    /**修改已经选择的颜色的id*/

    /**---------------------- */

    /**根据判定结果返回div-style颜色*/


    /**---------------------- */
}

export default PurchaseModal;