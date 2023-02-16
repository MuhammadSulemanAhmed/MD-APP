
import React,{useState,useEffect}from 'react';
import type {Node} from 'react';
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
  ActivityIndicator
} from 'react-native';
import { _pushTo,_toHome } from '../routes/routes';
import { SIGNUP, VERIFIED } from '../routes/payloads.routes';
import { baseurl } from '../config/config';
import axios from 'axios';
import { navigation } from "react-native-navigation"

const Verify =(props)=> {

    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState(false);
    const [VerifyCode, setVerifyCode] = useState("");
    const [UserID, setuserID] = useState("");
    const [EmailCode, setemailCode] = useState("");

    const toDashboard = () => {
        _pushTo(SIGNUP)
    }
    const VerifyAction=()=>{
        setLoading(true)
        setError("");

        if(EmailCode!=VerifyCode){
            setLoading(false)
            setError("Bitte geben Sie den Bestätigungscode ein");
            return false;
        }
        
        
        axios.post(baseurl+"/verify-email",{user_id:UserID,email_code:VerifyCode},{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept':'application/json',
            }
        }).then((res) => {
                 _pushTo(VERIFIED)
          })
          .catch((err) => {
              setError(err.response.data.message);
              console.log(err.response.data.message)
              setLoading(false)
          })
    }
    const saveProps=()=>{
        var user_id=props.user_id;
        var email_code=props.email_code;
        setuserID(user_id)
        setemailCode(email_code)
    }
    const verifyCodeHandle = (newText) => {
        setVerifyCode(newText);
    }
    useEffect(()=>{
        saveProps();
        
    },[])
    return (
    <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
            <Text style={styles.Heading}>Vielen Dank für Ihre Registrierung</Text>
            <Text style={styles.subHeading}>Bitte überprüfen Sie Ihr E-Mail Postfach!</Text>
            {
                Loading==true?
                <ActivityIndicator size="large" style={styles.loadingBox} />
                :
                <>
                <TextInput 
                style={styles.inputStyle}  
                onChangeText={verifyCodeHandle}  
                placeholderTextColor={"grey"}
                 keyboardType = 'numeric' 
                  value={VerifyCode}
                   maxLength={4}
                   placeholder={"XXXX"}
                   ></TextInput>
                <Text style={styles.error}>{Error}</Text>
                <ImageBackground  onPress = {() =>VerifyAction()} source={require('../../images/btn_bg.jpg')} imageStyle={{ borderRadius: 40}} resizeMode="cover" style={styles.button_bg}>
                    <Pressable style={styles.button} onPress = {() =>VerifyAction()}> 
                            <Text style={styles.text}>Konto verifizieren</Text>
                    </Pressable>
                </ImageBackground>
                </>
            }   
        </View>
   
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
            paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
        },
     
        SplashScreen_RootView:
        {
            justifyContent: 'center',
            flex:1,
            position: 'absolute',
            width: '100%',
            height: '100%',

        },
        SplashScreen_ChildView:
        {
            justifyContent: 'center',
            flex:1,
            backgroundColor:"#3d4657",
            paddingLeft:"10%",
            paddingRight:"10%",
            alignItems: 'center',
        },
        logo:{
            justifyContent: 'center',
            alignItems: 'center',
        },
        Heading:{
            color:"#ffffff",
            fontSize:25,
            textAlign:"center",
            alignItems: 'center',
        },
        subHeading:{
            color:"#ffffff",
            fontSize:15,
            marginBottom:30
        }, 
        button_bg:{
            borderRadius:30,
            width:"100%"
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            backgroundColor: 'transparent',
            borderRadius:30,
          },
        text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color:"#fff"
          },
        inputStyle:{
            borderColor:"#343434",
            borderBottomWidth:1,
            borderStyle:"solid",
            fontSize:30,
            marginBottom:"5%",
            backgroundColor:"#ffffff",
            paddingHorizontal:20,
            borderRadius:40,
            width:"100%",
            textAlign:"center",
            paddingVertical:20
        },
        whiteText:{
            color:"#ffffff",
            textAlign:"center",
            paddingBottom:10
        },
        error:{
            color:"red",
            textAlign:"center",
            paddingBottom:10
        },
        linkText:{
            color:"#ffffff",
            width:"100%",
            textAlign:"center",
        },
        heading:{
            color:"#fff",
            fontSize:20,
            textAlign:'center',
            marginBottom:20
        }
    });
export default Verify;