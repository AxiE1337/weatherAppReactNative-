import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

export default function HourlyChart({ chartData }: any) {
  const data = {
    labels: chartData.map((time: any) => time.time),
    datasets: [
      {
        data: chartData.map((degrees: any) => degrees.temperature),
        // color: (opacity = 1) => `rgba(134, 65, 244)`,
        strokeWidth: 2,
      },
    ],
    legend: ['Hourly forecast'],
  }

  if (data.labels.length <= 1) {
    return <ActivityIndicator size='large' />
  }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ width: 1440, alignItems: 'center' }}>
        <LineChart
          data={data}
          chartConfig={{
            backgroundGradientFrom: '#3b8d99',
            backgroundGradientTo: '#3b8d99',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          height={220}
          width={1500}
          withHorizontalLines={false}
          withHorizontalLabels={false}
          renderDotContent={({ x, y, index, indexData }: any) => (
            <Text
              key={index}
              style={{
                fontSize: 12,
                position: 'absolute',
                top: y,
                left: x,
                color: 'white',
              }}
            >
              {indexData + '°C'}
            </Text>
          )}
        />

        <View
          style={{
            flexDirection: 'row',
            width: 1440,
            paddingBottom: 5,
            justifyContent: 'space-evenly',
            backgroundColor: '#3b8d99',
          }}
        >
          {chartData.map((chart: any, index: number) => (
            <View key={index} style={{ marginHorizontal: 9 }}>
              <Text style={{ fontSize: 10, color: 'white' }}>
                {chart.windspeed + 'm/s'}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
