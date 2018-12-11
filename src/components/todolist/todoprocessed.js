import React from 'react';
import axios from 'axios';
import Todo from './todo';
import './todolist.css';

class TodoProcessed extends React.Component{
    server
    Authorization
    componentDidMount(){
        this.fetch();
    }
    componentWillUnmount(){
        this.setState=()=>{
            return;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            data:[],
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
            this.setState({
                // createPersonId:res?res[0].commonBatchNumber.createPersonId:-1,
                data:res
            })
            console.log(res)
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
            <div style={{padding:'15px',overflow:'auto'}}>
            <div style={{height:'100%'}}>
            {
              this.state.data?this.state.data.map(e=>{
                  return <Todo key={e.commonBatchNumber.id} data={e.commonBatchNumber} details={e.details} />
              }):null
            }   
            </div> 
            </div>
        );
    }
}
export default TodoProcessed;