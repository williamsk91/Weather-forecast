import React, { Component } from 'react'
import config from '../config'
import { AreaChart } from 'react-easy-chart'
import moment from 'moment'

class Timeline extends Component {
    state = {
        lat: null,
        lon: null,
        temperature: {
            max: [],
            min: []
        },
        dataDisplay: 'Click on a point to show the value',
        width: window.innerWidth
    }

    componentDidMount = () => {
        this.fetchWeatherData();
        window.addEventListener('resize', this.handleResize);
    }

    //need to re-fetch the data when another city is selected
    componentDidUpdate = () => {
        if(this.state.lat !== this.props.lat && this.state.lon !== this.props.lon){
            this.fetchWeatherData()
        }
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = () => {
        console.log(window.innerWidth)
        this.setState({
            width: window.innerWidth
        })
    }

    render() {
        return (
            <div>
                    <AreaChart
                        axes
                        width={this.state.width}
                        height={350}
                        interpolate={'cardinal'}
                        areaColors={['red', 'blue']}
                        //format entered using moment.js
                        datePattern={'%m %d %H'}
                        xType={'time'}
                        tickTimeDisplayFormat={'%d-%H'}
                        verticalGrid
                        dataPoints
                        data={[
                            this.state.temperature.min,
                            this.state.temperature.max

                        ]}
                        clickHandler={(d) => {
                            const dateA = d.x.split(' ');
                            console.log(dateA)
                            this.setState({
                                dataDisplay: `${dateA[0]}/${dateA[1]} at ${dateA[2]}: ${d.y}°C`
                            })}
                        }
                    />

                        <p style={{marginLeft: '50px', marginTop: '0px'}}>{this.state.dataDisplay}</p>
                    </div>
              
        )
    }

    //fetch data from openWeatherMap - 5 days forecast with 3 hr intervals
    fetchWeatherData = () => {
        fetch('https://api.openweathermap.org/data/2.5/forecast?' + 
                    'lat=' + this.props.lat +
                    '&lon=' + this.props.lon +
                    '&units=metric&APPID=' + config.openWeatherMapAPI)
                .then(response => response.json())
                .then( data => {
                    //checking if data availability
                    if (data) {
                        // console.log(data)
                        //getting the max and min data
                        let maxTA = [];
                        let minTA = [];
                        let max, min, time;
                        for(let i = 0; i < data.list.length; i++){
                            max = data.list[i].main.temp_max;
                            min = data.list[i].main.temp_min;
                            time = data.list[i].dt_txt;
                            time = moment(time).format('M D H')
        
                            //append
                            maxTA.push({
                                x: time,
                                y: max
                            })
                            minTA.push({
                                x: time,
                                y: min
                            })
                        }
        
                        //setting the data
                        this.setState({
                            lat: this.props.lat,
                            lon: this.props.lon,
                            temperature: {
                                max: maxTA,
                                min: minTA
                            }
                        })
                    } 
                    
                })
    }
}

export default Timeline