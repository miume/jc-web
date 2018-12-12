import React from 'react';
import axios from 'axios';
import Todo from './todo';
import './todolist.css';
import { Certificate } from 'crypto';

class TodoProcessed extends React.Component{
    server
    Authorization
    componentDidMount(){
        this.fetch();
    }
    componentWillUnmount() {
        this.setState = () => {
          return ;
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
            const count = res? res.length : 0;
            this.setState({
                data:res
            })
            this.props.getCount(count);
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
        const data = [
            'quan',
            'line2',
            'quan',
            'line2',
            'quan'
        ]
        return (
            <div style={{padding:'15px', overflowX:'auto'}}>
                <div style={{height:'100%'}}>
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