import React, { Component } from 'react'
import config from '../config'
import { AreaChart, Legend } from 'react-easy-chart'
import moment from 'moment'

//dummy data created for legend
const LegendData = [
    {key: 'Maximum Temperature'},
    {key: 'Minimum Temperature'}
];

const LegendDataConfig = [
    {color: '#4D4DFF'},
    {color: '#A569C3'}
];

const LegendDataStyle = {
    '.legend': {
        margin: '0px 50px' 
    }
};

class Timeline extends Component {
    state = {
        lat: null,
        lon: null,
        temperature: {
            max: [],
            min: []
        },
        dataDisplay: '',
        width: window.innerWidth
    }

    componentDidMount = () => {
        this.fetchWeatherData();
        window.addEventListener('resize', this.handleResize);
    }

    //need to re-fetch the data when another city is selected
    componentDidUpdate = () => {
        if(this.state.lat !== this.props.lat && this.state.lon !== this.props.lon){
            this.fetchWeatherData();
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

    handleClick = (d) => {
        const parsedDate = moment(d.x, 'MM D h').format('h a on Do of MMMM');
        // console.log(parsedDate)
        const parsedDateDisplay = `Temperature at ${parsedDate} is ${d.y}°C`
        // console.log(parsedDateDisplay)
        this.setState({
            dataDisplay: parsedDateDisplay
        })}

    render() {
        return (
            <div>
                <h2>Temperature forecast over 5 days with 3 hrs interval</h2>
                <AreaChart
                    axes

                    width={this.state.width}
                    height={350}

                    //a gap of 2 degrees is there t avoid the interpolated data crossing the y domain range
                    yDomainRange={[this.getMinT() - 2, this.getMaxT() + 2]}

                    interpolate={'cardinal'}
                    areaColors={['red', 'blue']}
                    
                    //format entered using moment.js
                    datePattern={'%m %d %H'}
                    xType={'time'}
                    tickTimeDisplayFormat={'%d-%H%p'}
                    
                    grid
                    verticalGrid
                    
                    dataPoints
                    
                    data={[
                        this.state.temperature.min,
                        this.state.temperature.max

                    ]}
                    
                    clickHandler={this.handleClick}

                    axisLabels={{x: 'test', y: 'testt'}}
                />
                <Legend data={LegendData} dataId={'key'} config={LegendDataConfig} styles={LegendDataStyle} />

                <h2>Click on a point to show the exact value</h2>
                <h2>{this.state.dataDisplay}</h2>
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
                            },
                            dataDisplay: ''
                        })
                    } 
                    
                })
    }

    //get the minimum temperature in temperature array
    getMinT = () => {
        let minTA = this.state.temperature.min;

        //needed to catch errors caused by no data
        if(minTA.length > 0){
            console.log('ok')
        } else {
            console.log('not ok')
            return 0
        }
        // console.log(minTA)
        let min = minTA[0].y;
        // console.log(min)

        for(let i = 1; i < minTA.length; i++){
            if(minTA[i].y < min){
                min = minTA[i].y 
            }
        }

        return min;
    }
    //get the maximum temperature in temperature array
    getMaxT = () => {
        let maxTA = this.state.temperature.max;

        //needed to catch errors caused by no data
        if(maxTA.length > 0){
            console.log('ok')
        } else {
            console.log('not ok')
            return 45
        }
        // console.log(maxTA)
        let max = maxTA[0].y;
        // console.log(max)

        for(let i = 1; i < maxTA.length; i++){
            if(maxTA[i].y > max){
                max = maxTA[i].y 
            }
        }

        return max;
    }

}

export default Timeline