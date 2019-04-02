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
    toggleSideBar = () => {
        const mainContent = this.refs.mainContent;
        const classNames = mainContent.getAttribute('class');
        let newClassName = '';
        if(classNames.indexOf('trans-padding-left') < 0) {
            newClassName = 'trans-padding-left';
        }
        mainContent.setAttribute('class', newClassName);
    }
    showFullScreenImg = (src) => {
        const imgFullScreenContainer = this.refs.imgFullScreenContainer;
        imgFullScreenContainer.innerHTML = '';
        const imgNode = document.createElement('img');
        imgNode.setAttribute('src', src);
        imgFullScreenContainer.appendChild(imgNode);
        imgFullScreenContainer.style.display = 'flex';
    }
    onClickImgFullScreenContainer() {
        const imgFullScreenContainer = this.refs.imgFullScreenContainer;
        imgFullScreenContainer.style.display = 'none';
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
                    <div id="imgFullScreenContainer" ref="imgFullScreenContainer" onClick={() => this.onClickImgFullScreenContainer()}></div>
                </Layout>
                <HomeFooter />
            </div>
        )
    }
}