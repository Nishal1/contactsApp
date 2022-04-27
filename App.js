import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';

import AppListItem from './app/components/AppListItem';

export default function App() {
  // const [refreshing, setRefreshing] = useState(false);
  const [c, setD] = useState(null);
  const getInfo = () => {
    useEffect(() => {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        let dataInfo = [];
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Emails],
          });
          dataInfo = data;
          if (data.length > 0) {
            const contact = data;
            setD(contact);
            //console.log(contact);
          }
        }
        return dataInfo;
      })();
    }, []);  
  }
  getInfo();
  return (
    <View style={styles.container}>
      <FlatList 
        data={c}
        keyExtractor={p => p.id}
        // refreshing={refreshing}
        // onRefresh={() => setD(getInfo())}
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
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    marginBottom: 50
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
