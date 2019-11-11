import React from 'react';
import './data.css';
import DataPart from './dataPart';
import Blockquote from '../../BlockQuote/blockquote';

const icon = [
    'fa fa-tasks fa-5x','fa fa-flask fa-5x','fa fa-flask fa-5x','fa fa-flask fa-5x','fa fa-flask fa-5x'
]

class BaseData extends React.Component{
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }

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
        let currentTarget = e.currentTarget,
            id = currentTarget.id.split('-');
        const dataEntry = {
            menuName : id[1],
            menuParent : this.current.menuName,
            menuParentId: this.current.menuId,
            menuId: parseInt(id[2])
        };
        localStorage.setItem('dataEntry',JSON.stringify(dataEntry));
        this.props.history.push({pathname:id[0]})
   }
   getData(){
        const menus = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path=== this.current.path)[0]:[];
        var data = menus&&menus.menuList?
            menus.menuList.sort((a,b)=>a.menuId-b.menuId).map((m,index)=>{
                return ({
                    name : m.menuName,
                    id : `${m.path}-${m.menuName}-${m.menuId}`,
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
                        <DataPart key={d.id} id={d.id} name={d.name} click={this.click} className={d.className}></DataPart>
                        ):null

                    }
                </div>
           </div>
           </div>
        );
    }
}

export default BaseData;
