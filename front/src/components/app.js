import React from 'react'
import {Switch, Route} from 'react-router-dom'
import syncLoadComponent from '../common/loading_component'

import PComponent from './pComponent'
import SideBar from './home/side_bar'
import HomeHeader from './home/header'
// import MainContent from './home/content'
// import Papers from './papers/index'
import HomeFooter from './home/footer'

const MainContent = syncLoadComponent(() => import('./home/content'));
const Papers = syncLoadComponent(() => import('./papers/index'));
import {Layout} from 'antd'
import EventEmitter from '../common/event_emitter'
import './home/home.css'
export default class App extends PComponent {
    constructor() {
        super();
        this.isCollapsed = false;
    }
    componentWillMount() {
        window.EventEmitter = EventEmitter;
    }
    componentDidMount() {
        EventEmitter.on('toggleSideBar', this.toggleSideBar);
        EventEmitter.on('showFullScreenImg', this.showFullScreenImg);
        const windowWidth = window.innerWidth;
        if(windowWidth <= 760) {
            EventEmitter.emit('toggleSideBar', true);
        }
    }
    isMobileClient() {
        return window.innerWidth <= 500
    }
    toggleSideBar = (config) => {
        config = config || {};
        this.isCollapsed = config.isCollapsed !== undefined ? config.isCollapsed : !this.isCollapsed;
        if(this.isMobileClient()) {
            const fullScreenContainer = this.refs.fullScreenContainer;
            if(this.isCollapsed) {
                fullScreenContainer.style.display = 'none';
            } else {
                fullScreenContainer.style.display = 'flex';
                fullScreenContainer.style.opacity = '0.2';
            }
        } else {
            this.toggleMainContentPadding();
        }
    }
    toggleMainContentPadding() {
        const mainContent = this.refs.mainContent;
        let newClassName = '';
        if(!this.isCollapsed) {
            newClassName = 'trans-padding-left';
        }
        mainContent.setAttribute('class', newClassName);
    }
    showFullScreenImg = (src) => {
        const fullScreenContainer = this.refs.fullScreenContainer;
        fullScreenContainer.innerHTML = '';
        const imgNode = document.createElement('img');
        imgNode.setAttribute('src', src);
        fullScreenContainer.appendChild(imgNode);
        fullScreenContainer.style.display = 'flex';
        fullScreenContainer.style.opacity = '1';
    }
    onClickFullScreenContainer() {
        if(this.isMobileClient()) {
            EventEmitter.emit('toggleSideBar', {isCollapsed: true});
        }  else {
            const fullScreenContainer = this.refs.fullScreenContainer;
            fullScreenContainer.style.display = 'none';
        }
    }
    render() {
        return (
            <div style={{height: '100%'}}>
                <Layout style={{height: 'calc(100% - 40px)'}}>
                    <SideBar/>
                    <HomeHeader/>
                    <main id="mainContent" ref="mainContent" className="trans-padding-left">
                        <Switch>
                            <Route path="/" exact component={MainContent}/>
                            {/* <Route path="/papers/setup-website-by-ng2" component={SetupWebsiteByNg}/> */}
                            <Route path="/papers" component={Papers}/>
                        </Switch>
                    </main>
                    <div id="fullScreenContainer" ref="fullScreenContainer" onClick={() => this.onClickFullScreenContainer()}></div>
                </Layout>
                <HomeFooter />
            </div>
        )
    }
}