import React from 'react'
import {Switch, Route} from 'react-router-dom'
import syncLoadComponent from '../../common/loading_component'
import routers from '../../config/router.config'
import './paper.css'

export default class Papers extends React.Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    render() {
        const switchPaper = (title) => {
            EventEmitter.emit('showPaper', title);
            EventEmitter.emit('toggleSideBar', {isCollapsed: true});
        }
        const paperRouters = routers.papers.map((route) => {
            let Component = syncLoadComponent(() => import(""+route.url));
            return (
                <Route path={route.path} render={() => {
                    switchPaper(route.title);
                    return <Component />
                }}/>
            )
        })
        return (
            <Switch>
                {paperRouters}
            </Switch>
        )
    }
}