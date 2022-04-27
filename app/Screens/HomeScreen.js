import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';

import AppListItem from '../components/AppListItem';

export default function Home({ route }) {
  const [refreshing, setRefreshing] = useState(false);
  const [c, setD] = useState(null);
  const getInfo = () => {
    useEffect(() => {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        let dataInfo = [];
        if (status === 'granted') {
          waitForData();
        }
        return dataInfo;
      })();
    }, []);  
  }
  const waitForData = async () => {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Emails],
    });
    if (data.length > 0) {
      const contact = data;
      setD(contact);
      //console.log(contact);
    }
  }
  getInfo();
  if(route.params && route.params.isRefresh) {
    
    waitForData();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>All Contacts:</Text>
      <FlatList 
        data={c}
        keyExtractor={p => p.id}
        // refreshing={refreshing}
        // onRefresh={() => refresh()}
        renderItem={({item}) => (
            <AppListItem 
                image={item.image}
                title={item.name}
                onPress={() => 1}
            />
            // console.log(item)
        )}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
    marginBottom: 0
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    fontSize: 26,
    marginBottom: 20
  }
});
