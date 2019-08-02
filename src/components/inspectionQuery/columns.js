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

