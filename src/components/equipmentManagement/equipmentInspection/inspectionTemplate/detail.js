import React from 'react';
import CancleButton from "../../../BlockQuote/cancleButton";
import {message, Modal} from "antd";
import Mmodal3 from "./mmodal3";
import axios from "axios";

class Detail extends React.Component {
    constructor(props){
        super(props)
        this.state={
            visible:false,
            devicePatrolModelsItemDetailsList:[],
            patrolName: '',
            checkType:'',
            devicePatrolModelsLocationDetails:[],
            setPeople:'',
            tabulatedate:''
        }

        this.onCanCel=this.onCanCel.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
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
            console.log(res);
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
                tabulatedate:arr['tabulatedate']
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

        console.log(detailData)
            console.log(devicePatrolModelsItemDetailsList)
            this.setState({
                detailData:detailData,
                devicePatrolModelsItemDetailsList:devicePatrolModelsItemDetailsList,
                devicePatrolModelsLocationDetails:devicePatrolModelsLocationDetails,
            })
            console.log(this.state.detailData)
            console.log(this.state.devicePatrolModelsItemDetailsList)
            console.log(this.state.devicePatrolModelsLocationDetails)
        }).catch(()=>{
            message.info('刷新列表失败，请联系管理员！')
        });

    }
    onCanCel = () => {
        this.setState({visible: false})
    }
    render(){
        return(
        <span>
            <span className='blue' onClick={this.handleAdd}>详情</span>
              <Mmodal3 visible={this.state.visible} onCanCel={this.onCanCel} detailData={this.state.detailData}
                       devicePatrolModelsItemDetailsList={this.state.devicePatrolModelsItemDetailsList}
                       devicePatrolModelsLocationDetails={this.state.devicePatrolModelsLocationDetails}
                       patrolName={this.state.patrolName}
                       checkType={this.state.checkType}
                       setPeople={this.state.setPeople}
                       tabulatedate={this.state.tabulatedate}
                         workshop={this.props.record.workshop}
              />

        </span>
        )
    }
}
export default  Detail
