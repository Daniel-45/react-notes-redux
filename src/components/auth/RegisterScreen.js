import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setErrorAction, removeErrorAction } from '../../actions/ui';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { startRegisterWithNameEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { errorMessage } = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        name: 'Daniel',
        email: 'daniel.pompa@gmail.com',
        password: 'kda5VtBcA387',
        password2: 'kda5VtBcA387'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isValidForm()) {
            dispatch(startRegisterWithNameEmailPassword(name, email, password));
        }
    }

    const isValidForm = () => {
        if (name.trim().length === 0) {
            dispatch(setErrorAction('El nombre es obligatorio'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setErrorAction('El e-mail es obligatorio y debe tener un formato correcto'));
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatch(setErrorAction('Las contraseñas deben ser iguales y tener al menos 6 caracteres'));
            return false;
        }

        dispatch(removeErrorAction());

        return true;
    }

    return (
        <div>
            <h2 className="auth__title">Crea una cuenta</h2>

            <form onSubmit={handleRegister}>
                {
                    errorMessage &&
                    (
                        <div className="auth__alert-error">
                            {errorMessage}
                        </div>
                    )
                }

                <input
                    type="text"
                    name="name"
                    className="auth__input"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    className="auth__input"
                    placeholder="nombre.apellido@gmail.com"
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    className="auth__input"
                    placeholder="Contraseña"
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password2"
                    className="auth__input"
                    placeholder="Repetir contraseña"
                    value={password2}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-2"
                >
                    Registro
                </button>


                <Link to="/auth/login" className="link">
                    Iniciar sesión
                </Link>
            </form>
        </div>
    )
}
