
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
    ActivityIndicator,
    TouchableOpacity,
    Modal
} from 'react-native';
import { DataTable, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { baseurl } from '../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _pushTo } from '../routes/routes';
import { ADMIN_ADD_EMPLOYEE } from '../routes/payloads.routes';

const Main = (props) => {
    const [StatusData, setStatusData] = useState([]);
    const [Employees, setEmployees] = useState([]);
    const [allEmp, setAllEmp] = useState([]);
    const [presentEmp, setPresntEmp] = useState([]);
    const [absentEmp, setAbsent] = useState([]);
    const [leaveEmp, setLeave] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [list, setList] = useState([]);
    const [title, setTitle] = useState("");
    const [groupTitle, setGroupTitle] = useState("Geschäftsführung")
    const [UserName, setUserName] = useState("User");
    const [position, setPosition] = useState("");

    const attendanceBtn = () => {

    }
    const getData = async () => {

        const user = JSON.parse(await AsyncStorage.getItem('user'));
        console.log("User COmpany:" + user);
        setUserName(user.company_name)
        setPosition(user.position)

        const token = await AsyncStorage.getItem('token');
        console.log("=====>", token)
        axios.get(baseurl + "/admin/home?user_id=" + user.id + "&admin=0", {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
           
            let temp = []
            let temp1 = []
            let temp2 = []
            let temp3 = []

            if (res.data.all_emp.length > 0) {
                res.data.all_emp.forEach((ele) => {
                    console.log("RESPONSE RECEIVED:asx ", ele.is_deleted === 0);
                    if (ele.is_deleted === 0) {
                        temp.push(ele)
                    }
                })
            }
            if (res.data.present_emp.length > 0) {
                res.data.present_emp.forEach((ele) => {
                    console.log("RESPONSE RECEIVED:asx ", ele.is_deleted === 0);
                    if (ele.is_deleted === 0) {
                        temp1.push(ele)
                    }
                })
            }
            if (res.data.absent_emp.length > 0) {
                res.data.absent_emp.forEach((ele) => {
                    console.log("RESPONSE RECEIVED:asx ", ele.is_deleted === 0);
                    if (ele.is_deleted === 0) {
                        temp2.push(ele)
                    }
                })
            }
            if (res.data.leave_emp.length > 0) {
                res.data.leave_emp.forEach((ele) => {
                    console.log("RESPONSE RECEIVED:asx ", ele.is_deleted === 0);
                    if (ele.is_deleted === 0) {
                        temp3.push(ele)
                    }
                })
            }
            setAllEmp(temp)
            setLeave(temp3)
            setAbsent(temp2)
            setPresntEmp(temp1)
            setStatusData(res.data)
        })
            .catch((err) => {
                console.log("RESPONSE RECEIVED: ", err);
            })

        axios.get(baseurl + "/admin/home/all-employees", {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            console.log("RESPONSE RECEIVED: ", res.data);
            setEmployees(res.data)
        })
            .catch((err) => {
                console.log("RESPONSE RECEIVED: ", err);
            })



    }
    useEffect(() => {
        console.log("props====>", props)
        getData()
        // props.navigation.addListener('focus', ()=>{
        //     getData();
        // })
        // props.navigation.addListener('blur', ()=>{
        //     getData();
        // })
        // return () => {
        //     props.navigation.removeListener('focus', ()=>{})
        //     props.navigation.removeListener('blur', ()=>{})
        // }


    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <View style={styles.header}>
                    <Text style={styles.userName}>{UserName}</Text>
                    <Text style={styles.userPosition}>{position}</Text>
                </View>

                <View style={styles.mainBody}>
                    <Text style={styles.bodyHeading}>Dashboard</Text>
                    <Text style={styles.refresh} onPress={async () => { getData() }}>aktualisieren</Text>



                    {/*Status Boxes*/}
                    <View style={styles.statusBoxes}>
                        <TouchableOpacity style={{
                            height: 160,
                            width: '46%',
                            marginLeft: 10,
                            marginTop: 15
                        }}
                            onPress={() => {
                                setTitle("Alle Mitarbeiter")
                                setList(StatusData.all_emp)
                                setShowModal(true)
                            }}
                        >
                            <View style={[styles.statusBox, { width: '100%' }]}>
                                <Icon name="user" size={40} color="#2eadb0" />
                                <Text style={styles.statusBoxText}>Alle</Text>
                                <Text style={[styles.statusBoxText, { marginTop: -6 }]}>Mitarbeiter</Text>
                                {
                                    StatusData != "" ?
                                        <Text style={styles.statusBoxValue}>{allEmp.length}</Text>
                                        :
                                        <Text style={styles.statusBoxValue}>0</Text>
                                }
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            height: 160,
                            width: '46%',
                            marginLeft: 10,
                            marginTop: 15
                        }}
                            onPress={() => {
                                setTitle("Anwesende Mitarbeiter")
                                setList(StatusData.present_emp)
                                setShowModal(true)
                            }}
                        >
                            <View style={[styles.statusBox, { width: '100%' }]}>
                                <Icon name="user" size={40} color="#2eadb0" />
                                <Text style={styles.statusBoxText}>Anwesende</Text>
                                <Text style={[styles.statusBoxText, { marginTop: -6 }]}>Mitarbeiter</Text>
                                {
                                    StatusData != "" ?
                                        <Text style={styles.statusBoxValue}>{presentEmp.length}</Text>
                                        : <Text style={styles.statusBoxValue}>0</Text>
                                }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            height: 160,
                            width: '46%',
                            marginLeft: 10,
                            marginTop: 15
                        }}
                            onPress={() => {
                                setTitle("Abwesende Mitarbeiter")
                                setList(StatusData.absent_emp)
                                setShowModal(true)
                            }}
                        >
                            <View style={[styles.statusBox, { width: '100%' }]}>
                                <Icon name="user" size={40} color="#2eadb0" />
                                <Text style={styles.statusBoxText}>Abwesende </Text>
                                <Text style={[styles.statusBoxText, { marginTop: -6 }]}>Mitarbeiter</Text>
                                {
                                    StatusData != "" ?
                                        <Text style={styles.statusBoxValue}>{ absentEmp.length}</Text>
                                        : <Text style={styles.statusBoxValue}>0</Text>
                                }
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            height: 160,
                            width: '46%',
                            marginLeft: 10,
                            marginTop: 15
                        }}
                            onPress={() => {
                                setTitle("Mitarbeiter Krankenstand")
                                setList(StatusData.leave_emp)
                                setShowModal(true)
                            }}
                        >
                            <View style={[styles.statusBox, { width: '100%' }]}>
                                <Icon name="user" size={40} color="#2eadb0" />
                                <Text style={styles.statusBoxText}>Mitarbeiter Krankenstand</Text>

                                {
                                    StatusData != "" ?
                                        <Text style={styles.statusBoxValue}>{StatusData.leave_emp.length}</Text>
                                        : <Text style={styles.statusBoxValue}>0</Text>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/*Status Boxes*/}

                    <Text style={styles.bodySubHeading}>Mitarbeiter</Text>
                    <DataTable style={{ marginBottom: 30 }} >
                        <DataTable.Header style={styles.TableHeadStyle} Text>
                            <DataTable.Title><Text style={styles.whiteText}>Name</Text></DataTable.Title>
                            <DataTable.Title><Text style={styles.whiteText}>E-Mail</Text></DataTable.Title>
                            <DataTable.Title><Text style={styles.whiteText}>Tel.</Text></DataTable.Title>
                        </DataTable.Header>
                        {
                            Employees != "" ?
                                Employees.map((data) => {
                                    if (data.is_deleted === 1) {
                                        return null
                                    } else {
                                        return (
                                            <DataTable.Row style={styles.TableCellStyle}>
                                                <DataTable.Cell><Text style={styles.whiteText}>{data.emp_name}</Text></DataTable.Cell>
                                                <DataTable.Cell><Text style={styles.whiteText}>{data.email}</Text></DataTable.Cell>
                                                <DataTable.Cell><Text style={styles.whiteText}>{data.phone_number}</Text></DataTable.Cell>
                                            </DataTable.Row>
                                        )
                                    }
                                })
                                :
                                null
                        }
                    </DataTable>
                    <ImageBackground source={require('../../images/btn_bg.jpg')} onPress={() => _pushTo(ADMIN_ADD_EMPLOYEE)} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                        <Pressable style={styles.button} onPress={() => { _pushTo(ADMIN_ADD_EMPLOYEE) }} >
                            <Text style={styles.text}>+ Mitarbeiter hinzufügen</Text>
                        </Pressable>
                    </ImageBackground>
                </View>
            </ScrollView>
            <Modal
                visible={showModal}
                transparent
            >
                <View
                    style={styles.container}>
                    <View
                        style={{
                            marginTop: 30,
                            marginHorizontal: 10
                        }}
                    >
                        <Text style={{
                            alignSelf: 'flex-end',
                            margin: 10
                        }} onPress={() => setShowModal(false)} ><Icon name="close" size={30} color="#ffffff" onPress={() => setShowModal(false)} /></Text>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginVertical: 10,
                                color: 'white',
                                alignSelf: "center"
                            }}
                        >{title}</Text>
                        <DataTable style={{ marginBottom: 30 }} >
                            <DataTable.Header style={styles.TableHeadStyle} Text>
                                <DataTable.Title><Text style={styles.whiteText}>Name</Text></DataTable.Title>
                                {title === "Anwesende Mitarbeiter" ?
                                    <>
                                        <DataTable.Title><Text style={styles.whiteText}>Check-In</Text></DataTable.Title>
                                        <DataTable.Title><Text style={styles.whiteText}>Check-Out</Text></DataTable.Title>
                                    </>
                                    :
                                    null
                                }
                                <DataTable.Title><Text style={styles.whiteText}>E-Mail</Text></DataTable.Title>
                                <DataTable.Title><Text style={styles.whiteText}>Tel.</Text></DataTable.Title>
                            </DataTable.Header>
                            {
                                list.length > 0 ?
                                    list.map((data) => {
                                        console.log(data.is_deleted)

                                        return (
                                            <DataTable.Row style={styles.TableCellStyle}>
                                                <DataTable.Cell><Text style={styles.whiteText}>{data.name}</Text></DataTable.Cell>
                                                {title === "Anwesende Mitarbeiter" ?
                                                    <>
                                                        <DataTable.Cell><Text style={styles.whiteText}>{data.checkin}</Text></DataTable.Cell>
                                                        <DataTable.Cell><Text style={styles.whiteText}>{data.checkout}</Text></DataTable.Cell>
                                                    </>
                                                    :
                                                    null
                                                }
                                                <DataTable.Cell><Text style={styles.whiteText}>{data.email}</Text></DataTable.Cell>
                                                <DataTable.Cell><Text style={styles.whiteText}>{data.phone_number}</Text></DataTable.Cell>
                                            </DataTable.Row>

                                        )
                                    }

                                    )
                                    :
                                    null
                            }
                        </DataTable>
                    </View>

                </View>
            </Modal>
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
        bodySubHeading: {
            color: "#ffffff",
            fontSize: 18,
            marginTop: 20,
            marginBottom: 20
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