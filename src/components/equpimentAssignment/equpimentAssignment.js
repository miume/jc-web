import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import {Col, message, Row} from "antd";
import Eqblock from "./eqblock";
import './equpimentAssignment.css'
import SearchCell from "../BlockQuote/search";
import Allocation from './allocation'
import RightTable from './RightTable'
import axios from "axios";
class EqupimentAssignment extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            processData:[],
        }
    }

    componentDidMount() {
        this.fetch()
    }

    render() {

        this.url = JSON.parse(localStorage.getItem('url'));
        const baseData = JSON.parse(localStorage.getItem('baseData'));
        const current = JSON.parse(localStorage.getItem('current'));
        const menus = JSON.parse(localStorage.getItem('menus'))
        const operation = menus?menus.filter(e=>e.path===current.path)[0].menuList:null;
        this.operation = operation.filter(e=>e.path === baseData.path)[0].operations;

        return (

            <div>
                <Blockquote menu={current.menuParent} name="设备工序分配" menu2='返回' returnDataEntry={this.returnDataEntry}
                            flag={1}/>
                <div className="equip-total">
                    {/*左边菜单栏 */}
                <div className="equpiment-left" >
                        <div  className="equpiment-eqblocka">
                        设备名称(请选择）
                        </div>
                    <div className="eqa-eqb">
                       {
                        this.state.processData.map(e=> {
                            // console.log(e)
                            return <Eqblock  colorFlag={e.colorFlag?"ed-blue":"ed-grey"} deviceName={e.deviceName} changeeqname={this.changeeqname} />
                        })
                       }
                    </div>
                </div>

                    {/*右边表格*/}
                    <div className="equpiment-right">
                        {/*分配按钮 */}
                        <Allocation processData={this.state.processData} url={this.url}/>

                        {/*搜索模块*/}
                        <SearchCell flag={1}/>

                        {/*表格模块*/}
                        <RightTable />

                    </div>



                </div>
            </div>
        )
    }
    /**左边点击切换页面 */
    changeeqname = (e) =>{
        console.log(e)

    }
    /**获取左边数据*/
    fetch=(params = {})=>{
        axios({
            url: `${this.url.eqMaintenanceDataEntry.queryAll}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                ...params,
            },
        }).then((data)=>{
            const res=data.data.data;
            if(res){
                var deviceDatas = []
                for(var i=0; i<res.length; i++){
                    if(i===0){
                        deviceDatas.push({
                            deviceName: res[i],
                            colorFlag:true
                        })
                    }else{
                        deviceDatas.push({
                            deviceName: res[i],
                            colorFlag:false
                        })
                    }
                }
                // }//是序号从1开始
                this.setState({
                    loading:false,
                    processData:deviceDatas,
                });
                this.clickdeviceName=res[0]
            }
        }).catch(()=>{
            message.info('刷新列表失败，请联系管理员！')
        });
    }
    /**返回数据录入页面 */
    returnDataEntry = () => {
        this.props.history.push({pathname: '/equipmentBasicData'});
    }

}
export default EqupimentAssignment