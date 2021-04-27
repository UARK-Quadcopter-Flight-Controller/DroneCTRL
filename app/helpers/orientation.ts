/*
 * This file changes the orientation of the device as well as obtaining the information pertaining to it
 */

import * as ScreenOrientation from 'expo-screen-orientation';
import { Dimensions } from 'react-native';

export const changeOrientationLandscapeLeft = async () => {
  /**
   * Locks the orientation to Landscape before proceeding
   */
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

export const changeOrientationPortrait = async () => {
  /**
   * Locks the orientation to Portrait before proceeding
   */
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}

export const getDeviceWidth = (): number => {
  /**
   * Returns the value of the Device Width
   * 
   * @returns width of the device
   */
    const {height, width} = Dimensions.get("screen")
    return (width < height) ? width : height;
}

export const getDeviceHeight = (): number => {
  /**
   * Returns the value of the Device Height
   * 
   * @returns height of the device
   */
    const {height, width} = Dimensions.get("screen")
    return (height > width) ? height : width;
}