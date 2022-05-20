import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { store } from './redux/index'
import Main from './screens/Main'
import DailyForecast from './screens/DailyForecast'
import Search from './screens/Search'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <Stack.Navigator>
            <Stack.Screen
              name='Main'
              component={Main}
              options={{
                title: '',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name='DailyForecast'
              component={DailyForecast}
              options={{
                title: 'Daily forecast',
              }}
            />
            <Stack.Screen
              name='Search'
              component={Search}
              options={{
                title: 'Search',
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  )
}

export default App
