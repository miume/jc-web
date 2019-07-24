import React from 'react';
import './data.css';
import DataPart from './dataPart';
import Blockquote from '../BlockQuote/blockquote';

const icon = [
    'fa fa-file-o fa-5x','fa fa-table fa-5x','fa fa-search fa-5x'
]

class EquipmentCheck extends React.Component{
    componentDidMount(){
        this.getData()
    }
    current
    constructor(props){
        super(props);
        this.state = {
            path:'',
        }
        this.click = this.click.bind(this);
        this.current = localStorage.getItem('current')?JSON.parse(localStorage.getItem('current')):null
        this.getData = this.getData.bind(this);
    }
    click(e){
        const path = e.target.id.split('-');
        const dataEntry = {
           openKeys : this.current.menuId,
           menuName : path[1],
           menuParent : this.current.menuName,
           path : path[0]
       }
       localStorage.setItem('equipmentCheck',JSON.stringify(dataEntry))
        this.props.history.push({pathname:path[0]})
   }
   getData(){
        const menus = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path=== this.current.path)[0]:[];
        var data = menus&&menus.menuList?
            menus.menuList.sort((a,b)=>a.menuId-b.menuId).map((m,index)=>{
                return ({
                    id : m.menuId,
                    name : m.menuName,
                    path : `${m.path}-${m.menuName}`,
                    className : icon[index]
                })
            }):[]
        this.setState({
            data : data
        })
    }
    render(){
        return (
            <div>
                <Blockquote name={this.current?this.current.menuName:''} menu={this.current?this.current.menuParent:''} />
                <div className='dataEntry'>
                    <div className='card-parent'>
                    {
                        this.state.data?this.state.data.map(d=>
                        <DataPart key={d.id} id={d.id} name={d.name} path={d.path} click={this.click} className={d.className} ></DataPart>
                        ):null
                    }
                </div>
           </div>
           </div>
        );
    }
}

export default EquipmentCheck