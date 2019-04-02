import React from 'react'
import {Link} from 'react-router-dom'
import MediaQuery from 'react-responsive'
import {Card} from 'antd'
const {Meta} = Card;
export default class MainContent extends React.Component {
    componentDidMount() {
        EventEmitter.emit('showPaper', null);
    }
    render() {
        const contens = [
            {
                title: '阿里云服务器布置angular2网站',
                src: './src/images/ng2.jpg',
                to: 'setup-website-by-ng2'
            }
        ].map((content) => {
            return (
                <Link to={'/papers/' + content.to}>
                    <Card 
                        className="home-card"
                        hoverable
                        cover={<img alt="angular" src={content.src} />}
                    >
                        <Meta 
                            title={content.title}
                        />
                    </Card>
                </Link>
            )
        })
        return (
            <div>
                {contens}
            </div>
        )
    }
}