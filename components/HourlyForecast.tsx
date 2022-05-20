import { StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { Surface } from 'react-native-paper'
import { useSelector } from 'react-redux'
import DailyChart from './HourlyChart'

export default function HourlyForecast() {
  const data = useSelector((state: any) => state.weather.weather)
  const [hourlyData, setHourlyData] = useState<any>([])

  const mergeFunc = () => {
    let arr = []
    for (let i = 0; i < 24; i++) {
      arr.push({
        temperature: data.hourly.temperature_2m[i],
        apparentTemperature: data.hourly.apparent_temperature[i],
        windspeed: data.hourly.windspeed_10m[i],
        windDirection: data.hourly.winddirection_10m[i],
        time: data.hourly.time[i].substring(11),
      })
    }
    setHourlyData(arr)
  }
  useEffect(() => {
    mergeFunc()
  }, [data])

  return (
    <Surface style={styles.surface}>
      <DailyChart chartData={hourlyData} />
    </Surface>
  )
}

const styles = StyleSheet.create({
  surface: {
    width: '95%',
    marginLeft: 5,
    marginVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
})
