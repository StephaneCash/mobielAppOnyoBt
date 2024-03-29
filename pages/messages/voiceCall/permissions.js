import { PermissionsAndroid } from 'react-native';

export const requestAudioPermission = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        if (
            granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
            console.log("You can use the mic");
        } else {
            console.log("Permission denied")
        }
    } catch (error) {
        console.log(error)
    }
}