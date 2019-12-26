import React from 'react';
import './data.css';
import DataPart from './dataPart';
import Blockquote from '../../BlockQuote/blockquote';
//用来存取数据录入子菜单渲染的icon
const icon = ['fa fa-tasks fa-5x','fa fa-flask fa-5x','fa fa-leaf fa-5x',
              'fa fa-shopping-cart fa-5x','fa fa-code-fork fa-5x',
              'fa fa-cube fa-5x','fa fa-exclamation-triangle fa-5x',
              'fa fa-crosshairs fa-5x'];
// const data = [{
//     id:1,
//     name:'制程检测',
//     path:'/processInspection',
//     className:'fa fa-tasks fa-5x'
// },{
//     id:2,
//     name:'样品送检',
//     path:'/sampleInspection',
//     className:'fa fa-flask fa-5x'
// },{
//     id:3,
//     name:'原材料检测',
//     path:'/rawTestReport',
//     className:'fa fa-leaf fa-5x'
// },{
//     id:4,
//     name:'进货检验',
//     path:'/PurchaseCheckReport',
//     className:'fa fa-shopping-cart fa-5x'
// },{
//     id:5,
//     name:'中间品检验',
//     path:'/InterProduct',
//     className:'fa fa-code-fork fa-5x'
// },{
//     id:6,
//     name:'成品检验',
//     path:'/productInspection',
//     className:'fa fa-cube fa-5x'
// },{
//     id:7,
//     name:'不合格审评表',
//     path:'/unqualifiedExamineTable',
//     className:'fa fa-exclamation-triangle fa-5x'
// },{
//     id:8,
//     name:'不合格跟踪表',
//     path:'/unqualifiedTrackTable',
//     className:'fa fa-crosshairs fa-5x'
// }]

class DataEntry extends React.Component{
    componentDidMount(){
        this.getData()
    }
    current;
    constructor(props){
        super(props);
        this.state = {
            clickId:'',
            flag:0,
            path:'',
            clickButton:''
        };
        this.click = this.click.bind(this);
        this.current = localStorage.getItem('current')?JSON.parse(localStorage.getItem('current')):null
        this.getData = this.getData.bind(this);
    }
    click(e){
        const path = e.currentTarget.id.split('-');
        const dataEntry = {
            openKeys : this.current.menuId,
            menuName : path[1],
            menuParent : this.current.menuName,
            path : path[0]
        };
        localStorage.setItem('dataEntry',JSON.stringify(dataEntry));
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
            }):[];
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
export default DataEntry;
