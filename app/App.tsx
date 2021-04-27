/*
 * Team 3:
 * Champion: Alex Cutsinger
 * CSCE: Lily Phu, Zachary Heil, Stephanie Phillips, Spencer Ward, Dishoungh White II
 * ELEG: Zachary Heil, Andy McCoy, Joel Parker, Christ Somphounout
 * 
 * Comments will be in accordance to {@Link https://tsdoc.org/} and changes will be noted in github.
 *
 * This file coordinates with all of the others to create a visual render of the application
 * 
 * @alpha
 */
import React, { useState } from 'react';
import { screens } from './types';
import { Error, Loading, Fly, Settings, Credits } from './screens'

export default function App() {
  /**
   * App Entry Point
   * Creates instances of each of the screens and changes the screens accordingly.
   * Sets a callback that depends on the useState screen variable.
   *
   * @returns a render of the application
   */

  const [screen, setScreen] = useState<screens>('loading');

  switch(screen) {
    case 'loading':   return (<Loading onScreenChange={(screen) => setScreen(screen)} />);
    case 'fly':       return (<Fly onScreenChange={(screen) => setScreen(screen)} />);
    case 'settings':  return (<Settings onScreenChange={(screen) => setScreen(screen)} />);
    case 'credits':   return (<Credits onScreenChange={(screen) => setScreen(screen)} />)
    default:          return (<Error onScreenChange={(screen) => setScreen(screen)} />);
  }
}