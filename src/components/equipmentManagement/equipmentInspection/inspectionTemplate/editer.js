import React from 'react';
import Mmodal2 from "./mmodal2";
import Add from "./add";
import axios from "axios";
import {message} from "antd";
import Mmodal3 from "./mmodal3";

class Editer extends React.Component {
    constructor(props){
        super(props)
        this.state={
            visible:false,
            code:'',
        }

        this.onCanCel=this.onCanCel.bind(this)
        this.handleAdd=this.handleAdd.bind(this)
    }
    handleAdd = () => {
        this.setState({visible: true})
        axios({
            url: `${this.props.url.devicePatrolModel.detail}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                id:this.props.record.code
            }
        }).then((data)=>{
            const res=data.data.data;
            var detailData=[];
            var arr=res.devicePatrolModelsHead;

            if(arr['checkType']===true){
                arr['checkType']='电气类'
            }else
            {
                arr['checkType']='机械类'
            }
            this.setState({
                patrolName: arr['patrolName'],
                checkType:arr['checkType'],
                setPeople:res.setPeople,
                tabulatedate:arr['tabulatedate'],
                code:arr['code']
            })


            var devicePatrolModelsItemDetailsList = [];
            for(var i=0; i<res.devicePatrolModelsItemDetailsList.length;i++) {
                var arm = res.devicePatrolModelsItemDetailsList[i];
                console.log(res.devicePatrolModelsItemDetailsList)
                devicePatrolModelsItemDetailsList.push({
                    index:i+1,
                    code: arm['code'],
                    modelCode: arm['modelCode'],
                    patrolContent: arm['patrolContent']
                })
            }

            var devicePatrolModelsLocationDetails = [];
            for(var i=0; i<res.devicePatrolModelsLocationDetails.length;i++) {
                var arr3 = res.devicePatrolModelsLocationDetails[i];
                devicePatrolModelsLocationDetails.push({
                    index:i+1,
                    code: arr3['code'],
                    modelCode: arr3['modelCode'],
                    locationCode: arr3['locationCode'],
                    locationName: arr3['locationName']
                })
            }

            this.setState({
                detailData:detailData,
                devicePatrolModelsItemDetailsList:devicePatrolModelsItemDetailsList,
                devicePatrolModelsLocationDetails:devicePatrolModelsLocationDetails,
            })
        }).catch(()=>{
            message.info('刷新列表失败，请联系管理员！')
        });
    }

    onCanCel = () => {
        this.setState({visible: false})
    }

    changeleftSource=(id) => {
        this.setState({
            devicePatrolModelsItemDetailsList:id
        })
    }

    changevisible=()=>{
        this.setState({
            visible:false
        })
    }

    render(){
        return(
            <span>
            <span className='blue' onClick={this.handleAdd}>编辑</span>
             <Mmodal2 visible={this.state.visible} onCanCel={this.onCanCel}
                      changevisible={this.changevisible}
                      detailData={this.state.detailData}
                      leftDataSource={this.state.devicePatrolModelsItemDetailsList}
                      dataSource2={this.state.devicePatrolModelsLocationDetails}
                      patrolName={this.state.patrolName}
                      checkType={this.state.checkType}
                      setPeople={this.state.setPeople}
                      tabulatedate={this.state.tabulatedate}
                      workshop={this.props.record.workshop}
                      operation={this.props.operation}
                      changeleftSource={this.changeleftSource}
                      url={this.props.url}
                      deptCode={this.props.deptCode}
                      name={this.props.name}
                      code={this.state.code}
                      fetch={this.props.getTableData}
             />
        </span>
        )
    }
}
export default  Editer
