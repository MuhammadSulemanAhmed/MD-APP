
import React, { useEffect, useState } from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _pushTo } from '../routes/routes';
import { LOGIN } from '../routes/payloads.routes';
import { logout } from '../config/auth';
import axios from 'axios';
const Logout = () => {
    const [UserName, setUserName] = useState("");
    const [groupTitle, setGroupTitle] = useState("");
    const [user, setUser] = useState("");


    useEffect(() => {
        getData();
        (async () => {

        });

    }, [])
    const getData = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        console.log(JSON.stringify(user));
        setUser(user)
        setUserName(user.username)
        let grouPTI = await AsyncStorage.getItem("groupName", null)
        if (grouPTI !== null) {
            setGroupTitle(grouPTI)
        }
    }
    const Logout = async () => {
        logout();
        _pushTo(LOGIN)
    }
    const deleteMyAccount = () => {
        axios.get("https://app.mdashboard.de/delete_user/" + UserName, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
            }
        }).then((res) => {
            console.log("delete => ", res.data)
            logout();
            _pushTo(LOGIN)
        })
            .catch((err) => {
                console.log("error => ", err)
            })

    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerHeading}>Einstellung</Text>
                </View>
                {/* {user.role_id === 2 ?
                    < View
                        style={{
                            marginVertical: 15,
                            marginHorizontal: 35
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                marginVertical: 10
                            }}
                        >Group Title</Text>
                        <TextInput
                            placeholder='Enter group Title'
                            placeholderTextColor={"grey"}
                            value={groupTitle}
                            onChangeText={async (text) => {
                                setGroupTitle(text)
                              
                            }}
                            style={{
                                color: "white",
                                borderWidth: 1,
                                borderColor: 'white',
                                paddingHorizontal: 10,
                                paddingVertical: 20,
                                borderRadius: 20
                            }}
                        />
                         <ImageBackground source={require('../../images/btn_bg.jpg')} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                        <Pressable style={styles.button}
                            onPress={async() => {
                                await AsyncStorage.setItem("groupName", groupTitle)
                                // deleteMyAccount()
                            }}
                        >
                            <Text style={styles.text}>Account löschen</Text>
                        </Pressable>
                    </ImageBackground>
                    </View>
                    :
                    null
                } */}
                <View style={styles.mainBody}>
                    <ImageBackground source={require('../../images/btn_bg.jpg')} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                        <Pressable style={styles.button}
                            onPress={() => {
                                Alert.alert(
                                    "Account löschen",
                                    "Nachdem Sie Ihr Konto gelöscht haben, können Sie es nicht wiederherstellen. Sind Sie sicher, dass Sie Ihr Konto löschen wollen?",
                                    [
                                        {
                                            text: "Konto löschen",
                                            onPress: () => { deleteMyAccount() }
                                        },
                                        {
                                            text: "Abbrechen",
                                            onPress: () => { }
                                        }
                                    ]
                                )
                                // deleteMyAccount()
                            }}
                        >
                            <Text style={styles.text}>Account löschen</Text>
                        </Pressable>
                    </ImageBackground>
                    <ImageBackground source={require('../../images/btn_bg.jpg')} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                        <Pressable style={styles.button} onPress={() => Logout()} >
                            <Text style={styles.text}>Abmelden</Text>
                        </Pressable>
                    </ImageBackground>

                </View>

            </ScrollView>
        </SafeAreaView >
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
        button_bg: {
            borderRadius: 30,
            width: "100%",
            marginTop: 20
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
export default Logout;