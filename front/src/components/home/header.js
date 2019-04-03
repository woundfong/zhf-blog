import React from 'react'
import PComponent from '../pComponent'
export default class HomeHeader extends PComponent {
    constructor() {
        super();
        this.state = {
            isCollapsed: false,
            headerTitle: '周焕丰 a rookie web developer...',
            showTopHeader: false,
            webHeaderInfoTitle: '周焕丰 a rookie web developer...'
        }
    }
    componentWillUnmount() {
        EventEmitter.remove('showPaper', this.onShowPaper);
        EventEmitter.remove('toggleSideBar', this.toggleSideBar);
        EventEmitter.remove('scrollTop', this.onScrollTop);
    }
    componentDidMount() {
        EventEmitter.on('toggleSideBar', this.toggleSideBar);
        EventEmitter.on('showPaper', this.onShowPaper);
        EventEmitter.on('scrollTop', this.onScrollTop);
    }
    onShowPaper = (title) => {
        this.setState({
            headerTitle: title,
            webHeaderInfoTitle: title ? '' : '周焕丰 a rookie web developer...',
            isCollapsed: title ? true : false
        })
    }
    onScrollTop = (scrollTop) => {
        let showTopHeader = false;
        if(scrollTop >= 57) {
            showTopHeader = true;
        }
        this.setState({
            showTopHeader: showTopHeader
        })
    }
    render() {
        this.componentName = 'HomeHeader';
        return (
            <div>
                <header 
                    id="top-header" 
                    className={this.state.isCollapsed?'home-header':'home-header trans-padding-left'}
                    style={{display: this.state.showTopHeader?'flex':'none'}}
                >
                    <span>{this.state.headerTitle}</span>
                </header>
                <header 
                    id="info-header" 
                    className={this.state.isCollapsed?'home-header':'home-header trans-padding-left'}
                    // style={{display: this.state.showTopHeader?'none':'block'}}
                >
                    <span style={{paddingLeft: '10px'}}>
                        {this.state.webHeaderInfoTitle}
                    </span>
                </header>
            </div>
        )
    }
}