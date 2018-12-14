import React from 'react';
import axios from 'axios';
import Todo from './todo';
import './todolist.css';
const data = [];
for(var i = 1; i < 4; i++){
    data.push({
            commonBatchNumber:{
                  batchNumber: "ECT/99c4cb57dc53",
                    createPersonId: 1,
                    createTime: "2018-11-27 14:37:35",
                    dataType: 2,
                    description: "制程检测",
                    id: `${i}`,
                    isUrgent: -1,
                    memo: "制程检测专用",
                    status: 0,
            },
            createPersonName: "王大大",
            details:[{
                personName: "嘻嘻嘻",
                   responsibility: "算命",
                   taskType: 2,
                   userId: 121,
                   visible: null,
            },{
                personName: "陈小春",
                 responsibility: "打野",
                 taskType: 2,
                 userId: 129,
                 visible: null
            },{
                personName: "王大大",
                  responsibility: "抽签",
                  taskType: 2,
                  userId: 1,
                  visible: 1,
            },{
                 personName: "嘻嘻嘻",
                    responsibility: "算命",
                    taskType: 2,
                    userId: 121,
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
    server
    Authorization
    componentDidMount(){
       // this.fetch();
    }
    componentWillUnmount() {
        this.setState = () => {
          return ;
        }
      }
    constructor(props){
        super(props);
        this.state = {
            data:data,
            createPersonId:-1
        }
        this.fetch = this.fetch.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
    }
    /**根据当前登陆用户id获取待办事项 */
    fetch(){
        const id = localStorage.getItem('menuList')?JSON.parse(localStorage.getItem('menuList')).userId:-1;
        axios.get(`${this.server}/jc/common/toDoList/${id}`,{
            headers:{
                'Authorization':this.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            const count = res? res.length : 0;
            this.setState({
                data:res
            })
            this.props.getCount(count);
        })
    }
    moveLeft(){
        const moveItem = document.getElementsByClassName('item2Scroll');
        moveItem.scrollLeft(100);
    }
    render(){
        this.server = localStorage.getItem('remote');
        this.Authorization = localStorage.getItem('Authorization');
        return (
            <div style={{padding:'15px',overflow:'auto',height:'480px'}}>
                    <div>
                        {
                            this.state.data?this.state.data.map(e=>{
                                return <Todo key={e.commonBatchNumber.id} data={e.commonBatchNumber} details={e.details} />
                            }):null
                        }   
                    </div> 
                    {/* <div className='wrapxxx'>
                        {data.map((e,index) => {
                            return (
                                <div key={index} className={e}></div>
                            )
                        })}
                    </div> */}
            </div>
        );
    }
}
export default TodoProcessed;