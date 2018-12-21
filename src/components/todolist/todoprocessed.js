import React from 'react';
import Todo from './todo';
const data = [];
for(var i = 1; i < 4; i++){
    data.push({
        commonBatchNumber:{
            batchNumber: "ECT/99c4cb57dc53",
                createPersonId: i,
                createTime: "2018-11-27 14:37:35",
                dataType: 2,
                description: "制程检测",
                id: i,
                isUrgent: -1,
                memo: "制程检测专用",
                status: 0,
        },
        createPersonName: "王大大",
        details:[{
            personName: "嘻嘻嘻",
            responsibility: "算命",
            taskType: 2,
            userId: 3,
            visible: null,
        },{
            personName: "陈小春",
            responsibility: "打野",
            taskType: 2,
            userId: 5,
            visible: null
        },{
            personName: "王大大",
            responsibility: "抽签",
            taskType: 2,
            userId: 1,
            visible: 1,
        },{
            personName: "杨梅",
                responsibility: "算命",
                taskType: 2,
                userId: 4,
                visible: null,
        },{
            personName: "陈小春",
            responsibility: "打野",
            taskType: 2,
            userId: 129,
            visible: null
        }]
})
}
class TodoProcessed extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div style={{padding:'15px',overflow:'auto',height:'510px'}}>
                    <div>
                        {
                            this.props.data?this.props.data.map(e=>{
                                var flag = e.details.findIndex(e=>e.visible === 1)
                                var details = e.details;
                                for(var i = 0; i < details.length; i++){
                                    if(i<flag) details[i]['flag'] = 0;
                                    else {details[i]['flag'] = 1; }      
                                }
                                return <Todo key={e.commonBatchNumber.id} data={e.commonBatchNumber} details={details} curId={this.props.data.curId} />
                            }):null
                        }
                    </div>
            </div>
        );
    }
}
export default TodoProcessed;
