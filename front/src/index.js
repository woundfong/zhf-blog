import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import App from './components/app'
import 'antd/dist/antd.css'
export default class Index extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/" component={App}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <Index/>,
  document.getElementById('app')
)
