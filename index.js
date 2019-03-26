// import the React and ReactDOM libraries
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner'


// create a React component
class App extends Component {

    state = {lat: null, errorMsg: ''};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                //always setState to change state
                this.setState({lat: position.coords.latitude});
            },
            err => {
                this.setState({errorMsg: err.message})
            }
        );
    }

    renderContent() {
        //conditional rendering
        if (this.state.errorMsg && !this.state.lat) {
            return <div> Error: {this.state.errorMsg} </div>;
        }
        if (!this.state.errorMsg && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat}/>;
        }
        return <Spinner message="Please accept location request"/>;

    }

    //React says we have to define render!
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

// take the react component and show it on the screen
ReactDOM.render(
    <App />,
    document.querySelector('#root')
);