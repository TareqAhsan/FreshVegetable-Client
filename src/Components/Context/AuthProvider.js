import React, { createContext } from 'react';
import useFirebase from '../../hooks/useFirebase'
// import useFirebase from '../hooks/useFirebase'
// import useService from '../hooks/useService';
export const  AuthContext = createContext()
const AuthProvider = ({children}) => {
    // const {products} = useProducts()
    const allContext = useFirebase()
    // const {services,experts,softservices} = useService()
    const data = {allContext}
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;