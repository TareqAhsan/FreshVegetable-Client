import React from 'react';
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebaseConfig';
const firebaseinit = () => {
    return initializeApp(firebaseConfig)
};

export default firebaseinit;