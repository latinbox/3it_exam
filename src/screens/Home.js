import React, {useState, useEffect} from 'react';
import {ListItem, Icon} from 'react-native-elements';
import colors from '../config/colors';
import axios from 'axios';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo

import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    top: 10,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  flatListContainer: {
    display: 'flex',
    marginHorizontal: 10,
    marginTop: 20,
  },
  dropdownItem: {
    borderWidth: 1,
    marginTop: 6.7,
    borderRadius: 5.5,
    backgroundColor: colors.white,
  },
  btnFlecha: {
    flexDirection: 'row-reverse',
    marginRight: 300,
    top: -14,
  },
  iconoFlecha: {
    width: 20,
    backgroundColor: colors.black,
  },
});
export const Home = ({navigation}) => {
  const [refreshing, updateIsLoading] = useState(true);
  const [currentData, updateCurrentData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // updateIsLoading(true);
    try {
      const {status, data} = await axios.get('https://mindicador.cl/api/');

      if (status === 200) {
        updateCurrentData(data);
      }
    } catch (error) {
      console.log({error});
      updateCurrentData([]);
    }
    //updateIsLoading(false);
  };
  const dato = Object.values(currentData);
  dato.splice(0, 3);
  dato.sort((a, b) => a.nombre.localeCompare(b.nombre));

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} forceInset={{top: 'always'}}>
        <View>
          <Text style={styles.titulo}>Indicadores</Text>
        </View>
        <FlatList
          style={styles.flatListContainer}
          data={dato}
          keyExtractor={(item) => item.codigo}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Screen1', {
                  indicator: item.codigo,
                });
              }}
              style={styles.dropdownItem}>
              <ListItem.Content>
                <ListItem.Title
                  style={{color: 'black', fontWeight: 'bold', fontSize: 13}}
                  Component={TouchableScale}
                  friction={90} //
                  tension={100} // These props are passed to the parent component (here TouchableScale)
                  activeScale={0.95} //
                  linearGradientProps={{
                    colors: ['#FF9800', '#F44336'],
                    start: {x: 1, y: 0},
                    end: {x: 0.2, y: 0},
                  }}
                  ViewComponent={LinearGradient}>
                  {item.nombre}
                </ListItem.Title>
                <ListItem.Title style={{color: colors.blue, fontSize: 10}}>
                  {item.unidad_medida}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Content style={styles.btnFlecha}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Screen2', {
                      indicator: item.codigo,
                      name: item.nombre,
                      datum: item.fecha,
                      messure: item.unidad_medida,
                      valor: item.valor,
                    });
                  }}>
                  <ListItem.Chevron style={styles.iconoFlecha} />
                </TouchableOpacity>
              </ListItem.Content>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </>
  );
};
