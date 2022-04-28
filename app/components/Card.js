import { Button, StyleSheet, Text, TextInput, View, 
    Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Contacts from 'expo-contacts';

import ErrorMessage from './ErrorMessage';

const schema = Yup.object().shape(
    {
        FirstName: Yup.string().required().min(1).max(10).label("FirstName"),
        LastName: Yup.string().required().min(2).max(10).label("LastName"),
        Company: Yup.string().required().min(2).max(10).label("Company"),
    }
);


export default function Card({ id, image, title, subtitle, onPress, obj}) {
  return (
    <View style={styles.container}>
         <TouchableOpacity style={styles.cross} onPress={onPress}>
            <MaterialCommunityIcons 
                name="close-box"
                size={40}
            />
        </TouchableOpacity>
        {image && <Image source={image} style={styles.image} />}
        <View style={styles.textContainer}>
            <Formik
                        initialValues={{FirstName: title.split(" ")[0], LastName: title.split(" ")[1], Company: subtitle}}
                        onSubmit={async (values, {resetForm}) => {
                            console.log(values);
                            const { status } = await Contacts.requestPermissionsAsync();
                            if (status === 'granted') {
                                const contact = {
                                    ...obj,
                                    [Contacts.Fields.FirstName]: values.FirstName,
                                    [Contacts.Fields.LastName]: values.LastName,
                                    [Contacts.Fields.Company]: values.Company
                                }
                                await Contacts.updateContactAsync(contact);
                                console.log("here")
                            }
                            resetForm();
                            onPress();
                        }}
                        validationSchema={schema}>
                    {({values, handleChange, handleSubmit, errors, setFieldTouched, touched}) => (
                        <>
                            <View style={styles.textInputContainer}>
                                <TextInput 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    icon="account"
                                    keyboardType="default"
                                    style={styles.title}
                                    onBlur={() => setFieldTouched("FirstName")}
                                    onChangeText = {handleChange("FirstName")}
                                    placeholder="FirstName" 
                                    value={values.FirstName}   
                                />
                                {touched.FirstName && errors.FirstName && errors.FirstName.length > 0
                                &&<ErrorMessage text={errors.FirstName} />}
                                <TextInput 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    icon="lock"
                                    keyboardType="default"
                                    style={styles.title}
                                    onBlur={() => setFieldTouched("LastName")}
                                    onChangeText = {handleChange("LastName")}
                                    placeholder="LastName"
                                    value={values.LastName} 
                                />
                                {touched.LastName && errors.LastName && errors.LastName.length > 0 && <ErrorMessage text={errors.LastName} />}
                                <TextInput 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    icon="lock"
                                    keyboardType="default"
                                    style={styles.title}
                                    onBlur={() => setFieldTouched("Company")}
                                    onChangeText = {handleChange("Company")}
                                    placeholder="Company"
                                    value={values.Company} 
                                />
                                {touched.Company && errors.Company && errors.Company.length > 0 && <ErrorMessage text={errors.Company} />}
                            </View>
                            <View style={styles.buttonsContainer}>
                                <Button 
                                    title="Edit contact"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </>
                    )}
                </Formik>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        padding: 20,
        borderWidth: 1, 
        borderColor: '#000',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: 10,
        marginLeft: 10,
        // height: 400,
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
        marginTop: 50
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        borderBottomWidth: 1,
        marginBottom: 10
    },
    cross: {
        marginLeft: 'auto'
    }
})