import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react';
import config from '../config'
import { connect } from 'react-redux'
import GoogleMapStyle from '../styles/GoogleMapStyle.json'

const style = {
  width: '100%',
  height: '50%'
}

export class MapContainer extends Component {
  render() {
    return (
      <Map 
        google={this.props.google} 
        zoom={14}
        center={{
            lat: this.props.city.lat,
            lng: this.props.city.lng
          }}
        style={style} 
        styles={GoogleMapStyle}   
      >
      </Map>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    city: state
  }
}
 
export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: config.GCPAPI
})(MapContainer))

