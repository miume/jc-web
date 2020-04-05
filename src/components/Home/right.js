import React from 'react';
import {Route, Switch,withRouter} from 'react-router-dom';
import {routes} from './routes';
import QuickAccess from '../quickAccess/quickAccess';

class Right extends React.Component {
    componentWillMount() {
        const menuList = JSON.parse(localStorage.getItem('menuList')), auth = localStorage.getItem("authorization");
        if (!menuList || !auth) {
            localStorage.clear();
            window.location.pathname = '/';
        }
    }
    render() {
        
        return (
            <div className="rightDiv">
                <Switch>
                    {/**默认选中快速访问界面 */}
                    <Route exact path="/home" component={QuickAccess}/>
                    {
                        routes.map(e => {
                            return (
                                <Route key={e.path} path={e.path} component={e.component}></Route>
                            )
                        })
                    }
                </Switch>
            </div>
        )
    }
}

export default withRouter(Right);
