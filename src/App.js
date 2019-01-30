import React, { Component } from 'react';
import AsyncSearchBar from './components/AsyncSearchBar'
import Timeline from './components/Timeline'
import { connect } from 'react-redux'
import Map from './components/Map'

class App extends Component {

  render() {
    const timeline = this.props.lat ? <Timeline lat={this.props.lat} lon={this.props.lon} /> : null;
    // const map = this.props.lat ? <Map /> : null;

    return (
      <div className="App">
        <AsyncSearchBar />
        {/* {map} */}
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
