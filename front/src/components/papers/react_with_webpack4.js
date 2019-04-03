import React from 'react'
import Paper from './paper'
import {Link} from 'react-router-dom'
import routers from '../../config/router.config'
import {Card, Tag, Icon} from 'antd'
export default class ReactWithWebpack4 extends Paper {
    render() {
        const tags = routers.papers[1].tags.map((tag) => {
            return <Tag>{tag}</Tag>
        });
        const paperTitle = routers.papers[0].title;
        return (
            <Card className="paper-card" title={paperTitle}>
                <div className="flex space-between" style={{marginBottom: '10px'}}>
                    <div className="tags-container flex">
                        <Icon type="tags" />
                        {tags}
                    </div>
                    <div className="flex">
                        <div>
                            <Icon type="user" />
                            <span>周焕丰</span>
                        </div>
                        <div className="ml10">
                            <Icon type="clock-circle" />
                            <span>2019-04-02</span>
                        </div>
                    </div>
                </div>
                <article className="article">
                    <div className="writen" id="writen-before">
                        <h3>前言</h3>
                        <p className="paragraph">
                        菜鸟如我，第一次学react时总会跟着官网用create-react-app构建一个应用，然后敲一行npm start就能启动了。但是这仅仅满足于react
                        的技能学习。到公司里的项目基本都是从一个package.json文件开始慢慢搭建的(当然也有用一个更强大的框架作为基础搭建起的)，因为这样可以
                        满足更多的开发需求，发布需求。本文就使用webpack搭建时遇到的一些问题记录下来，如有错误的地方，望指正。
                        </p>
                    </div>
                    <div className="steps">
                        <p className="steps-title"> 一、 组件懒加载</p>
                        <p className="paragraph">
                            我们用react的时候肯定会用到组件懒加载，通常配合着路由使用，主要是节省流量以及减少首屏时间。我用的是react-loadable插件，异步
                            加载组件，使用的方法如下:
                        </p>
                        <div className="codes">
                            <ol start="1">
                                <li> {"import Loadable from 'react-loadable';"}  </li>
                                <li> {"function Loading() {"} </li>
                                <li> {"  return <div>Loading...</div>;"} </li>
                                <li> {"}"} </li>
                                <li> {'const LoadableBar = Loadable({'} </li>
                                <li> {"  loader: () => import('./components/Bar')"} </li>
                                <li> {"  loading: Loading"} </li>
                                <li> {"})"} </li>
                            </ol>
                        </div>
                        <p className="paragraph">
                            上面的代码演示了如何异步加载一个LoadableBar组件。更多的用法请看官网。但是webpack打包的时候会报一个错，大概是需要再安装一个
                            {'@babel/plugin-syntax-dynamic-import'}插件才能这样使用。没问题，于是我们补到babel的plugins里面就行，如图：
                        </p>
                        <div className="codes">
                            <ol start="1">
                                <li> {"test: /(\.js|\.jsx)$/,"}  </li>
                                <li> {"use: {"} </li>
                                <li> {'  loader: "babel-loader",'} </li>
                                <li> {"  options: {"} </li>
                                <li> {'    presets: ["@babel/preset-env", "@babel/preset-react"],'} </li>
                                <li> {'    plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-dynamic-import"]'} </li>
                                <li> {"  }"} </li>
                                <li> {"}"} </li>
                            </ol>
                        </div>
                        <p className="paragraph">
                            执行{'webpack -p'}后，会发现dist目录下会将生成了一些资源文件，但是名字是随机数，如2.js之类的。然后就衍生出下面
                            遇到的问题...
                        </p>
                    </div>
                    <div className="steps">
                        <p className="steps-title">二、在非根目录的路由下请求文件路径错误</p>
                        <p className="paragraph">
                            使用react-loadable打包后，在根路由({'/'})的请求没什么问题，但是一旦进入到某个子路由，如/papers里面，然后请求某个资源文件
                            的路径都会变成类似{'http://ip:port/papers/1.js'}这样。显而易见，当然是一个404请求，因为资源都放到dist目录里了。
                        </p>
                        <p className="paragraph">
                            这时候就会想到webpack的配置里好像有一个叫做publicPath的狠角色。对于按需加载来说，publicPath是一个很重要的选项。这个按我的
                            理解就是一个{'<base>'}标签，指定了浏览器转换url的相对路径。webpack.config文件的output内容大概就是这样的：
                        </p>
                        <div className="codes">
                            <ol start="1">
                                <li> {"output: {"}  </li>
                                <li> {"  path: path.resolve(__dirname, 'dist'),"}  </li>
                                <li> {"  filename: '[name].js',"}  </li>
                                <li> {"  publicPath: '/dist/'"}  </li>
                                <li> {"}"}  </li>
                            </ol>
                        </div>
                        <p className="paragraph">
                            但是做到这个程度我还是有一个不知道该怎么解决的bug，就是用webpack-dev-server运行的项目时，启动后会报一个错误：{'Uncaught ReferenceError: __webpack_require__ is not defined'}，导致页面无法
                            正常运行。在我百搜不得其解后决定放弃使用webpack-dev-server运行项目...，等到哪一天我知道怎么解决后再回来更新吧，如果哪位大神知晓
                            这个错误可以告诉我是怎么回事吗？<Icon type="smile" rotate={180} /><Icon type="like" />
                        </p>
                        <p className="paragraph">
                            遇到上面的问题总不能放弃继续搭建吧，肯定要想一个其它的办法。既然搞不定webpack-dev-server，那就自己搭个服务端呗。
                        </p>
                    </div>
                    <div className="steps">
                        <p className="steps-title">三、使用express作为服务端</p>
                        <p className="paragraph">
                            搭建express的过程在我的另一篇<Link to="/papers/setup-website-by-ng2">文章</Link>里说的挺详细的，但是由于angular2和react不一样，有一些地方要改一下：
                        </p>
                        <div className="codes">
                            <ol start="1">
                                <li> {"//app.use(express.static(path.join(__dirname, 'front/dist'))); //angular2"} </li>
                                <li> {"app.use(express.static(path.join(__dirname, 'front'))); //react"} </li>
                                <li> {" "} </li>
                                <li> {"/* angular2"} </li>
                                <li> {"app.get('*', (req, res)=>{"} </li>
                                <li> {"  res.sendFile(path.join(__dirname, 'front/dist/index.html'));"} </li>
                                <li> {"}) */"} </li>
                                <li> {"app.get('*', (req, res)=>{"} </li>
                                <li> {"  res.sendFile(path.join(__dirname, 'front/index.html'));"} </li>
                                <li> {"})"} </li>
                            </ol>
                        </div>
                        <p className="paragraph">
                            主要是因为angular2的ng-build命令会将所有的静态资源(包括index.html)都打包到dist目录下，而我是手动用webpack打包的，只是定义了一些资源
                            打包到dist目录而已。如果你不想改，那就将index.html也放到dist目录里就好了，只是index.html里加载资源的路径要改一下。
                        </p>
                        <p className="paragraph">
                            随着一句熟悉的npm start，输入ip+端号项目就起来喽。然而还是被刚刚webpack-dev-server的问题搞的很不爽，怪自己太菜...
                        </p>
                    </div>
                </article>
            </Card>
        )
    }
}