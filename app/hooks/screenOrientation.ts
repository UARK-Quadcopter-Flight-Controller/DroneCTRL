import { useEffect } from 'react';
import { changeOrientationLandscapeLeft, changeOrientationPortrait } from '../helpers/orientation';

export const screenPortrait = () => {
    useEffect(() => {
        const orientation = async () => {
            await changeOrientationPortrait();
        }
        orientation();
    })
}

export const screenLandscapeLeft = () => {
    useEffect(() => {
        const orientation = async () => {
            await changeOrientationLandscapeLeft();
        }
        orientation();
    })
}