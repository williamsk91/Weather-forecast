import React, { Component } from 'react'
import cities from '../cities.json'
import AsyncSelect from 'react-select/lib/Async'
import { connect } from 'react-redux'


const filterCity = (inputValue) => {
    return cities.filter(city => 
        city.city.toLowerCase().includes(inputValue.toLowerCase()))
}

const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
        callback(filterCity(inputValue));
      }, 1000);
}

class AsyncSearchBar extends Component {

  handleChange = (e) => {
    console.log(e)
    this.props.setCity(e)
  }

  //message when city is not in database
  noOptionsMessage = () => {
    return 'city not found'
  }
  
  render (){
    return (
        <AsyncSelect 
          style={{width:'100%'}}
          loadOptions={loadOptions} 
          onChange={this.handleChange}
          getOptionLabel={(option) => {
                return option.city + ', ' + option.iso3
              }
            }
          noOptionsMessage={this.noOptionsMessage}
          placeholder={'Start typing a city name'}
          
        />
    )
  }
}
const mapStateToProps = (state) => {
  return {
    city: state.city
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCity: (city) => dispatch({type: 'SET_CITY', city})
  }
}

export default connect(null, mapDispatchToProps)(AsyncSearchBar)
