import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebase-config';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { login } from '../actions/auth';
import { JournalScreen } from '../components/journal/JournalScreen';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn])

    if (checking) {
        return (
            <h2>Espere por favor...</h2>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />
                    <PrivateRoute
                        exact
                        path="/"
                        component={JournalScreen}
                        isAuthenticated={isLoggedIn}
                    />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
