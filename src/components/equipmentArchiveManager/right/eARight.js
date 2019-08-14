import React, {Component} from 'react';
import {Button, Icon} from 'antd';
import '../equipmentArchiveManager.css';
import EARightBottom from './eARightBottom';

var flagsState=[1];
class EARight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightTableData: [],
            topNumber:'',
            NumOfDevice:3,
            flags:[1],
        };
        this.returnEquKey = this.returnEquKey.bind(this)
        this.renderEquipmentName = this.renderEquipmentName.bind(this);
        this.deviceSpan=React.createRef();
        this.divWidth=React.createRef();
    }

    render() {

        return (
            <div className="eA-right-top">
                <div>
                    {this.renderEquipmentName(this.props.rightTopData)}
                </div>
                <EARightBottom
                    getRightData={this.props.getRightData}
                    deviceName={this.props.deviceName}
                    depCode={this.props.depCode}
                    getTableData={this.props.getTableData}
                    url={this.props.url}
                    operation={this.props.operation}
                    comFlag={false}
                    dataSource={this.props.rightTableData}
                    searchName="编码、设备名称、ID卡号"
                    handleTableChange={this.props.handleTableChange}
                    pagination={this.props.pagination}
                    searchContent={this.props.searchContent}
                    modifySearchContent={this.props.modifySearchContent}
                    searchEvent={this.props.searchEvent}
                    searchReset={this.props.searchReset}
                    bottomheight={this.state.bottomheight}
                    deptName={this.props.deptName}
                />
            </div>
        )
    }

    // 通过回调函数，获得标签页表格中的数据
    returnEquKey=(key,name)=>{
        const params = {
            deptId: parseInt(this.props.depCode),
            deviceName: name
        }
        this.props.getTableData(params, {})
        //console.log("props",this.props.updatebackground)
        this.setState({flags:this.props.updatebackground},()=>{
            var flagx=this.state.flags;
            const index=flagx.indexOf(1);
            flagx[index]=0;
            flagx[parseInt(key)]=1;
            this.setState({flags:flagx})
        })
    }

    handleClick=()=>{
        this.props.handleFlag();
    }

    // 通过key获取到设备名称
    renderEquipmentName = (data) =>  {
        var num=0,len=0;
        if(this.deviceSpan.current&&this.divWidth.current){
            for(let ii=0;ii<this.deviceSpan.current.childNodes.length;ii++){
                if(len+this.deviceSpan.current.childNodes[ii].offsetWidth+33<=this.divWidth.current.offsetWidth-70){
                    len=len+this.deviceSpan.current.childNodes[ii].offsetWidth+30;
                    num=ii+1;
                }
                else break;
            }
            console.log(num)
        }
        let first=data.slice(0,num)
        return (
            <div>
                <div className="eq-outside">
                    <div className={'buttonofdrop'}>
                        {
                            data.length>num?
                                <Button size={"small" } onClick={this.handleClick}>
                                    {this.props.flag?<Icon type="down" />:<Icon type="up" />}
                                    {this.props.flag?"更多":"收起"}
                                </Button>:''
                        }
                    </div>
                    <div className={'Dropfrist'} ref={this.divWidth}>
                        {this.props.flag?
                            <div>
                                <div id="DropNoExpand">{
                                    first.map((data,index)=>{
                                        if(this.props.updatebackground[index]===0){
                                            return (
                                                <span className="DropExpandblue"
                                                      key={index}
                                                      onClick={this.returnEquKey.bind(this,`${index}`,`${data.name}`,`${data.count}`)}
                                                >
                                                    {`${data.name}(${data.count})`}
                                                </span>)
                                        }
                                        else {
                                            return (
                                                <span
                                                    className="DropExpandwhite"
                                                    key={index}
                                                    onClick={this.returnEquKey.bind(this,`${index}`,`${data.name}`,`${data.count}`)}
                                                >
                                                    {`${data.name}(${data.count})`}
                                                </span>
                                            )
                                        }


                                    } )
                                }</div>
                                <div id="DropNoExpandHide" ref={this.deviceSpan}>{
                                        data.map((data,index)=>{
                                                return (<span
                                                        className="DropExpandbluehide"
                                                        key={index}
                                                    >
                                                        {`${data.name}(${data.count})`}
                                                    </span>)
                                        } )
                                }</div>
                            </div>
                            :
                            <div id={"DropExpandselected" } ref={this.deviceSpan} >
                                {
                                    data.map((data,index)=>{
                                        if(this.props.updatebackground[index]===0){
                                            return (
                                                <span
                                                    className="DropExpandblue"
                                                    key={index}
                                                    onClick={this.returnEquKey.bind(this,`${index}`,`${data.name}`,`${data.count}`)}>{`${data.name}(${data.count})`}</span>
                                            )
                                        }
                                        else {
                                            return (
                                                <span
                                                    className="DropExpandwhite"
                                                    key={index}
                                                    onClick={this.returnEquKey.bind(this,`${index}`,`${data.name}`,`${data.count}`)}>{`${data.name}(${data.count})`}</span>
                                            )
                                        }
                                    } )
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>)

    }




}

export default EARight