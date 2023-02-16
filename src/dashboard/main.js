
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
    Image,
    ActivityIndicator
} from 'react-native';
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { baseurl } from '../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
    const [ButtonName, setButtonName] = useState("Check In");
    const [CheckInTime, setCheckInTime] = useState("");
    const [CheckOutTime, setCheckOutTime] = useState("");
    const [TimingData, setTimingData] = useState([]);
    const [StatusData, setStatusData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [UserName, setUserName] = useState("User");
    const attendanceBtn = () => {

    }
    const getData = async () => {
        setIsLoading(true)
        setTimingData([])

        const user = JSON.parse(await AsyncStorage.getItem('user'));
        console.log(user);
        setUserName(user?.emp_name)

        const token = await AsyncStorage.getItem('token');
        axios.get(baseurl + "/todaydetails_new?user_id=" + user.user_id, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLm1kYXNoYm9hcmQuZGVcL2FwaVwvbG9naW4iLCJpYXQiOjE2NTk1MDgxNzcsImV4cCI6MTY1OTUwODE3NywibmJmIjoxNjU5NTA4MTc3LCJqdGkiOiJ6dTc1NW1iQnJ0Zkd6dHc1Iiwic3ViIjoyNCwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.oNpUGzofUz3IUNvOyRSaLib_xX-iASeynlfd2eUoKMw',
            }
        }).then((res) => {
            //console.log("RESPONSE RECEIVED: ", res.data.timing);
            setTimingData(res.data.timing)
            setStatusData(res.data.statusData)
            setButtonName(res.data.lastStatus)
            setIsLoading(false)
        })
            .catch((err) => {
                console.log("RESPONSE RECEIVED123: ", err);
                setIsLoading(false)
            })
    }
    const checkIn = async () => {
        console.log("asd")
        const token = await AsyncStorage.getItem('token');
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        axios.post(baseurl + "/checkin?user_id=" + user.user_id, {}, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            getData();
            console.log("res ??", res.data);
        })
            .catch((err) => {
                console.log("error:123 ", err);
            })
    }
    const checkOut = async () => {
        const token = await AsyncStorage.getItem('token');
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        axios.post(baseurl + "/checkout?user_id=" + user.user_id, {}, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            console.log(res)
            getData();
        })
            .catch((err) => {
                console.log("error: ", err);
            })
    }
    const applyLeave = async () => {
        const token = await AsyncStorage.getItem('token');
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        axios.post(`https://app.mdashboard.de/api/leave?emp_id=${user.id}&user_id=${user.company_id}&reason=sickness`, {}, {
            headers: {
                // 'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            getData();
            if (res.data === 0) {
                Alert.alert("", "Du bist krankgeschrieben!")
            } else if (res.data === 2) {
                Alert.alert("", "Du bist krankgeschrieben!")
            } else {
                Alert.alert("", "Du bist heute krank gemeldet!")
            }
            console.log("res ??", res.data);

        })
            .catch((err) => {
                console.log("error:123 ", err);
            })
    }
    useEffect(() => {
        getData();
        (async () => {
        });

    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <View style={styles.header}>
                    <Text style={styles.userName}>{UserName}</Text>
                    <Text style={styles.userPosition}>Mitarbeiter</Text>
                </View>
                {
                    StatusData != "" ?
                        <View style={styles.mainBody}>
                            <Text style={styles.bodyHeading}>Dashboard</Text>
                            <Text style={styles.refresh} onPress={async () => getData()}>aktualisieren</Text>

                            {/*Attendance Box*/}
                            <View style={styles.attendanceBox}>

                                <DataTable style={{ marginBottom: 30 }} >
                                    <DataTable.Header style={styles.TableHeadStyle} Text>
                                        <DataTable.Title><Text style={styles.whiteText}>Check-In</Text></DataTable.Title>
                                        <DataTable.Title><Text style={styles.whiteText}>Check-Out</Text></DataTable.Title>
                                        <DataTable.Title><Text style={styles.whiteText}>Zeit</Text></DataTable.Title>
                                    </DataTable.Header>
                                    {
                                        TimingData != "" ?
                                            TimingData.map(data =>
                                                <DataTable.Row style={styles.TableCellStyle}>
                                                    <DataTable.Cell><Text style={styles.whiteText}>{data.checkin}</Text></DataTable.Cell>
                                                    <DataTable.Cell><Text style={styles.whiteText}>{data.checkout}</Text></DataTable.Cell>
                                                    <DataTable.Cell><Text style={styles.whiteText}>{data.duration}</Text></DataTable.Cell>
                                                </DataTable.Row>
                                            )
                                            :
                                            <>
                                                {isLoading ?
                                                    <ActivityIndicator size="large" style={styles.loadingBox} />
                                                    :
                                                    null
                                                }
                                            </>

                                    }
                                </DataTable>

                                <ImageBackground source={require('../../images/btn_bg.jpg')} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                                    {
                                        ButtonName == "Check In" ?
                                            <Pressable style={styles.button} onPress={async () => checkIn()} >
                                                <Text style={styles.text}>{ButtonName}</Text>
                                            </Pressable>
                                            :
                                            <Pressable style={styles.button} onPress={async () => checkOut()} >
                                                <Text style={styles.text}>{ButtonName}</Text>
                                            </Pressable>
                                    }
                                </ImageBackground>

                            </View>
                            <ImageBackground source={require('../../images/btn_bg.jpg')} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={[styles.button_bg, { justifyContent: 'center', alignItems: 'center', marginTop: 10 }]}>
                                <Pressable style={styles.button} onPress={async () => {
                                    applyLeave()
                                }} >
                                    <Text style={styles.text}>Krank melden</Text>
                                </Pressable>
                            </ImageBackground>
                            {/*Attendance Box*/}


                            {/*Status Boxes*/}
                            <View style={styles.statusBoxes}>

                                <View style={styles.statusBox}>
                                    <Icon name="calendar" size={40} color="#2eadb0" />
                                    <Text style={styles.statusBoxText}>Gesamt Tage</Text>
                                    {
                                        StatusData != "" ?
                                            <Text style={styles.statusBoxValue}>{StatusData.days} Tage</Text>
                                            :
                                            <Text style={styles.statusBoxValue}>0 Tage</Text>
                                    }
                                </View>

                                <View style={styles.statusBox}>
                                    <Icon name="calendar" size={40} color="#2eadb0" />
                                    <Text style={styles.statusBoxText}>Gesamt Anwesenheit</Text>
                                    {
                                        StatusData != "" ?
                                            <Text style={styles.statusBoxValue}>{StatusData.totalPresent}</Text>
                                            : <Text style={styles.statusBoxValue}>0 Tage</Text>
                                    }
                                </View>

                                <View style={styles.statusBox}>
                                    <Icon name="calendar" size={40} color="#2eadb0" />
                                    <Text style={styles.statusBoxText}>Gesamt Abwesenheit</Text>
                                    {
                                        StatusData != "" ?
                                            <Text style={styles.statusBoxValue}>{StatusData.leaves}</Text>
                                            : <Text style={styles.statusBoxValue}>0 Tage</Text>
                                    }
                                </View>

                                <View style={styles.statusBox}>
                                    <Icon name="clock-o" size={40} color="#2eadb0" />
                                    <Text style={styles.statusBoxText}>Gesamt Arbeitszeit</Text>

                                    {
                                        StatusData != "" ?
                                            <Text style={styles.statusBoxValue}>{StatusData.hours} Stunden</Text>
                                            : <Text style={styles.statusBoxValue}>0 Stunden</Text>
                                    }
                                </View>

                                <View style={styles.statusBox}>
                                    <Icon name="clock-o" size={40} color="#2eadb0" />
                                    <Text style={styles.statusBoxText}>Ausstehende Arbeitszeit</Text>
                                    {
                                        StatusData != "" ?
                                            <Text style={styles.statusBoxValue}>{StatusData.pendingHours} h/min</Text>
                                            : <Text style={styles.statusBoxValue}>0 h/min</Text>
                                    }
                                </View>

                                <View style={styles.statusBox}>
                                    <Icon name="clock-o" size={40} color="#2eadb0" />
                                    <Text style={styles.statusBoxText}>Arbeitszeit</Text>
                                    {
                                        StatusData != "" ?
                                            <Text style={styles.statusBoxValue}>{StatusData.workHours} h/min</Text>
                                            : <Text style={styles.statusBoxValue}>0 h/min</Text>
                                    }
                                </View>

                            </View>
                            {/*Status Boxes*/}

                        </View>

                        :

                        <ActivityIndicator size="large" style={styles.loadingBox} />
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "#242f43",
        },
        loadingBox: {
            paddingTop: "10%"
        },
        header: {
            width: "100%",
            backgroundColor: "#151d2c",
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderBottomRightRadius: 70,
            borderEndColor: "#1a95a7",
            borderEndWidth: 25,
        },
        userName: {
            color: "#ffffff",
            fontSize: 19
        },
        userPosition: {
            color: "#ffffff",
            fontSize: 14,
        },
        mainBody: {
            padding: 20,
        },
        bodyHeading: {
            color: "#ffffff",
            fontSize: 18,
        },
        attendanceBox: {
            marginTop: 30
        }
        , button_bg: {
            borderRadius: 30,
            width: "100%"
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            // paddingHorizontal: 32,
            backgroundColor: 'transparent',
            borderRadius: 30,
            alignSelf: 'center',

        },
        text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: "#fff"
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
        statusBoxes: {
            marginTop: 30,
            width: "100%",
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            flexDirection: 'row',
        },
        statusBox: {
            width: "46%",
            height: 160,
            backgroundColor: "#1f3257",
            alignItems: "center",
            paddingHorizontal: 14,
            paddingVertical: 25,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
            marginLeft: 10,
            marginTop: 15
        },
        statusBoxText: {
            color: "#f1f1f1",
            marginTop: 6,
            marginBottom: 10,
            textAlign: "center"
        },
        statusBoxValue: {
            color: "#ffffff",
            fontSize: 18,
            position: "absolute",
            bottom: 15
        },
        refresh: {
            color: "#fff",
            position: 'absolute',
            top: "1.6%",
            right: "4%",
            padding: 10
        }
    });
export default Main;