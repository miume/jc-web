import React from 'react';
import Todo from './todo';
import SearchCell from '../BlockQuote/search';
// const data = [];
// for(var i = 1; i < 4; i++){
//     data.push({
//         commonBatchNumber:{
//             batchNumber: "ECT/99c4cb57dc53",
//                 createPersonId: i,
//                 createTime: "2018-11-27 14:37:35",
//                 dataType: 2,
//                 description: "制程检测",
//                 id: i,
//                 isUrgent: -1,
//                 memo: "制程检测专用",
//                 status: 0,
//         },
//         createPersonName: "王大大",
//         details:[{
//             personName: "嘻嘻嘻",
//             responsibility: "算命",
//             taskType: 2,
//             userId: 3,
//             visible: null,
//         },{
//             personName: "陈小春",
//             responsibility: "打野",
//             taskType: 2,
//             userId: 5,
//             visible: null
//         },{
//             personName: "王大大",
//             responsibility: "抽签",
//             taskType: 2,
//             userId: 1,
//             visible: 1,
//         },{
//             personName: "杨梅",
//                 responsibility: "算命",
//                 taskType: 2,
//                 userId: 4,
//                 visible: null,
//         },{
//             personName: "陈小春",
//             responsibility: "打野",
//             taskType: 2,
//             userId: 129,
//             visible: null
//         }]
// })
// }
class TodoProcessed extends React.Component{
    constructor(props){
        super(props);
        this.fetch = this.fetch.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
    }
    /**点击重置 */
    fetch(){
        this.props.getHistory('');
    }
    /**获取时间的实时变化 */
    searchContentChange(date, dateString){
        this.setState({searchContent:dateString});
      }
    searchEvent(){
        const {searchContent} = this.state
        this.props.getHistory(searchContent)
    }
    render(){
        return (
            <div className={this.props.flag?'historyContianer':'container'} >
                <div className={this.props.flag?'historySearch':'hide'} ><SearchCell name='请输入搜索内容' timeFlag={1} fetch={this.fetch} searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}/></div>
                <div>
                    {
                        this.props.data?this.props.data.map(e=>{
                            var curId = this.props.data.curId;
                            /**visible===1 表示到当前用户进行审核  前面为已审核，后面则为未审核 */
                            var flag = e.details.findIndex(e=>e.visible === 1)
                            var details = e.details;
                            var contents = '';
                            for(var i = 0; i < details.length; i++){
                                if(curId===details[i].userId) contents = details[i].responsibility;
                                if(i<flag) details[i]['flag'] = 0;
                                else {details[i]['flag'] = 1; }      
                            }
                            return <Todo key={`${e.commonBatchNumber.id}-${this.props.flag?1:0}`} contents={contents} data={e.commonBatchNumber} details={details} curId={curId} url={this.props.url} fetch={this.props.fetch} getHistory={this.props.getHistory} flag={this.props.flag}/>
                        }):<div className='divAuto'>暂无</div>
                    }
                    </div>
            </div>
        );
    }
}
export default TodoProcessed;
