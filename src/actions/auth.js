import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import Swal from 'sweetalert2';
import { types } from '../types/types';
import { finishLoadingAction, startLoadingAction } from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {

    return (dispatch) => {

        dispatch(startLoadingAction());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoadingAction());
            })
            .catch(error => {
                console.log(error);
                dispatch(finishLoadingAction());
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                })
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
            });
    }
}

export const startRegisterWithNameEmailPassword = (name, email, password) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name })
                dispatch(login(user.uid, user.displayName));
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                })
            })
    }
}

export const login = (uid, displayname) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayname
        }
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout());
        dispatch(noteLogout());
    }
}

export const logout = () => ({
    type: types.logout
})