import { createSlice } from '@reduxjs/toolkit'

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weather: [],
    coordinates: {
      identifier: 'moscow',
      latitude: '55.7504461',
      longitude: '37.6174943',
    },
    dailyWeatherData: [],
  },
  reducers: {
    setWeather(state, { payload }) {
      state.weather = payload
    },
    setCoordinates(state, { payload }) {
      state.coordinates = payload
    },
    setDailyWeatherData(state, { payload }) {
      state.dailyWeatherData = payload
    },
  },
})

export const { setWeather, setCoordinates, setDailyWeatherData } =
  weatherSlice.actions
export default weatherSlice.reducer
