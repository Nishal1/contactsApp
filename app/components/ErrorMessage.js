import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ErrorMessage({text}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F7B0BB',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "red",
      padding: 7,
      marginTop: 0,
      height: 39,
      marginLeft: 10,
      marginRight: 10
    },
    text: {
      color: "red",
      fontSize: 12,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
})