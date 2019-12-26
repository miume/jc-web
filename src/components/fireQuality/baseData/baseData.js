import React,{Component} from 'react'
import BlockQuote from "../../BlockQuote/blockquote";
import DataPart from "../../qualityProcess/dataEntry/dataPart";

const data=[{
    id:1,
    name:'编号规则',
    path:'/fireSeriRule',
    className:'fa fa-industry fa-5x'
},{
    id:2,
    name:'检验项目',
    path:'/fireTestItem',
    className:'fa fa-wrench fa-5x'
},{
    id:3,
    name:'送检部门',
    path:'/fireInspecDep',
    className:'fa fa-tint fa-5x'
},{
    id:4,
    name:'批号与检验项目',
    path:'/fireSerialTest',
    className:'fa fa-sitemap fa-5x'
},{
    id:5,
    name:'标签与检验项目',
    path: '/fireLabelTest',
    className:'fa fa-sitemap fa-5x'
}]

const icon=['fa fa-industry fa-5x','fa fa-wrench fa-5x','fa fa-tasks fa-5x',
    'fa fa-tint fa-5x','fa fa-sitemap fa-5x'];

class FireQuaBase extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.click = this.click.bind(this);
        this.getData = this.getData.bind(this);
    }

    render(){
        this.current=JSON.parse(localStorage.getItem('current'))?JSON.parse(localStorage.getItem('current')):null
        return(
            <div>
                <BlockQuote menu={this.current.menuParent} name={this.current.menuName}/>
                <div className='dataEntry'>
                    <div className='card-parent'>
                        {
                            this.state.data ? this.state.data.map(d=>
                                <DataPart key={d.id} id={d.id} name={d.name} path={d.path} click={this.click} className={d.className} ></DataPart>
                            ):null
                        }
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.getData()
    }

    click(e) {
        let path = e.currentTarget.id.split('-')
        const inspectionManagement={
            openKeys:this.current.menuId,
            menuName:path[1],
            menuParent:this.current.menuName,
            path:path[0]
        };
        localStorage.setItem('inspectionManagement',JSON.stringify(inspectionManagement))
        this.props.history.push({pathname:path[0]})
    }

    getData(){
        const menus=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===this.current.path)[0]:[];
        var data=menus&&menus.menuList?
            menus.menuList.sort((a,b)=>a.menuId-b.menuId).map((m,index)=>{
                return ({
                    id : m.menuId,
                    name : m.menuName,
                    path : `${m.path}-${m.menuName}`,
                    className : icon[index]
                })
            }):[];
        this.setState({
            data:data
        })
    }

}
export default FireQuaBase
