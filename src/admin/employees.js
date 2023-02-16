
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
    TouchableOpacityBase,
    TouchableOpacity,
    Linking
} from 'react-native';
import { WebView } from 'react-native-webview';
import { DataTable } from 'react-native-paper';
import { baseurl, siteurl } from '../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { _pushTo, _pushToRoot, _toAdmin } from '../routes/routes';
import { ADMIN_ADD_EMPLOYEE } from '../routes/payloads.routes';
import DropDownPicker from 'react-native-dropdown-picker';
var RNFS = require('react-native-fs');
const Task = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleReport, setModalVisibleReport] = useState(false);
    const [Tasks, setTasks] = useState([]);
    const [Employees, setEmployees] = useState([]);
    const [ID, setID] = useState("");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Tel, setTel] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Hour, setHour] = useState("");
    const [Breaktime, setBreaktime] = useState("");
    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState(false);

    const [empOpen, setEmpOpen] = useState(false);
    const [empValue, setEmpValue] = useState(null);
    const [empItems, setEmpItems] = useState([]);


    const [monthOpen, setMonthOpen] = useState(false);
    const [monthValue, setMonthValue] = useState("01");
    const [monthItems, setMonthItems] = useState([
        { label: 'Jan', value: '01' },
        { label: 'Feb', value: '02' },
        { label: 'Mar', value: '03' },
        { label: 'Apr', value: '04' },
        { label: 'Mai', value: '05' },
        { label: 'Jun', value: '06' },
        { label: 'Jul', value: '07' },
        { label: 'Aug', value: '08' },
        { label: 'Sep', value: '09' },
        { label: 'Okt', value: '10' },
        { label: 'Nov', value: '11' },
        { label: 'Dez', value: '12' },
    ]);

    const [yearOpen, setYearOpen] = useState(false);
    const [yearValue, setYearValue] = useState("2022");
    const [yearItems, setYearItems] = useState([
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' },
        { label: '2024', value: '2024' },
    ]);

    const [ReportUrl, setReportUrl] = useState("")


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


    const getData = async () => {

        setTasks([])

        const token = await AsyncStorage.getItem('token');
        axios.get(baseurl + "/admin/home/all-employees", {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            //console.log("RESPONSE RECEIVED: ", res.data.timing);
            setEmployees(res.data)
        })
            .catch((err) => {
                console.log("RESPONSE RECEIVED: ", err);
            })

        axios.get(baseurl + "/admin/all-employees-json", {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            //console.log("RESPONSE RECEIVED: ", res.data.timing);
            setEmpItems(res.data)
        })
            .catch((err) => {
                console.log("RESPONSE RECEIVED: ", err);
            })
    }
    const getEmpData = async (id) => {


        const token = await AsyncStorage.getItem('token');
        axios.post(baseurl + "/admin/get-employee", { id: id }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            console.log("emp=====>",res.data)
            setID(res.data.user_id)
            setName(res.data.emp_name)
            setEmail(res.data.email)
            setTel(res.data.phone_number)
            setUsername(res.data.username)
            setHour(res.data.hours)
            setBreaktime(res.data.break_time)

            setModalVisible(true)
        })
            .catch((err) => {
                console.log("RESPONSE RECEIVED: ", err);
            })
    }

    const reportSearch = () => {
        var emp_id = empValue;
        var month = monthValue;
        var year = yearValue;
        // alert("report-data/"+emp_id+"/"+month+"/"+year)
        setReportUrl(siteurl + "report-data/" + emp_id + "/" + month + "/" + year)
    }

    const updateEmployeeAction = async () => {

        setLoading(true)

        const token = await AsyncStorage.getItem('token');
        axios.post(baseurl + "/admin/update-employee", { id: ID, name: Name, password: Password, tel: Tel, hour: Hour, breaktime: Breaktime }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => {
            setModalVisible(false);
            getData();
            setLoading(false)
        })
            .catch((err) => {
                if(err.response.data.message === "passwort geben sie mindestens 6 zeichen ein*"){
                    setError('Passwort: Geben Sie mindestens 6 Zeichen ein');
                }else{
                    setError(err.response.data.message);
                }
               
                console.log(err.response.data)
                setLoading(false)
            })
    }
    const deleteEmployeeAccount = async () => {

        setLoading(true)

        const token = await AsyncStorage.getItem('token');
        axios.get("https://app.mdashboard.de/delete_user/" + Username, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
            }
        }).then((res) => {
            console.log("delete => ", res.data,Username)
            setLoading(false)
            Alert.alert("","Mitarbeiter wurde erfolgreich gelöscht!")
            getData();
            setModalVisible(false)
            _toAdmin()
        })
            .catch((err) => {
                console.log("error => ", err)
            })

    }
    const downloadDocument = async (downloadUrl) => {
        console.log(downloadUrl)
        return
        let fileURI = await downloadAsync(
            downloadUrl,
            `${documentDirectory}name.pdf`,
            {},
        );
        await onShare(fileURI.uri);
    };
    useEffect(() => {
        getData();
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <View style={styles.header}>
                    <Text style={styles.headerHeading}>Mitarbeiter</Text>
                </View>
                <ScrollView horizontal>
                    <DataTable style={{ marginBottom: 30 }} >
                        <DataTable.Header style={styles.TableHeadStyle} Text>
                            <DataTable.Title style={styles.td}><Text style={styles.whiteText}>Name</Text></DataTable.Title>
                            <DataTable.Title style={styles.td}><Text style={styles.whiteText}>E-Mail</Text></DataTable.Title>
                            <DataTable.Title style={styles.td}><Text style={styles.whiteText}>Tel.</Text></DataTable.Title>
                            <DataTable.Title style={styles.td}><Text style={styles.whiteText}>Action</Text></DataTable.Title>
                        </DataTable.Header>
                        {
                            Employees == "" ?
                                null
                                :
                                Employees.map((data) =>{
                                    if(data.is_deleted ===1){
                                      return null
                                    }
                                    return(
                                    <DataTable.Row style={styles.TableCellStyle}>
                                        <DataTable.Cell style={styles.td}><Text style={styles.whiteText}>{data.emp_name}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.td}><Text style={styles.whiteText}>{data.email}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.td}><Text style={styles.whiteText}>{data.phone_number}</Text></DataTable.Cell>
                                        <DataTable.Cell style={[styles.td]}><Text title='bearbeiten' onPress={() => getEmpData(data.user_id)} style={{ color: "white", fontSize: 20, color: "#2b87f0" }}>bearbeiten</Text></DataTable.Cell>
                                        {/* <DataTable.Cell style={styles.td}><Button title='bearbeiten' onPress={() => deleteTask(data.id)} /> <Button title='bearbeiten' onPress={() => deleteTask(data.id)} /></DataTable.Cell> */}
                                    </DataTable.Row>
                                    )
                                })
                                
                        }

                    </DataTable>
                </ScrollView >


                <ImageBackground source={require('../../images/btn_bg.jpg')} onPress={() => _pushTo(ADMIN_ADD_EMPLOYEE)} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                    <Pressable style={styles.button} onPress={() => _pushTo(ADMIN_ADD_EMPLOYEE)} >
                        <Text style={styles.text}>+ Mitarbeiter hinzufügen</Text>
                    </Pressable>
                </ImageBackground>
                <ImageBackground source={require('../../images/btn_bg.jpg')} onPress={() => setModalVisibleReport(true)} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                    <Pressable style={styles.button} onPress={() => setModalVisibleReport(true)} >
                        <Text style={styles.text}>Bericht prüfen</Text>
                    </Pressable>
                </ImageBackground>

                {/* Task View Modal*/}
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >

                    <View style={styles.modalDiv}>


                        <Text style={styles.modelHeading}>Mitarbeiter bearbeiten</Text>
                        <Text style={styles.closeBtn} onPress={() => {
                            getData();
                            setModalVisible(false)
                        }} ><Icon name="close" size={30} color="#ffffff" onPress={() => {
                            getData();
                            setModalVisible(false)
                        }} /></Text>
                        <TextInput style={styles.inputStyle} placeholder="Mitarbeitername " onChangeText={nameHandle} value={Name}></TextInput>
                        <TextInput style={styles.inputStyle} placeholder="E-Mail" onChangeText={emailHandle} value={Email} keyboardType={"email-address"}></TextInput>
                        <TextInput style={styles.inputStyle} placeholder="Tel." onChangeText={telHandle} value={Tel} keyboardType={"number-pad"}></TextInput>
                        <TextInput style={styles.inputStyle} placeholder="Benutzername" onChangeText={usernameHandle} value={Username}></TextInput>
                        <TextInput style={styles.inputStyle} placeholder="Passwort" onChangeText={passwordHandle} value={Password} secureTextEntry={true} ></TextInput>
                        <TextInput style={styles.inputStyle} placeholder="Monatsstunden" onChangeText={hourHandle} value={Hour} keyboardType={"numeric"}></TextInput>
                        <TextInput style={styles.inputStyle} placeholder="Pause" onChangeText={breaktimeHandle} value={Breaktime} keyboardType={"numeric"}></TextInput>

                        <Text style={styles.whiteText}>{Error}</Text>
                        {
                            Loading == false ?
                                <ImageBackground source={require('../../images/btn_bg.jpg')} onPress={() => updateEmployeeAction()} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                                    <Pressable style={styles.button} onPress={() => updateEmployeeAction()}   >
                                        <Text style={styles.text}>Speichern</Text>
                                    </Pressable>
                                </ImageBackground>
                                :
                                <ActivityIndicator size="large" style={styles.loadingBox} />
                        }
                        {
                            Loading == false ?
                                <ImageBackground source={require('../../images/btn_bg.jpg')} onPress={() => updateEmployeeAction()} imageStyle={{ borderRadius: 40 }} resizeMode="cover" style={styles.button_bg}>
                                    <Pressable style={styles.button} onPress={() => Alert.alert(
                                        "Mitarbeiter löschen",
                                        "Bist du dir sicher den Account von " + Name + " zu löschen?",
                                        [
                                            {
                                                text: "Mitarbeiter löschen",
                                                onPress: () => { deleteEmployeeAccount() }
                                            },
                                            {
                                                text: "Abbrechen",
                                                onPress: () => { }
                                            },
                                        ]
                                    )}   >
                                        <Text style={styles.text}>Mitarbeiter löschen</Text>
                                    </Pressable>
                                </ImageBackground>
                                :
                                <ActivityIndicator size="large" style={styles.loadingBox} />
                        }
                    </View>
                </Modal>

                {/* Report View Modal*/}
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={modalVisibleReport}
                    onRequestClose={() => {
                        setModalVisible(!modalVisibleReport);
                    }}
                >
                    <View style={styles.modalDiv}>



                        <Text style={styles.modelHeading}>Bericht prüfen</Text>
                        <Text style={styles.closeBtn} onPress={() => setModalVisibleReport(false)} ><Icon name="close" size={30} color="#ffffff" onPress={() => setModalVisible(false)} /></Text>
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
                            onChangeValue={() => reportSearch()}
                        />
                        <DropDownPicker
                            placeholder={'Monat auswählen'}
                            open={monthOpen}
                            value={monthValue}
                            items={monthItems}
                            setOpen={setMonthOpen}
                            setValue={setMonthValue}
                            setItems={setMonthItems}
                            style={styles.dropdown}
                            zIndex={10001}
                            onChangeValue={() => reportSearch()}
                        />
                        <DropDownPicker
                            placeholder={'Jahr auswählen'}
                            open={yearOpen}
                            value={yearValue}
                            items={yearItems}
                            setOpen={setYearOpen}
                            setValue={setYearValue}
                            setItems={setYearItems}
                            style={styles.dropdown}
                            zIndex={1000}
                            onChangeValue={() => reportSearch()}
                        />
                        {/* <TouchableOpacity
                            style={{
                                height: 40,
                                width: 200,
                                backgroundColor: "yellow",
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10
                            }}
                            onPress={() => {
                                // if (jobId !== -1) {
                                //     this.setState({ output: 'A download is already in progress' });
                                //   }

                                let progress = data => {
                                    const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
                                    const text = `Progress ${percentage}%`;
                                    console.log('-==>' + text)
                                    // this.setState({ output: text });
                                };

                                const begin = res => {
                                    console.log('-==> Download has begun')
                                    // this.setState({ output: 'Download has begun' });
                                };
                                let downloadUrl = 'https://app.mdashboard.de/report-data/49/07/2022';
                                // let DownloadFileOptions = {
                                //     fromUrl: string,          // URL to download file from
                                //     toFile: string           // Local filesystem path to save the file to

                                //   };
                                const progressDivider = 1;
                                let background = false
                                const downloadDest = `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.jpg`;
                                let ret = RNFS.downloadFile({ fromUrl: downloadUrl, toFile: downloadDest, begin, progress, background, progressDivider })
                                ret.promise.then(res => {
                                    console.log("=>", res)
                                    console.log({ uri: 'file://' + downloadDest })
                                    // this.setState({ output: JSON.stringify(res) });
                                    // this.setState({ imagePath: { uri: 'file://' + downloadDest } });

                                    // jobId = -1;
                                }).catch(err => {
                                    console.log("error=>", err)
                                    // this.showError(err)

                                    // jobId = -1;
                                });
                            }}
                        >
                            <Text>Download PDF</Text>
                        </TouchableOpacity> */}
                        {ReportUrl === "" ?

                            null
                            :
                            <WebView
                                source={{ uri: ReportUrl }}
                                scrollEnabled={true}
                                useWebKit={true}
                                // originWhitelist={["*"]}
                                style={{ marginTop: 20 }}
                                domStorageEnabled={true}
                                allowFileAccess={true}
                                allowUniversalAccessFromFileURLs={true}
                                allowingReadAccessToURL={true}
                                mixedContentMode={'always'}
                                // onFileDownload={({ nativeEvent: { downloadUrl } }) =>
                                //     downloadDocument(downloadUrl)
                                // }
                                onShouldStartLoadWithRequest={navState => {
                                    // if (Platform.OS === 'ios') {
                                    const { url, } = navState;
                                    console.log("==>", url)
                                    if (url.startsWith('about:blank')) {
                                        console.log(navState)
                                        Linking.openURL(navState.mainDocumentURL);
                                        return false;
                                    } else {
                                        // External Links
                                        // Linking.openURL(url);
                                        return true;
                                    }
                                }}
                            />
                        }
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create(
    {
        dropdown: {
            "marginBottom": 10
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
            fontSize: 25,
            marginBottom: "10%",
            textAlign: "center",
            marginTop: 20
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
        td: {
            padding: 10,
            color: "#fff",
            width: 130
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
        dropdown: {
            marginBottom: "5%",
        },
        whiteText: {
            color: "#ffffff",
            textAlign: "center",
            paddingBottom: 10
        },
        closeBtn: {
            position: "absolute",
            color: "#fff",
            padding: 15,
            right: 20,
            fontSize: 20,
            marginTop: '15%'
        }
    });
export default Task;