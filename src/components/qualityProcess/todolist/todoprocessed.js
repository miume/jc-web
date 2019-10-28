import React from 'react';
import Todo from './todo';
import home from '../../commom/fns';
import SearchCell from '../../BlockQuote/search';
import {Spin} from "antd";
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
        this.state = {
            searchContent: ''
        }
        this.fetch = this.fetch.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.renderData = this.renderData.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
    }
    /**点击重置 */
    fetch(){
        this.setState({
            searchContent: ''
        });
        this.props.getHistory('');
    }
    /**获取时间的实时变化 */
    searchContentChange(date, dateString){
        this.setState({searchContent:dateString});
    }

    /**搜索事件*/
    searchEvent(){
        const {searchContent} = this.state
        this.props.getHistory(searchContent)
    }

    /**根据数据渲染界面*/
    renderData() {
        let {data} = this.props;
        if(data && data.length) {
            return (
                this.props.data.map(e=>{
                    let curId = this.props.data.curId;
                    /**visible===1 表示到当前用户进行审核  前面为已审核，后面则为未审核 */
                    let flag = e.details.findIndex(e=>e.visible === 1);
                    let details = e.details;
                    let contents = '';
                    for(let i = 0; i < details.length; i++){
                        if(curId === details[i].userId)
                            contents = details[i].responsibility;
                        if(i < flag)
                            details[i]['flag'] = 0;
                        else {
                            details[i]['flag'] = 1;
                        }
                    }
                    return <Todo key={`${e.commonBatchNumber.id}-${this.props.flag?1:0}`} contents={contents}
                                 data={e.commonBatchNumber} details={details} curId={curId} url={this.props.url} fetch={this.props.fetch}
                                 getHistory={this.props.getHistory} flag={this.props.flag}
                                 checkFlag={home.judgeOperation(this.props.operation,'AUDIT')}
                    />
                })
            )
        } else {
            return <div className='divAuto'>暂无</div>;
        }
    }

    render(){
        return (
            <Spin spinning={this.props.loading} wrapperClassName={this.props.flag?'historyContianer':'container'} >
                <div className={this.props.flag?'historySearch':'hide'} >
                    <SearchCell name='请输入搜索内容' timeFlag={1} fetch={this.fetch} date={this.state.searchContent}
                                searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}
                                flag={home.judgeOperation(this.props.operation,'QUERY')}
                    />
                </div>
                <div>{this.renderData()}</div>
            </Spin>
        );
    }
}
export default TodoProcessed;
