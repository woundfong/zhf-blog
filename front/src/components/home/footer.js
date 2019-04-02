import React from 'react'
import PComponent from '../pComponent'

export default class HomeFooter extends PComponent {
    render() {
        return (
            <footer id="homeFooter" className={this.state.isCollapsed?'':'trans-padding-left'}>
                <span class="copyright">周焕丰 © 2017-2019 &nbsp;</span>
                <span class="ipc-number">
                    <a href="http://www.miitbeian.gov.cn/">粤ICP备17114499号
                    </a>
                </span>  
            </footer>
        )
    }
}