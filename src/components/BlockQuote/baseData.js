import React,{Component} from 'react'
import BlockQuote from "./blockquote";
import {withRouter} from 'react-router-dom'
import DataPart from "../qualityProcess/dataEntry/dataPart";
import Blockquote from "../positiveCost/baseData/otherBaseInfo/otherBaseInfo";

const ICON = ['fa fa-tasks fa-5x','fa fa-flask fa-5x','fa fa-leaf fa-5x',
    'fa fa-shopping-cart fa-5x','fa fa-code-fork fa-5x',
    'fa fa-cube fa-5x','fa fa-exclamation-triangle fa-5x',
    'fa fa-crosshairs fa-5x','fa fa-superpowers fa-5x','fa fa-grav fa-5x'];

class BaseData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.click = this.click.bind(this);
        this.getData = this.getData.bind(this);
    }

    render(){
        let {current} = this.props, {data} = this.state;
        return(
            <div>
                <BlockQuote menu={current.menuParent} name={current.menuName}/>
                <div className='dataEntry'>
                    <div className='card-parent'>
                        {
                            data && data.length ? data.map(d =>
                                <DataPart key={d.id} id={d.id} name={d.name} path={d.path} click={this.click} className={d.className} ></DataPart>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        let {current} = this.props;
        this.getData(current)
    }

    getData(current) {
        const menus = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.path === current.path)[0] : [];
        let data = menus && menus['menuList'] ?
            menus['menuList'].sort((a,b)=>a.menuId-b.menuId).map((m,index)=>{
                return ({
                    id : m.menuId,
                    name : m.menuName,
                    path : `${m.path}-${m.menuName}-${m.menuId}`,
                    className : ICON[index]
                })
            }):[];
        this.setState({
            data:data
        })
    }

    click(e) {
        let path = e.currentTarget.id.split('-'), {menuId,menuName} = this.props.current;
        const inspectionManagement={
            openKeys: menuId,
            menuName: path[1],
            menuParent: menuName,
            path: path[0],
            menuId: parseInt(path[2])
        };
        localStorage.setItem('dataEntry',JSON.stringify(inspectionManagement))
        this.props.history.push({pathname:path[0]})
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}
export default withRouter(BaseData)
