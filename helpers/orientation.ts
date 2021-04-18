import * as ScreenOrientation from 'expo-screen-orientation';
import { Dimensions } from 'react-native';

export const changeOrientationLandscape = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

export const changeOrientationPortrait = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}

export const getDeviceWidth = (): number => {
    const {height, width} = Dimensions.get("screen")
    return (width < height) ? width : height;
}

export const getDeviceHeight = (): number => {
    const {height, width} = Dimensions.get("screen")
    return (height > width) ? height : width;
}