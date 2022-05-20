import { useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Icon } from '@rneui/themed'
import { Headline } from 'react-native-paper'
import HourlyForecast from '../components/HourlyForecast'
import useWeather from '../hooks/useWeather'
import useAsyncStorage from '../hooks/useAsyncStorage'

function Main({ navigation }: any) {
  const { isFetching, getDailyWeatherData } = useWeather()
  const { isFetchingCoords } = useAsyncStorage()
  const weatherData = useSelector((state: any) => state.weather.weather)
  const coordinates = useSelector((state: any) => state.weather.coordinates)

  useEffect(() => {
    !isFetchingCoords && getDailyWeatherData(coordinates)
  }, [isFetchingCoords])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Icon name='menu-outline' type='ionicon' size={30} />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  if (isFetching) {
    return (
      <View style={styles.main}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Headline style={{ fontSize: 30 }}>
              {coordinates.identifier[0].toUpperCase() +
                coordinates.identifier.substring(1)}
            </Headline>
            <Text style={{ fontSize: 28 }}>
              {weatherData.daily.temperature_2m_max[0] + '°C'}
            </Text>
          </View>

          <View style={styles.other}>
            <Text style={styles.textParagraph}>
              {weatherData.daily.time[0]}
            </Text>
            <Text style={styles.textParagraph}>
              {'Apparent temperature '}
              {weatherData.daily.apparent_temperature_max[0] + '°C'}
            </Text>
            <View>
              <Text style={styles.textParagraph}>
                {'Wind: ' + weatherData.daily.windspeed_10m_max[0] + 'm/s'}
              </Text>
              <Text style={styles.textParagraph}>
                {'Sunrise: ' + weatherData.daily.sunrise[0].substring(11)}
              </Text>
              <Text style={styles.textParagraph}>
                {'Sunset: ' + weatherData.daily.sunset[0].substring(11)}
              </Text>
            </View>
          </View>
        </View>
        <HourlyForecast />
        <TouchableOpacity
          onPress={() => navigation.navigate('DailyForecast')}
          style={styles.forecast}
        >
          <Text style={{ fontSize: 20, color: 'white' }}>6 day forecast</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Main

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: 350,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  header: {
    fontSize: 32,
    padding: 20,
    alignItems: 'flex-start',
    width: '100%',
  },
  textParagraph: {
    fontSize: 18,
  },
  forecast: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b8d99',
    width: '100%',
  },
  other: {
    marginBottom: 20,
  },
})
