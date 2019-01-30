const initState = {
    city: '',
    lat: null,
    lng: null
}

const rootReducer = (state = initState, action) => {
    switch(action.type){
        case 'SET_CITY':
            console.log('city set to', action.city)
            return {
                city: action.city.city,
                lat: action.city.lat,
                lng: action.city.lng
            }
        default:
            return state
    }
}


export default rootReducer