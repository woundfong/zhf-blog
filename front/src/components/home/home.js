import React from 'react'
import {Layout} from 'antd'
const {Content} = Layout
import './home.css'
export default class Home extends React.Component {
    render() {
        return (
            <Content id="mainContent" className={this.props.isCollapsed?'':'trans-padding-left'}>
                {this.props.children}
            </Content>
            // <Layout style={{height: '100%'}}>
            //     <SideBar isCollapsed={this.state.isCollapsed} toggleSideBar={this.toggleSideBar.bind(this)}/>
            //     <HomeHeader isCollapsed={this.state.isCollapsed}/>
            //     <Content id="mainContent" className={this.state.isCollapsed?'':'trans-padding-left'}>
            //         {this.props.children}
            //     </Content>
            // </Layout>
        )
    }
  }
  