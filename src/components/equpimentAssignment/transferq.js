import React from 'react'
import {Card, Table,Input,Icon} from "antd";
import Button from "antd/lib/button";




function NumAscSort(a,b)
{
    return a - b;
}

class Transferq extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            dataSource2: [],
            Sourceflag1:false,
            Sourceflag2:false,
            selectedRowKeys1:[],
            selectedRowKeys2:[],
        }

    }

    componentDidMount() {
        this.setState({
            dataSource:this.props.dataSource,
            dataSource2:this.props.dataSource2,
        })
    }

    render(){
        const columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:"15%"
        },{
            title:'固定资产编号',
            dataIndex:'Fixedassetscode',
            key:'Fixedassetscode',
            width:"35%"
        },{
            title:'设备名称',
            dataIndex:'Devicename',
            key:'Devicename',
            width:"25%"
        },{
            title:'规格型号',
            dataIndex:'specification',
            key:'specification',
            width:"25%"
        }]
        const { Search } = Input;
        const {selectedRowKeys1,selectedRowKeys2} = this.state;
        console.log("-------------------")
        console.log(selectedRowKeys1)
        const rowSelection = {
            selectedRowKeys:selectedRowKeys1,
            onChange:this.onSelectChange,

        };
        const rowSelection2 = {
            selectedRowKeys:selectedRowKeys2,
            onChange:this.onSelectChange2,

        };
        return(
            <div className="eqa-transfer">
        <div className="eqa-transfer-left">
            <Card title="待分配" >
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 353.89,paddingBottom:10 }}
                />

        <Table rowKey={record => record.index} columns={columns} size="small" dataSource={this.state.Sourceflag1?this.state.dataSource:this.props.dataSource}  scroll={{ y: 337 }}
               rowSelection={rowSelection}/>
            </Card>
        </div>
                <div className="eqa-transfer-mid">
                    <Button type="primary" onClick={this.rightmove} disabled={this.state.Sourceflag1?this.state.dataSource.length===0?true:false:this.props.dataSource.length===0?true:false}> <Icon type="right" /></Button>
                    <Button type="primary" onClick={this.leftmove} disabled={this.state.Sourceflag2?this.state.dataSource2.length===0?true:false:this.props.dataSource2.length===0?true:false}><Icon type="left" /></Button>
                    </div>

        <div className="eqa-transfer-right">

            <Card title="已分配" >
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                />
       <Table rowKey={record => record.index} columns={columns} size="small" dataSource={this.state.Sourceflag2?this.state.dataSource2:this.props.dataSource2}  scroll={{ y: 337 }}
              rowSelection={rowSelection2}/>
            </Card>
        </div>
            </div>
        )
    }
    onSelectChange=(selectedRowKeys)=> {
        console.log(selectedRowKeys)

        if(this.state.Sourceflag1===false){
            this.setState({
                dataSource:this.props.dataSource,
                dataSource2:this.props.dataSource2,
            })
        }


        this.setState({ selectedRowKeys1:selectedRowKeys,
            Sourceflag1:true,
            Sourceflag2:true,
        });
    }
    onSelectChange2=(selectedRowKeys)=> {
        if(this.state.Sourceflag2===false){
            this.setState({
                dataSource:this.props.dataSource,
                dataSource2:this.props.dataSource2,
            })
        }
        this.setState({ selectedRowKeys2:selectedRowKeys,
            Sourceflag1:true,
            Sourceflag2:true,});
    }
    rightmove=()=>{
        var array=this.state.dataSource;
        var array2=this.state.dataSource2;
        var rowkeys=this.state.selectedRowKeys1
        var length=this.state.selectedRowKeys1.length;
        var changedata1=[];
        rowkeys.sort(NumAscSort);
        console.log(rowkeys)
        if(length) {
            for (var i = 0; i < length; i++) {
                console.log(rowkeys[i])
                var kk = array.splice(rowkeys[i]-1-i, 1);
                console.log(kk)
                kk[0].index = array2.length + 1;
                kk[0].flag = kk[0].flag+1;
                array2.push({
                    flag:kk[0].flag,
                    index: kk[0].index,
                    Fixedassetscode: kk[0].Fixedassetscode,
                    Devicename: kk[0].Devicename,
                    specification: kk[0].specification,
                })
                changedata1.push({
                    flag:kk[0].flag,
                    index: kk[0].index,
                    Fixedassetscode: kk[0].Fixedassetscode,
                    Devicename: kk[0].Devicename,
                    specification: kk[0].specification,
                })
            }
            for (var i = 0; i < array.length; i++) {
                array[i].index = i + 1
            }
            console.log(array)
            this.setState({
                dataSourc: array,
                dataSource2: array2,
                selectedRowKeys1: [],
            })
            this.props.gettransferright(changedata1)
        }
    }
    leftmove=()=>{
        var array=this.state.dataSource2;
        var array2=this.state.dataSource;
        var length=this.state.selectedRowKeys2.length;
        var rowkeys=this.state.selectedRowKeys2
        rowkeys.sort(NumAscSort);
        var changedata2=[];
        for(var i=0;i<length;i++){
            var tt=array.splice(rowkeys[i]-i-1,1);
            tt[0].index=array2.length+1;
            tt[0].flag=tt[0].flag+1;
            array2.push({
                flag:tt[0].flag,
                index:tt[0].index,
                Fixedassetscode:tt[0].Fixedassetscode,
                Devicename:tt[0].Devicename,
                specification:tt[0].specification,
            })
            changedata2.push({
                flag:tt[0].flag,
                index:tt[0].index,
                Fixedassetscode:tt[0].Fixedassetscode,
                Devicename:tt[0].Devicename,
                specification:tt[0].specification,
            })
        }
        for (var i = 0; i < array.length; i++) {
            array[i].index = i + 1
        }

        this.setState({
            dataSourc:array2,
            dataSource2:array,
            selectedRowKeys2: [],
        })
        this.props.gettransferleft(changedata2)
    }
}
export default Transferq