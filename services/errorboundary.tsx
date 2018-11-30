import * as React from 'react';
import Router from 'next/router';

class MainErrorBoundary extends React.Component{
    componentDidCatch = () => {
        console.log('error occured');
        // Do some action when gets any error
        Router.push('/');
    }
    render(){
        return(
            <div>
                {this.props.children}
            </div>);
    }
}

export default MainErrorBoundary;