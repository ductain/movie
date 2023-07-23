import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../firebase/Firebase";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }
    const logOut = () => {
        signOut(auth)
    }
    useEffect(() => {
        const unSubcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log('User', currentUser)
        })
        return () => { unSubcribe() }
    }, [])
    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}
export const UserAuth = () => {
    return useContext(AuthContext)
}