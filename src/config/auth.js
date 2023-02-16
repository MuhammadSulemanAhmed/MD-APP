import AsyncStorage from '@react-native-async-storage/async-storage';


export  const  SaveLogin=async(token,user)=>{
    try {     
        await AsyncStorage.setItem('token',token);
        await AsyncStorage.setItem('user',JSON.stringify(user));
    }
    catch (error) {
        console.log(error)
    }
}

export const isLogin=async()=>{
    try {     
        const value = await AsyncStorage.getItem('token');
        
        if(value!=""){
            return "yes";
        }else{
            return "no";
        }
    }
    catch (error) {
        console.log(error)
    }
}
export const getToken=async()=>{
    try {     
        const value = await AsyncStorage.getItem('token');
        return value;
    }
    catch (error) {
        console.log(error)
    }
}

export const getUser=async()=>{
    try {     
        const user = await AsyncStorage.getItem('user');
        return JSON.parse(user);
    }
    catch (error) {
        console.log(error)
    }
}


export const logout=async()=>{
    try {     
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
    }
    catch (error) {
        console.log(error)
    }
}