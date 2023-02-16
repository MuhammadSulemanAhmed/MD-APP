
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
    Image, Modal,
    ActivityIndicator,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions
} from 'react-native';
const {height,width}=Dimensions.get('screen')
import { DataTable } from 'react-native-paper';
import { baseurl } from '../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { _pushTo, _toAdmin, _pushToRoot } from '../routes/routes';
import { ADMIN_HOME } from '../routes/payloads.routes';
const addEmployee = (props) => {


    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Tel, setTel] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Hour, setHour] = useState("");
    const [Breaktime, setBreaktime] = useState("");
    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState(false);

    const nameHandle = (text) => {
        setName(text);
    }
    const emailHandle = (text) => {
        setEmail(text);
    }
    const telHandle = (text) => {
        setTel(text);
    }
    const usernameHandle = (text) => {
        setUsername(text);
    }
    const passwordHandle = (text) => {
        setPassword(text);
    }
    const hourHandle = (text) => {
        setHour(text);
    }
    const breaktimeHandle = (text) => {
        setBreaktime(text);
    }

    const AddEmployeeAction = async () => {

        setLoading(true)

        const token = await AsyncStorage.getItem('token');
        axios.post(baseurl + "/admin/add-employee", { name: Name, username: Username, password: Password, email: Email, tel: Tel, hour: Hour, breaktime: Breaktime }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            _toAdmin()
        })
            .catch((err) => {
                setError(err.response.data.message);
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        console.log(props)
                        _pushToRoot(ADMIN_HOME)
                        // props.navigation.goBack()
                    }}
                >
                    <Image
                        source={require('./../../images/leftarrow.png')}
                        style={{
                            height: 22,
                            width: 22,
                            tintColor: 'white',
                            marginRight: 10
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.headerHeading}>Mitarbeiter hinzufügen</Text>
            </View>
            <ScrollView
                style={{
                    flex: 1
                }}
            >

                <View style={styles.body}>
                <TextInput style={styles.inputStyle} placeholder="Mitarbeitername" onChangeText={nameHandle} value={Name} placeholderTextColor={"grey"}></TextInput>
                <TextInput style={styles.inputStyle} placeholder="E-Mail" onChangeText={emailHandle} value={Email} keyboardType={"email-address"} placeholderTextColor={"grey"}></TextInput>
                <TextInput style={styles.inputStyle} placeholder="Tel." onChangeText={telHandle} value={Tel} keyboardType={"number-pad"} placeholderTextColor={"grey"}></TextInput>
                <TextInput style={styles.inputStyle} placeholder="Benutzername" onChangeText={usernameHandle} value={Username} placeholderTextColor={"grey"}></TextInput>
                <TextInput style={styles.inputStyle} placeholder="Passwort" onChangeText={passwordHandle} value={Password} secureTextEntry={true} placeholderTextColor={"grey"} ></TextInput>
                <TextInput style={styles.inputStyle} placeholder="Monatsstunden" onChangeText={hourHandle} value={Hour} keyboardType={"numeric"} placeholderTextColor={"grey"}></TextInput>
                <TextInput style={styles.inputStyle} placeholder="Pause" onChangeText={breaktimeHandle} value={Breaktime} keyboardType={"numeric"} placeholderTextColor={"grey"}></TextInput>
                <Text style={styles.whiteText}>{Error}</Text>
                {
                    Loading == false ?
                        <ImageBackground source={require('../../images/btn_bg.jpg')} onPress={() => AddEmployeeAction()} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                            <Pressable style={styles.button} onPress={() => AddEmployeeAction()}   >
                                <Text style={styles.text}>Mitarbeiter hinzufügen</Text>
                            </Pressable>
                        </ImageBackground>
                        :
                        null
                }
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create(
    {
        body: {
            paddingVertical: 30,
            paddingHorizontal: 20,
            height:height+100,
            // backgroundColor:'red'
        },
        container: {
            flex: 1,
            backgroundColor: "#242f43"
        },
        loadingBox: {
            paddingTop: "10%"
        },
        header: {
            width: "100%",
            backgroundColor: "#151d2c",
            paddingHorizontal: 20,
            paddingVertical: 40,
            borderBottomRightRadius: 70,
            borderEndColor: "#1a95a7",
            borderEndWidth: 25,
            flexDirection: 'row'
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
            flexDirection: 'row',
            alignItems: 'center'
        },
        headerHeading: {
            color: "#ffffff",
            fontSize: 19
        },
        TableHeadStyle: {
            height: 50,
            alignContent: "center",
            backgroundColor: '#151d2c',
            textAlign: "center",
            color: "#ffffff",
        },
        TableCellStyle: {
            height: 50,
            alignContent: "center",
            backgroundColor: '#25324c',
            textAlign: "center",
            color: "#ffffff",
            borderBottomWidth: 1,
            borderBottomColor: "#25a2ac"
        },
        whiteText: {
            color: "#ffffff",
            textAlign: "center",
        },
        modalDiv: {
            backgroundColor: "#242f43",
            flex: 1,
            padding: 40
        },
        modelHeading: {
            color: "#fff",
            fontSize: 20
        },
        taskDetail: {
            color: "#fff",
            fontSize: 16,
            marginTop: 20
        },
        status: {
            color: "#fff",
            fontSize: 16,
            marginTop: 20
        },
        button_bg: {
            borderRadius: 30,
            width: "100%",
            marginTop: "5%"
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
        inputStyle: {
            borderColor: "#343434",
            borderBottomWidth: 1,
            borderStyle: "solid",
            fontSize: 13,
            marginBottom: "5%",
            backgroundColor: "#ffffff",
            paddingHorizontal: 20,
            borderRadius: 40,
            width: "100%",
            textAlign: "center",
            height: 50,
            color:"black"
        },
        whiteText: {
            color: "#ffffff",
            textAlign: "center",
            paddingBottom: 10
        },
    });
export default addEmployee;