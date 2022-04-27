import { Button, StyleSheet, ScrollView, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Contacts from 'expo-contacts';

import ErrorMessage from '../components/ErrorMessage';


const schema = Yup.object().shape(
    {
        FirstName: Yup.string().required().min(1).max(10).label("FirstName"),
        LastName: Yup.string().required().min(2).max(10).label("LastName"),
        Company: Yup.string().required().min(2).max(10).label("Company"),
    }
);

export default function AddScreen({navigation}) { 
  return (
    <ScrollView>
        <View style={styles.container}>
            <Formik
                        initialValues={{FirstName: "", LastName: "", Company: ""}}
                        onSubmit={async (values, {resetForm}) => {
                            console.log(values);
                            const { status } = await Contacts.requestPermissionsAsync();
                            if (status === 'granted') {
                                const contact = {
                                    [Contacts.Fields.FirstName]: values.FirstName,
                                    [Contacts.Fields.LastName]: values.LastName,
                                    [Contacts.Fields.Company]: values.Company
                                }
                                const contactId = await Contacts.addContactAsync(contact);
                                console.log("here")
                            }
                            resetForm();
                            navigation.navigate('Home', {
                                isRefresh: true
                            });
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
                                    style={styles.input}
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
                                    style={styles.input}
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
                                    style={styles.input}
                                    onBlur={() => setFieldTouched("Company")}
                                    onChangeText = {handleChange("Company")}
                                    placeholder="Company"
                                    value={values.Company} 
                                />
                                {touched.Company && errors.Company && errors.Company.length > 0 && <ErrorMessage text={errors.Company} />}
                            </View>
                            <View style={styles.buttonsContainer}>
                                <Button 
                                    title="Add contact"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </>
                    )}
                </Formik>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: '30%',
        margin: 20,
        marginBottom: 100,
        backgroundColor: 'lightgrey',
        borderWidth: 1,
        height: 550
    },
    background: {
        flex: 1
    },
    textInputContainer: {
        marginTop: 50,
        marginBottom: 30
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        marginBottom: 20
    }
})