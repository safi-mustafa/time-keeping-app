import AsyncStorage from '@react-native-async-storage/async-storage';

export const userData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('user')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // console.log("🚀 ~ file: utility.js ~ line 8 ~ getUserData ~ e", e)
        return null;
    }
}