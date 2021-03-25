import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {Card, ListItem, Divider} from 'react-native-elements';
import axios from 'axios';
import Moment from 'moment';
import 'moment/locale/es';

import colors from '../config/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    top: 10,
  },
  header: {
    backgroundColor: colors.white,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  flatListContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: 490,
    height: 40,
    left: 2,
    alignContent: 'space-between',
    marginHorizontal: 60,
    marginTop: 20,
  },
  backButton: {},
  backText: {
    color: colors.blue,
    left: 16,
    fontSize: 16,
    bottom: 20,
  },
  datos: {
    textAlign: 'center',
    marginVertical: 19,
  },
  valor: {
    flexDirection: 'row-reverse',
    marginRight: 250,
    top: -14,
  },
});

const Screen1 = ({route, navigation}) => {
  const [currentData, updateCurrentData] = useState([]);
  useEffect(() => {
    fetchIndicator();
  }, []);

  const fetchIndicator = async () => {
    const {indicator} = route.params;
    try {
      const {status, data} = await axios.get(
        `https://mindicador.cl/api/${indicator}`,
      );
      if (status === 200) {
        console.log(data);
        updateCurrentData(data.serie);
      }
    } catch (error) {
      console.log({error});
      updateCurrentData([]);
    }
    //updateIsLoading(false);
  };
  //   const dato = Object.values(currentData);
  //   console.log(dato);
  const {indicator} = route.params;
  Moment.locale('es');
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} forceInset={{top: 'always'}}>
        <View style={styles.header}>
          <Text style={styles.titulo}>{indicator}</Text>
          <View>
            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={styles.backButton}>
              <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Divider style={{backgroundColor: 'blue'}} />
        <View>
          <FlatList
            data={currentData}
            keyExtractor={(item) => item.codigo}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={{margin: 10}}>
                  <Text>{Moment(item.fecha).format('D MMM Y')}</Text>
                  <Text style={styles.valor}>${item.valor}</Text>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Screen1;
