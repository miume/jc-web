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
            flag:true,
            flags:[1],
            bottomheight:true,
        };
        this.returnEquKey = this.returnEquKey.bind(this)
        this.renderEquipmentName = this.renderEquipmentName.bind(this)
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
        this.setState({
            flag:!this.state.flag,
            bottomheight:!this.state.bottomheight,
        })
    }
    // 通过key获取到设备名称
    renderEquipmentName = (data) =>  {
        //console.log("data",data);
        var first=data.slice(0,7);
        //console.log(this.props.updatebackground)
        //console.log(this.state.flags)
        return (
            <div >
                <div className="eq-outside">
                    <div className={'buttonofdrop'}>
                        {
                            data.length>7?
                                <Button size={"small" } onClick={this.handleClick}>
                                    {this.state.flag?<Icon type="down" />:<Icon type="up" />}
                                    {this.state.flag?"更多":"收起"}
                                </Button>:''

                        }
                    </div>
                    <div className={'Dropfrist'}>
                        {this.state.flag?
                            <div className="DropNoExpand">
                                {
                                    first.map((data,index)=>{
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
                            </div>:
                            <div className={"DropExpandselected"} >
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