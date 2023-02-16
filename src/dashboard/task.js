
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
    ActivityIndicator
} from 'react-native';
import { DataTable } from 'react-native-paper';
import { baseurl } from '../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
const Task = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [Tasks, setTasks] = useState([]);
    const [TaskData, setTaskData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {

        setTasks([])

        const token = await AsyncStorage.getItem('token');
        console.log(token)
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        console.log(user.user_id);
        axios.get(baseurl + "/todaydetails_new?user_id="+user.user_id, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLm1kYXNoYm9hcmQuZGVcL2FwaVwvbG9naW4iLCJpYXQiOjE2NTk1MDgxNzcsImV4cCI6MTY1OTUwODE3NywibmJmIjoxNjU5NTA4MTc3LCJqdGkiOiJ6dTc1NW1iQnJ0Zkd6dHc1Iiwic3ViIjoyNCwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.oNpUGzofUz3IUNvOyRSaLib_xX-iASeynlfd2eUoKMw',
            }
        }).then((res) => {
            console.log("RESPONSE  ", res.data);
            setTasks(res.data.tasks)
            setIsLoading(false)
        })
            .catch((err) => {
                console.log("RESPONSE RECEIVED:n  ", err);
            })
    }
    const getTask = async (id) => {

        const token = await AsyncStorage.getItem('token');
        setTaskData([]);
        axios.get(baseurl + "/view-task/" + id, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            console.log("===>", res.data)
            setTaskData(res.data)
            setModalVisible(true)
        })
            .catch((err) => {
                console.log("RESPONSE RECEIVED:jb ", err);
            })
    }
    const taskComplete = async (id) => {
        const token = await AsyncStorage.getItem('token');
        axios.post(baseurl + "/complete-task/" + id, {}, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            getData()
            setModalVisible(false)
        })
            .catch((err) => {
                console.log("RESPONSE RECEIVED: ", err);
            })
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <View style={styles.header}>
                    <Text style={styles.headerHeading}>Aufgaben</Text>
                </View>
                <DataTable style={{ marginBottom: 30 }} >
                    <DataTable.Header style={styles.TableHeadStyle} Text>
                        <DataTable.Title><Text style={styles.whiteText}>Aufgaben</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.whiteText}>Status</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.whiteText}>Details</Text></DataTable.Title>
                    </DataTable.Header>
                    {isLoading ?
                        <ActivityIndicator size="large" style={styles.loadingBox} />
                        :
                        null
                    }
                    {
                        Tasks.length === 0 ?
                            <>
                                {isLoading ?
                                    null
                                    :

                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 20,
                                        color: 'white',
                                        marginTop: 20
                                    }}>keine Aufgaben</Text>
                                }
                            </>
                            :
                            Tasks.map(data =>
                                <DataTable.Row style={styles.TableCellStyle}>
                                    <DataTable.Cell><Text style={styles.whiteText}>{data.task}</Text></DataTable.Cell>
                                    {
                                        data.status == "1" ?
                                            <DataTable.Cell><Text style={styles.whiteText} >Fertig</Text></DataTable.Cell>
                                            :
                                            <DataTable.Cell><Text style={styles.whiteText}>Noch offen</Text></DataTable.Cell>
                                    }
                                    <DataTable.Cell><Button title='Ansehen' onPress={() => getTask(data.id)} /></DataTable.Cell>
                                </DataTable.Row>
                            )
                    }

                </DataTable>

                {/* Task View Modal*/}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalDiv}>

                        {/* <Icon name="close" size={20} color="#2eadb0" style={{ position: 'absolute', top: '1%', right: '10%', padding: 20 }} onPress={() => setModalVisible(false)} /> */}

                        <Text style={styles.modelHeading}>Aufgabe:</Text>
                        <Icon
                            name="close"
                            size={20}
                            color="#2eadb0"
                            style={{ position: 'absolute', top: '3%', right: '10%', padding: 20 }}
                            onPress={() => setModalVisible(false)} />
                        <Text style={styles.taskDetail}>{TaskData.task}</Text>
                        {
                            TaskData.status == 1 ?
                                <Text style={styles.status}>Status: Fertig</Text>
                                :
                                <Text style={styles.status}>Status: Noch offen</Text>
                        }
                        {
                            TaskData.status == 1 ?
                                <Text style={{ color: "#fff", textAlign: "center", alignContent: 'center', marginTop: '15%' }}>bereits abgeschlossen</Text>
                                :
                                <ImageBackground source={require('../../images/btn_bg.jpg')} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                                    <Pressable style={styles.button} onPress={async () => taskComplete(TaskData.id)}  >
                                        <Text style={styles.text}>Aufgabe abgeschlossen</Text>
                                    </Pressable>
                                </ImageBackground>
                        }
                    </View>
                </Modal>
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
            marginTop: "15%"
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
export default Task;