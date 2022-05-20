import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

export default function DailyForecast() {
  const dailyWeatherData = useSelector(
    (state: any) => state.weather.dailyWeatherData
  )

  return (
    <View style={styles.container}>
      <Text style={{ marginVertical: 10 }}>6 day forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dailyWeatherData.map((item: any, index: number) => (
          <View style={styles.itemsContainer} key={item.time}>
            <Text style={[styles.text, { fontSize: 18 }]}>
              {index === 0 ? 'Today' : item.time}
            </Text>
            <View>
              <Text style={[styles.text, { fontSize: 26 }]}>
                {item.temperatureMax + '°C'}
              </Text>
              <Text style={styles.text}>{item.temperatureMin + '°C'}</Text>
            </View>
            <Text style={styles.text}>{item.windspeed + 'm/s'}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsContainer: {
    height: '85%',
    width: 150,
    backgroundColor: '#3b8d99',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 5,
  },
  text: {
    paddingVertical: 10,
    color: 'white',
  },
})
