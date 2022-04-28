import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';

import AppListItem from '../components/AppListItem';
import Card from '../components/Card';

export default function Home({ route, navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [isVisible, setVisibility] = useState(false);
  const [c, setD] = useState(null);
  
  const handleDelete = async (id) => {
    if(id == null) {
      return;
    }
    await Contacts.removeContactAsync(id);
  }

  const deleteButtonAlert = (id) =>
  Alert.alert(
    "Are you sure you want to delete this contact?",
    "If you delete this, it might be lost forever!",
    [
      { 
        text: "Yes", 
        onPress: () => {
          handleDelete(id);
          alert("Contact deleted successfully!");
          navigation.navigate('Home', {
            isRefresh: true
        });
      }},
      {
        text: "No",
        onPress: () => console.log("cancelled"),
        style: "cancel"
      }
    ]
  );

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
      // console.log(contact);
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
                navigation={navigation}
                onPressDelete={() => {deleteButtonAlert(item.id)}}
                onPressView={() => {
                  setVisibility(true);
                  setSelectItem(item);
                  console.log(selectItem)
                }}
            />
        )}
        />
        <Modal 
          animationType="fade"
          visible={isVisible}
        >
              {selectItem != null ? <Card
              // image={selectItem.image}
              id={selectItem.id}
              title={selectItem.name}
              subtitle={selectItem.company}
              obj={selectItem}
              onPress={() => setVisibility(false)}
              />: <></>}
        </Modal>
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
