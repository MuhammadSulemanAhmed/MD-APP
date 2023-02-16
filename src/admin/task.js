
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
    TouchableOpacity
} from 'react-native';
import { DataTable } from 'react-native-paper';
import { baseurl } from '../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
const Task = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [Tasks, setTasks] = useState([]);
    const [TaskData, setTaskData] = useState([]);
    const [Error, setError] = useState("");
    const [Name, setName] = useState("");
    const [Detail, setDetail] = useState("");

    const [empOpen, setEmpOpen] = useState(false);
    const [empValue, setEmpValue] = useState(null);
    const [empItems, setEmpItems] = useState([]);

    const [date, setDate] = useState("")
    const [open, setOpen] = useState(false)


    const [UpdateName, setUpdateName] = useState("");
    const [UpdateDetail, setUpdateDetail] = useState("");

    const [empUpdateOpen, setEmpUpdateOpen] = useState(false);
    const [empUpdateValue, setEmpUpdateValue] = useState(null);
    const [empUpdateItems, setEmpUpdateItems] = useState([]);

    const [dateUpdate, setDateUpdate] = useState(new Date())
    const [openUpdate, setOpenUpdate] = useState(false)

    const nameHandle = (text) => {
        setName(text);
    }
    const detailHandle = (text) => {
        setDetail(text);
    }
    const nameUpdateHandle = (text) => {
        setUpdateName(text);
    }
    const detailUpdateHandle = (text) => {
        setUpdateDetail(text);
    }
    const getData = async () => {

        setTasks([])

        const token = await AsyncStorage.getItem('token');
        axios.get(baseurl + "/admin/all-tasks", {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            console.log("RESPONSE RECEIVED:Tasks ", res.data);
            setTasks(res.data)
        })
            .catch((err) => {
                console.log("RESPONSE RECEIVED:tasdks ", err);
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
            let temp = res.data
            let temp2 = []
            temp.forEach((ele) => {
                if (ele.is_deleted === 1) {
                    console.log(ele.user_id)
                } else {
                    temp2.push({
                        label: ele.name, value: ele.user_id
                    })
                }
            })
            setEmpItems(temp2)
        })
            .catch((err) => {
                console.log("RESPONSE RECEIVED: ", err);
            })
    }
    const getTask = async (id) => {

        const token = await AsyncStorage.getItem('token');
        axios.get(baseurl + "/admin/task/" + id, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            console.log(res.data)
            setTaskData(res.data)
            setModalVisible(true)
        })
            .catch((err) => {
                console.log("RESPONSE RECEIVED: ", err);
            })
    }

    const saveTask = async () => {
        setError("");
        if (empValue == "" || empValue == null) {
            setError("Mitarbeiter auswählen");
            return false;
        }
        if (Name == "") {
            setError("Aufgabennamen eingeben");
            return false;
        }
        if (Detail == "") {
            setError("Aufgabendetails hinzufügen");
            return false;
        }
        const token = await AsyncStorage.getItem('token');
        console.log({ employee_id: empValue, name: Name, task_date: date, detail: Detail })
        axios.post(baseurl + "/admin/task/store", { employee_id: empValue, name: Name, task_date: date, detail: Detail }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            getData();
            setCreateModalVisible(false);
        })
            .catch((err) => {
                console.log("RESPONSE RECEIVED: ", err);
            })
    }

    const deleteTask = async (id) => {
        // alert("AS")
        const token = await AsyncStorage.getItem('token');
        axios.get(baseurl + "/admin/task/delete/" + id, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            getData();
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
                <ScrollView horizontal>
                    <DataTable style={{ marginBottom: 30 }} >
                        <DataTable.Header style={styles.TableHeadStyle} Text>
                            <DataTable.Title style={styles.td}><Text style={styles.whiteText}>Mitarbeiter</Text></DataTable.Title>
                            <DataTable.Title style={styles.td}><Text style={styles.whiteText}>Aufgabe</Text></DataTable.Title>
                            <DataTable.Title style={styles.td}><Text style={styles.whiteText}>Aufgabendatum</Text></DataTable.Title>
                            <DataTable.Title style={styles.td}><Text style={styles.whiteText}>Details</Text></DataTable.Title>
                            <DataTable.Title style={styles.td}><Text style={styles.whiteText}>Action</Text></DataTable.Title>
                        </DataTable.Header>
                        {
                            Tasks == "" ?
                                null
                                :
                                Tasks.map(data =>

                                    <DataTable.Row style={styles.TableCellStyle}>
                                        <DataTable.Cell style={styles.td}><Text style={styles.whiteText}>{data.emp_name}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.td}><Text style={styles.whiteText}>{data.name}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.td}><Text style={styles.whiteText}>{moment(data.task_date, "DD-MM-YY").format("DD.MM.YYYY")}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.td}><Button title='Ansehen' onPress={() => getTask(data.id)} /> <Button title='' onPress={() => getTask(data.id)} /></DataTable.Cell>
                                        <DataTable.Cell style={styles.td}><Button title='Löschen' onPress={() => deleteTask(data.id)} /> <Button title='' onPress={() => deleteTask(data.id)} /></DataTable.Cell>
                                    </DataTable.Row>
                                )
                        }

                    </DataTable>
                </ScrollView>
                <ImageBackground
                    source={require('../../images/btn_bg.jpg')}
                    onPress={() => setCreateModalVisible(true)}
                    imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                    <Pressable style={styles.button} onPress={() => setCreateModalVisible(true)} >
                        <Text style={styles.text}>Neue Aufgabe hinzufügen</Text>
                    </Pressable>
                </ImageBackground>
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


                        <Text style={styles.modelHeading}>Aufgabe:</Text>
                        <Icon name="close" size={20} color="#2eadb0" style={{ position: 'absolute', top: '3%', right: '10%', padding: 20 }} onPress={() => setModalVisible(false)} />
                        {
                            TaskData != "" ?
                                <>
                                    <Text style={styles.status}>Mitarbeiter: {TaskData.emp_name}</Text>
                                    <Text style={styles.status}>Aufgabenname: {TaskData.name}</Text>
                                    <Text style={styles.status}>Aufgaben: {TaskData.task.task}</Text>
                                    {
                                        TaskData.task.status == 1 ?
                                            <Text style={styles.status}>Status: Fertig</Text>//completed
                                            :
                                            <Text style={styles.status}>Status: in Bearbeitung</Text>//pending
                                    }
                                </>
                                :
                                null
                        }
                    </View>
                </Modal>

                {/* Task View Modal*/}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={createModalVisible}
                    onRequestClose={() => {
                        setCreateModalVisible(!createModalVisible);
                    }}
                >
                    <View style={styles.modalDiv}>
                        <Text style={styles.modelHeading}>Aufgabe erstellen:</Text>
                        <Icon
                            name="close"
                            size={20}
                            color="#2eadb0"
                            style={{ position: 'absolute', top: '3%', right: '10%', padding: 20 }}
                            onPress={() => setCreateModalVisible(false)} />
                        <DropDownPicker
                            placeholder={'Mitarbeiter auswählen'}
                            open={empOpen}
                            value={empValue}
                            items={empItems}
                            setOpen={setEmpOpen}
                            setValue={setEmpValue}
                            setItems={setEmpItems}
                            style={styles.dropdown}
                            zIndex={10002}
                        />
                        <TextInput style={styles.inputStyle} placeholder="Aufgabenname" onChangeText={nameHandle} value={Name}></TextInput>
                        <Pressable style={styles.inputStyle} onPress={() => setOpen(true)}><Text style={styles.inputStyleDate}>{date === "" ? "Aufgabendatum" : moment(date).format('DD.MM.YYYY')}</Text></Pressable>
                        <DatePicker
                            modal
                            open={open}
                            date={new Date()}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                            mode={"date"}
                            theme={"light"}
                            title={"Aufgabendatum"}
                            locale={'ger'}
                            confirmText={'Datum bestätigen'}
                            cancelText={'Abbrechen'}
                        />

                        <TextInput style={styles.inputStyle} placeholder="Aufgaben" onChangeText={detailHandle} value={Detail}></TextInput>
                        <Text style={styles.error}>{Error}</Text>
                        <ImageBackground
                            source={require('../../images/btn_bg.jpg')}
                            onPress={async () => saveTask()}
                            imageStyle={{ borderRadius: 40, }}
                            resizeMode="cover"
                            style={styles.button_bg}>
                            <Pressable style={styles.button} onPress={async () => saveTask()}  >
                                <Text style={styles.text}>Speichern</Text>
                            </Pressable>
                        </ImageBackground>
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
        td: {
            color: "#ffffff",
            textAlign: "center",
            width: 160,
        },
        modalDiv: {
            backgroundColor: "#242f43",
            flex: 1,
            padding: 40
        },
        modelHeading: {
            color: "#fff",
            fontSize: 20,
            marginBottom: 30
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
            width: "90%",
            marginTop: "5%",
            alignSelf: 'center',
            marginLeft: 22
            // justifyContent:'center',
            // alignItems:'center'

        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            // paddingHorizontal: 32,
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
            height: 50
        },
        inputStyleDate: {
            borderColor: "#ffffff",
            borderBottomWidth: 1,
            borderStyle: "solid",
            fontSize: 13,
            backgroundColor: "#ffffff",
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 40,
            width: "100%",
            textAlign: "center"
        },

        dropdown: {
            marginBottom: "5%",
            borderRadius: 40,
            textAlign: "center"

        },
        error: {
            color: "#ffffff",
            fontSize: 15,
            textAlign: 'center'
        }
    });
export default Task;