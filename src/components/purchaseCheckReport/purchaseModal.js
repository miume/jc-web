import React from 'react';
import {Input} from 'antd';
import PurchaseModalColor from './purchaseModalColor';
import './purchaseCheckReport.css';

class PurchaseModal extends React.Component {
    // constructor(props){
    //     super(props);
    //     // this.state = {
    //     //     checkData: this.props.data,
    //     // };
    // }

    render() {
        const handleRightClick = () => this.handleClick(1);
        const handleLeftClick = () => this.handleClick(-1);
        // 控制动态数据的长度headColumns--默认小于7
        var headColumnsLength = false;
        if(this.props.data.headData.length>7){
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
                        {
                            this.props.clickState?(
                                <tr style={{cursor:'default'}}>
                                    <td>{this.props.data.topData.materialName}</td>
                                    <td>{this.props.data.topData.norm}</td>
                                    <td>{this.props.data.topData.quantity}</td>
                                    <td><abbr style={{cursor:'default'}} title={this.props.data.topData.sampleDeliveringDate}>{this.props.data.topData.sampleDeliveringDate.substring(0,10)}</abbr></td>
                                    <td>{this.props.data.topData.deliveryFactory}</td>
                                </tr>
                            ):(
                                <tr>
                                    <td><Input name='materialName' placeholder="原材料名称" value={this.props.data.topData.materialName} onChange={this.props.inputSave}/></td>
                                    <td><Input name='norm' placeholder="请输入规格" value={this.props.data.topData.norm} onChange={this.props.inputSave}/></td>
                                    <td><Input name='quantity' placeholder="请输入数量" value={this.props.data.topData.quantity} onChange={this.props.inputSave}/></td>
                                    <td><Input name='sampleDeliveringDate' placeholder="请输入到货日期" value={this.props.data.topData.sampleDeliveringDate} onChange={this.props.inputSave}/></td>
                                    <td><Input name='deliveryFactory' placeholder="请输入生产厂家" value={this.props.data.topData.deliveryFactory} onChange={this.props.inputSave}/></td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <PurchaseModalColor
                        purchaseStatus={this.props.data.judgement}
                    />
                    <table className="purchaseTopJudger" >
                        <tbody>
                        <tr>
                            <td>检验人:</td>
                            <td>{this.props.data.judger}</td>
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
                                        this.props.data.headData.map((item) => {
                                            return (
                                                <div
                                                    className={(headColumnsLength?'middleTheadDiv':'middleTheadDivLength')}
                                                    ref={(ref) => this.middleTheadDivRef = ref}
                                                    key={item.id}
                                                >
                                                    <div>{item.testItem}</div>
                                                    <div>{item.itemUnit}</div>
                                                    <div>{item.rawTestItemStandard}</div>
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
                                    this.props.data.tbodyData.map((item,index) => {
                                        if(index === this.props.data.tbodyData.length-1){
                                            return(
                                                <div className="leftTbody" key={'tbody'+index}>
                                                    <div className="leftBorderRadius" key={item.index}>{item.index}</div>
                                                    <div key={item.serialNumber}><abbr style={{cursor:'default'}} title={item.serialNumber}>{item.serialNumber.substring(0,10)}</abbr></div>
                                                </div>
                                            )
                                        }else{
                                            return(
                                                <div className="leftTbody" key={'tbody'+index}>
                                                    <div key={item.index}>{item.index}</div>
                                                    <div key={item.serialNumber}><abbr style={{cursor:'default'}} title={item.serialNumber}>{item.serialNumber.substring(0,10)}</abbr></div>
                                                </div>
                                            )
                                        }

                                    })
                                }
                            </div>
                            <div className="tbodyMiddle" >
                                <div className="middleTbody" ref={(ref) => this.middleTbody = ref}>
                                    {
                                        this.props.data.tbodyData.map((item,index) => {
                                            //  每一行数据
                                            const tbodyMiddleData = item.tbodyMiddleData;
                                            const tbodyRow = index;
                                            console.log('tbodyMiddleData',tbodyMiddleData)
                                            return(
                                                <div
                                                    className="middleTbodyDiv"
                                                    key={index}
                                                >
                                                    {
                                                        this.props.data.headData.map((item,index) => {
                                                            //  当确定同一批数据检测项目相同的情况下，这个外层的if可以删除
                                                            if(tbodyMiddleData[item.id]){
                                                                if(headColumnsLength === false){
                                                                    // 数据长度小于7
                                                                    if(this.props.clickState === 0){
                                                                        return(
                                                                            <div
                                                                                className={(tbodyMiddleData[item.id].isValid? 'middleTbodyDivWhiteLength cursorPointer':'middleTbodyDivRedLength cursorPointer')}
                                                                                id={`${tbodyRow}|${item.id}`}
                                                                                key={index}
                                                                                onClick={this.handleCellOnclick.bind(this)}
                                                                            >
                                                                                {tbodyMiddleData[item.id].testResult}
                                                                            </div>
                                                                        )
                                                                    }else{
                                                                        return(
                                                                            <div
                                                                                className={(tbodyMiddleData[item.id].isValid? 'middleTbodyDivWhite cursorDefault':'middleTbodyDivRed cursorDefault')}
                                                                                id={`${tbodyRow}|${item.id}`}
                                                                                key={index}
                                                                            >
                                                                                {tbodyMiddleData[item.id].testResult}
                                                                            </div>
                                                                        )
                                                                    }

                                                                }else{
                                                                    if(this.props.clickState === 0){
                                                                        return(
                                                                            <div
                                                                                className={(tbodyMiddleData[item.id].isValid? 'middleTbodyDivWhite cursorPointer':'middleTbodyDivRed cursorPointer')}
                                                                                id={`${tbodyRow}|${item.id}`}
                                                                                key={index}
                                                                                onClick={this.handleCellOnclick.bind(this)}
                                                                            >
                                                                                {tbodyMiddleData[item.id].testResult}
                                                                            </div>
                                                                        )
                                                                    }else{
                                                                        return(
                                                                            <div
                                                                                className={(tbodyMiddleData[item.id].isValid? 'middleTbodyDivWhite cursorDefault':'middleTbodyDivRed cursorDefault')}
                                                                                id={`${tbodyRow}|${item.id}`}
                                                                                key={index}
                                                                            >
                                                                                {tbodyMiddleData[item.id].testResult}
                                                                            </div>
                                                                        )
                                                                    }
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
                                    this.props.data.tbodyData.map((item,index) => {
                                        if(index === this.props.data.tbodyData.length-1){
                                            if(this.props.clickState === 0){
                                                return(
                                                    <div className="rightTbody" key={`right${index}`}>
                                                        <div
                                                            className={(item.isQualified? 'passJudge cursorPointer': 'isQualified cursorPointer')}
                                                            ref={`pass${index}`}
                                                            onClick={this.handleJudgePass.bind(this,index)}
                                                        >合格</div>
                                                        <div
                                                            className={(item.isQualified? 'isQualified leftBorderRadius cursorDefault': 'nopassJudge leftBorderRadius cursorDefault')}
                                                            ref={`nopass${index}`}
                                                        >不合格</div>
                                                    </div>
                                                )
                                            }else{
                                                return(
                                                    <div className="rightTbody" key={`right${index}`}>
                                                        <div
                                                            className={(item.isQualified? 'passJudge cursorDefault': 'isQualified cursorDefault')}
                                                            ref={`pass${index}`}
                                                        >合格</div>
                                                        <div
                                                            className={(item.isQualified? 'isQualified leftBorderRadius cursorDefault': 'nopassJudge leftBorderRadius cursorDefault')}
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
                                                            className={(item.isQualified? 'passJudge cursorPointer': 'isQualified cursorPointer')}
                                                            ref={`pass${index}`}
                                                            onClick={this.handleJudgePass.bind(this,index)}
                                                        >合格</div>
                                                        <div
                                                            className={(item.isQualified? 'isQualified cursorDefault': 'nopassJudge cursorDefault')}
                                                            ref={`nopass${index}`}
                                                        >不合格</div>
                                                    </div>
                                                )
                                            }else{
                                                return(
                                                    <div className="rightTbody" key={`right${index}`}>
                                                        <div
                                                            className={(item.isQualified? 'passJudge cursorDefault': 'isQualified cursorDefault')}
                                                            ref={`pass${index}`}
                                                        >合格</div>
                                                        <div
                                                            className={(item.isQualified? 'isQualified cursorDefault': 'nopassJudge cursorDefault')}
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
        var checkData = this.props.data;
        checkData.tbodyData[index].isQualified = 1;
        for(let i=0; i<checkData.headData.length; i++){
            const testItem = checkData.headData[i].testItem;
            if(checkData.tbodyData[index].tbodyMiddleData[testItem]){
                checkData.tbodyData[index].tbodyMiddleData[testItem].isValid = 1;
            }
        }
        let judgeNum = 0;
        for(let j=0; j<checkData.tbodyData.length; j++){
            if(checkData.tbodyData[j].isQualified===0){
                checkData.judgement = 0;
                break;
            }else{
                judgeNum += 1;
                if(judgeNum === checkData.tbodyData.length){
                    checkData.judgement = 1;
                }
            }
        }
        this.props.modifyDetailData(checkData);
        // this.setState({
        //     checkData: checkData
        // },()=>{
        //     this.props.modifyDetailData(checkData);
        // })
    };
    /**---------------------- */
    /**表格单元格按钮点击事件*/
    handleCellOnclick = (e) => {
        const id = e.target.id;
        var checkData = this.props.data;
        // 当前单元格的行数
        const row = id.split('|')[0];
        // 当前单元格的内容
        const item = id.split('|')[1];
        //  进行单元格变化的改变
        if(checkData.tbodyData[row].tbodyMiddleData[item].isValid===0){
            checkData.tbodyData[row].tbodyMiddleData[item].isValid = 1;
        }else{
            checkData.tbodyData[row].tbodyMiddleData[item].isValid = 0;
        }
        //  进行每一行的改变
        let rowFlag = 1;    //合格
        for(let i=0; i<checkData.headData.length; i++){
            const testItem = checkData.headData[i].testItem;
            if(checkData.tbodyData[row].tbodyMiddleData[testItem]){
                if(checkData.tbodyData[row].tbodyMiddleData[testItem].isValid===0){
                    rowFlag = 0;    //不合格
                    break;
                }
            }
        }
        if(rowFlag === 1){
            checkData.tbodyData[row].isQualified = 1;
        }else{
            checkData.tbodyData[row].isQualified = 0;
        }
        //  进行总状态的改变
        let judgeNum = 0;
        for(let j=0; j<checkData.tbodyData.length; j++){
            if(checkData.tbodyData[j].isQualified===0){
                checkData.judgement = 0
                break;
            }else{
                judgeNum += 1;
                if(judgeNum === checkData.tbodyData.length){
                    checkData.judgement = 1;
                }
            }
        }
        this.props.modifyDetailData(checkData);
        // this.setState({
        //     checkData: checkData
        // },()=>{
        //     this.props.modifyDetailData(checkData);
        // })
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