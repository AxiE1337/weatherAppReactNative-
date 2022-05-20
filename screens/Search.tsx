import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'
import { data } from '../constants/cities'
import useAsyncStorage from '../hooks/useAsyncStorage'

export default function Search() {
  const [inputValue, setInputValue] = useState<string>('')
  const [filteredData, setFilteredData] = useState<any>([])
  const { storeData } = useAsyncStorage()

  const handleSearch = (item: any) => {
    storeData(item)
    setInputValue('')
    setFilteredData([])
  }

  const handleInput = (text: string) => {
    setInputValue(text)
    if (text.length > 0) {
      setFilteredData(
        data.filter((item) =>
          item.identifier.includes(text.toLocaleLowerCase())
        )
      )
    } else {
      setFilteredData([])
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchBar}>
        <TextInput
          label='Search'
          value={inputValue}
          onChangeText={(text) => handleInput(text)}
        />
      </View>
      <View style={styles.itemsList}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.identifier}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSearch(item)}
              style={styles.items}
            >
              <Text style={{ fontSize: 20, color: 'white' }}>
                {item.identifier[0].toUpperCase() +
                  item.identifier.substring(1)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    marginTop: 20,
    width: '90%',
  },
  itemsList: {
    marginTop: 20,
    width: '90%',
    justifyContent: 'center',
  },
  items: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b8d99',
    borderRadius: 2,
    marginTop: 5,
  },
})
