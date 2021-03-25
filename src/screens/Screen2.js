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
import {Divider} from 'react-native-elements';
import axios from 'axios';

import colors from '../config/colors';
import { TextInput } from 'react-native';
import Moment from 'moment';
import 'moment/locale/es';

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
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
  },
  titulo2: {
    textAlign: 'center',
    color: colors.blue,
    fontSize: 30,
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
  userInformation: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 40,
  },
  datosclave: {
    textAlign: 'center',
  },
});

const Screen2 = ({route, navigation}) => {
  const [currentData, updateCurrentData] = useState([]);
  const {indicator, valor, name, datum, messure} = route.params;
  useEffect(() => {
    fetchIndicator();
  }, []);

  const fetchIndicator = async () => {
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
  };

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
          <Text style={styles.titulo2}>${valor}</Text>
        </View>
        <View style={styles.userInformation}>
        <TextInput style={styles.texts}>Nombre:                      <Text style={styles.datosclave}>{name}</Text></TextInput>
        <TextInput style={styles.texts}>Fecha:                          <Text style={styles.datosclave}>{Moment(datum).format('D MMM Y')}</Text></TextInput>
        <TextInput style={styles.texts}>Unidad de medida:      <Text style={styles.datosclave}>{messure}</Text> </TextInput>
        </View>
        
      </SafeAreaView>
    </>
  );
};

export default Screen2;
