
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
import { _pushTo,_toHome, _ToLogin } from '../routes/routes';
import { LOGIN, SIGNUP } from '../routes/payloads.routes';
import { baseurl } from '../config/config';
import axios from 'axios';
import { navigation } from "react-native-navigation"

const Verified =(props)=> {


    const toLogin = () => {
        _ToLogin()
    }
    return (
    <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
            <Image source={require("../../images/verified.png")} style={styles.veriImage}/>
            <Text style={styles.heading}>Konto verifiziert</Text>
            <ImageBackground  onPress = {() =>toLogin()} source={require('../../images/btn_bg.jpg')} imageStyle={{ borderRadius: 40}} resizeMode="cover" style={styles.button_bg}>
                    <Pressable style={styles.button} onPress = {() =>toLogin()}> 
                            <Text style={styles.text}>Gehe zu Anmelden</Text>
                    </Pressable>
            </ImageBackground>
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
            fontSize:30,
            textAlign:'center',
            marginBottom:40
        },
        veriImage:{
            marginBottom:"6%"
        }
    });
export default Verified;