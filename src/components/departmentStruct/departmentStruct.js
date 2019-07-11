import React from "react";
import DepTree from '../equipmentArchive/depTree/depTree';
import Blockquote from "../BlockQuote/blockquote";
import axios from "axios";
import {message} from "antd";


class DepartmentStruct extends React.Component{
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;

        return (
            <div>
                <Blockquote menu={current.menuParent} name={current.menuName}/>
                {/*<div style={{padding: '15px'}}>*/}
                    {/*<DepTree*/}
                        {/*getRightData={this.getRightData}*/}
                        {/*url={this.url}*/}
                        {/*operation={this.operation}*/}
                    {/*/>*/}
                {/*</div>*/}
            </div>
        )
    }
    // getRightData = (code) => {
    //     code = parseInt(code)
    //     axios({
    //         url: `${this.url.equipmentArchive.device}/${code}` ,
    //         method: 'get',
    //         headers:{
    //             'Authorization': this.url.Authorization
    //         },
    //     }).then((data) => {
    //         const res = data.data.data?data.data.data:[];
    //         if(res){
    //             var rightTopData = [];
    //             if(JSON.stringify(res) !== '{}'){
    //                 for(var key in res){
    //                     rightTopData.push({
    //                         name: key,
    //                         count: res[key]
    //                     })
    //                 }
    //             }else{
    //                 rightTopData.push({
    //                     name: '无设备',
    //                     count: 0
    //                 })
    //             }
    //             this.setState({
    //                 rightTopData: rightTopData,
    //                 depCode: code
    //             },() => {
    //                 this.getTableData(code, rightTopData[0]?rightTopData[0].name : null);
    //             });
    //         }
    //     }).catch(()=>{
    //         message.info('查询失败，请联系管理员！')
    //     });
    // };
}

export default DepartmentStruct