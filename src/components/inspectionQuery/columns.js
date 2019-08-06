import React from "react"
import InspectionDetailModal from "./detailModal"

export const column1=[{
    title:"序号",
    dataIndex:"index",
    key:"index",
    width:"5%",
},{
    title:"计划名称",
    dataIndex:"planName",
    key:"planName",
    width:"10%",
},{
    title:"巡检模板名称",
    dataIndex:"modalName",
    key:"modalName",
    width:"12%",
},{
    title:"检查类型",
    dataIndex:"checkType",
    key:"checkType",
    width:"10%",
},{
    title:"计划日期",
    dataIndex:"planDate",
    key:"planDate",
    width:"10%",
},{
    title:"操作",
    dataIndex:"code",
    key:"code",
    width:"6%",
    render:(text,record)=>{
        return(<InspectionDetailModal
            status={1}
            record={record}
        />)
    }
}]

 export const column2=[{
    title:"序号",
    dataIndex:"index",
    key:"index",
     width:"5%",
},{
    title:"计划名称",
    dataIndex:"planName",
    key:"planName",
     width:"10%",
},{
    title:"巡检模板名称",
    dataIndex:"modalName",
    key:"modalName",
     width:"12%",
},{
    title:"检查类型",
    dataIndex:"checkType",
    key:"checkType",
     width:"10%",
},{
    title:"计划日期",
    dataIndex:"planDate",
    key:"planDate",
     width:"10%",
},{
    title: "接单时间",
    dataIndex: "recivedTime",
    key: "recivedTime",
     width:"13%",
},{
    title:"操作",
    dataIndex:"code",
    key:"code",
     width:"6%",
     render:(text,record)=>{
        return(
            <InspectionDetailModal
                status={2}
                record={record}
            />)
 }
}]

 export const column3=[{
    title:"序号",
    dataIndex:"index",
    key:"index",
     width:"5%",
},{
    title:"计划名称",
    dataIndex:"planName",
    key:"planName",
     width:"10%",
},{
    title:"巡检模板名称",
    dataIndex:"modalName",
    key:"modalName",
     width:"10%",
},{
    title:"检查类型",
    dataIndex:"checkType",
    key:"checkType",
     width:"10%",
},{
    title:"计划日期",
    dataIndex:"planDate",
    key:"planDate",
     width:"10%",
},{
    title: "接单时间",
    dataIndex: "recivedTime",
    key: "recivedTime",
     width:"13%",
},{
    title:"完成时间",
    dataIndex:"completed",
    key:"completed",
     width:"13%",
},{
    title:"操作",
    dataIndex:"code",
    key:"code",
     width:"6%",
     render:(text,record)=>{
         return(
             <InspectionDetailModal
                 status={3}
                 record={record}
             />)
     }
}]
export const acolums=[{
    title:'巡检记录编号',
    key:'recordCode',
    dataIndex:'recordCode',
    sorter: (a, b) => a.index - b.index,
    align:'center',
    width:180,
},{
    title:'所属车间',
    dataIndex:'belongShop',
    key:'belongShop',
    align:'center',
    width:140
},{
    title:'计划名称',
    dataIndex:'planName',
    key:'planName',
    align:'center',
    width:140
},{
    title:'巡检模板名称',
    dataIndex:'modalName',
    key:'modalName',
    align:'center',
    width:140
},{
    title:'检查类型',
    dataIndex:'checkType',
    key:'checkType',
    align:'center',
    width:140
},{
    title:'计划日期',
    dataIndex:'planTime',
    key:'planTime',
    align:'center',
    width:160
},{
    title:'接单时间',
    dataIndex:'getTime',
    key:'getTime',
    align:'center',
    width:180
},{
    title:'接单人',
    dataIndex:'getPeopleName',
    key:'getPeopleName',
    align:'center',
    width:130
},{
    title:'完成时间',
    dataIndex:'completedTime',
    key:'completedTime',
    align:'center',
    width:180
}
]
export const willacolums=acolums.slice(0,6);
export const doingacolums=acolums.slice(0,8);
export const bcolums=[{
    title:'序号',
    key:'index',
    dataIndex:'index',
    sorter: (a, b) => a.index - b.index,
    align:'center',
    width:"5%",
},{
    title:'巡检内容',
    dataIndex:'InspectionContent',
    key:'InspectionContent',
    align:'center',
    width:"50%"
},{
    title:'巡检结果',
    dataIndex:'inspectionResult',
    key:'inspectionResult',
    align:'center',
    width:"20%",
},{
    title:'异常原因',
    dataIndex:'reason',
    key:'reason',
    align:'center',
    width:"25%"
}
]
export const willbcolums=bcolums.slice(0,2);
export const doingbcolums=bcolums.slice(0,2);
export const ccolumns= [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align:'center',
        width:"5%",
        height:0.5,
    },
    {
        title: '巡检位置',
        dataIndex: 'inspectionLocation',
        key: 'inspectionLocation',
        align:'center',
        width:"50%",
    },
    {
        title: '打卡时间',
        align:'center',
        key: 'visitedTime',
        dataIndex: 'visitedTime',
        width:"25%"
    }]
export const willccolumus=ccolumns.slice(0,2)
