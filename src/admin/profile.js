
import React,{useState,useEffect} from 'react';
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
  Image
} from 'react-native';
import { baseurl } from '../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
const Profile =()=> {

    const [Error,setError]= useState("");
    const [UserName,setUserName]= useState("");
    const [position,setposition]= useState("");

    const [Email,setEmail]= useState("");
    const [Company,setCompany]= useState("");
    const [Password,setPassword]= useState("");
    const getData=async()=>{
        const token = await AsyncStorage.getItem('token');
        axios.get(baseurl+"/admin/user-detail",{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept':'application/json',
                'Authorization':'Bearer '+token,
            }
        }).then((res) => {
            console.log("====>",res.data)
            setUserName(res.data.name);
            setEmail(res.data.email);
            setCompany(res.data.company_name);
            setposition(res.data.position);

        })
        .catch((err) => {
            console.log("RESPONSE RECEIVED: ", err);
        })
    }
    const updateAction=async()=>{
        setError("");
        const token = await AsyncStorage.getItem('token');
        axios.post(baseurl+"/admin/user-update",{company_name:Company,password:Password,position:position},{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept':'application/json',
                'Authorization':'Bearer '+token,
            }
        }).then(async(res) => {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            let newUser={
                ...user,
                company_name:Company,password:Password,position:position
            }
            await AsyncStorage.setItem('user',JSON.stringify(newUser))
            getData();
            setPassword("");
            showToast()
        })
        .catch((err) => {
              setError(err.response.data.message);
              console.log(err)
        })
    }
    const UserNameHandle=(text)=>{
        setCompany(text);
    }
    const PasswordHandle=(text)=>{
        setPassword(text);
    }
    const showToast = () => {
        Toast.show({
        type: 'success',
        text1: 'Erfolg',
        text2: 'Profil aktualisiert 👋',
        });
    }
    
    useEffect(()=>{
        getData();
        (async() =>{
        });
        
    },[])

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
                                <TextInput style={styles.inputStyle} value={UserName}  editable={false} ></TextInput>
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Position *</Text>
                                <TextInput style={styles.inputStyle} value={position} editable={true} onChangeText={(text)=>{setposition(text)}}></TextInput>
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>E-Mail *</Text>
                                <TextInput style={styles.inputStyle} value={Email} autoComplete='email' keyboardType="email-address" editable={false}></TextInput>
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Firmenname</Text>
                                <TextInput style={styles.inputStyle} value={Company} onChangeText={UserNameHandle} ></TextInput>
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Passwort</Text>
                                <TextInput style={styles.inputStyle} value={Password} onChangeText={PasswordHandle} secureTextEntry={true} ></TextInput>
                            </View>
                            <Text style={styles.error}>{Error}</Text>
                            <ImageBackground source={require('../../images/btn_bg.jpg')} onPress={()=>updateAction()} imageStyle={{ borderRadius: 40}} resizeMode="cover" style={styles.button_bg}>
                                <Pressable style={styles.button} onPress={()=>updateAction()}> 
                                        <Text style={styles.text}>Speichern</Text>
                                </Pressable>
                            </ImageBackground>

                            <Toast position='top' topOffset={0}   />
                            
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
            backgroundColor:"#242f43"
          },
          header:{
              width:"100%",
              backgroundColor:"#151d2c",
              paddingHorizontal:20,
              paddingVertical:20,
              borderBottomColor:"#1a95a7",
              borderBottomWidth:2,
              shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              
              elevation: 5,
          },
          mainBody:{
              padding:20,
          },
          headerHeading:{
              color:"#ffffff",
              fontSize:19
          },
          userUpdateForm:{
              marginVertical:20,
          },
          userUpdateFormHeading:{
              color:"#ffffff",
              fontSize:20,
              marginBottom:25
          },
          label:{
              color:"#fff",
              fontSize:14
          },
          inputStyle:{
            borderColor:"#25a2ac",
            borderWidth:1,
            borderStyle:"solid",
            fontSize:13,
            marginBottom:"5%",
            backgroundColor:"#25324c",
            paddingHorizontal:20,
            width:"100%",
            textAlign:"left",
            color:"#ffffff",
            marginTop:10,
            height:40
          },
          formGroup:{
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
        error:{
            color:"#ffffff",
            fontSize:15,
            textAlign:'center',
            marginBottom:10
        }
    });
export default Profile;