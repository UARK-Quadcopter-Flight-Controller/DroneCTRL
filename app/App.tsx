/*
 * Team 3:
 * Champion: Alex Cutsinger
 * CSCE: Lily Phu, Zachary Heil, Stephanie Phillips, Spencer Ward, Dishoungh White II
 * ELEG: Zachary Heil, Andy McCoy, Joel Parker, Christ Somphounout
 * 
 * Comments will be in accordance to {@Link https://tsdoc.org/} and changes will be noted in github.
 *
 * Imports below
 */
import React, { useState } from 'react';
import { screens } from './types';
import { Error, Loading, Fly, Settings, Credits } from './screens'



/**
 * App Entry Point
 */
export default function App() {

  const [screen, setScreen] = useState<screens>('loading');

  switch(screen) {
    case 'loading':   return (<Loading onScreenChange={(screen) => setScreen(screen)} />);
    case 'fly':       return (<Fly onScreenChange={(screen) => setScreen(screen)} />);
    case 'settings':  return (<Settings onScreenChange={(screen) => setScreen(screen)} />);
    case 'credits':   return (<Credits onScreenChange={(screen) => setScreen(screen)} />)
    default:          return (<Error onScreenChange={(screen) => setScreen(screen)} />);
  }
}