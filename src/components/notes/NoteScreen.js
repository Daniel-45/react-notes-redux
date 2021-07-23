import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);

    const [formValues, handleInputChange, reset] = useForm(note);

    const { title, body, id } = formValues;

    const activeIdRef = useRef(note.id)

    useEffect(() => {
        if (note.id !== activeIdRef.current) {
            reset(note);
            activeIdRef.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }));
    }, [formValues, dispatch]);

    const handleDelete = () => {
        dispatch(startDelete(id));
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input
                    type="text"
                    name="title"
                    placeholder="Título"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    name="body"
                    placeholder="Descripción"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    (note.url) &&
                    (
                        <div className="notes__image">
                            <img src={note.url} alt="imagen" />
                        </div>
                    )
                }
            </div>
            <button 
            className="btn btn-danger"
            onClick={handleDelete}
            >
                Eliminar
            </button>
        </div>
    )
}
