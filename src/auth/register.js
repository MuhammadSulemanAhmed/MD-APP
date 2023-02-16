
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
    Linking,
    Dimensions
} from 'react-native';
const { height, width } = Dimensions.get('screen')
import { _pushTo, _pushToNoBack, _toHome, _ToLogin } from '../routes/routes';
import { LOGIN, SIGNUP, VERIFY } from '../routes/payloads.routes';
import { baseurl } from '../config/config';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
const Register = () => {

    const [Name, setName] = useState("");
    const [CompanyName, setCompanyName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const toLogin = () => {
        _ToLogin()
    }
    const toHome = () => {
        _toHome()
    }
    const usernameHandle = (newText) => {
        setName(newText);
    }
    const companyNameHandle = (newText) => {
        setCompanyName(newText);
    }
    const emailHandle = (newText) => {
        setEmail(newText);
    }
    const passwordNameHandle = (newText) => {
        setPassword(newText);
    }
    const RegisterAction = () => {

        // _pushToNoBack(VERIFY,{user_id:1,email_code:5621})
        // return
        if (!toggleCheckBox) {
            Alert.alert("", "Bitte akzeptieren Sie die Datenschutzerklärung.")
            return
        }
        setLoading(true)
        axios.post(baseurl + "/register", { username: Name, password: Password, company_name: CompanyName, email: Email }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
            }
        }).then((res) => {
            console.log("Email Code" + res.data.email_code)
            _pushToNoBack(VERIFY, { user_id: res.data.user_id, email_code: res.data.email_code })
        })
            .catch((err) => {
                setError(err.response?.data.message);
                console.log("===>", err.response?.data.message)
                setLoading(false)
            })
    }
    const openLink = async () => {
        let url = "https://mdashboard.de/datenschutz/"
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }
    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#3d4657",
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.SplashScreen_RootView}>
                <View style={styles.SplashScreen_ChildView}>
                    <Image source={require('../../images/logo.png')} style={styles.logo} />
                    <Text style={styles.heading}>Als Unternehmen registrieren</Text>
                    {
                        Loading == true ?
                            <ActivityIndicator size="large" style={styles.loadingBox} />
                            :
                            <>
                                {/* <TextInput
                                    style={styles.inputStyle}
                                    placeholder="Benutzername"
                                    onChangeText={(text) => {
                                        setName(text)
                                    }}
                                    value={Name}
                                    placeholderTextColor={"grey"}> </TextInput> */}
                                <TextInput 
                                style={styles.inputStyle} 
                                placeholder="Benutzername" 
                                onChangeText={usernameHandle}
                                value={Name} 
                                placeholderTextColor={"grey"}></TextInput>

                                <TextInput style={styles.inputStyle} placeholder="Firmenname" onChangeText={companyNameHandle} value={CompanyName} placeholderTextColor={"grey"}></TextInput>
                                <TextInput style={styles.inputStyle} placeholder="E-Mail" onChangeText={emailHandle} value={Email} placeholderTextColor={"grey"}></TextInput>
                                <TextInput style={styles.inputStyle} placeholder="Passwort" onChangeText={passwordNameHandle} value={Password} secureTextEntry={true} placeholderTextColor={"grey"}></TextInput>
                                <Text style={styles.error}>{Error}</Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 10,
                                        width: "100%"
                                    }}
                                >
                                    <CheckBox
                                        disabled={false}
                                        boxType={'square'}
                                        value={toggleCheckBox}
                                        style={{
                                            height: 20,
                                            width: 20
                                        }}
                                        // onCheckColor={'red'}
                                        lineWidth={1}
                                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                    />
                                    <Text style={{
                                        color: "white",
                                        fontSize: 18,
                                        marginLeft: 10
                                    }}>Ich bin damit einverstanden, dass MDashboard meine Daten bis auf Widerruf speichert. Ich habe die <Text style={{ color: "#6eadfa" }} onPress={() => {
                                        openLink()
                                    }}>Datenschutzerklärung</Text> gelesen und stimme dieser zu.</Text>
                                </View>


                                <ImageBackground onPress={() => RegisterAction()} source={require('../../images/btn_bg.jpg')} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                                    <Pressable style={styles.button} onPress={() => RegisterAction()}>
                                        <Text style={styles.text}>Registrieren</Text>
                                    </Pressable>
                                </ImageBackground>

                                <Text style={styles.linkText} onPress={() => toLogin()}>Anmelden</Text>
                            </>
                    }
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            paddingTop: (Platform.OS === 'ios') ? 10 : 0
        },

        SplashScreen_RootView:
        {
            // justifyContent: 'center',
            flex: 1,
            height: height + 100
            // position: 'absolute',
            // width: '100%',
            // height: '100%',

        },
        SplashScreen_ChildView:
        {
            // justifyContent: 'center',
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
            fontSize: 20,
            textAlign: "center",
            alignItems: 'center',
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
            color: 'black'
        },
        whiteText: {
            color: "#ffffff",
            textAlign: "center",
            paddingBottom: 10
        },
        error: {
            color: "red",
            textAlign: "center",
            paddingBottom: 10
        },
        linkText: {
            color: "#ffffff",
            width: "100%",
            textAlign: "center",
            padding: 15
        },
        heading: {
            color: "#fff",
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 20
        }
    });
export default Register;