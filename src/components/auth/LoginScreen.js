import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setErrorAction, removeErrorAction } from '../../actions/ui';
import validator from 'validator';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const { errorMessage, loading } = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        email: 'daniel.pompa@gmail.com',
        password: 'kda5VtBcA387'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        if (isValidForm()) {
            dispatch(startLoginEmailPassword(email, password));
        }
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    const isValidForm = () => {
        if (!validator.isEmail(email)) {
            dispatch(setErrorAction('El e-mail es obligatorio y debe tener un formato correcto'));
            return false;
        } else if (password.trim().length === 0 || password.length < 5) {
            dispatch(setErrorAction('La contraseña es obligatoria y debe tener al menos 6 caracteres'));
            return false;
        }

        dispatch(removeErrorAction());

        return true;
    }

    return (
        <div>
            <h2 className="auth__title">Login</h2>

            <form onSubmit={handleLogin}>
            {
                    errorMessage &&
                    (
                        <div className="auth__alert-error">
                            {errorMessage}
                        </div>
                    )
                }

                <input
                    type="email"
                    name="email"
                    className="auth__input"
                    placeholder="nombre.apellido@gmail.com"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    className="auth__input"
                    placeholder="Contraseña"
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link">
                    Crear una cuenta
                </Link>
            </form>
        </div>
    )
}
