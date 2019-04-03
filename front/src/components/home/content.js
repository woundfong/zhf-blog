import React from 'react'
import {Link} from 'react-router-dom'
import routers from '../../config/router.config'
import { List, Tag, Icon } from 'antd';
export default class MainContent extends React.Component {
    componentDidMount() {
        EventEmitter.emit('showPaper', null);
    }
    render() {
        const papers = routers.papers;
        return (
            <List 
                itemLayout="vertical"
                dataSource={papers}
                bordered
                size="large"
                renderItem={paper => {
                    const tags = paper.tags.map((tag) => (
                        <Tag>{tag}</Tag>
                    ))
                    return <List.Item>
                            <div className="flex space-between" style={{padding: '0 10px'}}>
                                <Link to={paper.path}>{paper.title}</Link>
                                <div className="flex">
                                    <Icon type="tags" />
                                    {tags}
                                </div>
                            </div>
                    </List.Item>
                }}
            />
        )
    }
}