import React from 'react'
import Paper from './paper'
import {Card, Icon, Button, Steps} from 'antd'
const Step = Steps.Step;
export default class SetupWebsiteByNg extends Paper {
    constructor() {
        super();
        this.state = {
            securityGroupIndex: 0,
            domainStepIndex: 0,
            nodeEnvStepIndex: 0
        }
    }
    render() {
        const paperInfo = this.getPaperInfo('angular2');
        const tags = this.getTags(paperInfo.tags);
        const paperTitle = paperInfo.title;
        const securityGroupSteps = [
            {title: '安全组列表', content: '../src/images/securityGroupsList.png', isImg: true},
            {title: '配置规则', content: '../src/images/rulesConfig.png', isImg: true},
            {title: '添加安全组规则（SSH，对所有地址段开放）', content: '../src/images/addRules.png', isImg: true}
        ];
        const domainSteps = [
            {title: '实名认证', content: (
                <p class="paragraph">
                很多域名必须经过实名认证才能被解析，具体可以查看阿里云的
                    <a href="https://bbs.aliyun.com/read/322733.html">
                        域名实名认证公告
                    </a>
                。过程也不麻烦，上传一下身份证照片就好了。
                </p>
            )},
            {title: '域名备案', content: (
                <div>
                <p class="paragraph">
                根据工信部《互联网信息服务管理办法》(国务院 292 号令)，网站在未完成备案之前，不能指向大陆境内服务器开通访问。
                </p>
                <p class="paragraph">
                阿里云能够帮我们一站式备案，根据指引一步一步填信息。中间有些过程是要上传个人照片，身份证照片的，根据指示使用阿里云app
                就会比较方便搞定。中间有个比较麻烦的地方就是要下载一个个人网站备案承诺书，打印出来签名再上传。
                </p>
                <p class="paragraph">
                备案提交之后大概要等1-2个星期，期间耐心等待，注意一下手机的电话，可能会有阿里云或者通管局的人打过来确认。
                </p>
                </div>
            )},
            {title: '域名解析', content: (
                <div>
                <p class="paragraph">
                通过左侧菜单找到域名服务
                </p>
                <figure>
                <div class="figure-box">
                    <div class="img-shadow"></div>
                    <img id="xshell-connection-img" src="../src/images/myDomain.png" />
                </div>
                <figcaption>我的域名</figcaption>
                </figure>
                <p class="paragraph">
                点击解析，进入域名解析列表。
                </p>
                <figure>
                <div class="figure-box">
                    <div class="img-shadow"></div>
                    <img id="xshell-connection-img" src="../src/images/domain-parse.png" />
                </div>
                <figcaption>域名解析</figcaption>
                </figure>
                <p class="paragraph">
                添加解析，记录类型选择A，主机记录自己定义，通俗的理解就是域名的前缀，根据业务需求添加不同的解析。
                记录值就是主机的ip地址。
                </p>
                </div>
            )}
        ]
        const nodeEnvironmentSteps = [
            {title: '打开profile', content: (
                <div className="codes">
                    <ol start="1">
                        <li> #编辑profile </li>
                        <li> {"vim etc/profile"} </li>
                    </ol>
                </div>
            )},
            {title: '添加node到环境变量', content: (
                <div className="codes">
                    <ol start="1">
                        <li> #profile文件最后添加以下代码 </li>
                        <li> {"export NODE_PATH=/root/node-v6.9.5-linux-x64/bin"} </li>
                        <li> {"export PATH=${PATH}:${NODE_PATH}"} </li>
                    </ol>
                </div>
            )},
            {title: '马上生效profile', content: (
                <div className="codes">
                    <ol start="1">
                        <li> #即刻生效profile </li>
                        <li> {"source etc/profile"} </li>
                    </ol>
                </div>
            )}
        ]
        return (
            <Card className="paper-card" title={paperTitle}>
                <div className="flex space-between" style={{marginBottom: '10px'}}>
                    {tags}
                    {/* <div className="tags-container flex">
                        <Icon type="tags" />
                        {tags}
                    </div> */}
                    <div className="flex">
                        <div>
                            <Icon type="user" />
                            <span>周焕丰</span>
                        </div>
                        <div className="ml10">
                            <Icon type="clock-circle" />
                            <span>2017-09-18</span>
                        </div>
                    </div>
                </div>
                <article className="article">
                    <div className="writen" id="writen-before">
                        <h3>前言</h3>
                        <p className="paragraph">
                        作为一个前端小白，拥有一个自己的个人网站是一件令人兴奋的事。但是又希望使用angular2&nbsp;+&nbsp;express这样的一套框架
                        部署自己的网站，也能尝试使用node做一点后台开发的工作，逐渐掌握全栈开发的能力。
                        </p>
                        <p className="paragraph">
                        本文将介绍如何将express+angular2开发的项目布置在阿里云上。如有错误的地方，望指正。
                        </p>
                    </div>
                    <div id="own-a-serer" className="steps">
                        <p className="steps-title"> 一、购买阿里云服务器 </p>
                        <figure>
                        <div className="figure-box">
                            <div className="img-shadow"></div>
                            <img id="my-server-img" src="../src/images/my-server.png"/>
                        </div>
                        <figcaption>我的服务器</figcaption>

                        </figure>
                        <p className="paragraph">
                        因为我还是个大四在校生，我买的是阿里云的学生机，每月9.9块，单核CPU，2GB内存，而且附加的OSS也是挺便宜的。选择地区的时候要注意了。
                        我当时购买的时候不知道为什么不让我买华南地区的，所以我的服务器变成了华北2区的，这会对加载速度有影响。购买的过程就不详细阐述了。
                        </p>
                        <p className="steps-second-title"> 远程连接 </p>
                        <p className="paragraph">
                        第一次登录服务器需要设置登录密码，注意这个和等下的连接密码不一样。
                        </p>
                        <p className="paragraph">
                        远程连接有两种方法：使用阿里云官网的远程连接接口，或者windows下使用
                        <a href="https://www.netsarang.com/products/xsh_overview.html" target="_blank">Xshell</a>
                        ，两者各有不同，大多数情况下使用Xshell是比较方便的。
                        </p>
                        <p className="paragraph">
                        打开Xshell之后，配置会话属性，默认设置如下图所示：
                        </p>
                        <figure>
                        <div className="figure-box">
                            <div className="img-shadow"></div>
                            <img id="xshell-connection-img" src="../src/images/xshell-connection.png" />
                        </div>
                        <figcaption>新建连接</figcaption>

                        </figure>
                        <p className="paragraph">
                        主机处填写服务器的公网ip，端口号为22，协议为SSH。点击确定之后输入用户名：root，密码为刚才设定的密码，
                        无误的话就能进入到主机的控制台啦。
                        </p>
                        <p className="steps-second-title">安全组配置</p>
                        <p className="paragraph">
                        需要注意的一点是有可能主机是拒绝22端口访问的，包括之后会用到80端口的http，这时候就要设置安全组了。点击实例右侧
                        的更多菜单，选择安全组配置，如图所示：
                        </p>
                        <figure>
                        <div className="figure-box">
                            <div className="img-shadow"></div>
                            <img src="../src/images/securityGroupConfig.png" />
                        </div>
                        <figcaption>安全组配置</figcaption>

                        </figure>
                        <p className="paragraph">
                        之后的大致步骤如图所示：
                        </p>
                        
                        {this.getSteps(securityGroupSteps, 'securityGroupIndex')}
                        
                        {this.getStepContent(securityGroupSteps[this.state.securityGroupIndex])}
                        
                    </div>
                    <div id="nodejs-envir" className="steps">
                        <p className="steps-title"> 二、安装node环境 </p>
                        <p className="steps-second-title">安装nodejs</p>
                        <p className="paragraph">
                        CentOS系统安装node比较简单，直接使用yum就可以安装各种软件。
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> yum install nodejs </li>
                            <li> node -v #查看node版本</li>
                            <li> #ubuntu下使用apt-get安装 </li>
                            <li> sudo apt-get install nodejs </li>
                            <li> sudo apt-get install npm </li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        安装完之后，node的一些常用工具模块也已经下载好了，如npm和
                        express模块。
                        </p>
                        <p className="steps-second-title"> 测试node </p>
                        <p className="paragraph">
                        新建测试文件helloworld.js
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> touch helloworld.js #新建文件</li>
                            <li> vim helloworld.js #编辑文件 </li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        在vim编辑器下，敲i键启动编辑，输入以下代码
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> {"var http = require('http');"}</li>
                            <li> {"http.createServer((request, response)=>{"} </li>
                            <li dangerouslySetInnerHTML={{__html: "&nbsp;&nbsp;response.writeHead(200, {Content-Type': 'text/plain'});"}}></li>
                            <li dangerouslySetInnerHTML={{__html: "&nbsp;&nbsp;response.end('Hello World\\n');"}}></li>
                            <li> {"}).listen(3000);"}</li>
                            <li> {"console.log('Server running at port 3000');"}</li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        按Esc键退出编辑状态，输入:wq保存并退出。然后敲下node helloworld就能运行刚才写好的nodejs服务了。
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> node helloworld </li>
                            <li> #终端输出Server running at port 3000 </li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        然后我们就可以在浏览器中输入http://{'<公网IP>'}:3000访问，就能看到浏览器输出hello World了。
                        </p>
                    </div>
                    <div id="own-a-domain" className="steps">
                        <p className="steps-title"> 三、购买域名 </p>
                        <p className="paragraph">
                        拥有一个域名之后，就可以通过域名解析服务器，不必记忆ip地址，看起来也高大上许多嘛。
                        如果你想买域名可以到阿里云的<a href="https://wanwang.aliyun.com/">万网</a>购买，
                        可以注意一下各域名的优惠信息。我是注册了一个.site域名，虽然没有.com那么
                        出名，但是我感觉挺好听的，而且还便宜！哈哈。
                        </p>
                        <p className="paragraph">
                        一般来说，购买完域名之后需要经过下面3个步骤才能通过域名访问主机。
                        </p>
                
                        {this.getSteps(domainSteps, 'domainStepIndex')}   
                        {this.getStepContent(domainSteps[this.state.domainStepIndex])}
                    </div>
                    <div id="nginx-agency" className="steps">
                        <p className="steps-title"> 四、Nginx反向代理 </p>
                        <p className="paragraph">
                        正如我上面所说，很多时候我们域名可能会加不同的前缀，那样其实就要我们将这些不同的前缀解析到不同的端口，
                        而<a href="http://nginx.org/">nginx</a>
                        就可以帮助我们代理，其工作方式是代理服务器接受internet的连接请求，然后将请求转发到内部的服务器，
                        然后再将内部服务器返回的结果返回到请求连接的客户端，中间通过nginx的配置文件实现代理，了解更多可以到官网或
                        百度。而且文章后面还可以看到nginx可以用于gzip压缩，提高响应速度。
                        </p>
                        <p className="steps-second-title"> 安装Nginx </p>
                        <div className="codes">
                        <ol start="1">
                            <li> #安装nginx</li>
                            <li> yum install nginx </li>
                            <li> #查看nginx版本 </li>
                            <li> nginx -v </li>
                            <li> #启动nginx </li>
                            <li> nginx </li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        启动nginx之后，在浏览器输入http://{'<公网IP>'}就能看到nginx的欢迎页了。
                        </p>
                        <figure>
                        <div className="figure-box">
                            <div className="img-shadow"></div>
                            <img id="nginx-index-img" src="../src/images/nginx-index.png" />
                        </div>
                        <figcaption>nginx欢迎页</figcaption>
                        </figure>
                        <p className="steps-second-title"> Nginx代理 </p>
                        <p className="paragraph">
                        通过修改nginx的配置文件，代理转发到我们的node服务器。nginx配置文件的目录默认在
                        <Button type="primary">
                            <span>/etc/nginx/nginx.conf</span>
                        </Button>
                            ，当然我们可以通过
                        <Button type="primary">
                            <span>nginx -t</span>
                        </Button>
                            命令查看目录位置。
                        </p>
                        <p className="paragraph"> 通过vim命令打开conf文件，开启编辑，加入以下框中的代码</p>
                        <figure>
                        <div className="figure-box">
                            <div className="img-shadow"></div>
                            <img id="nginx-proxy-example-codes-img" src="../src/images/nginx-proxy-example-codes.png" />
                        </div>
                        <figcaption>nginx代理示例代码</figcaption>
                        </figure>
                        <div className="codes">
                        <ol start="1">
                            <li> {'location /helloworld {'}</li>
                            <li dangerouslySetInnerHTML={{__html: "&nbsp;&nbsp;proxy_pass http://127.0.0.1:3000;"}}></li>
                            <li> {'}'}</li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        修改nginx的配置后，需要重新启动nginx。
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> #重启nginx </li>
                            <li> {"nginx -s reload"} </li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        上述代码意味着，从浏览器输入<Button type="primary">
                            <span>http://{'<公网IP>'}/helloworld</span>
                            </Button>
                        就能代理到3000端口。我们可以启动前面建好的helloworld.js文件，运行在3000端口，这时候我们就能看到网页
                        显示Hello&nbsp;World了。
                        </p>
                        <figure>
                        <div className="figure-box">
                            <div className="img-shadow"></div>
                            <img id="nginx-proxy-example-img" src="../src/images/nginx-proxy-example.png" />
                        </div>
                        <figcaption>nginx代理示例</figcaption>
                        </figure>
                        <p className="paragraph">
                        同理，我们可以写更多的server对象，控制不同代理。如果你已经拥有了自己的域名，那你还应该更改配置文件中
                        的server_name。
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> {"server {"}</li>
                            <li dangerouslySetInnerHTML={{__html: "&nbsp;&nbsp;listen 80;"}}></li>
                            <li dangerouslySetInnerHTML={{__html: "&nbsp;&nbsp;location / {"}}></li>
                            <li dangerouslySetInnerHTML={{__html: "&nbsp;&nbsp;&nbsp;&nbsp;proxy_pass http://127.0.0.1:3000;"}}></li>
                            <li dangerouslySetInnerHTML={{__html: "&nbsp;&nbsp;}"}}></li>
                            <li> {"}"} </li>
                        </ol>
                        </div>
                    </div>
                    <div id="PM2" className="steps">
                        <p className="steps-title"> 五、PM2管理node进程 </p>
                        <p className="paragraph">
                        <a href="http://pm2.io/">PM2</a>可以帮助我们管理node进程，通过pm2开启的进程可以得到保证一直在线。
                        </p>
                        <p className="steps-second-title"> 安装PM2 </p>
                        <div className="codes">
                        <ol start="1">
                            <li> #安装pm2 </li>
                            <li> {"npm install pm2 -g"} </li>
                            <li> #查看pm2版本 </li>
                            <li> pm2 -v </li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        如果查看pm2版本时报错pm2 is not a command的话，后者使用其它npm安装的模块命令时报这个错，
                        就是环境变量的问题。文章下一节会提及这个问题。
                        </p>
                        <p className="steps-second-title"> 使用PM2 </p>
                        <div className="codes">
                        <ol start="1">
                            <li> #启动进程 </li>
                            <li> pm2 start index.js </li>
                            <li> #查看进程列表 </li>
                            <li> pm2 list </li>
                        </ol>
                        </div>
                    </div>
                    <div id="npm-env" className="steps">
                        <p className="steps-title"> 六、npm安装模块的环境变量问题 </p>
                        <p className="paragraph">
                        通过npm安装的全局模块，我这边是用不了的，包括后面装的express，ng等等，一开始没找对方法只能通过alias的方法
                        去声明模块变量。其实我们只要把安装的node添加到环境变量就可以了。
                        </p>
                        <p className="paragraph">
                        我的主机的node安装目录是/root/node-v6.9.5-linux-x64，那我们现在就要将它添加在环境变量中。我们知道，在/etc/profile
                        中的环境变量是对所有用户生效的且永久生效的。
                        </p>
                        
                        {this.getSteps(nodeEnvironmentSteps, 'nodeEnvStepIndex')}
                        {this.getStepContent(nodeEnvironmentSteps[this.state.nodeEnvStepIndex])}
                    
                    </div>
                    <div id="deploy-ng2" className="steps">
                        <p className="steps-title"> 七、布置本地angular2项目到服务器上</p>
                        <p className="paragraph">
                        我们可能对linux不太熟练，下载的工具比较少，因此在云服务器上编程是不太方便的。我们可以先在本地编程，然后把
                        最终版上传到服务器上运行。
                        </p>
                        <p className="steps-second-title"> 让ng2项目运行在express上</p>
                        <p className="paragraph">
                        这是迈向node全栈开发很重要的一步！我们都知道angular2只是做静态网页，如果我们需要用到数据库交互，那么使用
                        express会是一个非常好的选择。而且，对于我这种小白来说，先了解一下使用express作为后台的整个流程是怎么一回事
                        也是很好的。
                        </p>
                        <p className="steps-second-title">安装express</p>
                        <div className="codes">
                        <ol start="1">
                            <li> #全局安装express </li>
                            <li> {"npm install express -g"} </li>
                            <li> #查看express版本 </li>
                            <li> express --version </li>
                        </ol>
                        </div>
                        <p className="steps-second-title">创建express项目</p>
                        <p className="paragraph">
                        express默认以jade作为模板引擎，但jade的语法与html有较大差异，而ejs模版的语法和html是相同的，
                        因此我们以ejs作为模块创建项目。
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> #以ejs作为模板引擎创建项目APP_NAME </li>
                            <li> {"express APP_NAME -e"} </li>
                        </ol>
                        </div>
                        <p className="steps-second-title">将ejs文件改为html</p>
                        <p className="paragraph">
                        此步骤的意义是希望将模版文件的后缀名从.ejs改为.html，手动更改之后还需要改app.js里面的设置。
                        需要更改的部分如下图所示，注意红色框出部分即为需要更改的地方。
                        </p>
                        <figure>
                        <div className="figure-box">
                            <div className="img-shadow"></div>
                            <img id="appjs-ejs-before-img" src="../src/images/appjs-ejs-before.png" />
                        </div>
                        <figcaption>修改前</figcaption>
                        </figure>
                        <figure>
                        <div className="figure-box">
                            <div className="img-shadow"></div>
                            <img id="nginx-proxy-after-img" src="../src/images/appjs-ejs-after.png" />
                        </div>
                        <figcaption>修改后</figcaption>
                        </figure>
                        <p className="paragraph">
                        记得安装依赖包，即下载package.json中记录的所有依赖包。然后就可以启动服务，默认端口为3000，
                        使用浏览器打开<Button type="primary">
                            <span>http://{'<公网IP>'}:3000</span></Button>可以看到express的欢迎页，
                        这里就不贴图了。
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> #安装依赖包 </li>
                            <li> {"npm install"} </li>
                            <li> #启动服务 </li>
                            <li> {"npm start"} </li>
                        </ol>
                        </div>
                        <p className="steps-second-title">将页面指向angular2项目</p>
                        <p className="paragraph">
                        讲到这里，那怎么将服务的页面定向到我们的ng2项目生成的资源文件呢？注意到app.js文件中的一句代码
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> {"app.use(express.static(path.join(__dirname, 'public')));"}</li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        它将静态文件资源指向public文件，而默认下的public文件是空的，因此我们通过修改这句代码将资源指向
                        angular2生成的dist目录即可。
                        </p>
                        <p className="steps-second-title">使用angular/cli生成ng项目</p>
                        <div className="codes">
                        <ol start="1">
                            <li> #全局安装angular cli脚架 </li>
                            <li> {"npm install -g @angular/cli"}</li>
                            <li> #创建新项目my-app </li>
                            <li> {"ng new my-app"}</li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        记得是在express所在的目录下创建ng项目！创建时间比较久，更详细的angular教程可以到<a href="https://angular.cn/">官网</a>查询。
                        当真正部署的时候，我们就不能用<Button type="primary">
                            <span>ng&nbsp;serve</span></Button>命令来启动服务器了，而是通过
                            <Button type="primary">
                            <span>ng&nbsp;build</span></Button>的方法生成dist资源文件，它会将css，js都打包好。那么现在
                            要做的事情就是将app.js指向这个dist文件。
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> //原本指向public </li>
                            <li> {"//app.use(express.static(path.join(__dirname, 'public')));"}</li>
                            <li> //修改指向ng项目的dist文件 </li>
                            <li> {"app.use(express.static(path.join(__dirname, 'my-app/dist')));"}</li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        到此为止就基本上完成啦！回到express下的目录启动服务，重新打开浏览器的3000端口就可以看到angular2项目写的页面了。
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> #启动服务 </li>
                            <li> {"npm start"}</li>
                        </ol>
                        </div>
                        <p className="steps-second-title">解决app.js路由报错的问题</p>
                        <p className="paragraph">
                        angular2可以做单页面应用，所以会有很多路由地址。那这里还有一个问题，就是直接在浏览器输入
                        <Button nz-button type="primary">
                            <span>http://{'<公网IP>'}:3000/路径名</span></Button>这样的形式，试图进入angular2项目所声明的路由地址，
                            但是express中的app.js会报错，因为它无法识别这个地址。
                        </p>
                        <p className="paragraph">
                        解决办法就是对所有的请求路径都转发到dist中的index.html文件。app.js文件加入以下代码：
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> {"app.get('*', (req, res)=>{"} </li>
                            <li dangerouslySetInnerHTML={{__html: "&nbsp;&nbsp;res.sendFile(path.join(__dirname, 'front/dist/index.html'));"}}></li>
                            <li> {"});"} </li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        然后我们的angular2项目就可以识别地址从而进入到对应的路由模块了。
                        </p>
                    </div>
                    <div id="OSS" className="steps">
                        <p className="steps-title"> 八、优化加载速度 </p>
                        <p className="paragraph">
                        我们知道，angular应用打包出来的文件相对vue或react大，可能没写什么东西vendor.bundle文件就有几兆了。我们的服务器基本都是
                        1M带宽的，换算下来大概就是128k每秒这样，所以加载速度是很慢的，可能要等个十几秒才有反应...
                        </p>
                        <p className="steps-second-title">
                        生产压缩与预编译
                        </p>
                        <p className="paragraph">
                        官网的<a href="https://angular.cn/guide/deployment">部署</a>菜单上已经有很多说明如何优化部署，这里就着重拿出来
                        说明一下关键的地方。
                        </p>
                        <p className="paragraph">
                        angular默认的编译方式是JIT(Just-in-time)，在加载应用期间编译，这显然会影响加载时间，同时build出来的文件
                        也包含了编译器和一些不需要的库源码，也增加了体积。因此我们需要将编译方式修改为预编译（AOT），这样就会在我们
                        build期间编译，不需要加载编译器。官网中的<a href="https://angular.cn/guide/aot-compiler">预（AOT）编译</a>
                            菜单更加详细地描述了aot编译的好处。
                        </p>
                        <p className="paragraph">
                        因为我们用的是angular/cli生成的项目，而cli已经有工具帮助我们进行aot，而不用进行官网上面说明的操作，非常
                        方便。
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> #开启生产环境编译和预编译 </li>
                            <li> {"ng build --prod --aot"}</li>
                            <li>#--prod代表生产环境编译，带有代码混淆和压缩功能</li>
                            <li>#--aot代表预编译</li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        在不开启这两个模式之前，我的vendor.bundle.js文件有4.8M，但是之后就只有1.8M了。
                        </p>
                        <p className="steps-second-title"> 开启服务端gzip压缩
                        </p>
                        <p className="paragraph">
                        经过预编译之后vendor文件依然还有1.8M，这对移动端来说依然是不可接受的，毕竟这还没算上加载图片的流量。
                        在开启服务端或者nginx的反向代理的gzip压缩之后，可以将js文件的下载体积进一步减少。
                        </p>
                        <p className="paragraph">
                        首先，在node中让所有的请求压缩，在app.js中添加以下代码：
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> //需express&nbsp;4.0以上版本： </li>
                            <li> {"var compress = require('compression');"} </li>
                            <li> {"app.use(compress());"} </li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        然后使用vim编辑nginx.conf文件，在http的配置节点上加上以下代码：
                        </p>
                        <div className="codes">
                        <ol start="1">
                            <li> #开启gzip压缩 </li>
                            <li> {"gzip on;"}</li>
                            <li> {"gzip_static on;"} </li>
                            <li> {"gzip_http_version 1.0;"} </li>
                            <li> ##启用gzip压缩的最小文件，小于设置值的文件将不会被压缩</li>
                            <li> {"gzip_min_length 1k;"} </li>
                            <li> #gzip 压缩级别，1-9，数字越大压缩的越好，也越占CPU时间 </li>
                            <li> {"gzip_comp_level 5;"}</li>
                            <li> #进行压缩的文件类型，javascript有多种形式。其中的值可以在mime.type文件中找到</li>
                            <li> {"gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;"}</li>
                            <li> #是否在http header中添加Vary:Accept-Encoding,建议开启 </li>
                            <li> {"gzip_vary on;"} </li>
                        </ol>
                        </div>
                        <p className="paragraph">
                        开启反向代理gzip压缩之后，vendor文件就只有370多k了，已经是可接受范围了！
                        </p>
                    </div>
                    <div id="writen-after" className="writen">
                        <h3> 写在最后 </h3>
                        <p className="paragraph">
                        我是一名刚步入大四的前端小白，可以说什么都不懂。非常感谢我的实习导师<a href="http://yedanbo.com/">叶丹波</a>
                        大哥，他教会了我很多未曾接触过的前端知识，以及在我部署网站的时候给了我许多建议。
                        </p>
                    </div>
                </article>
            </Card>
        )
    }
}