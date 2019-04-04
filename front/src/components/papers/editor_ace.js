import React from 'react'
import Paper from './paper'
import {Card, Icon} from 'antd'
export default class EditorAceIntro extends Paper {
    render() {
        const paperInfo = this.getPaperInfo('ace');
        const tags = this.getTags(paperInfo.tags);
        const paperTitle = paperInfo.title;

        return (
            <Card className="paper-card" title={paperTitle}>
                <div className="flex space-between" style={{marginBottom: '10px'}}>
                    {tags}
                    <div className="flex">
                        <div>
                            <Icon type="user" />
                            <span>周焕丰</span>
                        </div>
                        <div className="ml10">
                            <Icon type="clock-circle" />
                            <span>2019-04-04</span>
                        </div>
                    </div>
                </div>
                <article className="article">
                    <p className="paragraph">
                        前些日子在做一个项目的时候，需要实现一个web编辑器，可以实现代码补全、关键词高亮等常见功能。然后就找到了这个宝藏插件：ace.js。
                    </p>
                    <div className="steps">
                        <p className="steps-title">一、下载</p>
                        <p className="paragraph">
                            插件的github地址是{'https://github.com/ajaxorg/ace-builds/'}，我使用的是src-noconflict目录下的文件，当然你可以直接使用压缩过
                            的文件，但是我需要改源码，所以就不用。
                        </p>
                    </div>
                    <div className="steps">
                        <p className="steps-title">二、使用</p>
                        <p className="paragraph">
                            首先，你需要在适当的地方引入ace.js。如果你不需要懒加载，就直接在index.html引入就好了。确定好你要加载编辑器的区域，给dom元素一个
                            id，如下：
                        </p>
                        <div className="codes">
                            <ol start="1">
                                <li>var editor = ace.edit("id")</li>
                                <li>edtior.setTheme("ace/theme/chrome") //设置编辑器主题样式</li>
                                <li>editor.session.setMode("ace/mode/javascript"); //设置语言</li>
                            </ol>
                        </div>
                        <p className="paragraph">
                            ace支持多种语言，打开src-noconflict目录以mode开头的文件都是一种语言。这时候你当然想问还有哪些功能，更多的api在ace.d.ts文件中
                            已经全部列出，下面是一些常见的功能：
                        </p>
                        <div className="codes">
                            <ol start="1">
                                <li>editor.renderer.setShowGutter(true); //显示行号</li>
                                <li>this.editor.setShowFoldWidgets(true); //代码折叠</li>
                                <li>editor.setHighlightActiveLine(false); //选中行高亮</li>
                                <li>ace.require('ace/ext/language_tools'); //该模块包含了常用的for,if/else快速补全，关键词补全功能</li>
                                <li>editor.setOptions({'{'}</li>
                                <li dangerouslySetInnerHTML={{__html: "&nbsp;&nbsp;enableSnippets: true,"}}></li>
                                <li dangerouslySetInnerHTML={{__html: "&nbsp;&nbsp;enableLiveAutocompletion: true,"}}></li>
                                <li>})</li>
                            </ol>
                        </div>
                        <p className="paragraph">
                            当然是可以自定义添加智能补全的列表内容的，但是要看一堆源码，慢慢debug才能实现的，没那么简单，我也不想贴代码。
                            如果你想知道怎么搞又不会的时候就找我吧/斜眼笑

                        </p>
                    </div>
                </article>
            </Card>
        )
    }
}