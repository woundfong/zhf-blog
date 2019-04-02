import React from 'react'
import Loadable from 'react-loadable'
import { Spin, Alert } from 'antd'
const LoadingComponent = ({isLoading, error}) => {
    if(isLoading) {
        return <Spin size="large"/>
    } else if(error) {
        console.log(error);
        return (
            <Alert
                message="Error"
                description="Sorry, there was a problem loading the page."
                type="error"
            />
        )
    } else {
        return null;
    }
}
const syncLoadComponent = (component) => {
    let loader = component;
    if(typeof component === 'string') {
        loader = () => import(component)
    }
    return Loadable({
        loader: loader,
        loading: LoadingComponent
    })
}
export default syncLoadComponent