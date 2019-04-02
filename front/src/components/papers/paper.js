import React from 'react'
import {Steps} from 'antd'
const Step = Steps.Step;
export default class Paper extends React.Component {
    getSteps(steps, key) {
        const stepArr = steps.map((step, index) => (
            <Step key={index} title={step.title} onClick={() => {
                let s = {};
                s[key] = index;
                this.setState(s)
            }}/>
        ))
        return (
            <Steps current={this.state[key]}>
                {stepArr}
            </Steps>
        )
    }
    getStepContent(step) {
        let content = '';
        if(step.isImg) {
            content = (
                <div className="steps-content">
                <figure>
                    <div class="figure-box">
                        <div className="img-shadow"></div>
                        <img src={step.content} className="paper-img"/>
                    </div>
                    <figcaption> {step.title} </figcaption>
                </figure>
                </div>
            )
        } else {
            content = (
                <div className="steps-content">
                    {step.content}
                </div>
            )
        }
        return content
    }
    componentDidMount() {
        window.onscroll = ()=> {
            setTimeout(() => {
                const top = document.documentElement.scrollTop || document.body.scrollTop;
                EventEmitter.emit('scrollTop', top)
            }, 10);
        }
        document.getElementsByTagName('article')[0].onclick = (e) => {
            const target = e.target;
            if(target.tagName.toLowerCase() === 'img') {
                const src = target.getAttribute('src');
                EventEmitter.emit('showFullScreenImg', src);
            }
        }
    }
}