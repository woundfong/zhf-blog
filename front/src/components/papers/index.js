import React from 'react'
import {Switch, Route} from 'react-router-dom'
import syncLoadComponent from '../../common/loading_component'
// import SetupWebsiteByNg from './setup_website_by_ng'
const SetupWebsiteByNg = syncLoadComponent(()=> import('./setup_website_by_ng'))
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
        const routes = [
            {
                path: '/papers/setup-website-by-ng2',
                title: '阿里云服务器布置angular2网站',
                component: <SetupWebsiteByNg/>,
            }
        ].map((paper) => {
            return (
                <Route path={paper.path} render={() => {
                    switchPaper(paper.title);
                    return paper.component
                }}/>
            )
        })
        return (
            <Switch>
                {/* <Route path="/papers/setup-website-by-ng2" component={SetupWebsiteByNg}/> */}
                {routes}
            </Switch>
        )
    }
}