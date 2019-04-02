import React from 'react'
import {Link} from 'react-router-dom'
import {Menu, Icon} from 'antd'
import PComponent from '../pComponent'
import SubMenu from 'antd/lib/menu/SubMenu';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1102675_686huw283yv.js',
});
export default class SideBar extends PComponent {
    toggle() {
        EventEmitter.emit('toggleSideBar', {setState: true});
    }
    render() {
        this.componentName = 'SideBar';
        return (
            <aside 
                id="homeSideBar" 
                className={this.state.isCollapsed?'hide':'shown'}
            >
                <span className="fold-menu-icon">
                    <Icon className="trigger" type={this.state.isCollapsed?'menu-unfold':'menu-fold'} 
                        onClick={() => {this.toggle()}}
                    />
                </span>
                <div id="sidebar-header-bg"></div>
                <span id="sidebar-header-name">周焕丰</span>
                <img id="sidebar-header-logo" src="./src/images/header-logo.jpg"/>
                <Menu mode="inline" defaultSelectedKeys={['home']} style={{'padding-top': '40px'}}>
                    <Menu.Item key="home">
                    <Link to='/'>
                        <Icon type="home" />
                        <span>首页</span></Link>
                    </Menu.Item>
                    <SubMenu key="articles" title={<span><Icon type="book"/><span>文章</span></span>}>
                        <Menu.Item key="angular2">
                        <Link to='/papers/setup-website-by-ng2'>
                            <IconFont type="icon-angular" />
                            <span title="阿里云服务器布置angular2网站">阿里云服务器布置angular2网站</span></Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </aside>
        )
    }
}