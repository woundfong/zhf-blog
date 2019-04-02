import React from 'react'

export default class PComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            isCollapsed: false
        }
    }
    componentDidMount() {
        EventEmitter.on('toggleSideBar', this.toggleSideBar);
    }
    componentWillUnmount() {
        EventEmitter.remove('toggleSideBar', this.toggleSideBar);
    }
    toggleSideBar = (config) => {
        config = config || {};
        if(this.componentName === 'HomeHeader' && !config.setState) {
            return;
        }
        this.setState({
            isCollapsed: config.isCollapsed === undefined ? !this.state.isCollapsed : config.isCollapsed
        })
    }
    render() {
        return ""
    }
}