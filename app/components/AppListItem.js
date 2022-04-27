import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import React from 'react'

export default function AppListItem({image, title, onPress}) {
  return (
    <TouchableHighlight onPress={onPress}>
        <View style={styles.container}>
            {image && <Image source={image} style={styles.image} />}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 20,
        borderWidth: 1, 
        borderColor: '#000',
        marginBottom: 3,
        borderRadius: 5
    },
    image: {
        height: 75,
        width: 75,
        borderRadius: 50,
        marginRight: 20,
        marginLeft: 10
    },
    textContainer: {
        flexDirection: 'column'
    },
    title: {
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 15,
        fontStyle: 'italic'
    }
})