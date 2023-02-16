
import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    Pressable,
    Alert,
    ImageBackground,
    Image
} from 'react-native';
import { baseurl } from '../config/config';
import axios from 'axios';
import { LOGIN } from '../routes/payloads.routes';
import { logout } from '../config/auth';
import { _pushTo } from '../routes/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = () => {

    const [UserName, setUserName] = useState("");
    const [Email, setEmail] = useState("");
    const [Tel, setTel] = useState("");
    const [Company, setCompany] = useState("");
    const getData = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        console.log("User:" + user);
        setUserName(user.emp_name)
        setTel(user.phone_number)
        setEmail(user.email)
        setCompany(user.company_name);
    }

    useEffect(() => {
        getData();
        (async () => {
        });

    }, [])
    const deleteMyAccount = () => {
        axios.get("https://app.mdashboard.de/delete_user/" + UserName, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
            }
        }).then((res) => {
            console.log(res.data)
            logout();
            _pushTo(LOGIN)
        })
            .catch((err) => {

            })

    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerHeading}>Profil</Text>
                </View>

                <View style={styles.mainBody}>
                    {/*User Update Form*/}
                    <View style={styles.userUpdateForm}>
                        <Text style={styles.userUpdateFormHeading}>Benutzerprofil aktualisieren</Text>

                        {/*Form*/}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Benutzername *</Text>
                            <TextInput style={styles.inputStyle} value={UserName}></TextInput>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>E-Mail *</Text>
                            <TextInput style={styles.inputStyle} value={Email} autoComplete='email' keyboardType="email-address"></TextInput>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Tel. *</Text>
                            <TextInput style={styles.inputStyle} value={Tel} autoComplete='tel' keyboardType="phone-pad"></TextInput>
                        </View>

                        {/* <View style={styles.formGroup}>
                            <Text style={styles.label}>Firmenname</Text>
                            <TextInput style={styles.inputStyle} value={Company} ></TextInput>
                        </View> */}

                        {/* <ImageBackground source={require('../../images/btn_bg.jpg')} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                            <Pressable style={styles.button}
                                onPress={() => {
                                    Alert.alert(
                                        "Account löschen",
                                        "Nachdem Sie Ihr Konto gelöscht haben, können Sie es nicht wiederherstellen. Sind Sie sicher, dass Sie Ihr Konto löschen wollen?",
                                        [
                                            {
                                                text: "Ja, bestätige",
                                                onPress: () => { deleteMyAccount() }
                                            },
                                            {
                                                text: "Löschen",
                                                onPress: () => { }
                                            }
                                        ]
                                    )
                                    // deleteMyAccount()
                                }}
                            >
                                <Text style={styles.text}>Account löschen</Text>
                            </Pressable>
                        </ImageBackground> */}



                        {/*Form*/}

                    </View>
                    {/*User Update Form*/}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "#242f43"
        },
        header: {
            width: "100%",
            backgroundColor: "#151d2c",
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderBottomColor: "#1a95a7",
            borderBottomWidth: 2,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
        mainBody: {
            padding: 20,
        },
        headerHeading: {
            color: "#ffffff",
            fontSize: 19
        },
        userUpdateForm: {
            marginVertical: 20,
        },
        userUpdateFormHeading: {
            color: "#ffffff",
            fontSize: 20,
            marginBottom: 25
        },
        label: {
            color: "#fff",
            fontSize: 14
        },
        inputStyle: {
            borderColor: "#25a2ac",
            borderWidth: 1,
            borderStyle: "solid",
            fontSize: 13,
            marginBottom: "5%",
            backgroundColor: "#25324c",
            paddingHorizontal: 20,
            width: "100%",
            textAlign: "left",
            color: "#ffffff",
            marginTop: 10,
            height: 50
        },
        formGroup: {
        },
        button_bg: {
            borderRadius: 30,
            width: "100%"
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            backgroundColor: 'transparent',
            borderRadius: 30,
        },
        text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: "#fff"
        },
    });
export default Profile;