
import React, { useState } from 'react';
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
    Image,
    ActivityIndicator,
    Modal,
    TouchableOpacity

} from 'react-native';
import { _pushTo, _toHome, _toAdmin } from '../routes/routes';
import { SIGNUP, REGISTER, MAIN } from '../routes/payloads.routes';
import { baseurl } from '../config/config';
import axios from 'axios';
import { SaveLogin } from '../config/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
const Login = () => {

    const [Error, setError] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPasssword] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [Loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [response, setResponse] = useState("");
    const [currentView, setCurrentView] = useState("email");


    const toDashboard = () => {
        _pushTo(SIGNUP)
    }
    const loginCheck = () => {
        setLoading(true)
        axios.post(baseurl + "/login", { name: Username, password: Password }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
            }
        }).then((res) => {
            // console.log(res.data.user)
            // return
            if (res.data.user?.is_deleted === 1) {
                setLoading(false)
                Alert.alert("","Benutzer gelöscht oder nicht vorhanden")
            } else {
                console.log("====>",res.data.user)
                // setLoading(false)
                // return
                let user={
                    ...res.data.user,
                    username:Username
                }
                SaveLogin(res.data.token, user);
                setLoading(false)
                if (res.data.user.role_id === 4) {
                    _toHome()
                } else if (res.data.user.role_id === 2) {
                    _toAdmin()
                }
            }
        })
            .catch((err) => {
                console.log(err)
                setError("Der Benutzername und/oder das Passwort sind ungültig.");
                setLoading(false)
            })
        /*if(Username=="admin" && Password=="admin1234"){
            _toHome()
        }else{
            setError("Diese Ausweise stimmen nicht mit unseren Unterlagen überein.");
        }*/
    }
    const verifyEmail = () => {
        console.log("start")
        setLoading(true)
        axios.post(baseurl + "/forgot-password", { "email": email }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
            }
        }).then((res) => {
            console.log(res.data)
            setLoading(false)
            // Alert.alert("Neue Mitteilung","Passwort erfolgreich geändert!")
            Alert.alert("Neue Mitteilung", res.data?.message)
            setResponse(res.data)
            setCurrentView("code")
            // SaveLogin(res.data.token, res.data.user);

        })
            .catch((err) => {
                console.log(err)
                setError("Der Benutzername und/oder das Passwort sind ungültig.");
                setLoading(false)
            })
    }
    const changePassword = () => {
        setLoading(true)
        console.log({
            code: parseInt(code),
            user_id: response.user_id,
            password: Password
        })
        let formdata = new FormData()
        formdata.append("code", code)
        formdata.append("user_id", response.user_id)
        formdata.append("password", Password)

        axios.post("https://app.mdashboard.de/api/forgot-verify-change?code="+code+"&user_id="+response.user_id+"&password="+Password, {
            headers: {
                // 'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
            }
        }).then((res) => {
            // console.log(res.data)
            setPasssword("")
            setShowModal(false)
            setCurrentView("email")
            Alert.alert("Neue Mitteilung", "Passwort erfolgreich geändert!")
            setLoading(false)
            // SaveLogin(res.data.token, res.data.user);

        })
            .catch((err) => {
                console.log(err)
                setPasssword("")
                setShowModal(false)
                setCurrentView("email")
                Alert.alert("Neue Mitteilung", "Passwort erfolgreich geändert!")
                // alert("Passwort erfolgreich geändert!")
                setLoading(false)
            })
    }
    const usernameHandle = (newText) => {
        setUsername(newText);
    }
    const passwordHandle = (newText) => {
        setPasssword(newText);
    }
    return (
        <View style={styles.SplashScreen_RootView}>

            <View style={styles.SplashScreen_ChildView}>
                <Image source={require('../../images/logo.png')} style={styles.logo} />
                {
                    Loading == true ?
                        <ActivityIndicator size="large" style={styles.loadingBox} />
                        :
                        <>
                            <TextInput style={styles.inputStyle} placeholder="Benutzername" onChangeText={usernameHandle} value={Username} placeholderTextColor={"grey"}></TextInput>
                            <TextInput style={styles.inputStyle} placeholderTextColor={"grey"} placeholder="Passwort" onChangeText={passwordHandle} value={Password} secureTextEntry={true}></TextInput>
                            <Text
                                style={[styles.linkText, { marginTop: -10 }]}
                                onPress={() => {
                                    setShowModal(true)
                                }}
                            >Passwort vergessen?</Text>
                            <Text style={styles.whiteText}>{Error}</Text>
                            <ImageBackground onPress={() => loginCheck()} source={require('../../images/btn_bg.jpg')} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                                <Pressable style={styles.button} onPress={() => loginCheck()}>
                                    <Text style={styles.text}>Anmelden</Text>
                                </Pressable>
                            </ImageBackground>
                            <Text style={styles.linkText} onPress={() => _pushTo(REGISTER)}>Als Unternehmen registrieren</Text>
                        </>
                }

            </View>
            <Modal
                visible={showModal}
                transparent
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#3d4657",
                        marginHorizontal: 10
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: "center"
                        }}
                    >
                        <View />
                        <Image
                            source={require('../../images/ems_white.png')}
                            style={[styles.logo, { alignSelf: 'center', marginLeft: 25 }]} />
                        <TouchableOpacity>
                            <Icon
                                name="close"
                                size={30}
                                color="#ffffff"
                                onPress={() => {
                                    setError("")
                                    setShowModal(false)
                                }} />
                        </TouchableOpacity>

                    </View>


                    <TextInput
                        style={[styles.inputStyle]}
                        placeholder={currentView === "email" ? "Benutzername" : "Code"}
                        placeholderTextColor={"grey"}
                        onChangeText={(text) => {
                            if (currentView === "email") {
                                setEmail(text)
                            } else {
                                setCode(text)
                            }

                        }}
                        value={currentView === 'email' ? email : code}></TextInput>
                    {currentView === 'email' ?
                        null
                        :
                        <TextInput
                            style={[styles.inputStyle]}
                            placeholder={"Neues Passwort"}
                            placeholderTextColor={"grey"}
                            onChangeText={(text) => {
                                setPasssword(text)
                            }}
                            secureTextEntry={true}
                            value={Password}></TextInput>
                    }
                    <Text style={styles.whiteText}>{Error}</Text>
                    {Loading == true ?
                        <ActivityIndicator size="large" style={styles.loadingBox} />
                        :
                        null
                    }
                    <ImageBackground
                        onPress={() => {
                            if (currentView === 'email') {
                                verifyEmail()
                            } else {
                                changePassword()
                            }
                        }}
                        source={require('../../images/btn_bg.jpg')}
                        imageStyle={{ borderRadius: 40 }}
                        resizeMode="cover"
                        style={styles.button_bg}>
                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                if (currentView === 'email') {
                                    verifyEmail()
                                } else {
                                    changePassword()
                                }
                            }}>
                            <Text style={styles.text}>Anmelden</Text>
                        </Pressable>
                    </ImageBackground>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: (Platform.OS === 'ios') ? 20 : 0
        },

        SplashScreen_RootView:
        {
            justifyContent: 'center',
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',

        },
        SplashScreen_ChildView:
        {
            justifyContent: 'center',
            flex: 1,
            backgroundColor: "#3d4657",
            paddingLeft: "10%",
            paddingRight: "10%",
            alignItems: 'center',
        },
        logo: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 180,
            width: 180,
            resizeMode: "contain"
        },
        Heading: {
            color: "#ffffff",
            fontSize: 35,
        },
        subHeading: {
            color: "#ffffff",
            fontSize: 15,
            marginBottom: "15%"
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
        linkText: {
            color: "#ffffff",
            paddingTop: 15,
            width: "100%",
            textAlign: "center"
        }
    });
export default Login;