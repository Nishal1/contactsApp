import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AppListItem({ image, title, onPressView, onPressDelete}) {
  return (
    <TouchableHighlight onPress={onPressView}>
        <View style={styles.container}>
            {image && <Image source={image} style={styles.image} />}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity onPress={onPressDelete}>
                <MaterialCommunityIcons 
                    name="delete"
                    size={40}
                />
            </TouchableOpacity>
        </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B2ACAB',
        flexDirection: 'row',
        padding: 20,
        borderWidth: 1, 
        borderColor: '#000',
        marginBottom: 3,
        borderRadius: 5,
        justifyContent: 'space-between'
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
        fontSize: 18
    },
    subtitle: {
        fontSize: 15,
        fontStyle: 'italic'
    }
})