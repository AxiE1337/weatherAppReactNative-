import { createSlice } from '@reduxjs/toolkit'

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weather: [],
    coordinates: {},
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
