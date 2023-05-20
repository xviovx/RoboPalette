import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Alert } from "react-native";

export const registerNewUser = (username, email, password,) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user + " just registered!")

        updateAuthProfile(username)
        //atodo: create user in our db
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage)
    });
}

export const signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        console.log(user+ "just logged in")

        Alert.alert("You're in!", "Successfully logged in", [
            {text: 'Thanks', onPress: () => {}}
        ])
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage =error.message;

        Alert.alert("Oops!", errorMessage, [
            {text: 'Try again', onPress: () => {}}
        ])
    })
}

export const signOutUser = ({navigation}) => {
    signOut(auth)
    .then(() => {
        console.log("successfully logged out")
    }).catch((error) => {
        console.log(error.errorMessage)
    })
}

export const getCurrentUser = () => {
    return auth.currentUser;
}

const updateAuthProfile = (username) => {
    updateProfile(auth.currentUser, {
        displayName: username, photoURL: "/"
    }).then(() => {

    }).catch((error) => {

    });
}