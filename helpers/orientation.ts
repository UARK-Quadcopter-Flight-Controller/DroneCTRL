import * as ScreenOrientation from 'expo-screen-orientation';


export const changeOrientationLandscape = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

export const changeOrientationPortrait = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}