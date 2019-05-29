import React, { Component } from 'react';

export default WrappedComponent=>
class extends Component {
    state = {  }

    componentDidMount(){
      }

    componentDidUpdate(prevProps,nextProps){
      }

    render() {
        return (
            <WrappedComponent/>
        );
    }
}
