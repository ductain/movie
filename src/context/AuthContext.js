import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
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
    const updateUserProfile = (auth, (updateData) => {
        updateProfile(auth.currentUser, updateData)
    })
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
    }, [])
    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user, updateUserProfile }}>
            {children}
        </AuthContext.Provider>
    )
}
export const UserAuth = () => {
    return useContext(AuthContext)
}