import React, { Component } from 'react';
import AsyncSearchBar from './components/AsyncSearchBar'
import Timeline from './components/Timeline'
import { connect } from 'react-redux'

class App extends Component {

  render() {
    const timeline = this.props.lat ? <Timeline lat={this.props.lat} lon={this.props.lon} /> : null;

    return (
      <div className="App">
        <AsyncSearchBar />
        {timeline}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      lat: state.lat,
      lon: state.lng
  }
}

export default connect(mapStateToProps)(App);
